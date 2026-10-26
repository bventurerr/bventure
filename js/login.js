/* =========================================================
   BVENTURE
   LOGIN + CADASTRO
========================================================= */


/* =========================================================
   FIREBASE
========================================================= */

import {
    auth,
    db,
    googleProvider
} from "./firebase.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    sendPasswordResetEmail,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";


/* =========================================================
   ENTRADA INICIAL DA TELA DE LOGIN
========================================================= */

const telaLogin =
    document.querySelector(".login");


function animarEntradaLogin() {

    if (!telaLogin) {
        return;
    }

    telaLogin.classList.remove(
        "preparando-entrada",
        "entrada-ativa"
    );

    telaLogin.classList.add(
        "preparando-entrada"
    );

    setTimeout(() => {

        telaLogin.classList.add(
            "entrada-ativa"
        );

    }, 100);


    setTimeout(() => {

        telaLogin.classList.remove(
            "preparando-entrada",
            "entrada-ativa"
        );

    }, 1000);

}


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const formulariosContainer =
    document.getElementById("formulariosContainer");

const cardLogin =
    document.getElementById("cardLogin");

const cardCadastro =
    document.getElementById("cardCadastro");

const abrirCadastro =
    document.getElementById("abrirCadastro");

const abrirLogin =
    document.getElementById("abrirLogin");


/* =========================================================
   FORMULÁRIO DE LOGIN
========================================================= */

const formLogin =
    document.getElementById("formLogin");

const campoEmail =
    document.getElementById("email");

const campoSenha =
    document.getElementById("senha");

const botaoMostrarSenha =
    document.getElementById("mostrarSenha");

const botaoGoogle =
    document.getElementById("loginGoogle");

const botaoEsqueciSenha =
    document.getElementById("esqueciSenha");


/* =========================================================
   FORMULÁRIO DE CADASTRO
========================================================= */

const formCadastro =
    document.getElementById("formCadastro");

const emailCadastro =
    document.getElementById("emailCadastro");

const senhaCadastro =
    document.getElementById("senhaCadastro");

const confirmarSenha =
    document.getElementById("confirmarSenha");

const mostrarSenhaCadastro =
    document.getElementById("mostrarSenhaCadastro");

const cadastroGoogle =
    document.getElementById("cadastroGoogle");


/* =========================================================
   POPUP
========================================================= */

const popupAviso =
    document.getElementById("popupAviso");

const popupMensagem =
    document.getElementById("popupMensagem");

const fecharPopup =
    document.getElementById("fecharPopup");


/* =========================================================
   MOSTRAR POPUP
========================================================= */

function mostrarPopup(mensagem) {

    if (!popupAviso || !popupMensagem) {
        return;
    }

    popupMensagem.textContent =
        mensagem;

    popupAviso.classList.add(
        "ativo"
    );

    popupAviso.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================================
   FECHAR POPUP
========================================================= */

function esconderPopup() {

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

}


/* =========================================================
   BOTÃO X DO POPUP
========================================================= */

if (fecharPopup) {

    fecharPopup.addEventListener(
        "click",
        esconderPopup
    );

}


/* =========================================================
   FECHAR POPUP CLICANDO FORA
========================================================= */

if (popupAviso) {

    popupAviso.addEventListener(
        "click",
        (evento) => {

            if (
                evento.target === popupAviso
            ) {

                esconderPopup();

            }

        }
    );

}


/* =========================================================
   FECHAR POPUP COM ESC
========================================================= */

document.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Escape" &&
            popupAviso &&
            popupAviso.classList.contains("ativo")
        ) {

            esconderPopup();

        }

    }
);


/* =========================================================
   AJUSTAR ALTURA DO CONTAINER
========================================================= */

function ajustarAltura(card) {

    if (
        !card ||
        !formulariosContainer
    ) {

        return;

    }

    formulariosContainer.style.height =
        `${card.offsetHeight}px`;

}


