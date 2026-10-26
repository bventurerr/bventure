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

        telaAndroid.hidden = true;
        telaIOS.hidden = true;
        telaIndisponivel.hidden = true;

    }


    // ==================================================
    // IR PARA O LOGIN
    // ==================================================

    function continuarBVenture() {

        window.location.replace("./login.html");

    }


    // ==================================================
    // VERIFICAR INSTALAÇÃO
    // ==================================================

    function verificarInstalacao() {

        esconderTelas();

        const tipo =
            window.obterTipoInstalacaoBVenture();

        // Já está instalado
        if (tipo === "instalado") {

            continuarBVenture();
            return;

        }


        // iPhone / iPad
        if (tipo === "ios") {

            telaIOS.hidden = false;
            return;

        }


        // Android com instalação disponível
        if (tipo === "android") {

            telaAndroid.hidden = false;
            return;

        }


        // Outro navegador / computador
        telaIndisponivel.hidden = false;

    }


    // ==================================================
    // BOTÃO — INSTALAR NO ANDROID
    // ==================================================

    botaoInstalar.addEventListener("click", async () => {

        const instalado =
            await window.instalarBVenture();

        if (instalado) {

            esconderTelas();

            telaConcluida.hidden = false;

        }

    });


    // ==================================================
    // BOTÕES — CONTINUAR
    // ==================================================

    botaoContinuarIOS.addEventListener(
        "click",
        continuarBVenture
    );

    botaoContinuar.addEventListener(
        "click",
        continuarBVenture
    );


    // ==================================================
    // EVENTO — INSTALAÇÃO FICOU DISPONÍVEL
    // ==================================================

    window.addEventListener(
        "bventureInstalacaoDisponivel",
        verificarInstalacao
    );


    // Primeira verificação
    verificarInstalacao();

});