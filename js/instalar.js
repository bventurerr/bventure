// ======================================================
// BVenture — Tela de instalação
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const telaAndroid =
        document.getElementById("instalacao-android");

    const telaIOS =
        document.getElementById("instalacao-ios");

    const telaIndisponivel =
        document.getElementById("instalacao-indisponivel");

    const telaConcluida =
        document.getElementById("instalacao-concluida");

    const botaoInstalar =
        document.getElementById("botao-instalar");

    const botaoContinuarIOS =
        document.getElementById("botao-continuar-ios");

    const botaoContinuar =
        document.getElementById("botao-continuar");


    // ==================================================
    // ESCONDER TODAS AS TELAS
    // ==================================================

    function esconderTelas() {

        if (telaAndroid) {
            telaAndroid.hidden = true;
        }

        if (telaIOS) {
            telaIOS.hidden = true;
        }

        if (telaIndisponivel) {
            telaIndisponivel.hidden = true;
        }

        if (telaConcluida) {
            telaConcluida.hidden = true;
        }

    }


    // ==================================================
    // IR PARA O LOGIN
    //
    // Só pode acontecer quando o BVenture estiver
    // realmente aberto como aplicativo instalado.
    // ==================================================

    function continuarBVenture() {

        if (window.bventureEstaInstalado()) {

            window.location.replace(
                "./login.html"
            );

        }

    }


    // ==================================================
    // MOSTRAR INSTALAÇÃO CONCLUÍDA
    // ==================================================

    function mostrarInstalacaoConcluida() {

        esconderTelas();

        if (telaConcluida) {

            telaConcluida.hidden = false;

            return;

        }

        // Caso a seção ainda não exista no HTML,
        // mantém a tela do Android em vez de abrir
        // o jogo pelo navegador.

        if (telaAndroid) {
            telaAndroid.hidden = false;
        }

    }


    // ==================================================
    // VERIFICAR INSTALAÇÃO
    // ==================================================

    function verificarInstalacao() {

        esconderTelas();

        // ------------------------------------------------
        // Se foi aberto pelo ícone do PWA,
        // entra normalmente no BVenture.
        // ------------------------------------------------

        if (window.bventureEstaInstalado()) {

            continuarBVenture();

            return;

        }


        const tipo =
            window.obterTipoInstalacaoBVenture();


        // ------------------------------------------------
        // iPhone / iPad
        // ------------------------------------------------

        if (tipo === "ios") {

            if (telaIOS) {
                telaIOS.hidden = false;
            }

            return;

        }


        // ------------------------------------------------
        // Android
        // ------------------------------------------------

        if (tipo === "android") {

            if (telaAndroid) {
                telaAndroid.hidden = false;
            }

            return;

        }


        // ------------------------------------------------
        // Computador / navegador sem instalação disponível
        // ------------------------------------------------

        if (telaIndisponivel) {
            telaIndisponivel.hidden = false;
        }

    }


    // ==================================================
    // BOTÃO — INSTALAR NO ANDROID
    // ==================================================

    if (botaoInstalar) {

        botaoInstalar.addEventListener(
            "click",
            async () => {

                const instalado =
                    await window.instalarBVenture();

                // IMPORTANTE:
                // Mesmo depois da instalação,
                // NÃO abre o login nesta aba do navegador.

                if (instalado) {

                    mostrarInstalacaoConcluida();

                }

            }
        );

    }


    // ==================================================
    // BOTÃO — ENTENDI (iPHONE / iPAD)
    // ==================================================

    if (botaoContinuarIOS) {

        botaoContinuarIOS.addEventListener(
            "click",
            () => {

                // Não entra no jogo pelo Safari.
                // O usuário deve abrir o BVenture
                // pela Tela de Início.

                verificarInstalacao();

            }
        );

    }


    // ==================================================
    // BOTÃO — NAVEGADOR NÃO COMPATÍVEL
    // ==================================================

    if (botaoContinuar) {

        botaoContinuar.addEventListener(
            "click",
            () => {

                // Não libera o jogo pelo navegador.
                verificarInstalacao();

            }
        );

    }


    // ==================================================
    // EVENTO — INSTALAÇÃO FICOU DISPONÍVEL
    // ==================================================

    window.addEventListener(
        "bventureInstalacaoDisponivel",
        verificarInstalacao
    );


    // ==================================================
    // PRIMEIRA VERIFICAÇÃO
    // ==================================================

    verificarInstalacao();

});