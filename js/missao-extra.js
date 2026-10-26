import {
    auth,
    db
} from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

/* =========================================================
   BVENTURE
   MISSÕES EXTRAS
========================================================= */

"use strict";


/* =========================================================
   CONFIGURAÇÕES
========================================================= */


/* =========================================================
   SUPABASE

   IMPORTANTE:
   Cole abaixo SOMENTE a Publishable Key do Supabase.

   NÃO coloque a GROQ_API_KEY aqui.
========================================================= */

const SUPABASE_URL =
    "https://mnwbiwilpoihjhizctsn.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_L8wXC0r2mUw45e-uRohduQ_JmoJ7gPh";


const URL_ANALISAR_MISSAO =
    `${SUPABASE_URL}/functions/v1/analisar-missao`;


/* =========================================================
   ELEMENTOS DA PÁGINA
========================================================= */

const voltarMissaoExtra =
    document.getElementById(
        "voltarMissaoExtra"
    );


const missaoExtraLocalNome =
    document.getElementById(
        "missaoExtraLocalNome"
    );


const missaoExtraTitulo =
    document.getElementById(
        "missaoExtraTitulo"
    );


const missaoExtraInstrucao =
    document.getElementById(
        "missaoExtraInstrucao"
    );


/* =========================================================
   FOTO
========================================================= */

const cameraMissao =
    document.getElementById(
        "cameraMissao"
    );


const tirarFotoMissao =
    document.getElementById(
        "tirarFotoMissao"
    );


const tirarFotoNovamente =
    document.getElementById(
        "tirarFotoNovamente"
    );


const enviarFotoMissao =
    document.getElementById(
        "enviarFotoMissao"
    );


const missaoFotoVazia =
    document.getElementById(
        "missaoFotoVazia"
    );


const missaoFotoPreview =
    document.getElementById(
        "missaoFotoPreview"
    );


const missaoAnalisando =
    document.getElementById(
        "missaoAnalisando"
    );


/* =========================================================
   POPUP — APROVADO
========================================================= */

const missaoAprovadaModal =
    document.getElementById(
        "missaoAprovadaModal"
    );


const missaoAprovadaTexto =
    document.getElementById(
        "missaoAprovadaTexto"
    );


const continuarMissaoAprovada =
    document.getElementById(
        "continuarMissaoAprovada"
    );


/* =========================================================
   POPUP — REPROVADO
========================================================= */

const missaoReprovadaModal =
    document.getElementById(
        "missaoReprovadaModal"
    );


const missaoReprovadaTexto =
    document.getElementById(
        "missaoReprovadaTexto"
    );


const tentarNovamenteMissao =
    document.getElementById(
        "tentarNovamenteMissao"
    );


/* =========================================================
   POPUP — ERRO DE ANÁLISE
========================================================= */

const missaoErroModal =
    document.getElementById(
        "missaoErroModal"
    );


const missaoErroTexto =
    document.getElementById(
        "missaoErroTexto"
    );


const tentarAnaliseNovamente =
    document.getElementById(
        "tentarAnaliseNovamente"
    );


/* =========================================================
   ESTADO DA MISSÃO
========================================================= */

let localAtual = null;

let arquivoFotoAtual = null;

let urlFotoAtual = null;

let analisandoImagem = false;

/* =========================================================
   FIREBASE — OBTER USUÁRIO AUTENTICADO
========================================================= */

async function obterUsuarioAutenticado() {

    return new Promise(
        (resolve) => {

            const pararObservacao =
                onAuthStateChanged(
                    auth,
                    (usuario) => {

                        pararObservacao();

                        resolve(
                            usuario
                        );

                    }
                );

        }
    );

}

/* =========================================================
   FIREBASE — SALVAR MISSÃO EXTRA CONCLUÍDA
========================================================= */

