/* =========================================================
   BVENTURE
   SISTEMA DE RECOMPENSAS
========================================================= */


/* =========================================================
   RECOMPENSAS DE TESTE

   Depois podemos trocar pelos benefícios
   e empresas reais.
========================================================= */

const recompensasBVenture = [

    {
        id: "recompensa-1",

        locais: 1,

        titulo: "5% de desconto",

        empresa: "Café Aventura"
    },

    {
        id: "recompensa-2",

        locais: 3,

        titulo: "Cupom de R$ 10",

        empresa: "Loja Horizonte"
    },

    {
        id: "recompensa-3",

        locais: 5,

        titulo: "Brinde exclusivo",

        empresa: "Roraima Store"
    },

    {
        id: "recompensa-4",

        locais: 8,

        titulo: "15% de desconto",

        empresa: "Sabores do Norte"
    },

    {
        id: "recompensa-5",

        locais: 12,

        titulo: "Cupom de R$ 25",

        empresa: "Boa Vista Café"
    },

    {
        id: "recompensa-6",

        locais: 20,

        titulo: "Recompensa especial",

        empresa: "Parceiro BVenture"
    }

];


/* =========================================================
   ELEMENTOS
========================================================= */

const totalLocaisRecompensas =
    document.getElementById(
        "totalLocaisRecompensas"
    );

const barraRecompensas =
    document.getElementById(
        "barraRecompensas"
    );

const textoProximaRecompensa =
    document.getElementById(
        "textoProximaRecompensa"
    );

const metaProximaRecompensa =
    document.getElementById(
        "metaProximaRecompensa"
    );

const recompensasGrid =
    document.getElementById(
        "recompensasGrid"
    );

const proximaRecompensa =
    document.getElementById(
        "proximaRecompensa"
    );

const destaqueMeta =
    document.getElementById(
        "destaqueMeta"
    );

const destaqueTitulo =
    document.getElementById(
        "destaqueTitulo"
    );

const destaqueEmpresa =
    document.getElementById(
        "destaqueEmpresa"
    );

const destaqueFalta =
    document.getElementById(
        "destaqueFalta"
    );


/* =========================================================
   ÍCONES
========================================================= */

const iconePresente = `
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
    >
        <rect
            x="3"
            y="8"
            width="18"
            height="13"
            rx="2"
        ></rect>

        <path d="M12 8v13"></path>
        <path d="M3 12h18"></path>

        <path
            d="M12 8H8.5A2.5 2.5 0 1 1 11 5.5L12 8Z"
        ></path>

        <path
            d="M12 8h3.5A2.5 2.5 0 1 0 13 5.5L12 8Z"
        ></path>
    </svg>
`;


const iconeLocal = `
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"
        ></path>

        <circle
            cx="12"
            cy="10"
            r="2"
        ></circle>
    </svg>
`;


const iconeCadeado = `
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
    >
        <rect
            x="5"
            y="10"
            width="14"
            height="10"
            rx="2"
        ></rect>

        <path
            d="M8 10V7a4 4 0 0 1 8 0v3"
        ></path>
    </svg>
`;


const iconeCheck = `
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        aria-hidden="true"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m5 12 4 4L19 6"
        ></path>
    </svg>
`;


/* =========================================================
   PEGAR LOCAIS DESBLOQUEADOS
========================================================= */

function obterLocaisBoaVista() {

    try {

        const dados =
            JSON.parse(
                localStorage.getItem(
                    "bventureLocaisBoaVista"
                )
            );


        return Array.isArray(dados)
            ? dados
            : [];

    }

    catch (erro) {

        console.warn(
            "Erro ao carregar locais de Boa Vista:",
            erro
        );


        return [];

    }

}


/* =========================================================
   TOTAL DE LOCAIS DESBLOQUEADOS

   Por enquanto temos apenas Boa Vista.

   Depois, quando adicionarmos outros municípios,
   eles serão somados aqui.
========================================================= */

function obterTotalLocaisDesbloqueados() {

    const boaVista =
        obterLocaisBoaVista();


    /*
       Set evita contar o mesmo ID
       duas vezes.
    */

    const locaisUnicos =
        new Set(
            boaVista
        );


    return locaisUnicos.size;

}


/* =========================================================
   ENCONTRAR PRÓXIMA RECOMPENSA
========================================================= */

function encontrarProximaRecompensa(
    totalLocais
) {

    return recompensasBVenture.find(
        (recompensa) =>

            totalLocais <
            recompensa.locais
    );

}


/* =========================================================
   ATUALIZAR PROGRESSO
========================================================= */

