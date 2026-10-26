/* =========================================================
   BVENTURE
   JOGADOR
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
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";


/* =========================================================
   ELEMENTOS
========================================================= */

const formPerfil =
    document.getElementById("formPerfil");

const campoNome =
    document.getElementById("nome");

const campoNick =
    document.getElementById("nick");

const campoIdade =
    document.getElementById("idade");

const botaoAvatar =
    document.getElementById("selecionarAvatar");


/* =========================================================
   ELEMENTOS — POPUP DE AVISO
========================================================= */

const popupAviso =
    document.getElementById("popupAviso");

const popupAvisoMensagem =
    document.getElementById("popupAvisoMensagem");

const fecharPopupAviso =
    document.getElementById("fecharPopupAviso");


/* =========================================================
   POPUP DE AVISO
========================================================= */

function mostrarAviso(mensagem) {

    if (
        !popupAviso ||
        !popupAvisoMensagem
    ) {
        return;
    }

    popupAvisoMensagem.textContent =
        mensagem;

    popupAviso.classList.add(
        "ativo"
    );

    popupAviso.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function esconderAviso() {

    if (!popupAviso) {
        return;
    }

    popupAviso.classList.remove(
        "ativo"
    );

    popupAviso.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


/* =========================================================
   FECHAR POPUP DE AVISO
========================================================= */

if (fecharPopupAviso) {

    fecharPopupAviso.addEventListener(
        "click",
        esconderAviso
    );

}


if (popupAviso) {

    const fundoAviso =
        popupAviso.querySelector(
            ".popup-aviso-fundo"
        );

    if (fundoAviso) {

        fundoAviso.addEventListener(
            "click",
            esconderAviso
        );

    }

}


/* =========================================================
   ELEMENTOS — POPUP DE AVATAR
========================================================= */

const avatarModal =
    document.getElementById("avatarModal");

const fecharAvatar =
    document.getElementById("fecharAvatar");

const fecharAvatarFundo =
    document.getElementById("fecharAvatarFundo");

const confirmarAvatar =
    document.getElementById("confirmarAvatar");

const opcoesAvatar =
    document.querySelectorAll(
        ".avatar-opcao"
    );


/* =========================================================
   ESTADO DO AVATAR
========================================================= */

let avatarSelecionado =
    null;

let avatarTemporario =
    null;


/* =========================================================
   ABRIR POPUP DE AVATAR
========================================================= */

function abrirAvatarModal() {

    if (!avatarModal) {
        return;
    }

    avatarTemporario =
        avatarSelecionado;

    opcoesAvatar.forEach(
        (opcao) => {

            const caminho =
                opcao.dataset.avatar;

            opcao.classList.toggle(
                "selecionado",
                caminho === avatarTemporario
            );

        }
    );

    if (confirmarAvatar) {

        confirmarAvatar.disabled =
            !avatarTemporario;

    }

    avatarModal.classList.add(
        "ativo"
    );

    avatarModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


/* =========================================================
   FECHAR POPUP DE AVATAR
========================================================= */

function fecharAvatarModal() {

    if (!avatarModal) {
        return;
    }

    avatarModal.classList.remove(
        "ativo"
    );

    avatarModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


/* =========================================================
   BOTÃO DO AVATAR
========================================================= */

if (botaoAvatar) {

    botaoAvatar.addEventListener(
        "click",
        abrirAvatarModal
    );

}


/* =========================================================
   FECHAR AVATAR
========================================================= */

if (fecharAvatar) {

    fecharAvatar.addEventListener(
        "click",
        fecharAvatarModal
    );

}


if (fecharAvatarFundo) {

    fecharAvatarFundo.addEventListener(
        "click",
        fecharAvatarModal
    );

}


/* =========================================================
   SELECIONAR AVATAR
========================================================= */

opcoesAvatar.forEach(
    (opcao) => {

        opcao.addEventListener(
            "click",
            () => {

                avatarTemporario =
                    opcao.dataset.avatar;

                opcoesAvatar.forEach(
                    (item) => {

                        item.classList.remove(
                            "selecionado"
                        );

                    }
                );

                opcao.classList.add(
                    "selecionado"
                );

                if (confirmarAvatar) {

                    confirmarAvatar.disabled =
                        false;

                }

            }
        );

    }
);


/* =========================================================
   MOSTRAR AVATAR NO CÍRCULO
========================================================= */

function atualizarAvatarPrincipal() {

    if (
        !botaoAvatar ||
        !avatarSelecionado
    ) {
        return;
    }

    const imagemAnterior =
        botaoAvatar.querySelector(
            ".avatar-imagem-selecionada"
        );

    if (imagemAnterior) {

        imagemAnterior.remove();

    }

    const iconeProvisorio =
        botaoAvatar.querySelector(
            ":scope > svg"
        );

    if (iconeProvisorio) {

        iconeProvisorio.remove();

    }

    const imagem =
        document.createElement("img");

    imagem.src =
        avatarSelecionado;

    imagem.alt =
        t("Avatar selecionado");

    imagem.className =
        "avatar-imagem-selecionada";

    botaoAvatar.insertBefore(
        imagem,
        botaoAvatar.firstChild
    );

}


/* =========================================================
   CONFIRMAR AVATAR
========================================================= */

if (confirmarAvatar) {

    confirmarAvatar.addEventListener(
        "click",
        () => {

            if (!avatarTemporario) {
                return;
            }

            avatarSelecionado =
                avatarTemporario;

            atualizarAvatarPrincipal();

            fecharAvatarModal();

        }
    );

}


/* =========================================================
   ESC — AVATAR / AVISO
========================================================= */

document.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key !== "Escape") {
            return;
        }

        if (
            popupAviso &&
            popupAviso.classList.contains(
                "ativo"
            )
        ) {

            esconderAviso();

            return;
        }

        if (
            avatarModal &&
            avatarModal.classList.contains(
                "ativo"
            )
        ) {

            fecharAvatarModal();

        }

    }
);


/* =========================================================
   IDIOMA — SELETOR PERSONALIZADO
========================================================= */

const idiomaPersonalizado =
    document.getElementById(
        "idiomaPersonalizado"
    );

const idiomaBotao =
    document.getElementById(
        "idiomaBotao"
    );

const idiomaSelecionado =
    document.getElementById(
        "idiomaSelecionado"
    );

const idiomaOpcoes =
    document.querySelectorAll(
        ".idioma-opcao"
    );


/* =========================================================
   NOMES DOS IDIOMAS
========================================================= */

const nomesIdiomas = {

    pt:
        "Português (Brasil)",

    en:
        "English",

    es:
        "Español"

};


/* =========================================================
   IDIOMA ATUAL
========================================================= */

let idiomaAtual =
    localStorage.getItem(
        "bventureIdioma"
    ) || "pt";


if (
    !["pt", "en", "es"].includes(
        idiomaAtual
    )
) {

    idiomaAtual =
        "pt";

}


/* =========================================================
   ATUALIZAR VISUAL
========================================================= */

function atualizarSeletorIdioma(
    idioma
) {

    if (idiomaSelecionado) {

        idiomaSelecionado.textContent =
            nomesIdiomas[idioma];

    }

    idiomaOpcoes.forEach(
        (opcao) => {

            const selecionada =
                opcao.dataset.idioma ===
                idioma;

            opcao.classList.toggle(
                "ativo",
                selecionada
            );

            opcao.setAttribute(
                "aria-selected",
                selecionada
                    ? "true"
                    : "false"
            );

        }
    );

}


/* =========================================================
   MOSTRAR IDIOMA SALVO
========================================================= */

atualizarSeletorIdioma(
    idiomaAtual
);


/* =========================================================
   ABRIR / FECHAR MENU DE IDIOMA
========================================================= */

if (
    idiomaPersonalizado &&
    idiomaBotao
) {

    idiomaBotao.addEventListener(
        "click",
        () => {

            const aberto =
                idiomaPersonalizado
                    .classList
                    .toggle(
                        "aberto"
                    );

            idiomaBotao.setAttribute(
                "aria-expanded",
                aberto
                    ? "true"
                    : "false"
            );

        }
    );

}


/* =========================================================
   ESCOLHER IDIOMA
========================================================= */

idiomaOpcoes.forEach(
    (opcao) => {

        opcao.addEventListener(
            "click",
            () => {

                const novoIdioma =
                    opcao.dataset.idioma;

                if (
                    !["pt", "en", "es"]
                        .includes(
                            novoIdioma
                        )
                ) {

                    return;

                }

                if (
                    typeof alterarIdioma ===
                    "function"
                ) {

                    alterarIdioma(
                        novoIdioma
                    );

                }
                else {

                    localStorage.setItem(
                        "bventureIdioma",
                        novoIdioma
                    );

                }

                idiomaAtual =
                    novoIdioma;

                atualizarSeletorIdioma(
                    novoIdioma
                );

                idiomaPersonalizado
                    ?.classList
                    .remove(
                        "aberto"
                    );

                idiomaBotao
                    ?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

            }
        );

    }
);


/* =========================================================
   CLICAR FORA — FECHAR IDIOMA
========================================================= */

document.addEventListener(
    "click",
    (evento) => {

        if (
            idiomaPersonalizado &&
            !idiomaPersonalizado.contains(
                evento.target
            )
        ) {

            idiomaPersonalizado
                .classList
                .remove(
                    "aberto"
                );

            idiomaBotao
                ?.setAttribute(
                    "aria-expanded",
                    "false"
                );

        }

    }
);


/* =========================================================
   ESC — FECHAR IDIOMA
========================================================= */

document.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key !== "Escape") {
            return;
        }

        idiomaPersonalizado
            ?.classList
            .remove(
                "aberto"
            );

        idiomaBotao
            ?.setAttribute(
                "aria-expanded",
                "false"
            );

    }
);


