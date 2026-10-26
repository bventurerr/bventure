/* =========================================================
   BVENTURE
   PERFIL.JS
========================================================= */

/* =========================================================
   FIREBASE
========================================================= */

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
    updatePassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

/* =========================================================
   ELEMENTOS — APLICATIVO
========================================================= */

const appConteudo =
    document.querySelector(
        ".app-conteudo"
    );


/* =========================================================
   ELEMENTOS — PERFIL
========================================================= */

const perfilNome =
    document.getElementById(
        "perfilNome"
    );

const perfilNick =
    document.getElementById(
        "perfilNick"
    );

const perfilAvatar =
    document.getElementById(
        "perfilAvatar"
    );

const perfilAvatarPlaceholder =
    document.getElementById(
        "perfilAvatarPlaceholder"
    );

/* =========================================================
   ELEMENTOS — ALTERAR AVATAR
========================================================= */

const botaoEditarAvatar =
    document.getElementById(
        "botaoEditarAvatar"
    );

const avatarModal =
    document.getElementById(
        "avatarModal"
    );

const avatarModalFundo =
    document.getElementById(
        "avatarModalFundo"
    );

const avatarModalFechar =
    document.getElementById(
        "avatarModalFechar"
    );

const avatarCancelar =
    document.getElementById(
        "avatarCancelar"
    );

const avatarConfirmar =
    document.getElementById(
        "avatarConfirmar"
    );

const avatarOpcoes =
    document.querySelectorAll(
        ".perfil-avatar-opcao"
    );

const perfilLocais =
    document.getElementById(
        "perfilLocais"
    );

const perfilRecompensas =
    document.getElementById(
        "perfilRecompensas"
    );

const perfilMissoesExtras =
    document.getElementById(
        "perfilMissoesExtras"
    );

const perfilExploracao =
    document.getElementById(
        "perfilExploracao"
    );


/* =========================================================
   ELEMENTOS — BOTÕES
========================================================= */

const botaoMeusDados =
    document.getElementById(
        "botaoMeusDados"
    );

const botaoSobre =
    document.getElementById(
        "botaoSobre"
    );

const botaoSair =
    document.getElementById(
        "botaoSair"
    );


/* =========================================================
   ELEMENTOS — POPUP MEUS DADOS
========================================================= */

const dadosModal =
    document.getElementById(
        "dadosModal"
    );

const dadosModalFundo =
    document.getElementById(
        "dadosModalFundo"
    );

const dadosModalFechar =
    document.getElementById(
        "dadosModalFechar"
    );

const formMeusDados =
    document.getElementById(
        "formMeusDados"
    );

const editarNome =
    document.getElementById(
        "editarNome"
    );

const editarNick =
    document.getElementById(
        "editarNick"
    );

    const editarSenha =
    document.getElementById(
        "editarSenha"
    );

const editarSenhaAjuda =
    document.getElementById(
        "editarSenhaAjuda"
    );

const campoAlterarSenha =
    document.getElementById(
        "campoAlterarSenha"
    );


/* =========================================================
   ELEMENTOS — IDIOMA
========================================================= */

const botoesIdioma =
    document.querySelectorAll(
        ".perfil-idioma"
    );

const idiomaModal =
    document.getElementById(
        "idiomaModal"
    );

const idiomaModalFundo =
    document.getElementById(
        "idiomaModalFundo"
    );

const idiomaModalTexto =
    document.getElementById(
        "idiomaModalTexto"
    );

const idiomaNao =
    document.getElementById(
        "idiomaNao"
    );

const idiomaSim =
    document.getElementById(
        "idiomaSim"
    );


/* =========================================================
   ELEMENTOS — SAIR
========================================================= */

const sairModal =
    document.getElementById(
        "sairModal"
    );

const sairModalFundo =
    document.getElementById(
        "sairModalFundo"
    );

const sairNao =
    document.getElementById(
        "sairNao"
    );

const sairSim =
    document.getElementById(
        "sairSim"
    );


/* =========================================================
   ELEMENTOS — POPUP SOBRE
========================================================= */

const sobreModal =
    document.getElementById(
        "sobreModal"
    );

const sobreModalFechar =
    document.getElementById(
        "sobreModalFechar"
    );

const sobreModalFundo =
    document.getElementById(
        "sobreModalFundo"
    );

const sobreModalCard =
    document.querySelector(
        ".sobre-modal-card"
    );

const sobreScroll =
    document.querySelector(
        ".sobre-scroll"
    );

const sobreScrollThumb =
    document.getElementById(
        "sobreScrollThumb"
    );


/* =========================================================
   ESTADO
========================================================= */

let idiomaPendente =
    null;

let avatarPendente =
    null;


/* =========================================================
   JOGADOR
========================================================= */

function obterJogador() {

    try {

        const dados =
            JSON.parse(
                localStorage.getItem(
                    "bventureJogador"
                )
            );

        return dados || {};

    }
    catch (
        erro
    ) {

        console.warn(
            "Não foi possível carregar o jogador.",
            erro
        );

        return {};

    }

}


/* =========================================================
   SALVAR JOGADOR
========================================================= */