/* =========================================================
   ESTADO INICIAL
========================================================= */

function iniciarFormularios() {

    if (
        !formulariosContainer ||
        !cardLogin ||
        !cardCadastro
    ) {

        return;

    }

    formulariosContainer.classList.remove(
        "mostrar-cadastro"
    );

    cardLogin.setAttribute(
        "aria-hidden",
        "false"
    );

    cardCadastro.setAttribute(
        "aria-hidden",
        "true"
    );

    ajustarAltura(
        cardLogin
    );

}


/* =========================================================
   ANIMAR TROCA DE FORMULÁRIO
========================================================= */

function animarEntradaFormulario(
    card
) {

    if (!card) {

        return;

    }

    card.classList.remove(
        "preparando-formulario",
        "formulario-entrando"
    );

    card.classList.add(
        "preparando-formulario"
    );

    setTimeout(
        () => {

            card.classList.add(
                "formulario-entrando"
            );

        },
        100
    );

    setTimeout(
        () => {

            card.classList.remove(
                "preparando-formulario",
                "formulario-entrando"
            );

        },
        800
    );

}


/* =========================================================
   ABRIR CADASTRO
========================================================= */

if (abrirCadastro) {

    abrirCadastro.addEventListener(
        "click",
        () => {

            formulariosContainer
                .classList
                .add(
                    "mostrar-cadastro"
                );

            cardLogin.setAttribute(
                "aria-hidden",
                "true"
            );

            cardCadastro.setAttribute(
                "aria-hidden",
                "false"
            );

            ajustarAltura(
                cardCadastro
            );

            animarEntradaFormulario(
                cardCadastro
            );

        }
    );

}


/* =========================================================
   VOLTAR PARA LOGIN
========================================================= */

if (abrirLogin) {

    abrirLogin.addEventListener(
        "click",
        () => {

            formulariosContainer
                .classList
                .remove(
                    "mostrar-cadastro"
                );

            cardCadastro.setAttribute(
                "aria-hidden",
                "true"
            );

            cardLogin.setAttribute(
                "aria-hidden",
                "false"
            );

            ajustarAltura(
                cardLogin
            );

            animarEntradaFormulario(
                cardLogin
            );

        }
    );

}


/* =========================================================
   FUNÇÃO MOSTRAR / OCULTAR SENHA
========================================================= */

function configurarMostrarSenha(
    botao,
    campo
) {

    if (
        !botao ||
        !campo
    ) {

        return;

    }

    botao.addEventListener(
        "click",
        () => {

            const estaVisivel =
                campo.type === "text";

            if (estaVisivel) {

                campo.type =
                    "password";

                botao.setAttribute(
                    "aria-label",
                    "Mostrar senha"
                );

            }
            else {

                campo.type =
                    "text";

                botao.setAttribute(
                    "aria-label",
                    "Ocultar senha"
                );

            }

        }
    );

}


/* =========================================================
   OLHO DA SENHA - LOGIN
========================================================= */

configurarMostrarSenha(
    botaoMostrarSenha,
    campoSenha
);


/* =========================================================
   OLHO DA SENHA - CADASTRO
========================================================= */

configurarMostrarSenha(
    mostrarSenhaCadastro,
    senhaCadastro
);


/* =========================================================
   CARREGAR PERFIL DO FIRESTORE
========================================================= */

async function buscarPerfilUsuario(usuario) {

    const referenciaPerfil =
        doc(
            db,
            "usuarios",
            usuario.uid
        );

    const perfil =
        await getDoc(
            referenciaPerfil
        );

    return perfil;

}


/* =========================================================
   SALVAR PERFIL LOCALMENTE
========================================================= */

function salvarPerfilLocal(
    usuario,
    dadosPerfil
) {

    const jogador = {

        ...dadosPerfil,

        uid:
            usuario.uid,

        email:
            usuario.email

    };

    localStorage.setItem(
        "bventureJogador",
        JSON.stringify(jogador)
    );


    if (dadosPerfil.idioma) {

        localStorage.setItem(
            "bventureIdioma",
            dadosPerfil.idioma
        );

    }

}


