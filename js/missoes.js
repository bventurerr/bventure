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
   MISSÕES
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           BOTÃO — EXPLORAR BOA VISTA
        ================================================= */

        const botaoExplorarBoaVista =
            document.getElementById(
                "explorarBoaVista"
            );


        if (
            botaoExplorarBoaVista
        ) {

            botaoExplorarBoaVista
                .addEventListener(
                    "click",
                    () => {


                        /* =================================
                           EVITAR CLIQUES DUPLOS
                        ================================= */

                        botaoExplorarBoaVista.disabled =
                            true;


                        /* =================================
                           MOSTRAR LOADING
                        ================================= */

                        if (
                            typeof mostrarLoading ===
                            "function"
                        ) {

                            mostrarLoading();

                        }


                        /* =================================
                           ENTRAR NO MAPA
                        ================================= */

                        setTimeout(
                            () => {

                                window.location.href =
                                    "mapa.html";

                            },
                            700
                        );

                    }
                );

        }


        /* =================================================
           PROGRESSO DE BOA VISTA
        ================================================= */

        const progressoTexto =
            document.getElementById(
                "progressoBoaVista"
            );


        const progressoBarra =
            document.getElementById(
                "barraBoaVista"
            );


        /* =================================================
           LOCAIS DESBLOQUEADOS DA CONTA
        ================================================= */

        let locaisDesbloqueadosFirebase =
            [];


        /* =================================================
           CARREGAR LOCAIS DO FIREBASE
        ================================================= */

        async function carregarLocaisDesbloqueadosFirebase() {

            return new Promise(
                (resolve) => {

                    const pararObservacao =
                        onAuthStateChanged(
                            auth,
                            async (usuario) => {

                                pararObservacao();


                                if (!usuario) {

                                    locaisDesbloqueadosFirebase =
                                        [];

                                    resolve();

                                    return;

                                }


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

                                        resolve();

                                        return;

                                    }


                                    const dados =
                                        documentoUsuario.data();


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


                                    console.log(
                                        "Progresso de Boa Vista carregado:",
                                        locaisDesbloqueadosFirebase
                                    );

                                }

                                catch (erro) {

                                    console.error(
                                        "BVenture: erro ao carregar progresso de Boa Vista.",
                                        erro
                                    );


                                    locaisDesbloqueadosFirebase =
                                        [];

                                }


                                resolve();

                            }
                        );

                }
            );

        }


        /* =================================================
           OBTER LOCAIS DESBLOQUEADOS
        ================================================= */

        function obterLocaisDesbloqueados() {

            return locaisDesbloqueadosFirebase;

        }


        /* =================================================
           TOTAL DE LOCAIS
        ================================================= */

        function obterTotalLocais() {

            /*
               Se locais.js estiver carregado,
               usamos automaticamente a quantidade
               real de pontos turísticos.
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
               Segurança temporária.

               Atualmente Boa Vista possui
               22 pontos de exploração.
            */

            return 22;

        }


        /* =================================================
           ATUALIZAR PROGRESSO
        ================================================= */

        function atualizarProgressoBoaVista() {

            const totalLocais =
                obterTotalLocais();


            const locaisDesbloqueados =
                obterLocaisDesbloqueados();


            /*
               Evita contar IDs repetidos.
            */

            const locaisUnicos =
                [
                    ...new Set(
                        locaisDesbloqueados
                    )
                ];


            const quantidade =
                Math.min(
                    locaisUnicos.length,
                    totalLocais
                );


            let porcentagem =
                0;


            if (
                totalLocais > 0
            ) {

                porcentagem =
                    Math.round(
                        (
                            quantidade /
                            totalLocais
                        ) * 100
                    );

            }


            porcentagem =
                Math.min(
                    100,
                    Math.max(
                        0,
                        porcentagem
                    )
                );


            /* =============================================
               TEXTO
            ============================================= */

            if (
                progressoTexto
            ) {

                progressoTexto.textContent =
                    `${porcentagem}%`;

            }


            /* =============================================
               BARRA
            ============================================= */

            if (
                progressoBarra
            ) {

                progressoBarra.style.width =
                    `${porcentagem}%`;

            }

        }


        /* =================================================
           INICIALIZAÇÃO
        ================================================= */

        async function iniciarMissoes() {

            await carregarLocaisDesbloqueadosFirebase();

            atualizarProgressoBoaVista();

        }


        iniciarMissoes();

    }
);