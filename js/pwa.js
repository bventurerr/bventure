// ======================================================
// BVenture — Modo de teste do PWA
// ======================================================

// true  = permite acessar o jogo pelo navegador/computador
// false = exige que o BVenture esteja aberto como PWA
const BVENTURE_TESTE_PWA = false;


// ======================================================
// BVenture — Registro do Service Worker
// ======================================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        try {

            const registro =
                await navigator.serviceWorker.register(
                    "./service-worker.js"
                );

            console.log(
                "BVenture — Service Worker registrado:",
                registro.scope
            );

        } catch (erro) {

            console.error(
                "BVenture — erro ao registrar Service Worker:",
                erro
            );

        }

    });

}


// ======================================================
// BVenture — Verificação do modo de exibição
// ======================================================

function bventureEstaInstalado() {

    // Android e outros navegadores compatíveis com PWA
    const modoStandalone =
        window.matchMedia(
            "(display-mode: standalone)"
        ).matches;

    // iPhone e iPad
    const modoStandaloneIOS =
        window.navigator.standalone === true;

    return modoStandalone || modoStandaloneIOS;

}

window.bventureEstaInstalado =
    bventureEstaInstalado;


// ======================================================
// BVenture — Evento de instalação
// ======================================================

let bventureEventoInstalacao = null;

window.addEventListener(
    "beforeinstallprompt",
    (event) => {

        // Impede o navegador de exibir automaticamente
        // o aviso de instalação
        event.preventDefault();

        // Guarda o evento para o botão "Instalar"
        bventureEventoInstalacao = event;

        // Avisa a tela de instalação
        window.dispatchEvent(
            new CustomEvent(
                "bventureInstalacaoDisponivel"
            )
        );

    }
);


// ======================================================
// BVenture — Instalar aplicativo
// ======================================================

async function instalarBVenture() {

    if (!bventureEventoInstalacao) {
        return false;
    }

    try {

        // Abre o prompt oficial do navegador
        await bventureEventoInstalacao.prompt();

        // Aguarda a escolha do usuário
        const escolha =
            await bventureEventoInstalacao.userChoice;

        // O evento só pode ser utilizado uma vez
        bventureEventoInstalacao = null;

        return escolha.outcome === "accepted";

    } catch (erro) {

        console.error(
            "BVenture — erro durante a instalação:",
            erro
        );

        bventureEventoInstalacao = null;

        return false;

    }

}

window.instalarBVenture =
    instalarBVenture;


// ======================================================
// BVenture — Identificação do dispositivo
// ======================================================

function obterPlataformaBVenture() {

    const userAgent =
        navigator.userAgent || "";

    const ehAndroid =
        /Android/i.test(userAgent);

    const ehIOS =
        /iPhone|iPad|iPod/i.test(userAgent) ||
        (
            navigator.platform === "MacIntel" &&
            navigator.maxTouchPoints > 1
        );

    if (ehIOS) {
        return "ios";
    }

    if (ehAndroid) {
        return "android";
    }

    return "outro";

}

window.obterPlataformaBVenture =
    obterPlataformaBVenture;


// ======================================================
// BVenture — Tipo de instalação disponível
// ======================================================

function obterTipoInstalacaoBVenture() {

    // Está sendo executado pelo aplicativo instalado
    if (bventureEstaInstalado()) {
        return "instalado";
    }

    const plataforma =
        obterPlataformaBVenture();

    // iPhone/iPad utiliza instalação manual pelo Safari
    if (plataforma === "ios") {
        return "ios";
    }

    // Android com prompt de instalação disponível
    if (
        plataforma === "android" &&
        bventureEventoInstalacao
    ) {
        return "android";
    }

    // Instalação não disponível neste momento
    return "indisponivel";

}

window.obterTipoInstalacaoBVenture =
    obterTipoInstalacaoBVenture;


// ======================================================
// BVenture — Proteção global de acesso
// ======================================================

function protegerAcessoBVenture() {

    // --------------------------------------------------
    // MODO DE TESTE
    //
    // Quando ativado, permite acessar login, mapa,
    // app e demais páginas diretamente pelo navegador.
    // Útil durante o desenvolvimento no computador.
    // --------------------------------------------------

    if (BVENTURE_TESTE_PWA) {

        console.warn(
            "BVenture — Modo de teste PWA ativado."
        );

        return true;

    }


    // --------------------------------------------------
    // APLICATIVO INSTALADO
    //
    // Android:
    // display-mode: standalone
    //
    // iPhone/iPad:
    // navigator.standalone
    // --------------------------------------------------

    if (bventureEstaInstalado()) {
        return true;
    }


    // --------------------------------------------------
    // Descobre qual página está aberta
    // --------------------------------------------------

    const caminho =
        window.location.pathname.toLowerCase();

    const paginaAtual =
        caminho.split("/").pop() || "index.html";


    // --------------------------------------------------
    // Páginas permitidas no navegador
    // --------------------------------------------------

    const paginasPublicas = [
        "index.html",
        "instalar.html"
    ];


    // --------------------------------------------------
    // Página pública
    // --------------------------------------------------

    if (paginasPublicas.includes(paginaAtual)) {
        return true;
    }


    // --------------------------------------------------
    // Página interna aberta pelo navegador
    // --------------------------------------------------

    window.location.replace("./instalar.html");

    return false;

}

window.protegerAcessoBVenture =
    protegerAcessoBVenture;


// ======================================================
// BVenture — Executar proteção automaticamente
// ======================================================

protegerAcessoBVenture();