function salvarJogador(
    jogador
) {

    try {

        localStorage.setItem(
            "bventureJogador",
            JSON.stringify(
                jogador
            )
        );

        return true;

    }
    catch (
        erro
    ) {

        console.warn(
            "Não foi possível salvar o jogador.",
            erro
        );

        return false;

    }

}

/* =========================================================
   FIREBASE — VERIFICAR TIPO DE CONTA
========================================================= */

function contaUsaSenha() {

    const usuario =
        auth.currentUser;

    if (
        !usuario
    ) {

        return false;

    }

    return usuario.providerData.some(
        (
            provedor
        ) =>
            provedor.providerId ===
            "password"
    );

}


/* =========================================================
   FIREBASE — CONFIGURAR CAMPO DE SENHA
========================================================= */

function configurarCampoSenha() {

    if (
        !editarSenha
    ) {

        return;

    }


    const usuario =
        auth.currentUser;


    if (
        !usuario
    ) {

        editarSenha.disabled =
            true;

        editarSenha.value =
            "";

        editarSenha.placeholder =
            t(
                "Entre novamente na sua conta"
            );

        if (
            editarSenhaAjuda
        ) {

            editarSenhaAjuda.textContent =
                t(
                    "Não foi possível identificar sua sessão."
                );

        }

        return;

    }


    if (
        contaUsaSenha()
    ) {

        editarSenha.disabled =
            false;

        editarSenha.value =
            "";

        editarSenha.placeholder =
            t(
                "Digite uma nova senha"
            );

        if (
            editarSenhaAjuda
        ) {

            editarSenhaAjuda.textContent =
                t(
                    "Digite apenas se quiser alterar sua senha."
                );

        }

        return;

    }


    editarSenha.disabled =
        true;

    editarSenha.value =
        "";

    editarSenha.placeholder =
        t(
            "Senha gerenciada pela sua Conta Google"
        );

    if (
        editarSenhaAjuda
    ) {

        editarSenhaAjuda.textContent =
            t(
                "Sua senha é gerenciada pela sua Conta Google."
            );

    }

}


/* =========================================================
   PROGRESSO DO JOGADOR
========================================================= */

let locaisDesbloqueadosFirebase = [];
let missoesExtrasConcluidasFirebase = [];


function obterLocaisDesbloqueados() {

    return locaisDesbloqueadosFirebase.length;

}


function obterMissoesExtrasConcluidas() {

    return missoesExtrasConcluidasFirebase.length;

}


/* =========================================================
   FIREBASE — CARREGAR PROGRESSO
========================================================= */