function atualizarProgressoRecompensas(
    totalLocais
) {

    if (
        totalLocaisRecompensas
    ) {

        totalLocaisRecompensas.textContent =
            totalLocais;

    }


    const proxima =
        encontrarProximaRecompensa(
            totalLocais
        );


    /* =====================================================
       TODAS AS RECOMPENSAS FORAM DESBLOQUEADAS
    ===================================================== */

    if (!proxima) {

        if (
            barraRecompensas
        ) {

            barraRecompensas.style.width =
                "100%";

        }


        if (
            textoProximaRecompensa
        ) {

            textoProximaRecompensa.textContent =
                "Todas as recompensas foram desbloqueadas!";

        }


        if (
            metaProximaRecompensa
        ) {

            metaProximaRecompensa.textContent =
                `${totalLocais} locais`;

        }


        if (
            proximaRecompensa
        ) {

            proximaRecompensa.style.display =
                "none";

        }


        return;

    }


    /* =====================================================
       PROGRESSO ENTRE UMA RECOMPENSA E OUTRA
    ===================================================== */

    const recompensasAnteriores =
        recompensasBVenture.filter(
            (recompensa) =>

                recompensa.locais <=
                totalLocais
        );


    const ultimaDesbloqueada =
        recompensasAnteriores.length > 0

            ? recompensasAnteriores[
                recompensasAnteriores.length - 1
            ].locais

            : 0;


    const intervalo =
        proxima.locais -
        ultimaDesbloqueada;


    const progressoAtual =
        totalLocais -
        ultimaDesbloqueada;


    const porcentagem =
        intervalo > 0

            ? Math.min(
                100,
                Math.max(
                    0,
                    (
                        progressoAtual /
                        intervalo
                    ) * 100
                )
            )

            : 100;


    if (
        barraRecompensas
    ) {

        barraRecompensas.style.width =
            `${porcentagem}%`;

    }


    const faltam =
        proxima.locais -
        totalLocais;


    if (
        textoProximaRecompensa
    ) {

        textoProximaRecompensa.textContent =
            faltam === 1
                ? "Falta 1 local para a próxima recompensa"
                : `Faltam ${faltam} locais para a próxima recompensa`;

    }


    if (
        metaProximaRecompensa
    ) {

        metaProximaRecompensa.textContent =
            `${totalLocais} / ${proxima.locais}`;

    }

}


/* =========================================================
   ATUALIZAR RECOMPENSA EM DESTAQUE
========================================================= */

function atualizarDestaque(
    totalLocais
) {

    const proxima =
        encontrarProximaRecompensa(
            totalLocais
        );


    if (!proxima) {

        if (
            proximaRecompensa
        ) {

            proximaRecompensa.style.display =
                "none";

        }


        return;

    }


    if (
        proximaRecompensa
    ) {

        proximaRecompensa.style.display =
            "";

    }


    const faltam =
        proxima.locais -
        totalLocais;


    if (
        destaqueMeta
    ) {

        destaqueMeta.textContent =
            proxima.locais === 1

                ? "1 local"

                : `${proxima.locais} locais`;

    }


    if (
        destaqueTitulo
    ) {

        destaqueTitulo.textContent =
            proxima.titulo;

    }


    if (
        destaqueEmpresa
    ) {

        destaqueEmpresa.textContent =
            proxima.empresa;

    }


    if (
        destaqueFalta
    ) {

        destaqueFalta.textContent =
            faltam === 1

                ? "Falta 1 local"

                : `Faltam ${faltam} locais`;

    }

}


/* =========================================================
   CRIAR CARD
========================================================= */

function criarCardRecompensa(
    recompensa,
    totalLocais
) {

    const desbloqueada =
        totalLocais >=
        recompensa.locais;


    const faltam =
        Math.max(
            0,
            recompensa.locais -
            totalLocais
        );


    const card =
        document.createElement(
            "article"
        );


    card.className =
        `recompensa-card ${
            desbloqueada
                ? "desbloqueada"
                : "bloqueada"
        }`;


    const textoMeta =
        recompensa.locais === 1

            ? "1 local"

            : `${recompensa.locais} locais`;


    let status;


    if (desbloqueada) {

        status = `
            <div class="recompensa-status">
                ${iconeCheck}
                <span>
                    Desbloqueada
                </span>
            </div>
        `;

    }

    else {

        const textoFalta =
            faltam === 1

                ? "Falta 1 local"

                : `Faltam ${faltam} locais`;


        status = `
            <div class="recompensa-status">
                ${iconeCadeado}
                <span>
                    ${textoFalta}
                </span>
            </div>
        `;

    }


    card.innerHTML = `

        <div class="recompensa-card-topo">

            <div class="recompensa-card-icone">
                ${iconePresente}
            </div>


            <div class="recompensa-card-meta">

                ${iconeLocal}

                <span>
                    ${textoMeta}
                </span>

            </div>

        </div>


        <h3>
            ${recompensa.titulo}
        </h3>


        <p class="recompensa-empresa">
            ${recompensa.empresa}
        </p>


        ${status}

    `;


    return card;

}


/* =========================================================
   RENDERIZAR RECOMPENSAS
========================================================= */

function renderizarRecompensas(
    totalLocais
) {

    if (
        !recompensasGrid
    ) {
        return;
    }


    recompensasGrid.innerHTML =
        "";


    recompensasBVenture.forEach(
        (recompensa) => {

            const card =
                criarCardRecompensa(
                    recompensa,
                    totalLocais
                );


            recompensasGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   ATUALIZAR TELA COMPLETA
========================================================= */

function atualizarTelaRecompensas() {

    const totalLocais =
        obterTotalLocaisDesbloqueados();


    atualizarProgressoRecompensas(
        totalLocais
    );


    atualizarDestaque(
        totalLocais
    );


    renderizarRecompensas(
        totalLocais
    );

}


/* =========================================================
   INICIAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarTelaRecompensas();

    }
);


/* =========================================================
   ATUALIZAR QUANDO O JOGADOR VOLTAR PARA A PÁGINA
========================================================= */

window.addEventListener(
    "pageshow",
    () => {

        atualizarTelaRecompensas();

    }
);