/* =========================================================
   ENCAMINHAR USUÁRIO APÓS LOGIN
========================================================= */

async function encaminharUsuario(
    usuario
) {

    const perfil =
        await buscarPerfilUsuario(
            usuario
        );


    /* PERFIL JÁ EXISTE */

    if (perfil.exists()) {

        salvarPerfilLocal(
            usuario,
            perfil.data()
        );


        if (
            typeof alterarMensagemLoading ===
            "function"
        ) {

            alterarMensagemLoading(
                t("Preparando sua aventura...")
            );

        }


        setTimeout(
            () => {

                window.location.href =
                    "app.html";

            },
            700
        );

        return;

    }


    /* AINDA NÃO CRIOU PERFIL */

    if (
        typeof alterarMensagemLoading ===
        "function"
    ) {

        alterarMensagemLoading(
            t("Vamos criar seu perfil...")
        );

    }


    setTimeout(
        () => {

            window.location.href =
                "criar-perfil.html";

        },
        700
    );

}

/* =========================================================
   VERIFICAR SESSÃO EXISTENTE
========================================================= */

let sessaoInicialVerificada = false;

onAuthStateChanged(
    auth,
    async (usuario) => {

        // Evita executar novamente durante alterações
        // de autenticação na própria tela de login.
        if (sessaoInicialVerificada) {
            return;
        }

        sessaoInicialVerificada = true;


        // Nenhum usuário conectado
        if (!usuario) {
            return;
        }


        // Conta de e-mail ainda não verificada
        if (
            usuario.providerData.some(
                (provider) =>
                    provider.providerId === "password"
            ) &&
            !usuario.emailVerified
        ) {
            return;
        }


        try {

            if (
                typeof mostrarLoading ===
                "function"
            ) {

                mostrarLoading(
                    t("Preparando sua aventura...")
                );

            }


            await encaminharUsuario(
                usuario
            );

        }
        catch (erro) {

            console.error(
                "Erro ao restaurar sessão:",
                erro
            );


            if (
                typeof esconderLoading ===
                "function"
            ) {

                esconderLoading();

            }

        }

    }
);

/* =========================================================
   TRATAR ERROS DE AUTENTICAÇÃO
========================================================= */

function mensagemErroFirebase(erro) {

    switch (erro.code) {

        case "auth/invalid-email":

            return t("Digite um e-mail válido.");


        case "auth/invalid-credential":

            return t("E-mail ou senha incorretos.");


        case "auth/email-already-in-use":

            return t("Já existe uma conta cadastrada com este e-mail.");


        case "auth/weak-password":

            return t("A senha informada é muito fraca.");


        case "auth/too-many-requests":

            return t("Muitas tentativas foram realizadas. Aguarde um pouco e tente novamente.");


        case "auth/network-request-failed":

            return t("Não foi possível conectar. Verifique sua internet.");


        case "auth/popup-closed-by-user":

            return t("O login com Google foi cancelado.");


        case "auth/popup-blocked":

            return t("O navegador bloqueou a janela de login do Google.");


        default:

            return t("Não foi possível concluir a operação. Tente novamente.");

    }

}


/* =========================================================
   ENVIAR LOGIN
========================================================= */

