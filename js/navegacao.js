document.addEventListener("DOMContentLoaded", () => {

    const botoes =
        document.querySelectorAll(".nav-item");

    const telas =
        document.querySelectorAll(".tela");

    const appConteudo =
        document.querySelector(".app-conteudo");


    let telaAtual =
        document.querySelector(".tela.tela-ativa");


    let animacaoId = null;
    let limpezaId = null;


    /* =========================================================
       MARCAR BOTÃO ATIVO
    ========================================================= */

    function marcarBotao(destino) {

        botoes.forEach((botao) => {

            botao.classList.toggle(
                "ativo",
                botao.dataset.destino === destino
            );

        });

    }


    /* =========================================================
       LIMPAR ANIMAÇÃO ANTERIOR
    ========================================================= */

    function limparAnimacao() {

        if (animacaoId !== null) {

            cancelAnimationFrame(
                animacaoId
            );

            animacaoId = null;

        }


        if (limpezaId !== null) {

            clearTimeout(
                limpezaId
            );

            limpezaId = null;

        }

    }


    /* =========================================================
       ANIMAÇÃO DE ENTRADA
    ========================================================= */

    function animarEntrada(tela) {

        if (!tela) {
            return;
        }


        limparAnimacao();


        tela.classList.remove(
            "teste-entrada",
            "entrar-agora"
        );


        /*
           Estado inicial da animação.
        */

        tela.classList.add(
            "teste-entrada"
        );


        /*
           Espera apenas o próximo frame do navegador.

           Isso substitui o antigo setTimeout de 100ms
           e faz a animação começar praticamente
           imediatamente.
        */

        animacaoId =
            requestAnimationFrame(() => {

                animacaoId =
                    requestAnimationFrame(() => {

                        tela.classList.add(
                            "entrar-agora"
                        );


                        animacaoId =
                            null;

                    });

            });


        /*
           Limpeza depois que a animação terminar.
        */

        limpezaId =
            setTimeout(() => {

                tela.classList.remove(
                    "teste-entrada",
                    "entrar-agora"
                );


                limpezaId =
                    null;

            }, 800);

    }


    /* =========================================================
       TROCAR TELA
    ========================================================= */

    function trocarTela(destino) {

        const novaTela =
            document.querySelector(
                `.tela[data-tela="${destino}"]`
            );


        if (!novaTela) {
            return;
        }


        if (novaTela === telaAtual) {
            return;
        }


        /*
           Cancela qualquer animação que ainda
           esteja acontecendo.
        */

        limparAnimacao();


        /* remove tela anterior */

        telas.forEach((tela) => {

            tela.classList.remove(
                "tela-ativa",
                "teste-entrada",
                "entrar-agora"
            );

        });


        /* ativa nova tela imediatamente */

        novaTela.classList.add(
            "tela-ativa"
        );


        /* atualiza navegação imediatamente */

        marcarBotao(
            destino
        );


        telaAtual =
            novaTela;


        /* volta para o topo */

        if (appConteudo) {

            appConteudo.scrollTop = 0;

        }


        window.scrollTo(
            0,
            0
        );


        /* anima a nova tela */

        animarEntrada(
            novaTela
        );

    }


    /* =========================================================
       CLIQUES DA NAVEGAÇÃO
    ========================================================= */

    botoes.forEach((botao) => {

        botao.addEventListener(
            "click",
            () => {

                const destino =
                    botao.dataset.destino;


                if (!destino) {
                    return;
                }


                trocarTela(
                    destino
                );

            }
        );

    });


    /* =========================================================
       ESTADO INICIAL
    ========================================================= */

    if (telaAtual) {

        marcarBotao(
            telaAtual.dataset.tela
        );

    }


    /* =========================================================
       PRIMEIRA ENTRADA NO APP

       Login/Cadastro
             ↓
          Loading
             ↓
           Início
             ↑
       entra de baixo
    ========================================================= */

    if (telaAtual) {

        animarEntrada(
            telaAtual
        );

    }

});