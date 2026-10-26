/* =========================================================
   BVENTURE
   CADASTRO
========================================================= */


/* =========================================================
   FIREBASE
========================================================= */

import {
    auth
} from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";


/* =========================================================
   INICIAR PÁGINA
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTOS
    ===================================================== */

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


    /* =====================================================
       ELEMENTOS DO POPUP
    ===================================================== */

    const popupAviso =
        document.getElementById("popupAviso");

    const fecharPopupAviso =
        document.getElementById("fecharPopupAviso");

    const popupAvisoTitulo =
        document.getElementById("popupAvisoTitulo");

    const popupAvisoTexto =
        document.getElementById("popupAvisoTexto");


    /* =====================================================
       VERIFICAR ELEMENTOS PRINCIPAIS
    ===================================================== */

    if (
        !formCadastro ||
        !emailCadastro ||
        !senhaCadastro ||
        !confirmarSenha
    ) {

        console.error(
            "Erro: elementos principais do cadastro não foram encontrados."
        );

        return;
    }


    /* =====================================================
       POPUP DE AVISO
    ===================================================== */

    function mostrarPopup(titulo, texto) {

        if (
            !popupAviso ||
            !popupAvisoTitulo ||
            !popupAvisoTexto
        ) {

            console.log(
                titulo + ": " + texto
            );

            return;
        }


        popupAvisoTitulo.textContent =
            titulo;

        popupAvisoTexto.textContent =
            texto;


        popupAviso.classList.add(
            "ativo"
        );

        popupAviso.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function fecharPopup() {

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


    if (fecharPopupAviso) {

        fecharPopupAviso.addEventListener(
            "click",
            fecharPopup
        );

    }


    if (popupAviso) {

        popupAviso.addEventListener(
            "click",
            function (evento) {

                if (
                    evento.target === popupAviso
                ) {

                    fecharPopup();

                }

            }
        );

    }


    /* =====================================================
       MOSTRAR / ESCONDER SENHA
    ===================================================== */

    if (mostrarSenhaCadastro) {

        mostrarSenhaCadastro.addEventListener(
            "click",
            function () {

                if (
                    senhaCadastro.type === "password"
                ) {

                    senhaCadastro.type =
                        "text";

                    mostrarSenhaCadastro.setAttribute(
                        "aria-label",
                        "Ocultar senha"
                    );

                }
                else {

                    senhaCadastro.type =
                        "password";

                    mostrarSenhaCadastro.setAttribute(
                        "aria-label",
                        "Mostrar senha"
                    );

                }

            }
        );

    }


    /* =====================================================
       TECLADO MOBILE
    ===================================================== */

    emailCadastro.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Enter") {

                evento.preventDefault();
                evento.stopPropagation();

                senhaCadastro.focus();

            }

        }
    );


    senhaCadastro.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Enter") {

                evento.preventDefault();
                evento.stopPropagation();

                confirmarSenha.focus();

            }

        }
    );


    confirmarSenha.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Enter") {

                evento.preventDefault();
                evento.stopPropagation();

                confirmarSenha.blur();

            }

        }
    );


    /* =====================================================
       CADASTRO
    ===================================================== */

    formCadastro.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            /* =================================================
               DADOS
            ================================================= */

            const email =
                emailCadastro.value.trim();

            const senha =
                senhaCadastro.value;

            const confirmacao =
                confirmarSenha.value;


            /* =================================================
               CAMPOS VAZIOS
            ================================================= */

            if (
                email === "" ||
                senha === "" ||
                confirmacao === ""
            ) {

                mostrarPopup(
                    t("Campos incompletos"),
                    t("Preencha todos os campos para continuar.")
                );

                return;

            }


            /* =================================================
               TAMANHO DA SENHA
            ================================================= */

            if (senha.length < 8) {

                mostrarPopup(
                    t("Senha muito curta"),
                    t("A senha precisa ter pelo menos 8 caracteres.")
                );

                senhaCadastro.focus();

                return;

            }


            /* =================================================
               CONFIRMAR SENHA
            ================================================= */

            if (senha !== confirmacao) {

                mostrarPopup(
                    t("Senhas diferentes"),
                    t("As senhas informadas não são iguais.")
                );

                confirmarSenha.focus();

                return;

            }


            /* =================================================
               BOTÃO
            ================================================= */

            const botaoCadastrar =
                formCadastro.querySelector(
                    'button[type="submit"]'
                );


            if (botaoCadastrar) {

                botaoCadastrar.disabled =
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
                        "Criando sua conta..."
                    )
                );

            }


            /* =================================================
               CRIAR CONTA NO FIREBASE
            ================================================= */

            try {

                const credencial =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        senha
                    );


                const usuario =
                    credencial.user;


                /* =============================================
                   ENVIAR VERIFICAÇÃO DE E-MAIL
                ============================================= */

                if (
                    typeof alterarMensagemLoading ===
                    "function"
                ) {

                    alterarMensagemLoading(
                        t(
                            "Enviando verificação..."
                        )
                    );

                }


               const configuracaoVerificacao = {
                    url: window.location.origin + "/login.html",
                    handleCodeInApp: false
                };

                await sendEmailVerification(
                    usuario,
                    configuracaoVerificacao
                );


                

                /* =============================================
                   FINALIZAR LOADING
                ============================================= */

                if (
                    typeof esconderLoading ===
                    "function"
                ) {

                    esconderLoading();

                }


                /* =============================================
                   AVISAR USUÁRIO
                ============================================= */

                mostrarPopup(
                    t(
                        "Verifique seu e-mail"
                    ),
                    t(
                        "Sua conta foi criada. Enviamos um link de verificação para o seu e-mail. Verifique sua conta e depois entre pelo login para continuar."
                    )
                );


                /* =============================================
                LIMPAR CAMPOS
                ============================================= */

                emailCadastro.value =
                    "";

                senhaCadastro.value =
                    "";

                confirmarSenha.value =
                    "";


                /* =============================================
                REATIVAR BOTÃO
                ============================================= */

                if (
                    botaoCadastrar
                ) {

                    botaoCadastrar.disabled =
                        false;

                }

            }


            /* =================================================
               ERRO NO CADASTRO
            ================================================= */

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


                /* =============================================
                   E-MAIL JÁ CADASTRADO
                ============================================= */

                if (
                    erro.code ===
                    "auth/email-already-in-use"
                ) {

                    mostrarPopup(
                        t("E-mail já cadastrado"),
                        t("Já existe uma conta utilizando este e-mail.")
                    );

                    return;

                }


                /* =============================================
                   E-MAIL INVÁLIDO
                ============================================= */

                if (
                    erro.code ===
                    "auth/invalid-email"
                ) {

                    mostrarPopup(
                        t("E-mail inválido"),
                        t("Digite um endereço de e-mail válido.")
                    );

                    return;

                }


                /* =============================================
                   SENHA FRACA
                ============================================= */

                if (
                    erro.code ===
                    "auth/weak-password"
                ) {

                    mostrarPopup(
                        t("Senha inválida"),
                        t("Escolha uma senha mais segura.")
                    );

                    return;

                }


                /* =============================================
                   PROBLEMA DE REDE
                ============================================= */

                if (
                    erro.code ===
                    "auth/network-request-failed"
                ) {

                    mostrarPopup(
                        t("Sem conexão"),
                        t("Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.")
                    );

                    return;

                }


                /* =============================================
                   OUTRO ERRO
                ============================================= */

                mostrarPopup(
                    t("Não foi possível criar a conta"),
                    t("Ocorreu um problema ao realizar o cadastro. Tente novamente.")
                );

            }

        }
    );


    /* =====================================================
       GOOGLE
    ===================================================== */

    if (cadastroGoogle) {

        cadastroGoogle.addEventListener(
            "click",
            function () {

                console.log(
                    "Cadastro com Google será configurado depois."
                );

            }
        );

    }


});