if (formLogin) {

    formLogin.addEventListener(
        "submit",
        async (evento) => {

            evento.preventDefault();


            /* DADOS */

            const email =
                campoEmail.value.trim();

            const senha =
                campoSenha.value;


            /* CAMPOS VAZIOS */

            if (
                !email ||
                !senha
            ) {

                mostrarPopup(
                    t("Preencha o e-mail e a senha.")
                );

                return;

            }


            /* BOTÃO */

            const botaoEntrar =
                formLogin.querySelector(
                    'button[type="submit"]'
                );

            if (botaoEntrar) {

                botaoEntrar.disabled =
                    true;

            }


            /* LOADING */

            if (
                typeof mostrarLoading ===
                "function"
            ) {

                mostrarLoading(
                    t("Entrando no BVenture...")
                );

            }


            /* FIREBASE */

            try {

                const credencial =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        senha
                    );

                const usuario =
                    credencial.user;


                /* E-MAIL AINDA NÃO VERIFICADO */

                if (!usuario.emailVerified) {

                    if (
                        typeof esconderLoading ===
                        "function"
                    ) {

                        esconderLoading();

                    }

                    mostrarPopup(
                        t("Verifique seu e-mail antes de entrar no BVenture.")
                    );

                    if (botaoEntrar) {

                        botaoEntrar.disabled =
                            false;

                    }

                    return;

                }


                /* PERFIL */

                await encaminharUsuario(
                    usuario
                );

            }
            catch (erro) {

                console.error(
                    "Erro ao entrar:",
                    erro
                );

                if (
                    typeof esconderLoading ===
                    "function"
                ) {

                    esconderLoading();

                }

                if (botaoEntrar) {

                    botaoEntrar.disabled =
                        false;

                }

                mostrarPopup(
                    mensagemErroFirebase(
                        erro
                    )
                );

            }

        }
    );

}


/* =========================================================
   ENVIAR CADASTRO
========================================================= */

if (formCadastro) {

    formCadastro.addEventListener(
        "submit",
        async (evento) => {

            evento.preventDefault();


            /* DADOS */

            const email =
                emailCadastro.value.trim();

            const senha =
                senhaCadastro.value;

            const confirmacao =
                confirmarSenha.value;


            /* CAMPOS VAZIOS */

            if (
                !email ||
                !senha ||
                !confirmacao
            ) {

                mostrarPopup(
                    t("Preencha todos os campos.")
                );

                return;

            }


            /* SENHA */

            if (
                senha.length < 8
            ) {

                mostrarPopup(
                    t("A senha precisa ter pelo menos 8 caracteres.")
                );

                senhaCadastro.focus();

                return;

            }


            /* SENHAS DIFERENTES */

            if (
                senha !== confirmacao
            ) {

                mostrarPopup(
                    t("As senhas não são iguais.")
                );

                confirmarSenha.focus();

                return;

            }


            /* BOTÃO */

            const botaoCadastrar =
                formCadastro.querySelector(
                    'button[type="submit"]'
                );

            if (botaoCadastrar) {

                botaoCadastrar.disabled =
                    true;

            }


            /* LOADING */

            if (
                typeof mostrarLoading ===
                "function"
            ) {

                mostrarLoading(
                    t("Criando sua conta...")
                );

            }


            /* FIREBASE */

            try {

                const credencial =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        senha
                    );

                const usuario =
                    credencial.user;


                /* ENVIAR VERIFICAÇÃO */

                const configuracaoVerificacao = {
                    url: window.location.origin + "/login.html",
                    handleCodeInApp: false
                };

                await sendEmailVerification(
                    usuario,
                    configuracaoVerificacao
                );


                


                if (
                    typeof esconderLoading ===
                    "function"
                ) {

                    esconderLoading();

                }


                mostrarPopup(
                    t(
                        "Sua conta foi criada. Enviamos um link de verificação para o seu e-mail. Verifique sua conta e depois entre pelo login para continuar."
                    )
                );

                emailCadastro.value =
                    "";

                senhaCadastro.value =
                    "";

                confirmarSenha.value =
                    "";

                if (botaoCadastrar) {

                    botaoCadastrar.disabled =
                        false;

                }



               

            }
            catch (erro) {

                console.error(
                    "Erro ao criar conta:",
                    erro
                );

                if (
                    typeof esconderLoading ===
                    "function"
                ) {

                    esconderLoading();

                }

                if (botaoCadastrar) {

                    botaoCadastrar.disabled =
                        false;

                }

                mostrarPopup(
                    mensagemErroFirebase(
                        erro
                    )
                );

            }

        }
    );

}