async function registrarMissaoExtraConcluida(
    idLocal
) {

    if (
        !idLocal
    ) {

        return false;

    }


    const usuario =
        await obterUsuarioAutenticado();


    if (
        !usuario
    ) {

        console.error(
            "BVenture: usuário não autenticado ao salvar missão extra."
        );

        return false;

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


        if (
            !documentoUsuario.exists()
        ) {

            return false;

        }


        const dados =
            documentoUsuario.data();


        const missoesConcluidas =
            Array.isArray(
                dados.missoesExtrasConcluidas
            )
                ? [
                    ...new Set(
                        dados.missoesExtrasConcluidas
                    )
                ]
                : [];


        if (
            missoesConcluidas.includes(
                idLocal
            )
        ) {

            return true;

        }


        missoesConcluidas.push(
            idLocal
        );


        await updateDoc(
            referenciaUsuario,
            {
                missoesExtrasConcluidas:
                    missoesConcluidas
            }
        );


        console.log(
            "Missão extra salva no Firebase:",
            idLocal
        );


        return true;

    }

    catch (
        erro
    ) {

        console.error(
            "BVenture: erro ao salvar missão extra:",
            erro
        );

        return false;

    }

}


/* =========================================================
   MISSÕES EXTRAS

   O ID precisa ser igual ao ID usado no locais.js.
========================================================= */

