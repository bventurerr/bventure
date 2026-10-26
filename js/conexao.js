/* =========================================================
   BVENTURE
   SISTEMA GLOBAL DE CONEXÃO
========================================================= */

"use strict";


/* =========================================================
   CRIAR POP-UP
========================================================= */

function criarPopupConexao() {

    /* Evita criar duas vezes */

    if (
        document.getElementById(
            "conexaoOverlay"
        )
    ) {
        return;
    }


    const overlay =
        document.createElement("div");

    overlay.id =
        "conexaoOverlay";

    overlay.className =
        "conexao-overlay";


    overlay.innerHTML = `

        <div
            class="conexao-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="conexaoTitulo"
        >

            <div class="conexao-icone-area">

                <svg
                    id="conexaoIcone"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.5 16.5a5 5 0 0 1 7 0"
                    />

                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13a10 10 0 0 1 14 0"
                    />

                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2 9.5a14.5 14.5 0 0 1 20 0"
                    />

                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 20h.01"
                    />

                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 4 20 20"
                    />
                </svg>

            </div>


            <h2
                class="conexao-titulo"
                id="conexaoTitulo"
            >
                Sem conexão
            </h2>


            <p
                class="conexao-texto"
                id="conexaoTexto"
            >
                Parece que você está sem internet.
                Verifique sua conexão para continuar explorando.
            </p>


            <button
                type="button"
                class="conexao-botao"
                id="conexaoTentar"
            >
                Tentar novamente
            </button>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    /* BOTÃO TENTAR NOVAMENTE */

    const botaoTentar =
        document.getElementById(
            "conexaoTentar"
        );


    botaoTentar?.addEventListener(
        "click",
        () => {

            verificarConexao();

        }
    );

}


/* =========================================================
   MOSTRAR SEM CONEXÃO
========================================================= */

function mostrarSemConexao() {

    criarPopupConexao();


    const overlay =
        document.getElementById(
            "conexaoOverlay"
        );

    const titulo =
        document.getElementById(
            "conexaoTitulo"
        );

    const texto =
        document.getElementById(
            "conexaoTexto"
        );


    if (!overlay) {
        return;
    }


    overlay.classList.remove(
        "restaurada"
    );


    if (titulo) {

        titulo.textContent =
            "Sem conexão";

    }


    if (texto) {

        texto.textContent =
            "Parece que você está sem internet. Verifique sua conexão para continuar explorando.";

    }


    overlay.classList.add(
        "ativo"
    );

}


/* =========================================================
   CONEXÃO RESTAURADA
========================================================= */

function mostrarConexaoRestaurada() {

    const overlay =
        document.getElementById(
            "conexaoOverlay"
        );

    const titulo =
        document.getElementById(
            "conexaoTitulo"
        );

    const texto =
        document.getElementById(
            "conexaoTexto"
        );

    const icone =
        document.getElementById(
            "conexaoIcone"
        );


    if (!overlay) {
        return;
    }


    overlay.classList.add(
        "restaurada"
    );


    if (titulo) {

        titulo.textContent =
            "Conexão restaurada!";

    }


    if (texto) {

        texto.textContent =
            "Tudo certo. Você já pode continuar sua aventura.";

    }


    /*
        Troca o Wi-Fi por um check.
    */

    if (icone) {

        icone.innerHTML = `

            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m5 12 4 4L19 6"
            />

        `;

    }


    /*
        Fecha automaticamente.
    */

    setTimeout(
        () => {

            overlay.classList.remove(
                "ativo"
            );


            setTimeout(
                () => {

                    overlay.classList.remove(
                        "restaurada"
                    );

                },
                300
            );

        },
        1800
    );

}


/* =========================================================
   VERIFICAR CONEXÃO
========================================================= */

function verificarConexao() {

    if (navigator.onLine) {

        mostrarConexaoRestaurada();

    }
    else {

        mostrarSemConexao();

    }

}


/* =========================================================
   EVENTOS DO NAVEGADOR
========================================================= */

window.addEventListener(
    "offline",
    () => {

        mostrarSemConexao();

    }
);


window.addEventListener(
    "online",
    () => {

        mostrarConexaoRestaurada();

    }
);


/* =========================================================
   INICIAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        criarPopupConexao();


        /*
            Se a página já abrir sem internet,
            mostra o aviso imediatamente.
        */

        if (!navigator.onLine) {

            mostrarSemConexao();

        }

    }
);