/* =========================================================
   NICK
========================================================= */

if (campoNick) {

    campoNick.addEventListener(
        "input",
        () => {

            campoNick.value =
                campoNick.value.replace(
                    /\s/g,
                    ""
                );

        }
    );

}


/* =========================================================
   CRIAR PERFIL
========================================================= */

if (formPerfil) {

    formPerfil.addEventListener(
        "submit",
        async (evento) => {

            evento.preventDefault();


            /* =================================================
               DADOS
            ================================================= */

            const nome =
                campoNome.value.trim();

            const nick =
                campoNick.value.trim();

            const idade =
                Number(
                    campoIdade.value
                );

            const sexoSelecionado =
                document.querySelector(
                    'input[name="sexo"]:checked'
                );


            /* =================================================
               CAMPOS OBRIGATÓRIOS
            ================================================= */

            if (
                !nome ||
                !nick ||
                !campoIdade.value ||
                !sexoSelecionado
            ) {

                mostrarAviso(
                    t(
                        "Preencha todos os campos para continuar."
                    )
                );

                return;

            }


            /* =================================================
               AVATAR
            ================================================= */

            if (!avatarSelecionado) {

                mostrarAviso(
                    t(
                        "Escolha um avatar para continuar."
                    )
                );

                return;

            }


            /* =================================================
               NOME
            ================================================= */

            if (nome.length < 2) {

                mostrarAviso(
                    t(
                        "Digite um nome com pelo menos 2 caracteres."
                    )
                );

                campoNome.focus();

                return;

            }


            /* =================================================
               NICK
            ================================================= */

            if (nick.length < 3) {

                mostrarAviso(
                    t(
                        "Seu nick precisa ter pelo menos 3 caracteres."
                    )
                );

                campoNick.focus();

                return;

            }


            /* =================================================
               IDADE
            ================================================= */

            if (
                !Number.isInteger(idade) ||
                idade < 1 ||
                idade > 120
            ) {

                mostrarAviso(
                    t(
                        "Digite uma idade válida entre 1 e 120 anos."
                    )
                );

                campoIdade.focus();

                return;

            }


            /* =================================================
               USUÁRIO FIREBASE
            ================================================= */

            const usuario =
                auth.currentUser;


            if (!usuario) {

                mostrarAviso(
                    t(
                        "Sua sessão não foi encontrada. Entre novamente na sua conta."
                    )
                );

                return;

            }


            /* =================================================
               BOTÃO COMEÇAR
            ================================================= */

            const botaoComecar =
                formPerfil.querySelector(
                    'button[type="submit"]'
                );


            if (botaoComecar) {

                botaoComecar.disabled =
                    true;

            }


            /* =================================================
               LOADING
            ================================================= */

            if (
                typeof mostrarLoading ===
                "function"
            ) {

                mostrarLoading(
                    t(
                        "Preparando sua aventura..."
                    )
                );

            }


            /* =================================================
               PERFIL
            ================================================= */

            const jogador = {

                nome:
                    nome,

                nick:
                    nick,

                idade:
                    idade,

                sexo:
                    sexoSelecionado.value,

                idioma:
                    localStorage.getItem(
                        "bventureIdioma"
                    ) || "pt",

                avatar:
                    avatarSelecionado,

                email:
                    usuario.email,

                uid:
                    usuario.uid

            };


            /* =================================================
               SALVAR NO FIRESTORE
            ================================================= */

            try {

                await setDoc(
                    doc(
                        db,
                        "usuarios",
                        usuario.uid
                    ),
                    {

                        nome:
                            jogador.nome,

                        nick:
                            jogador.nick,

                        idade:
                            jogador.idade,

                        sexo:
                            jogador.sexo,

                        idioma:
                            jogador.idioma,

                        avatar:
                            jogador.avatar,

                        email:
                            jogador.email,

                        criadoEm:
                            serverTimestamp()

                    }
                );


                /* =============================================
                   CÓPIA LOCAL PARA INTERFACE DO JOGO
                ============================================= */

                localStorage.setItem(
                    "bventureJogador",
                    JSON.stringify(
                        jogador
                    )
                );


                console.log(
                    "Perfil salvo no Firestore:",
                    jogador
                );


                /* =============================================
                   LOADING
                ============================================= */

                if (
                    typeof alterarMensagemLoading ===
                    "function"
                ) {

                    alterarMensagemLoading(
                        t(
                            "Tudo pronto para explorar!"
                        )
                    );

                }


                /* =============================================
                   ENTRAR NO APP
                ============================================= */

                setTimeout(
                    () => {

                        window.location.href =
                            "app.html";

                    },
                    600
                );

            }


            /* =================================================
               ERRO
            ================================================= */

            catch (erro) {

                console.error(
                    "Erro ao salvar perfil no Firestore:",
                    erro
                );


                if (botaoComecar) {

                    botaoComecar.disabled =
                        false;

                }


                if (
                    typeof esconderLoading ===
                    "function"
                ) {

                    esconderLoading();

                }


                mostrarAviso(
                    t(
                        "Não foi possível salvar seu perfil. Verifique sua conexão e tente novamente."
                    )
                );

            }

        }
    );

}