import {
    auth,
    db
} from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";


/* =========================================================
   BVENTURE
   INÍCIO
========================================================= */

"use strict";


/* =========================================================
   ELEMENTOS
========================================================= */

const nomeJogador =
    document.getElementById(
        "nomeJogador"
    );


const porcentagemExploracao =
    document.getElementById(
        "porcentagemExploracao"
    );


const estatisticaExploracao =
    document.getElementById(
        "estatisticaExploracao"
    );


const estatisticaLocais =
    document.getElementById(
        "estatisticaLocais"
    );


const estatisticaMissoes =
    document.getElementById(
        "estatisticaMissoes"
    );


const estatisticaRecompensas =
    document.getElementById(
        "estatisticaRecompensas"
    );


/* =========================================================
   MUNICÍPIOS
========================================================= */

const botoesMunicipios =
    document.querySelectorAll(
        ".municipio-progresso"
    );


const TOTAL_MUNICIPIOS_RORAIMA = 15;


/* =========================================================
   DADOS PADRÃO
========================================================= */

const jogadorPadrao = {

    nome:
        "Explorador",

    nick:
        "",

    idade:
        null,

    sexo:
        "",

    avatar:
        null,

    locaisDesbloqueados:
        0,

    missoesExtrasConcluidas:
        0,

    recompensasObtidas:
        0,

    exploracaoRoraima:
        0,

    progressoMunicipios: {

        "amajari": 0,

        "alto-alegre": 0,

        "pacaraima": 0,

        "uiramuta": 0,

        "boa-vista": 0,

        "canta": 0,

        "bonfim": 0,

        "mucajai": 0,

        "iracema": 0,

        "caracarai": 0,

        "caroebe": 0,

        "sao-joao-da-baliza": 0,

        "sao-luiz": 0,

        "rorainopolis": 0,

        "normandia": 0

    }

};


/* =========================================================
   CARREGAR JOGADOR
========================================================= */

function carregarJogador() {

    const jogadorSalvo =
        localStorage.getItem(
            "bventureJogador"
        );


    if (
        !jogadorSalvo
    ) {

        return {
            ...jogadorPadrao
        };

    }


    try {

        const dados =
            JSON.parse(
                jogadorSalvo
            );


        return {

            ...jogadorPadrao,

            ...dados,

            progressoMunicipios: {

                ...jogadorPadrao
                    .progressoMunicipios,

                ...(
                    dados
                        .progressoMunicipios ||
                    {}
                )

            }

        };

    }

    catch (
        erro
    ) {

        console.error(
            "BVenture: não foi possível carregar o jogador.",
            erro
        );


        return {
            ...jogadorPadrao
        };

    }

}


/* =========================================================
   PROGRESSO DA CONTA
========================================================= */

let locaisDesbloqueadosFirebase = [];

let missoesExtrasConcluidasFirebase = [];


/* =========================================================
   OBTER LOCAIS DE BOA VISTA
========================================================= */

function obterLocaisBoaVista() {

    return locaisDesbloqueadosFirebase;

}


/* =========================================================
   OBTER MISSÕES EXTRAS CONCLUÍDAS
========================================================= */

function obterMissoesExtrasConcluidas() {

    return missoesExtrasConcluidasFirebase;

}


/* =========================================================
   FIREBASE — CARREGAR PROGRESSO
========================================================= */