const missoesExtras = {

    "parque-rio-branco": {
        titulo:
            "Ajude a cuidar do parque",

        instrucao:
            "Contribua para manter o Parque do Rio Branco limpo. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "mirante-edileusa-loz": {
        titulo:
            "Uma atitude que faz diferença",

        instrucao:
            "Faça uma atitude positiva pelo meio ambiente. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "orla-taumanan": {
        titulo:
            "Cuide da Orla",

        instrucao:
            "Ajude a preservar a Orla Taumanan. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "praca-das-aguas": {
        titulo:
            "Praça mais limpa",

        instrucao:
            "Faça sua parte para manter a Praça das Águas limpa. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "portal-do-milenio": {
        titulo:
            "Explore e preserve",

        instrucao:
            "Explorar também é preservar. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "parque-anaua": {
        titulo:
            "Natureza protegida",

        instrucao:
            "Contribua para a preservação do Parque Anauá. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "complexo-ayrton-senna": {
        titulo:
            "Faça sua parte",

        instrucao:
            "Uma atitude simples pode ajudar a cuidar dos espaços públicos. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "bosque-dos-papagaios": {
        titulo:
            "Proteja a natureza",

        instrucao:
            "Ajude a preservar o ambiente sem interferir nos animais ou na vegetação. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "praca-centro-civico": {
        titulo:
            "Cuide do Centro Cívico",

        instrucao:
            "Contribua para manter o espaço público mais limpo. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "monumento-garimpeiro": {
        titulo:
            "Preserve o espaço",

        instrucao:
            "Ajude a cuidar do entorno do monumento. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "catedral-cristo-redentor": {
        titulo:
            "Respeite e preserve",

        instrucao:
            "Ajude a manter o entorno limpo, respeitando o espaço religioso. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "igreja-matriz-nossa-senhora-do-carmo": {
        titulo:
            "Cuidado também é respeito",

        instrucao:
            "Contribua para manter o entorno da igreja limpo e preservado. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "casa-petita-brasil": {
        titulo:
            "Preserve nossa história",

        instrucao:
            "Ajude a cuidar do entorno deste patrimônio sem interferir na construção. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "ponte-dos-macuxis": {
        titulo:
            "Explore com responsabilidade",

        instrucao:
            "Em uma área segura próxima ao ponto da missão, registre em uma foto o descarte correto de um resíduo em uma lixeira. Não pare nem caminhe sobre a pista."
    },


    "centro-de-artesanato": {
        titulo:
            "Valorize o espaço",

        instrucao:
            "Cuidar do ambiente também valoriza os espaços que visitamos. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "teatro-municipal": {
        titulo:
            "Cultura também se preserva",

        instrucao:
            "Ajude a manter a área externa do teatro limpa e preservada. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "mercado-municipal-sao-francisco": {
        titulo:
            "Mercado mais limpo",

        instrucao:
            "Contribua para manter o ambiente mais limpo. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "praca-mirandinha": {
        titulo:
            "Cuide da praça",

        instrucao:
            "Ajude a manter a praça limpa para todos. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "roraima-garden-shopping": {
        titulo:
            "Descarte consciente",

        instrucao:
            "Pratique o descarte consciente. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "patio-roraima-shopping": {
        titulo:
            "Atitude consciente",

        instrucao:
            "Uma atitude simples também contribui para o meio ambiente. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    /*
       O ID continua com o nome antigo porque é
       o mesmo ID usado atualmente no projeto.

       Na tela aparece "Monumento aos Pioneiros".
    */

    "monumento-dos-peregrinos": {
        titulo:
            "Preserve nossa história",

        instrucao:
            "Ajude a manter o entorno do monumento limpo e preservado. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    },


    "paroquia-sao-francisco": {
        titulo:
            "Respeite e preserve",

        instrucao:
            "Contribua para manter a área externa da igreja limpa, respeitando o espaço religioso. Registre em uma foto o descarte correto de um resíduo em uma lixeira."
    }

};


/* =========================================================
   OBTER ID DO LOCAL PELA URL

   Exemplo:

   missao-extra.html?local=parque-rio-branco
========================================================= */

function obterIdLocalDaUrl() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    return parametros.get(
        "local"
    );

}


/* =========================================================
   ENCONTRAR LOCAL NO locais.js
========================================================= */

function encontrarLocal(
    id
) {

    if (
        !id
    ) {

        return null;

    }


    if (
        typeof pontosTuristicos !==
        "undefined" &&
        Array.isArray(
            pontosTuristicos
        )
    ) {

        return (
            pontosTuristicos.find(
                (local) =>
                    local.id === id
            ) || null
        );

    }


    console.error(
        "BVenture: lista pontosTuristicos não encontrada."
    );


    return null;

}


/* =========================================================
   CARREGAR MISSÃO
========================================================= */

function carregarMissaoExtra() {

    const idLocal =
        obterIdLocalDaUrl();


    localAtual =
        encontrarLocal(
            idLocal
        );


    /* =====================================================
       URL INVÁLIDA
    ===================================================== */

    if (
        !localAtual
    ) {

        console.error(
            "BVenture: local da missão extra não encontrado.",
            idLocal
        );


        if (
            missaoExtraLocalNome
        ) {

            missaoExtraLocalNome.textContent =
                t("Local não encontrado");

        }


        if (
            missaoExtraTitulo
        ) {

            missaoExtraTitulo.textContent =
                t("Missão indisponível");

        }


        if (
            missaoExtraInstrucao
        ) {

            missaoExtraInstrucao.textContent =
                t("Não foi possível identificar o local desta missão.");

        }


        desativarCamera();


        return;

    }


    /* =====================================================
       NOME DO LOCAL
    ===================================================== */

    if (
        missaoExtraLocalNome
    ) {

        missaoExtraLocalNome.textContent =
            localAtual.nome;

    }


    /* =====================================================
       MISSÃO CORRESPONDENTE
    ===================================================== */

    const missao =
        missoesExtras[
            localAtual.id
        ];


    if (
        !missao
    ) {

        if (
            missaoExtraTitulo
        ) {

            missaoExtraTitulo.textContent =
                t("Missão extra");

        }


        if (
            missaoExtraInstrucao
        ) {

            missaoExtraInstrucao.textContent =
                t("Realize a ação indicada no local e tire uma foto mostrando o resultado.");

        }


        return;

    }


    if (
        missaoExtraTitulo
    ) {

        missaoExtraTitulo.textContent =
            t(missao.titulo);

    }


    if (
        missaoExtraInstrucao
    ) {

        missaoExtraInstrucao.textContent =
            t(missao.instrucao);

    }

}


/* =========================================================
   DESATIVAR CÂMERA
========================================================= */

function desativarCamera() {

    if (
        tirarFotoMissao
    ) {

        tirarFotoMissao.disabled =
            true;

    }


    if (
        enviarFotoMissao
    ) {

        enviarFotoMissao.disabled =
            true;

    }

}


/* =========================================================
   ABRIR CÂMERA
========================================================= */

function abrirCamera() {

    if (
        analisandoImagem ||
        !cameraMissao
    ) {

        return;

    }


    /*
       Limpar o valor permite selecionar
       novamente a mesma fotografia.
    */

    cameraMissao.value =
        "";


    cameraMissao.click();

}


/* =========================================================
   BOTÃO TIRAR FOTO
========================================================= */

tirarFotoMissao
    ?.addEventListener(
        "click",
        abrirCamera
    );


/* =========================================================
   BOTÃO TIRAR NOVAMENTE
========================================================= */

tirarFotoNovamente
    ?.addEventListener(
        "click",
        abrirCamera
    );


/* =========================================================
   FOTO SELECIONADA / CAPTURADA
========================================================= */

cameraMissao
    ?.addEventListener(
        "change",
        (
            evento
        ) => {

            const arquivo =
                evento.target.files?.[0];


            /*
               Usuário fechou a câmera
               sem tirar foto.
            */

            if (
                !arquivo
            ) {

                return;

            }


            /*
               Garantir que é uma imagem.
            */

            if (
                !arquivo.type.startsWith(
                    "image/"
                )
            ) {

                abrirPopupErro(
                    t("O arquivo selecionado não é uma imagem válida.")
                );


                return;

            }


            arquivoFotoAtual =
                arquivo;


            /*
               Limpar URL anterior.
            */

            if (
                urlFotoAtual
            ) {

                URL.revokeObjectURL(
                    urlFotoAtual
                );

            }


            /*
               Criar URL temporária para mostrar
               a fotografia no navegador.
            */

            urlFotoAtual =
                URL.createObjectURL(
                    arquivo
                );


            mostrarPreviewFoto();

        }
    );


/* =========================================================
   MOSTRAR PRÉVIA
========================================================= */

function mostrarPreviewFoto() {

    if (
        !arquivoFotoAtual ||
        !urlFotoAtual
    ) {

        return;

    }


    /* =====================================================
       ESCONDER ESTADO VAZIO
    ===================================================== */

    if (
        missaoFotoVazia
    ) {

        missaoFotoVazia.hidden =
            true;

    }


    /* =====================================================
       MOSTRAR FOTO
    ===================================================== */

    if (
        missaoFotoPreview
    ) {

        missaoFotoPreview.src =
            urlFotoAtual;


        missaoFotoPreview.hidden =
            false;

    }


    /* =====================================================
       BOTÕES
    ===================================================== */

    if (
        tirarFotoMissao
    ) {

        tirarFotoMissao.hidden =
            true;

    }


    if (
        tirarFotoNovamente
    ) {

        tirarFotoNovamente.hidden =
            false;

    }


    if (
        enviarFotoMissao
    ) {

        enviarFotoMissao.hidden =
            false;

    }

}


/* =========================================================
   ESTADO ANALISANDO
========================================================= */

function mostrarAnalisando() {

    analisandoImagem =
        true;


    if (
        missaoAnalisando
    ) {

        missaoAnalisando.hidden =
            false;

    }


    if (
        tirarFotoNovamente
    ) {

        tirarFotoNovamente.disabled =
            true;

    }


    if (
        enviarFotoMissao
    ) {

        enviarFotoMissao.disabled =
            true;

    }

}


/* =========================================================
   ENCERRAR ESTADO ANALISANDO
========================================================= */

function esconderAnalisando() {

    analisandoImagem =
        false;

    


    if (
        missaoAnalisando
    ) {

        missaoAnalisando.hidden =
            true;

    }


    if (
        tirarFotoNovamente
    ) {

        tirarFotoNovamente.disabled =
            false;

    }


    if (
        enviarFotoMissao
    ) {

        enviarFotoMissao.disabled =
            false;

    }

}


/* =========================================================
   CONVERTER FOTO PARA BASE64
========================================================= */

function converterImagemParaBase64(
    arquivo
) {

    return new Promise(
        (
            resolver,
            rejeitar
        ) => {

            const leitor =
                new FileReader();


            leitor.onload =
                () => {

                    if (
                        typeof leitor.result !==
                        "string"
                    ) {

                        rejeitar(
                            new Error(
                                t("Não foi possível preparar a fotografia.")
                            )
                        );

                        return;

                    }


                    resolver(
                        leitor.result
                    );

                };


            leitor.onerror =
                () => {

                    rejeitar(
                        new Error(
                            t("Não foi possível ler a fotografia.")
                        )
                    );

                };


            leitor.readAsDataURL(
                arquivo
            );

        }
    );

}


/* =========================================================
   ANALISAR FOTO COM IA
========================================================= */

async function analisarImagemComIA(
    imagem,
    missao,
    local
) {

    /* =====================================================
       VERIFICAR USUÁRIO FIREBASE
    ===================================================== */

    const usuario =
        auth.currentUser;


    if (
        !usuario
    ) {

        throw new Error(
            t("Você precisa estar conectado para realizar esta missão.")
        );

    }


    /* =====================================================
       OBTER TOKEN FIREBASE
    ===================================================== */

    const firebaseToken =
        await usuario.getIdToken();


    if (
        !firebaseToken
    ) {

        throw new Error(
            t("Não foi possível validar sua sessão. Entre novamente e tente outra vez.")
        );

    }


    /* =====================================================
       VERIFICAR SUPABASE
    ===================================================== */

    if (
        SUPABASE_PUBLISHABLE_KEY ===
        "COLE_SUA_PUBLISHABLE_KEY_AQUI"
    ) {

        throw new Error(
            t("A Publishable Key do Supabase ainda não foi configurada.")
        );

    }


    /* =====================================================
       ENVIAR PARA EDGE FUNCTION
    ===================================================== */

    const resposta =
        await fetch(
            URL_ANALISAR_MISSAO,
            {

                method:
                    "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "apikey":
                        SUPABASE_PUBLISHABLE_KEY,

                    "Authorization":
                        `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,

                    /*
                       Token do jogador autenticado no Firebase.

                       A Edge Function irá validar este token
                       antes de permitir uma chamada à Groq.
                    */

                    "X-Firebase-Token":
                        firebaseToken

                },

                body:
                    JSON.stringify(
                        {

                            imagem:
                                imagem,

                            missao:
                                missao,

                            local:
                                local,

                            idioma:
                                obterIdiomaSistema()

                        }
                    )

            }
        );


    /* =====================================================
       LER RESPOSTA
    ===================================================== */

    let dados;


    try {

        dados =
            await resposta.json();

    }
    catch (
        erro
    ) {

        console.error(
            "BVenture — resposta não JSON:",
            erro
        );


        throw new Error(
            t("O servidor retornou uma resposta inválida.")
        );

    }


    /* =====================================================
       ERRO DA EDGE FUNCTION
    ===================================================== */

    if (
        !resposta.ok
    ) {

        console.error(
            "BVenture — erro Supabase:",
            resposta.status,
            dados
        );


        throw new Error(
            dados?.erro ||
            t("Não foi possível analisar a fotografia.")
        );

    }


    /* =====================================================
       VALIDAR RESULTADO
    ===================================================== */

    if (
        typeof dados.aprovado !==
        "boolean"
    ) {

        console.error(
            "BVenture — resultado inválido:",
            dados
        );


        throw new Error(
            t("A análise retornou um resultado inválido.")
        );

    }


    /* =====================================================
       RESULTADO
    ===================================================== */

    return {

        aprovado:
            dados.aprovado,

        motivo:
            dados.motivo ||
            t("Análise concluída.")

    };

}

/* =========================================================
   ENVIAR FOTO
========================================================= */

enviarFotoMissao
    ?.addEventListener(
        "click",
        async () => {

            if (
                !arquivoFotoAtual ||
                !localAtual ||
                analisandoImagem
            ) {

                return;

            }


            const missao =
                missoesExtras[
                    localAtual.id
                ];


            if (
                !missao
            ) {

                abrirPopupErro(
                    t("Não foi possível identificar esta missão.")
                );


                return;

            }


            mostrarAnalisando();


            try {

                /*
                   Converter a fotografia capturada
                   para o formato enviado à Edge Function.
                */

                const imagemBase64 =
                    await converterImagemParaBase64(
                        arquivoFotoAtual
                    );


                /*
                   Enviar:
                   - fotografia
                   - instrução da missão
                   - nome do local

                   A Edge Function envia esses dados
                   para a Groq.
                */

                const resultado =
                    await analisarImagemComIA(
                        imagemBase64,
                        missao.instrucao,
                        localAtual.nome
                    );


                esconderAnalisando();


                tratarResultadoAnalise(
                    resultado
                );

            }
            catch (
                erro
            ) {

                console.error(
                    t("BVenture — erro na análise:"),
                    erro
                );


                esconderAnalisando();


                abrirPopupErro(
                    erro?.message ||
                    t("Não conseguimos analisar sua imagem agora. Verifique sua conexão e tente novamente.")
                );

            }

        }
    );


/* =========================================================
   TRATAR RESPOSTA DA ANÁLISE
========================================================= */

async function tratarResultadoAnalise(
    resultado
) {

    if (
        resultado.aprovado
    ) {

        const missaoSalva =
            await registrarMissaoExtraConcluida(
                localAtual?.id
            );


        if (
            !missaoSalva
        ) {

            abrirPopupErro(
                t("A missão foi aprovada, mas não foi possível salvar seu progresso. Verifique sua conexão e tente novamente.")
            );


            return;

        }


        abrirPopupAprovado(
            resultado.motivo
        );


        return;

    }


    /* =====================================================
       APROVADO
    ===================================================== */

    if (
        resultado.aprovado
    ) {

        abrirPopupAprovado(
            resultado.motivo
        );


        return;

    }


    /* =====================================================
       REPROVADO
    ===================================================== */

    abrirPopupReprovado(
        resultado.motivo
    );

}


/* =========================================================
   POPUP — APROVADO
========================================================= */

function abrirPopupAprovado(
    motivo
) {

    if (
        missaoAprovadaTexto
    ) {

        missaoAprovadaTexto.textContent =
            motivo ||
            t("A imagem foi validada e você completou esta missão.");

    }


    abrirModalResultado(
        missaoAprovadaModal
    );

}


/* =========================================================
   POPUP — REPROVADO
========================================================= */

function abrirPopupReprovado(
    motivo
) {

    if (
        missaoReprovadaTexto
    ) {

        missaoReprovadaTexto.textContent =
            motivo ||
            t("Não foi possível confirmar a ação solicitada. Tire outra foto e tente novamente.");

    }


    abrirModalResultado(
        missaoReprovadaModal
    );

}


/* =========================================================
   POPUP — ERRO TÉCNICO
========================================================= */

function abrirPopupErro(
    mensagem
) {

    if (
        missaoErroTexto
    ) {

        missaoErroTexto.textContent =
            mensagem ||
            t("Não conseguimos analisar sua imagem agora.");

    }


    abrirModalResultado(
        missaoErroModal
    );

}


/* =========================================================
   ABRIR MODAL
========================================================= */

function abrirModalResultado(
    modal
) {

    if (
        !modal
    ) {

        return;

    }


    modal.classList.add(
        "aberto"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function fecharModalResultado(
    modal
) {

    if (
        !modal
    ) {

        return;

    }


    modal.classList.remove(
        "aberto"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   FOTO REPROVADA → TIRAR NOVAMENTE
========================================================= */

tentarNovamenteMissao
    ?.addEventListener(
        "click",
        () => {

            fecharModalResultado(
                missaoReprovadaModal
            );


            abrirCamera();

        }
    );


/* =========================================================
   ERRO DE API → TENTAR A MESMA FOTO
========================================================= */

tentarAnaliseNovamente
    ?.addEventListener(
        "click",
        () => {

            fecharModalResultado(
                missaoErroModal
            );


            /*
               Se ainda existe foto,
               mantém a fotografia para
               o jogador reenviar.
            */

            if (
                arquivoFotoAtual
            ) {

                return;

            }


            abrirCamera();

        }
    );


/* =========================================================
   VOLTAR PARA O MAPA COM LOADING
========================================================= */

function voltarParaMapaComLoading() {

    /*
        Usa o loading global do BVenture.
    */

    if (typeof mostrarLoading === "function") {

        mostrarLoading();

    }


    /*
        Pequeno tempo para o loading aparecer
        antes da troca de página.
    */

    setTimeout(
        () => {

            window.location.href =
                "mapa.html";

        },
        500
    );

}

/* =========================================================
   MISSÃO APROVADA
========================================================= */

continuarMissaoAprovada
    ?.addEventListener(
        "click",
        () => {

            voltarParaMapaComLoading();

        }
    );


/* =========================================================
   BOTÃO VOLTAR
========================================================= */

voltarMissaoExtra
    ?.addEventListener(
        "click",
        () => {

            voltarParaMapaComLoading();

        }
    );


/* =========================================================
   TECLA ESC
========================================================= */

document.addEventListener(
    "keydown",
    (
        evento
    ) => {

        if (
            evento.key !==
            "Escape"
        ) {

            return;

        }


        if (
            missaoErroModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            fecharModalResultado(
                missaoErroModal
            );


            return;

        }


        if (
            missaoReprovadaModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            fecharModalResultado(
                missaoReprovadaModal
            );

        }

    }
);


/* =========================================================
   LIMPAR URL TEMPORÁRIA DA FOTO
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (
            urlFotoAtual
        ) {

            URL.revokeObjectURL(
                urlFotoAtual
            );

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarMissaoExtra();

    }
);