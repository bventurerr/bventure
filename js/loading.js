/* =========================================================
   BVENTURE
   COMPONENTE DE CARREGAMENTO
========================================================= */


/* =========================================================
   TEXTO DO LOADING
========================================================= */

function obterTextoLoading() {

    const idioma =
        localStorage.getItem(
            "bventureIdioma"
        );

    if (
        idioma === "en"
    ) {

        return "Loading...";

    }

    if (
        idioma === "es"
    ) {

        return "Cargando...";

    }

    return "Carregando...";
}


/* =========================================================
   CRIAR LOADING
========================================================= */

function criarLoading() {

    if (
        document.getElementById(
            "bventureLoading"
        )
    ) {

        return;

    }


    const loading =
        document.createElement(
            "div"
        );


    loading.id =
        "bventureLoading";

    loading.className =
        "bventure-loading";


    loading.setAttribute(
        "aria-hidden",
        "true"
    );


    loading.innerHTML = `

        <div class="loading-conteudo">

            <div
                class="loading-bolinhas"
                aria-hidden="true"
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <p class="loading-texto">
                ${obterTextoLoading()}
            </p>

        </div>

    `;


    document.body.appendChild(
        loading
    );

}


/* =========================================================
   MOSTRAR LOADING
========================================================= */

function mostrarLoading(
    mensagem = null
) {

    criarLoading();


    const loading =
        document.getElementById(
            "bventureLoading"
        );


    if (
        !loading
    ) {

        return;

    }


    /* =====================================================
       ATUALIZAR TEXTO
    ===================================================== */

    const texto =
        loading.querySelector(
            ".loading-texto"
        );


    if (
        texto
    ) {

        texto.textContent =
            mensagem
                ? t(mensagem)
                : obterTextoLoading();

    }


    /* =====================================================
       MOSTRAR
    ===================================================== */

    loading.classList.add(
        "ativo"
    );


    loading.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   ALTERAR MENSAGEM DO LOADING
========================================================= */

function alterarMensagemLoading(
    mensagem
) {

    const loading =
        document.getElementById(
            "bventureLoading"
        );


    if (
        !loading
    ) {

        return;

    }


    const texto =
        loading.querySelector(
            ".loading-texto"
        );


    if (
        !texto ||
        !mensagem
    ) {

        return;

    }


    texto.textContent =
        t(mensagem);

}


/* =========================================================
   ESCONDER LOADING
========================================================= */

function esconderLoading() {

    const loading =
        document.getElementById(
            "bventureLoading"
        );


    if (
        !loading
    ) {

        return;

    }


    loading.classList.remove(
        "ativo"
    );


    loading.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   INICIAR
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        criarLoading
    );

}
else {

    criarLoading();

}

/* =========================================================
   CORRIGIR LOADING AO VOLTAR PELO CELULAR / NAVEGADOR
========================================================= */

window.addEventListener(
    "pageshow",
    () => {

        esconderLoading();

    }
);