async function carregarLocaisBoaVistaFirebase() {

    return new Promise(
        (resolve) => {

            const pararObservacao =
                onAuthStateChanged(
                    auth,
                    async (usuario) => {

                        pararObservacao();


                        /* =========================================
                           NENHUM USUÁRIO LOGADO
                        ========================================= */

                        if (!usuario) {

                            locaisDesbloqueadosFirebase =
                                [];

                            missoesExtrasConcluidasFirebase =
                                [];

                            resolve();

                            return;

                        }


                        /* =========================================
                           CARREGAR PROGRESSO DO FIRESTORE
                        ========================================= */

                        try {

                            const referenciaUsuario =
                                doc(
                                    db,
                                    "usuarios",
                                    usuario.uid
                                );


                            const documentoUsuario =
                                await getDoc(
                                    referenciaUsuario
                                );


                            if (!documentoUsuario.exists()) {

                                locaisDesbloqueadosFirebase =
                                    [];

                                missoesExtrasConcluidasFirebase =
                                    [];

                                resolve();

                                return;

                            }


                            const dados =
                                documentoUsuario.data();


                            /* =====================================
                               LOCAIS DESBLOQUEADOS
                            ===================================== */

                            locaisDesbloqueadosFirebase =
                                Array.isArray(
                                    dados.locaisDesbloqueados
                                )
                                    ? [
                                        ...new Set(
                                            dados.locaisDesbloqueados
                                        )
                                    ]
                                    : [];


                            /* =====================================
                               MISSÕES EXTRAS CONCLUÍDAS
                            ===================================== */

                            missoesExtrasConcluidasFirebase =
                                Array.isArray(
                                    dados.missoesExtrasConcluidas
                                )
                                    ? [
                                        ...new Set(
                                            dados.missoesExtrasConcluidas
                                        )
                                    ]
                                    : [];


                            console.log(
                                "Locais de Boa Vista carregados:",
                                locaisDesbloqueadosFirebase
                            );


                            console.log(
                                "Missões extras concluídas carregadas:",
                                missoesExtrasConcluidasFirebase
                            );

                        }

                        catch (erro) {

                            console.error(
                                "BVenture: não foi possível carregar o progresso da conta.",
                                erro
                            );


                            locaisDesbloqueadosFirebase =
                                [];

                            missoesExtrasConcluidasFirebase =
                                [];

                        }


                        resolve();

                    }
                );

        }
    );

}


/* =========================================================
   TOTAL DE LOCAIS DE BOA VISTA
========================================================= */

function obterTotalLocaisBoaVista() {

    /*
       Se locais.js estiver carregado,
       usamos automaticamente a quantidade real.
    */

    if (
        typeof pontosTuristicos !==
            "undefined" &&
        Array.isArray(
            pontosTuristicos
        )
    ) {

        return pontosTuristicos.length;

    }


    /*
       Fallback atual.
    */

    return 22;

}


/* =========================================================
   NICK DO JOGADOR
========================================================= */

function obterNickJogador(
    nick
) {

    if (
        typeof nick !== "string" ||
        !nick.trim()
    ) {

        return "Explorador";

    }


    return nick.trim();

}


/* =========================================================
   LIMITAR PORCENTAGEM
========================================================= */

function limitarPorcentagem(
    valor
) {

    const numero =
        Number(
            valor
        ) || 0;


    return Math.min(
        100,
        Math.max(
            0,
            Math.round(
                numero
            )
        )
    );

}


/* =========================================================
   PROGRESSO DE BOA VISTA
========================================================= */

function calcularProgressoBoaVista() {

    const locais =
        obterLocaisBoaVista();


    const total =
        obterTotalLocaisBoaVista();


    if (
        total <= 0
    ) {

        return 0;

    }


    const quantidade =
        Math.min(
            locais.length,
            total
        );


    return limitarPorcentagem(
        (
            quantidade /
            total
        ) * 100
    );

}


/* =========================================================
   EXPLORAÇÃO TOTAL DE RORAIMA

   Cada município representa uma parte do progresso geral.

   Neste momento apenas Boa Vista possui exploração ativa.
========================================================= */

function calcularExploracaoRoraima(
    jogador
) {

    let somaProgressos =
        0;


    const progressos = {

        ...jogador
            .progressoMunicipios,

        "boa-vista":
            calcularProgressoBoaVista()

    };


    Object.values(
        progressos
    )
        .forEach(
            (
                progresso
            ) => {

                somaProgressos +=
                    limitarPorcentagem(
                        progresso
                    );

            }
        );


    return limitarPorcentagem(
        somaProgressos /
        TOTAL_MUNICIPIOS_RORAIMA
    );

}


/* =========================================================
   ATUALIZAR DADOS DO TOPO
========================================================= */

function atualizarCabecalho(
    jogador
) {

    if (
        nomeJogador
    ) {

        /*
           O nome exibido na tela inicial
           é o NICK escolhido pelo jogador.
        */

        nomeJogador.textContent =
            obterNickJogador(
                jogador.nick
            );

    }

}


/* =========================================================
   ATUALIZAR ESTATÍSTICAS
========================================================= */