/* =========================================================
   LOGIN COM GOOGLE
========================================================= */

if (botaoGoogle) {

    botaoGoogle.addEventListener(
        "click",
        async () => {

            try {

                if (
                    typeof mostrarLoading ===
                    "function"
                ) {

                    mostrarLoading(
                        t("Entrando com Google...")
                    );

                }


                const resultado =
                    await signInWithPopup(
                        auth,
                        googleProvider
                    );

                const usuario =
                    resultado.user;


                await encaminharUsuario(
                    usuario
                );

            }
            catch (erro) {

                console.error(
                    t("Erro no login com Google:"),
                    erro
                );

                if (
                    typeof esconderLoading ===
                    "function"
                ) {

                    esconderLoading();

                }

                mostrarPopup(
                    mensagemErroFirebase(
                        erro
                    )
                );

            }

        }
    );

}


/* =========================================================
   CADASTRO COM GOOGLE
========================================================= */

if (cadastroGoogle) {

    cadastroGoogle.addEventListener(
        "click",
        async () => {

            try {

                if (
                    typeof mostrarLoading ===
                    "function"
                ) {

                    mostrarLoading(
                        t("Continuando com Google...")
                    );

                }


                const resultado =
                    await signInWithPopup(
                        auth,
                        googleProvider
                    );

                const usuario =
                    resultado.user;


                /*
                    Se a conta Google já tiver perfil,
                    entra no BVenture.

                    Se ainda não tiver perfil,
                    vai para criar-perfil.html.
                */

                await encaminharUsuario(
                    usuario
                );

            }
            catch (erro) {

                console.error(
                    "Erro no cadastro com Google:",
                    erro
                );

                if (
                    typeof esconderLoading ===
                    "function"
                ) {

                    esconderLoading();

                }

                mostrarPopup(
                    mensagemErroFirebase(
                        erro
                    )
                );

            }

        }
    );

}


/* =========================================================
   ESQUECI MINHA SENHA
========================================================= */

if (botaoEsqueciSenha) {

    botaoEsqueciSenha.addEventListener(
        "click",
        async () => {

            const email =
                campoEmail.value.trim();


            /* PRECISA INFORMAR O E-MAIL */

            if (!email) {

                mostrarPopup(
                    t("Digite seu e-mail no campo de login para recuperar sua senha.")
                );

                campoEmail.focus();

                return;

            }


            try {

                await sendPasswordResetEmail(
                    auth,
                    email
                );


                mostrarPopup(
                    t("Enviamos um link para redefinir sua senha. Verifique seu e-mail.")
                );

            }
            catch (erro) {

                console.error(
                    "Erro ao recuperar senha:",
                    erro
                );

                mostrarPopup(
                    mensagemErroFirebase(
                        erro
                    )
                );

            }

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
            !formulariosContainer
        ) {

            return;

        }

        const cadastroAberto =
            formulariosContainer.classList.contains(
                "mostrar-cadastro"
            );

        if (cadastroAberto) {

            ajustarAltura(
                cardCadastro
            );

        }
        else {

            ajustarAltura(
                cardLogin
            );

        }

    }
);


/* =========================================================
   GARANTIR ALTURA CORRETA APÓS CARREGAR
========================================================= */

window.addEventListener(
    "load",
    () => {

        if (
            !formulariosContainer
        ) {

            return;

        }

        const cadastroAberto =
            formulariosContainer.classList.contains(
                "mostrar-cadastro"
            );

        if (cadastroAberto) {

            ajustarAltura(
                cardCadastro
            );

        }
        else {

            ajustarAltura(
                cardLogin
            );

        }

    }
);


/* =========================================================
   INICIAR
========================================================= */

iniciarFormularios();

animarEntradaLogin();