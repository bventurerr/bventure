// ======================================================
// BVenture — Registro do Service Worker
// ======================================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        try {

            const registro = await navigator.serviceWorker.register(
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

    const modoStandalone =
        window.matchMedia("(display-mode: standalone)").matches;

    const modoStandaloneIOS =
        window.navigator.standalone === true;

    return modoStandalone || modoStandaloneIOS;

}

window.bventureEstaInstalado = bventureEstaInstalado;

// ======================================================
// BVenture — Evento de instalação
// ======================================================

let bventureEventoInstalacao = null;

window.addEventListener("beforeinstallprompt", (event) => {

    // Impede o navegador de decidir sozinho quando mostrar a instalação
    event.preventDefault();

    // Guarda o evento para usarmos no botão "Instalar"
    bventureEventoInstalacao = event;

    // Avisa o restante do BVenture que a instalação está disponível
    window.dispatchEvent(
        new CustomEvent("bventureInstalacaoDisponivel")
    );

});

// ======================================================
// BVenture — Instalar aplicativo
// ======================================================

async function instalarBVenture() {

    if (!bventureEventoInstalacao) {
        return false;
    }

    // Abre a janela oficial de instalação do navegador
    await bventureEventoInstalacao.prompt();

    // Aguarda a escolha do usuário
    const escolha = await bventureEventoInstalacao.userChoice;

    // O evento só pode ser utilizado uma vez
    bventureEventoInstalacao = null;

    return escolha.outcome === "accepted";

}

window.instalarBVenture = instalarBVenture;

// ======================================================
// BVenture — Identificação do dispositivo
// ======================================================

function obterPlataformaBVenture() {

    const userAgent = navigator.userAgent || "";

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

window.obterPlataformaBVenture = obterPlataformaBVenture;

// ======================================================
// BVenture — Tipo de instalação disponível
// ======================================================

function obterTipoInstalacaoBVenture() {

    // Já está aberto como aplicativo
    if (bventureEstaInstalado()) {
        return "instalado";
    }

    const plataforma = obterPlataformaBVenture();

    // iPhone/iPad utiliza orientação manual
    if (plataforma === "ios") {
        return "ios";
    }

    // Android com instalação disponível pelo navegador
    if (
        plataforma === "android" &&
        bventureEventoInstalacao
    ) {
        return "android";
    }

    // Navegador/dispositivo sem instalação disponível neste momento
    return "indisponivel";
}

window.obterTipoInstalacaoBVenture =
    obterTipoInstalacaoBVenture;