function atualizarEstatisticas(
    jogador
) {

    const locaisBoaVista =
        obterLocaisBoaVista();


    const quantidadeLocais =
        locaisBoaVista.length;


    const missoesExtras =
        obterMissoesExtrasConcluidas();


    const quantidadeMissoesExtras =
        missoesExtras.length;


    const exploracao =
        calcularExploracaoRoraima(
            jogador
        );


    /* =====================================================
       EXPLORAÇÃO DE RORAIMA
    ===================================================== */

    if (
        porcentagemExploracao
    ) {

        porcentagemExploracao
            .textContent =
            `${exploracao}%`;

    }


    if (
        estatisticaExploracao
    ) {

        estatisticaExploracao
            .textContent =
            `${exploracao}%`;

    }


    /* =====================================================
       LOCAIS DESBLOQUEADOS
    ===================================================== */

    if (
        estatisticaLocais
    ) {

        estatisticaLocais
            .textContent =
            quantidadeLocais;

    }


    /* =====================================================
       MISSÕES EXTRAS
    ===================================================== */

    if (
        estatisticaMissoes
    ) {

        estatisticaMissoes
            .textContent =
            quantidadeMissoesExtras;

    }


    /* =====================================================
       RECOMPENSAS
    ===================================================== */

    if (
        estatisticaRecompensas
    ) {

        estatisticaRecompensas
            .textContent =
            Number(
                jogador
                    .recompensasObtidas
            ) || 0;

    }

}


/* =========================================================
   ATUALIZAR MUNICÍPIOS
========================================================= */

function atualizarMunicipios(
    jogador
) {

    const progressoBoaVista =
        calcularProgressoBoaVista();


    botoesMunicipios.forEach(
        (
            botao
        ) => {

            const municipio =
                botao.dataset
                    .municipio;


            let progresso;


            /*
               Boa Vista usa os dados reais
               dos locais desbloqueados.
            */

            if (
                municipio ===
                "boa-vista"
            ) {

                progresso =
                    progressoBoaVista;

            }

            else {

                progresso =
                    limitarPorcentagem(
                        jogador
                            .progressoMunicipios[
                                municipio
                            ]
                    );

            }


            const texto =
                botao.querySelector(
                    "span"
                );


            if (
                texto
            ) {

                texto.textContent =
                    `${progresso}%`;

            }


            botao.setAttribute(
                "aria-label",
                `${municipio} - ${progresso}% explorado`
            );

        }
    );

}


/* =========================================================
   ABRIR MAPA COM LOADING
========================================================= */

function abrirMapaComLoading() {

    if (
        typeof mostrarLoading ===
        "function"
    ) {

        mostrarLoading();

    }


    setTimeout(
        () => {

            window.location.href =
                "mapa.html";

        },
        500
    );

}


/* =========================================================
   CLIQUE NOS MUNICÍPIOS
========================================================= */

function configurarMunicipios() {

    botoesMunicipios.forEach(
        (
            botao
        ) => {

            botao.addEventListener(
                "click",
                () => {

                    const municipio =
                        botao.dataset
                            .municipio;


                    /* =====================================
                       MUNICÍPIO BLOQUEADO
                    ===================================== */

                    if (
                        botao.classList
                            .contains(
                                "bloqueado"
                            )
                    ) {

                        console.log(
                            `${municipio} ainda está bloqueado.`
                        );


                        return;

                    }


                    /* =====================================
                       BOA VISTA
                    ===================================== */

                    if (
                        municipio ===
                        "boa-vista"
                    ) {

                        abrirMapaComLoading();

                    }

                }
            );

        }
    );

}


/* =========================================================
   INICIAR PÁGINA
========================================================= */

async function iniciarInicio() {

    const jogador =
        carregarJogador();


    /* =====================================================
       AGUARDAR PROGRESSO DA CONTA
    ===================================================== */

    await carregarLocaisBoaVistaFirebase();


    /* =====================================================
       ATUALIZAR INTERFACE
    ===================================================== */

    atualizarCabecalho(
        jogador
    );


    atualizarEstatisticas(
        jogador
    );


    atualizarMunicipios(
        jogador
    );


    configurarMunicipios();

}


/* =========================================================
   INICIAR
========================================================= */

iniciarInicio();