async function carregarLocaisDesbloqueadosFirebase() {

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
                                "Locais do perfil carregados:",
                                locaisDesbloqueadosFirebase
                            );


                            console.log(
                                "Missões extras do perfil carregadas:",
                                missoesExtrasConcluidasFirebase
                            );

                        }

                        catch (erro) {

                            console.error(
                                "BVenture: erro ao carregar progresso do perfil.",
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

    if (
        typeof pontosTuristicos !==
            "undefined" &&
        Array.isArray(
            pontosTuristicos
        ) &&
        pontosTuristicos.length > 0
    ) {

        return pontosTuristicos.length;

    }

    return 22;

}


/* =========================================================
   CALCULAR EXPLORAÇÃO DE BOA VISTA
========================================================= */

function calcularExploracaoBoaVista(
    totalLocais
) {

    const totalPlanejado =
        obterTotalLocaisBoaVista();

    if (
        totalPlanejado <= 0
    ) {

        return 0;

    }

    const quantidade =
        Math.min(
            totalLocais,
            totalPlanejado
        );

    const porcentagem =
        Math.round(
            (
                quantidade /
                totalPlanejado
            ) * 100
        );

    return Math.min(
        100,
        Math.max(
            0,
            porcentagem
        )
    );

}


/* =========================================================
   RECOMPENSAS OBTIDAS
========================================================= */

function calcularRecompensas(
    totalLocais
) {

    const metas = [
        1,
        3,
        5,
        8,
        12,
        20
    ];

    return metas.filter(
        (
            meta
        ) =>
            totalLocais >= meta
    ).length;

}


/* =========================================================
   AVATAR
========================================================= */

function carregarAvatar(
    jogador
) {

    const avatar =
        jogador.avatar;

    if (
        avatar &&
        perfilAvatar
    ) {

        perfilAvatar.onload =
            () => {

                perfilAvatar
                    .classList
                    .add(
                        "carregado"
                    );

                perfilAvatarPlaceholder
                    ?.classList
                    .add(
                        "oculto"
                    );

            };

        perfilAvatar.onerror =
            () => {

                usarPlaceholder(
                    jogador
                );

            };

        perfilAvatar.src =
            avatar;

    }
    else {

        usarPlaceholder(
            jogador
        );

    }

}


/* =========================================================
   PLACEHOLDER DO AVATAR
========================================================= */

function usarPlaceholder(
    jogador
) {

    if (
        perfilAvatar
    ) {

        perfilAvatar
            .classList
            .remove(
                "carregado"
            );

    }

    if (
        !perfilAvatarPlaceholder
    ) {

        return;

    }

    perfilAvatarPlaceholder
        .classList
        .remove(
            "oculto"
        );

    const nome =
        jogador.nome ||
        jogador.name ||
        "Jogador";

    perfilAvatarPlaceholder.textContent =
        nome
            .trim()
            .charAt(
                0
            )
            .toUpperCase();

}

/* =========================================================
   AVATAR — ATUALIZAR SELEÇÃO VISUAL
========================================================= */

function atualizarSelecaoAvatar(
    avatar
) {

    avatarOpcoes.forEach(
        (
            botao
        ) => {

            const selecionado =
                botao.dataset.avatar ===
                avatar;


            botao
                .classList
                .toggle(
                    "selecionado",
                    selecionado
                );


            botao.setAttribute(
                "aria-pressed",
                selecionado
                    ? "true"
                    : "false"
            );

        }
    );


    if (
        avatarConfirmar
    ) {

        avatarConfirmar.disabled =
            !avatar;

    }

}


/* =========================================================
   AVATAR — ABRIR POPUP
========================================================= */

function abrirSeletorAvatar() {

    if (
        !avatarModal
    ) {

        return;

    }


    const jogador =
        obterJogador();


    avatarPendente =
        jogador.avatar ||
        null;


    atualizarSelecaoAvatar(
        avatarPendente
    );


    avatarModal
        .classList
        .add(
            "aberto"
        );


    avatarModal.setAttribute(
        "aria-hidden",
        "false"
    );


    animarEntradaPopup(
        avatarModal
    );


    bloquearScrollApp();

}


/* =========================================================
   AVATAR — FECHAR POPUP
========================================================= */

function fecharSeletorAvatar() {

    if (
        !avatarModal
    ) {

        return;

    }


    limparAnimacaoPopup(
        avatarModal
    );


    avatarModal
        .classList
        .remove(
            "aberto"
        );


    avatarModal.setAttribute(
        "aria-hidden",
        "true"
    );


    avatarPendente =
        null;


    atualizarBloqueioApp();


    botaoEditarAvatar
        ?.focus();

}


/* =========================================================
   AVATAR — ESCOLHER
========================================================= */

avatarOpcoes.forEach(
    (
        botao
    ) => {

        botao.addEventListener(
            "click",
            () => {

                const avatar =
                    botao.dataset.avatar;


                if (
                    !avatar
                ) {

                    return;

                }


                avatarPendente =
                    avatar;


                atualizarSelecaoAvatar(
                    avatarPendente
                );

            }
        );

    }
);


/* =========================================================
   AVATAR — ABRIR AO CLICAR NA FOTO
========================================================= */

if (
    botaoEditarAvatar
) {

    botaoEditarAvatar.addEventListener(
        "click",
        () => {

            abrirSeletorAvatar();

        }
    );

}


/* =========================================================
   AVATAR — CANCELAR
========================================================= */

if (
    avatarCancelar
) {

    avatarCancelar.addEventListener(
        "click",
        () => {

            fecharSeletorAvatar();

        }
    );

}


/* =========================================================
   AVATAR — FECHAR NO X
========================================================= */

if (
    avatarModalFechar
) {

    avatarModalFechar.addEventListener(
        "click",
        () => {

            fecharSeletorAvatar();

        }
    );

}


/* =========================================================
   AVATAR — FECHAR NO FUNDO
========================================================= */

if (
    avatarModalFundo
) {

    avatarModalFundo.addEventListener(
        "click",
        () => {

            fecharSeletorAvatar();

        }
    );

}


/* =========================================================
   AVATAR — CONFIRMAR E SALVAR NO FIREBASE
========================================================= */

if (
    avatarConfirmar
) {

    avatarConfirmar.addEventListener(
        "click",
        async () => {

            if (
                !avatarPendente
            ) {

                return;

            }


            const usuario =
                auth.currentUser;


            if (
                !usuario
            ) {

                console.warn(
                    "Sessão do Firebase não encontrada."
                );

                return;

            }


            /* =============================================
               LOADING
            ============================================= */

            if (
                typeof mostrarLoading ===
                "function"
            ) {

                mostrarLoading(
                    t(
                        "Salvando seu avatar..."
                    )
                );

            }


            try {


                /* =========================================
                   FIRESTORE
                ========================================= */

                await updateDoc(
                    doc(
                        db,
                        "usuarios",
                        usuario.uid
                    ),
                    {
                        avatar:
                            avatarPendente
                    }
                );


                /* =========================================
                   CACHE LOCAL
                ========================================= */

                const jogador =
                    obterJogador();


                jogador.avatar =
                    avatarPendente;


                salvarJogador(
                    jogador
                );


                /* =========================================
                   ATUALIZAR AVATAR NA TELA
                ========================================= */

                carregarAvatar(
                    jogador
                );


                /* =========================================
                   FECHAR SELETOR DE AVATAR
                ========================================= */

                fecharSeletorAvatar();


                /* =========================================
                   SUCESSO
                ========================================= */

                if (
                    typeof alterarMensagemLoading ===
                    "function"
                ) {

                    alterarMensagemLoading(
                        t(
                            "Avatar atualizado!"
                        )
                    );

                }


                setTimeout(
                    () => {

                        if (
                            typeof esconderLoading ===
                            "function"
                        ) {

                            esconderLoading();

                        }

                    },
                    700
                );

            }
            catch (
                erro
            ) {

                console.error(
                    "Erro ao atualizar avatar:",
                    erro
                );


                if (
                    typeof alterarMensagemLoading ===
                    "function"
                ) {

                    alterarMensagemLoading(
                        t(
                            "Não foi possível atualizar seu avatar."
                        )
                    );

                }


                setTimeout(
                    () => {

                        if (
                            typeof esconderLoading ===
                            "function"
                        ) {

                            esconderLoading();

                        }

                    },
                    1500
                );

            }

        }
    );

}

/* =========================================================
   CARREGAR PERFIL
========================================================= */

async function carregarPerfil() {

    await carregarLocaisDesbloqueadosFirebase();


    const jogador =
        obterJogador();


    /* NOME */

    const nome =
        jogador.nome ||
        jogador.name ||
        "Jogador";

    if (
        perfilNome
    ) {

        perfilNome.textContent =
            nome;

    }


    /* NICK */

    let nick =
        jogador.nick ||
        jogador.nickname ||
        "jogador";

    nick =
        nick.replace(
            /^@/,
            ""
        );

    if (
        perfilNick
    ) {

        perfilNick.textContent =
            `@${nick}`;

    }


    /* AVATAR */

    carregarAvatar(
        jogador
    );


    /* LOCAIS */

    const totalLocais =
        obterLocaisDesbloqueados();

    if (
        perfilLocais
    ) {

        perfilLocais.textContent =
            totalLocais;

    }


    /* RECOMPENSAS */

    const recompensas =
        calcularRecompensas(
            totalLocais
        );

    if (
        perfilRecompensas
    ) {

        perfilRecompensas.textContent =
            recompensas;

    }


    /* MISSÕES EXTRAS */


    const missoesExtras =
        obterMissoesExtrasConcluidas();


    if (
        perfilMissoesExtras
    ) {

        perfilMissoesExtras.textContent =
            missoesExtras;

    }


    /* EXPLORAÇÃO */

    const exploracao =
        calcularExploracaoBoaVista(
            totalLocais
        );

    if (
        perfilExploracao
    ) {

        perfilExploracao.textContent =
            `${exploracao}%`;

    }



}


/* =========================================================
   BLOQUEAR CONTEÚDO DO APP
========================================================= */

function bloquearScrollApp() {

    if (
        !appConteudo
    ) {

        return;

    }

    appConteudo.style.overflowY =
        "hidden";

}


/* =========================================================
   LIBERAR CONTEÚDO DO APP
========================================================= */

function liberarScrollApp() {

    if (
        !appConteudo
    ) {

        return;

    }

    appConteudo.style.overflowY =
        "auto";

}


/* =========================================================
   VERIFICAR SE EXISTE ALGUM POPUP ABERTO
========================================================= */

function existeModalAberto() {

    
    return Boolean(
        
        avatarModal
        ?.classList
        .contains(
            "aberto"
        ) ||

        dadosModal
            ?.classList
            .contains(
                "aberto"
            ) ||

        idiomaModal
            ?.classList
            .contains(
                "aberto"
            ) ||

        sairModal
            ?.classList
            .contains(
                "aberto"
            ) ||

        sobreModal
            ?.classList
            .contains(
                "aberto"
            )
    );

}


/* =========================================================
   ATUALIZAR BLOQUEIO DA TELA
========================================================= */

function atualizarBloqueioApp() {

    if (
        existeModalAberto()
    ) {

        bloquearScrollApp();

    }
    else {

        liberarScrollApp();

    }

}


/* =========================================================
   ANIMAR ENTRADA DOS POP-UPS
========================================================= */

function animarEntradaPopup(
    modal
) {

    if (
        !modal
    ) {

        return;

    }


    /*
       Limpa qualquer animação anterior.
    */

    modal.classList.remove(
        "preparando-popup",
        "popup-entrando"
    );


    /*
       Primeiro estado:
       popup já está aberto,
       mas o card permanece abaixo.
    */

    modal.classList.add(
        "preparando-popup"
    );


    /*
       Nos aparelhos mais fracos precisamos
       dar tempo para o primeiro estado
       realmente ser desenhado.
    */

    setTimeout(
        () => {

            if (
                !modal.classList.contains(
                    "aberto"
                )
            ) {

                return;

            }

            modal.classList.add(
                "popup-entrando"
            );

        },
        100
    );


    /*
       Depois que a transição termina,
       removemos somente as classes auxiliares.
    */

    setTimeout(
        () => {

            modal.classList.remove(
                "preparando-popup",
                "popup-entrando"
            );

        },
        800
    );

}


/* =========================================================
   LIMPAR ESTADO DE ANIMAÇÃO
========================================================= */

function limparAnimacaoPopup(
    modal
) {

    if (
        !modal
    ) {

        return;

    }

    modal.classList.remove(
        "preparando-popup",
        "popup-entrando"
    );

}


/* =========================================================
   MEUS DADOS — ABRIR
========================================================= */

function abrirMeusDados() {

    if (
        !dadosModal
    ) {

        console.warn(
            "Popup Meus dados não encontrado."
        );

        return;

    }

    const jogador =
        obterJogador();

    if (
        editarNome
    ) {

        editarNome.value =
            jogador.nome ||
            jogador.name ||
            "";

    }

    if (
        editarNick
    ) {

        editarNick.value =
            (
                jogador.nick ||
                jogador.nickname ||
                ""
            )
                .replace(
                    /^@/,
                    ""
                );

    }

    configurarCampoSenha();


    dadosModal
        .classList
        .add(
            "aberto"
        );


    animarEntradaPopup(
        dadosModal
    );


    dadosModal.setAttribute(
        "aria-hidden",
        "false"
    );


    bloquearScrollApp();


    setTimeout(
        () => {

            editarNome
                ?.focus();

        },
        100
    );

}


/* =========================================================
   MEUS DADOS — FECHAR
========================================================= */

function fecharMeusDados() {

    if (
        !dadosModal
    ) {

        return;

    }


    limparAnimacaoPopup(
        dadosModal
    );


    dadosModal
        .classList
        .remove(
            "aberto"
        );


    dadosModal.setAttribute(
        "aria-hidden",
        "true"
    );


    atualizarBloqueioApp();


    botaoMeusDados
        ?.focus();

}


/* =========================================================
   MEUS DADOS — BOTÃO
========================================================= */

if (
    botaoMeusDados
) {

    botaoMeusDados.addEventListener(
        "click",
        () => {

            abrirMeusDados();

        }
    );

}


/* =========================================================
   MEUS DADOS — FECHAR NO X
========================================================= */

if (
    dadosModalFechar
) {

    dadosModalFechar.addEventListener(
        "click",
        () => {

            fecharMeusDados();

        }
    );

}


/* =========================================================
   MEUS DADOS — FECHAR NO FUNDO
========================================================= */

if (
    dadosModalFundo
) {

    dadosModalFundo.addEventListener(
        "click",
        () => {

            fecharMeusDados();

        }
    );

}


/* =========================================================
   MEUS DADOS — SALVAR
========================================================= */

if (
    formMeusDados
) {

    formMeusDados.addEventListener(
        "submit",
        async (
            evento
        ) => {

            evento.preventDefault();


            const novoNome =
                editarNome
                    ?.value
                    .trim() ||
                "";


            let novoNick =
                editarNick
                    ?.value
                    .trim() ||
                "";


            novoNick =
                novoNick.replace(
                    /^@/,
                    ""
                );


            const novaSenha =
                editarSenha
                    ?.value ||
                "";


            /* =============================================
               VALIDAÇÕES
            ============================================= */

            if (
                !novoNome ||
                !novoNick
            ) {

                console.warn(
                    "Nome ou nick não preenchido."
                );

                return;

            }


            if (
                novoNome.length < 2
            ) {

                editarNome
                    ?.focus();

                return;

            }


            if (
                novoNick.length < 3
            ) {

                editarNick
                    ?.focus();

                return;

            }


            if (
                novaSenha &&
                novaSenha.length < 8
            ) {

                editarSenha
                    ?.focus();

                return;

            }


            const usuario =
                auth.currentUser;


            if (
                !usuario
            ) {

                console.warn(
                    "Sessão do Firebase não encontrada."
                );

                return;

            }


            /* =============================================
               LOADING
            ============================================= */

            if (
                typeof mostrarLoading ===
                "function"
            ) {

                mostrarLoading(
                    t(
                        "Salvando suas alterações..."
                    )
                );

            }


            try {


                /* =========================================
                   ALTERAR SENHA
                ========================================= */

                if (
                    novaSenha &&
                    contaUsaSenha()
                ) {

                    await updatePassword(
                        usuario,
                        novaSenha
                    );

                }


                /* =========================================
                   FIRESTORE
                ========================================= */

                await updateDoc(
                    doc(
                        db,
                        "usuarios",
                        usuario.uid
                    ),
                    {
                        nome: novoNome,
                        nick: novoNick
                    }
                );


                /* =========================================
                   ATUALIZAR CACHE LOCAL
                ========================================= */

                const jogador =
                    obterJogador();


                jogador.nome =
                    novoNome;

                jogador.nick =
                    novoNick;


                if (
                    Object.prototype.hasOwnProperty.call(
                        jogador,
                        "name"
                    )
                ) {

                    jogador.name =
                        novoNome;

                }


                if (
                    Object.prototype.hasOwnProperty.call(
                        jogador,
                        "nickname"
                    )
                ) {

                    jogador.nickname =
                        novoNick;

                }


                salvarJogador(
                    jogador
                );


                /* =========================================
                   ATUALIZAR INTERFACE
                ========================================= */

                carregarPerfil();


                if (
                    editarSenha
                ) {

                    editarSenha.value =
                        "";

                }


                fecharMeusDados();


                /* =========================================
                   LOADING DE SUCESSO
                ========================================= */

                if (
                    typeof alterarMensagemLoading ===
                    "function"
                ) {

                    alterarMensagemLoading(
                        t(
                            "Alterações salvas!"
                        )
                    );

                }


                setTimeout(
                    () => {

                        if (
                            typeof esconderLoading ===
                            "function"
                        ) {

                            esconderLoading();

                        }

                    },
                    700
                );


            }
            catch (
                erro
            ) {

                console.error(
                    "Erro ao atualizar os dados do perfil:",
                    erro
                );


                if (
                    typeof esconderLoading ===
                    "function"
                ) {

                    esconderLoading();

                }


                /* =========================================
                   LOGIN RECENTE NECESSÁRIO
                ========================================= */

                if (
                    erro.code ===
                    "auth/requires-recent-login"
                ) {

                    console.warn(
                        t(
                            "Por segurança, entre novamente na sua conta antes de alterar a senha."
                        )
                    );

                    return;

                }


                /* =========================================
                   SENHA FRACA
                ========================================= */

                if (
                    erro.code ===
                    "auth/weak-password"
                ) {

                    editarSenha
                        ?.focus();

                    return;

                }

            }

        }
    );

}


/* =========================================================
   IDIOMAS
========================================================= */

const nomesIdiomas = {

    pt: {
        pt: "Português",
        en: "Portuguese",
        es: "Portugués"
    },

    en: {
        pt: "Inglês",
        en: "English",
        es: "Inglés"
    },

    es: {
        pt: "Espanhol",
        en: "Spanish",
        es: "Español"
    }

};


/* =========================================================
   OBTER IDIOMA ATUAL
========================================================= */

function obterIdiomaAtual() {

    if (
        typeof obterIdiomaSistema ===
        "function"
    ) {

        return obterIdiomaSistema();

    }


    const idioma =
        localStorage.getItem(
            "bventureIdioma"
        );


    if (
        idioma === "pt" ||
        idioma === "en" ||
        idioma === "es"
    ) {

        return idioma;

    }


    return "pt";

}


/* =========================================================
   OBTER NOME DO IDIOMA
========================================================= */

function obterNomeIdioma(
    idioma
) {

    const idiomaAtual =
        obterIdiomaAtual();


    return (
        nomesIdiomas[idioma]
        ?.[idiomaAtual]
        ||
        nomesIdiomas[idioma]
        ?.pt
        ||
        idioma
    );

}


/* =========================================================
   ATUALIZAR BOTÕES DE IDIOMA
========================================================= */

function atualizarIdiomaSelecionado() {

    const idiomaAtual =
        obterIdiomaAtual();


    botoesIdioma.forEach(
        (
            botao
        ) => {

            const ativo =
                botao.dataset.idioma ===
                idiomaAtual;


            botao
                .classList
                .toggle(
                    "ativo",
                    ativo
                );


            botao.setAttribute(
                "aria-pressed",
                ativo
                    ? "true"
                    : "false"
            );

        }
    );

}


/* =========================================================
   TEXTO DE CONFIRMAÇÃO
========================================================= */

function obterTextoConfirmacaoIdioma(
    idioma
) {

    const nomeIdioma =
        obterNomeIdioma(
            idioma
        );


    const idiomaAtual =
        obterIdiomaAtual();


    if (
        idiomaAtual === "en"
    ) {

        return `Do you want to change the language to ${nomeIdioma}?`;

    }


    if (
        idiomaAtual === "es"
    ) {

        return `¿Deseas cambiar el idioma a ${nomeIdioma}?`;

    }


    return `Deseja alterar o idioma para ${nomeIdioma}?`;

}


/* =========================================================
   ABRIR CONFIRMAÇÃO DE IDIOMA
========================================================= */

function abrirConfirmacaoIdioma(
    idioma
) {

    if (
        !idiomaModal ||
        !Object.prototype.hasOwnProperty.call(
            nomesIdiomas,
            idioma
        )
    ) {

        return;

    }


    idiomaPendente =
        idioma;


    if (
        idiomaModalTexto
    ) {

        idiomaModalTexto.textContent =
            obterTextoConfirmacaoIdioma(
                idioma
            );

    }


    idiomaModal
        .classList
        .add(
            "aberto"
        );


    animarEntradaPopup(
        idiomaModal
    );


    idiomaModal.setAttribute(
        "aria-hidden",
        "false"
    );


    bloquearScrollApp();


    setTimeout(
        () => {

            idiomaNao
                ?.focus();

        },
        100
    );

}


/* =========================================================
   FECHAR CONFIRMAÇÃO DE IDIOMA
========================================================= */

function fecharConfirmacaoIdioma() {

    if (
        !idiomaModal
    ) {

        idiomaPendente =
            null;

        return;

    }


    limparAnimacaoPopup(
        idiomaModal
    );


    idiomaModal
        .classList
        .remove(
            "aberto"
        );


    idiomaModal.setAttribute(
        "aria-hidden",
        "true"
    );


    idiomaPendente =
        null;


    atualizarBloqueioApp();

}


/* =========================================================
   BOTÕES DE IDIOMA
========================================================= */

botoesIdioma.forEach(
    (
        botao
    ) => {

        botao.addEventListener(
            "click",
            () => {

                const idioma =
                    botao.dataset.idioma;


                if (
                    !idioma ||
                    idioma ===
                        obterIdiomaAtual()
                ) {

                    return;

                }


                abrirConfirmacaoIdioma(
                    idioma
                );

            }
        );

    }
);


/* =========================================================
   IDIOMA — NÃO
========================================================= */

if (
    idiomaNao
) {

    idiomaNao.addEventListener(
        "click",
        () => {

            fecharConfirmacaoIdioma();

        }
    );

}


/* =========================================================
   IDIOMA — FUNDO
========================================================= */

if (
    idiomaModalFundo
) {

    idiomaModalFundo.addEventListener(
        "click",
        () => {

            fecharConfirmacaoIdioma();

        }
    );

}


/* =========================================================
   IDIOMA — SIM
========================================================= */

if (
    idiomaSim
) {

    idiomaSim.addEventListener(
        "click",
        () => {

            if (
                !idiomaPendente
            ) {

                return;

            }


            const idiomaEscolhido =
                idiomaPendente;


            /*
                Fecha primeiro o popup.

                Isso evita que o sistema automático
                memorize como "texto original" uma
                frase temporária criada pelo perfil.js.
            */

            fecharConfirmacaoIdioma();


            /*
                O idiomas.js é o responsável pela
                tradução de toda a página.
            */

            if (
                typeof alterarIdioma ===
                "function"
            ) {

                alterarIdioma(
                    idiomaEscolhido
                );

            }
            else {

                localStorage.setItem(
                    "bventureIdioma",
                    idiomaEscolhido
                );

            }


            atualizarIdiomaSelecionado();


            /*
                Atualiza novamente depois que a troca
                automática terminou.
            */

            requestAnimationFrame(
                () => {

                    atualizarIdiomaSelecionado();

                }
            );

        }
    );

}


/* =========================================================
   SINCRONIZAR QUANDO O IDIOMA FOR ALTERADO
========================================================= */

window.addEventListener(
    "bventure:idiomaAlterado",
    () => {

        atualizarIdiomaSelecionado();

    }
);

/* =========================================================
   SCROLL PERSONALIZADO DO POPUP SOBRE
========================================================= */

function atualizarScrollSobre() {

    if (
        !sobreModalCard ||
        !sobreScroll ||
        !sobreScrollThumb
    ) {

        return;

    }


    const alturaVisivel =
        sobreModalCard.clientHeight;


    const alturaTotal =
        sobreModalCard.scrollHeight;


    const alturaTrilho =
        sobreScroll.clientHeight;


    if (
        alturaTotal <=
        alturaVisivel + 1
    ) {

        sobreScroll.style.display =
            "none";

        return;

    }


    sobreScroll.style.display =
        "block";


    const proporcao =
        alturaVisivel /
        alturaTotal;


    let alturaVerde =
        alturaTrilho *
        proporcao;


    alturaVerde =
        Math.max(
            55,
            alturaVerde
        );


    alturaVerde =
        Math.min(
            alturaTrilho,
            alturaVerde
        );


    sobreScrollThumb.style.height =
        `${alturaVerde}px`;


    const scrollMaximo =
        alturaTotal -
        alturaVisivel;


    let progresso =
        scrollMaximo > 0
            ? sobreModalCard.scrollTop /
              scrollMaximo
            : 0;


    progresso =
        Math.max(
            0,
            Math.min(
                1,
                progresso
            )
        );


    const movimentoMaximo =
        alturaTrilho -
        alturaVerde;


    const posicao =
        movimentoMaximo *
        progresso;


    sobreScrollThumb.style.top =
        `${posicao}px`;

}


/* =========================================================
   ABRIR POPUP SOBRE
========================================================= */

function abrirSobre() {

    if (
        !sobreModal
    ) {

        console.warn(
            "Popup Sobre o BVenture não encontrado."
        );

        return;

    }


    bloquearScrollApp();


    if (
        sobreModalCard
    ) {

        sobreModalCard.scrollTop =
            0;

    }


    sobreModal
        .classList
        .add(
            "aberto"
        );


    animarEntradaPopup(
        sobreModal
    );


    sobreModal.setAttribute(
        "aria-hidden",
        "false"
    );


    requestAnimationFrame(
        () => {

            requestAnimationFrame(
                () => {

                    atualizarScrollSobre();

                }
            );

        }
    );


    setTimeout(
        () => {

            sobreModalFechar
                ?.focus();

        },
        100
    );

}


/* =========================================================
   FECHAR POPUP SOBRE
========================================================= */

function fecharSobre() {

    if (
        !sobreModal
    ) {

        return;

    }


    limparAnimacaoPopup(
        sobreModal
    );


    sobreModal
        .classList
        .remove(
            "aberto"
        );


    sobreModal.setAttribute(
        "aria-hidden",
        "true"
    );


    atualizarBloqueioApp();


    botaoSobre
        ?.focus();

}


/* =========================================================
   SCROLL INTERNO DO POPUP SOBRE
========================================================= */

if (
    sobreModalCard
) {

    sobreModalCard.addEventListener(
        "scroll",
        atualizarScrollSobre,
        {
            passive: true
        }
    );

}


/* =========================================================
   REDIMENSIONAMENTO DA TELA
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            sobreModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            atualizarScrollSobre();

        }

    }
);


/* =========================================================
   SOBRE O BVENTURE
========================================================= */

if (
    botaoSobre
) {

    botaoSobre.addEventListener(
        "click",
        () => {

            abrirSobre();

        }
    );

}


/* =========================================================
   SOBRE — BOTÃO X
========================================================= */

if (
    sobreModalFechar
) {

    sobreModalFechar.addEventListener(
        "click",
        () => {

            fecharSobre();

        }
    );

}


/* =========================================================
   SOBRE — CLICAR NO FUNDO ESCURO
========================================================= */

if (
    sobreModalFundo
) {

    sobreModalFundo.addEventListener(
        "click",
        () => {

            fecharSobre();

        }
    );

}


/* =========================================================
   SAIR — ABRIR CONFIRMAÇÃO
========================================================= */

function abrirConfirmacaoSair() {

    if (
        !sairModal
    ) {

        executarSaida();

        return;

    }


    sairModal
        .classList
        .add(
            "aberto"
        );


    animarEntradaPopup(
        sairModal
    );


    sairModal.setAttribute(
        "aria-hidden",
        "false"
    );


    bloquearScrollApp();


    setTimeout(
        () => {

            sairNao
                ?.focus();

        },
        100
    );

}


/* =========================================================
   SAIR — FECHAR CONFIRMAÇÃO
========================================================= */

function fecharConfirmacaoSair() {

    if (
        !sairModal
    ) {

        return;

    }


    limparAnimacaoPopup(
        sairModal
    );


    sairModal
        .classList
        .remove(
            "aberto"
        );


    sairModal.setAttribute(
        "aria-hidden",
        "true"
    );


    atualizarBloqueioApp();


    botaoSair
        ?.focus();

}


/* =========================================================
   EXECUTAR SAÍDA
========================================================= */

async function executarSaida() {

    /* =====================================================
       LOADING
    ===================================================== */

    if (
        typeof mostrarLoading ===
        "function"
    ) {

        mostrarLoading(
            t(
                "Saindo da sua conta..."
            )
        );

    }


    try {


        /* =================================================
           ENCERRAR SESSÃO NO FIREBASE
        ================================================= */

        await signOut(
            auth
        );


        /* =================================================
           REMOVER CACHE DO PERFIL
        ================================================= */

        localStorage.removeItem(
            "bventureJogador"
        );


        /* =================================================
           SUCESSO
        ================================================= */

        if (
            typeof alterarMensagemLoading ===
            "function"
        ) {

            alterarMensagemLoading(
                t(
                    "Até a próxima aventura!"
                )
            );

        }


        setTimeout(
            () => {

                window.location.href =
                    "login.html";

            },
            700
        );


    }
    catch (
        erro
    ) {

        console.error(
            "Erro ao sair da conta:",
            erro
        );


        if (
            typeof alterarMensagemLoading ===
            "function"
        ) {

            alterarMensagemLoading(
                t(
                    "Não foi possível sair da sua conta."
                )
            );

        }


        setTimeout(
            () => {

                if (
                    typeof esconderLoading ===
                    "function"
                ) {

                    esconderLoading();

                }

            },
            1500
        );

    }

}


/* =========================================================
   BOTÃO SAIR
========================================================= */

if (
    botaoSair
) {

    botaoSair.addEventListener(
        "click",
        () => {

            abrirConfirmacaoSair();

        }
    );

}


/* =========================================================
   SAIR — NÃO
========================================================= */

if (
    sairNao
) {

    sairNao.addEventListener(
        "click",
        () => {

            fecharConfirmacaoSair();

        }
    );

}


/* =========================================================
   SAIR — FUNDO
========================================================= */

if (
    sairModalFundo
) {

    sairModalFundo.addEventListener(
        "click",
        () => {

            fecharConfirmacaoSair();

        }
    );

}


/* =========================================================
   SAIR — SIM
========================================================= */

if (
    sairSim
) {

    sairSim.addEventListener(
        "click",
        () => {

            if (
                sairModal
            ) {

                limparAnimacaoPopup(
                    sairModal
                );


                sairModal
                    .classList
                    .remove(
                        "aberto"
                    );


                sairModal.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            executarSaida();

        }
    );

}


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
    avatarModal
        ?.classList
        .contains(
            "aberto"
        )
) {

    fecharSeletorAvatar();

    return;

}


        if (
            dadosModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            fecharMeusDados();

            return;

        }


        if (
            idiomaModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            fecharConfirmacaoIdioma();

            return;

        }


        if (
            sairModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            fecharConfirmacaoSair();

            return;

        }


        if (
            sobreModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            fecharSobre();

        }

    }
);


/* =========================================================
   INICIAR PERFIL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarPerfil();

        atualizarIdiomaSelecionado();

    }
);


/* =========================================================
   ATUALIZAR AO VOLTAR PARA A PÁGINA
========================================================= */

window.addEventListener(
    "pageshow",
    () => {

        carregarPerfil();

        atualizarIdiomaSelecionado();


        if (
            existeModalAberto()
        ) {

            bloquearScrollApp();


            if (
                sobreModal
                    ?.classList
                    .contains(
                        "aberto"
                    )
            ) {

                requestAnimationFrame(
                    () => {

                        atualizarScrollSobre();

                    }
                );

            }

        }
        else {

            liberarScrollApp();

        }

    }
);