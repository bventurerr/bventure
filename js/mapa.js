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
   MAPA DE EXPLORAÇÃO — BOA VISTA
========================================================= */


/* =========================================================
   TOKEN MAPBOX
========================================================= */

/*
   IMPORTANTE:
   mantenha aqui o MESMO token Mapbox que já está
   funcionando no seu projeto.
*/

mapboxgl.accessToken = "pk.eyJ1IjoiYXJhdWp2azk2NSIsImEiOiJjbXZkNW96NGMwdm92MnpwZ2t3eDBlZHVuIn0.vixOHfQIYDLYcHIZigdzWA";


/* =========================================================
   CONFIGURAÇÕES DO MAPA
========================================================= */

const CONFIG_MAPA = {

    centro: [
        -60.6753,
        2.8235
    ],

    zoom: 13,

    pitch3D: 55,

    bearing3D: -12

};


/* =========================================================
   DESENVOLVIMENTO / PROXIMIDADE
========================================================= */

/*
   true
   → permite testar qualquer local.

   false
   → exige proximidade real.
*/

const MODO_DESENVOLVIMENTO = false;


/*
   Distância máxima para desbloquear
   quando MODO_DESENVOLVIMENTO = false.
*/

const RAIO_DESBLOQUEIO_METROS = 100;


/* =========================================================
   ELEMENTOS DO MAPA
========================================================= */

const botaoVoltar =
    document.getElementById(
        "voltarMissoes"
    );


const mapaPorcentagem =
    document.getElementById(
        "mapaPorcentagem"
    );


const botaoModoMapa =
    document.getElementById(
        "botaoModoMapa"
    );


const textoModoMapa =
    document.getElementById(
        "textoModoMapa"
    );


/* =========================================================
   POPUP DE LOCALIZAÇÃO
========================================================= */

const localizacaoModal =
    document.getElementById(
        "localizacaoModal"
    );


const permitirLocalizacao =
    document.getElementById(
        "permitirLocalizacao"
    );


const negarLocalizacao =
    document.getElementById(
        "negarLocalizacao"
    );

/* =========================================================
   POPUP DO LOCAL
========================================================= */

const modal =
    document.getElementById(
        "localModal"
    );


const fecharLocal =
    document.getElementById(
        "fecharLocal"
    );


const fecharModalFundo =
    document.getElementById(
        "fecharModalFundo"
    );


const localImagem =
    document.getElementById(
        "localImagem"
    );


const localNome =
    document.getElementById(
        "localNome"
    );


const desbloquearLocal =
    document.getElementById(
        "desbloquearLocal"
    );


/* =========================================================
   PUZZLE
========================================================= */

const puzzleModal =
    document.getElementById(
        "puzzleModal"
    );


const puzzleTitulo =
    document.getElementById(
        "puzzleTitulo"
    );


const puzzleTabuleiro =
    document.getElementById(
        "puzzleTabuleiro"
    );


const puzzleStatus =
    document.getElementById(
        "puzzleStatus"
    );


const fecharPuzzle =
    document.getElementById(
        "fecharPuzzle"
    );


const puzzleEmbaralhar =
    document.getElementById(
        "puzzleEmbaralhar"
    );


/* =========================================================
   INFORMAÇÕES DO LOCAL
========================================================= */

const infoLocalModal =
    document.getElementById(
        "infoLocalModal"
    );


const fecharInfoLocal =
    document.getElementById(
        "fecharInfoLocal"
    );


const fecharInfoLocalFundo =
    document.getElementById(
        "fecharInfoLocalFundo"
    );


const infoGaleria =
    document.getElementById(
        "infoGaleria"
    );


const infoGaleriaIndicadores =
    document.getElementById(
        "infoGaleriaIndicadores"
    );


const infoLocalNome =
    document.getElementById(
        "infoLocalNome"
    );


const infoLocalCategoria =
    document.getElementById(
        "infoLocalCategoria"
    );


const infoLocalHistoria =
    document.getElementById(
        "infoLocalHistoria"
    );


const infoLocalCuriosidade =
    document.getElementById(
        "infoLocalCuriosidade"
    );


const infoLocalVisita =
    document.getElementById(
        "infoLocalVisita"
    );


const infoLocalAcessibilidade =
    document.getElementById(
        "infoLocalAcessibilidade"
    );


const infoLocalDica =
    document.getElementById(
        "infoLocalDica"
    );

/* =========================================================
   POPUP DE PROXIMIDADE
========================================================= */

const proximidadeModal =
    document.getElementById(
        "proximidadeModal"
    );

const proximidadeModalFundo =
    document.getElementById(
        "proximidadeModalFundo"
    );

const proximidadeTitulo =
    document.getElementById(
        "proximidadeTitulo"
    );

const proximidadeTexto =
    document.getElementById(
        "proximidadeTexto"
    );

const proximidadeDistanciaBox =
    document.getElementById(
        "proximidadeDistanciaBox"
    );

const proximidadeDistancia =
    document.getElementById(
        "proximidadeDistancia"
    );

const fecharProximidade =
    document.getElementById(
        "fecharProximidade"
    );

const acessarMissaoExtra =
    document.getElementById(
        "acessarMissaoExtra"
    );


/* =========================================================
   ESTADO
========================================================= */

let localSelecionado = null;

let primeiraLocalizacao = true;

let mapaEm3D = true;

let localizacaoJogador = null;

let localizacaoPermitida =
    sessionStorage.getItem(
        "bventureLocalizacaoPermitida"
    ) === "true";

/* =========================================================
   MARCADOR DO JOGADOR
========================================================= */

let marcadorJogador = null;


/*
   Ordem atual das peças do puzzle.

   Exemplo:

   [5, 2, 8, 0, 1, 7, 4, 3, 6]
*/

let ordemPuzzle = [];


/*
   Guarda a primeira peça selecionada.
*/

let primeiraPecaSelecionada = null;


/*
   Evita concluir o puzzle duas vezes.
*/

let puzzleConcluido = false;


/* =========================================================
   TROCA AUTOMÁTICA DA GALERIA
========================================================= */

/*
   intervaloGaleria:
   controla a troca automática entre
   as duas imagens.

   timeoutGaleria:
   usado quando o jogador passa
   manualmente para outra foto.

   TEMPO_TROCA_GALERIA:
   10000 ms = 10 segundos.
*/

let intervaloGaleria = null;

let timeoutGaleria = null;

const TEMPO_TROCA_GALERIA = 10000;


/* =========================================================
   VERIFICAR LOCAIS
========================================================= */

if (
    typeof pontosTuristicos ===
    "undefined"
) {

    console.error(
        "BVenture: pontosTuristicos não foi encontrado. " +
        "Verifique se js/locais.js está antes de js/mapa.js."
    );

}


/* =========================================================
   CRIAR MAPA
========================================================= */

const mapa =
    new mapboxgl.Map({

        container:
            "mapa",

        style:
            "mapbox://styles/mapbox/dark-v11",

        center:
            CONFIG_MAPA.centro,

        zoom:
            CONFIG_MAPA.zoom,

        pitch:
            CONFIG_MAPA.pitch3D,

        bearing:
            CONFIG_MAPA.bearing3D,

        antialias:
            true

    });


/* =========================================================
   ERROS DO MAPBOX
========================================================= */

mapa.on(
    "error",
    (evento) => {

        console.error(
            "Erro do Mapbox:",
            evento.error
        );

    }
);


/* =========================================================
   BOTÃO 2D / 3D
========================================================= */

function atualizarBotaoModoMapa() {

    if (
        !botaoModoMapa ||
        !textoModoMapa
    ) {

        return;

    }


    if (mapaEm3D) {

        textoModoMapa.textContent =
            "3D";


        botaoModoMapa.classList.add(
            "modo-3d"
        );


        botaoModoMapa.setAttribute(
            "aria-label",
            t("Mapa em modo 3D. Mudar para 2D")
        );

    }

    else {

        textoModoMapa.textContent =
            "2D";


        botaoModoMapa.classList.remove(
            "modo-3d"
        );


        botaoModoMapa.setAttribute(
            "aria-label",
            t("Mapa em modo 2D. Mudar para 3D")
        );

    }

}


/* =========================================================
   MUDAR ENTRE 2D E 3D
========================================================= */

let mudandoModoMapa = false;


function mudarModoMapa() {

    /*
       Evita vários cliques enquanto
       a câmera ainda está se movimentando.
    */

    if (
        mudandoModoMapa
    ) {

        return;

    }


    mudandoModoMapa =
        true;


    mapaEm3D =
        !mapaEm3D;


    /*
       Atualizar o botão imediatamente.
    */

    atualizarBotaoModoMapa();


    /*
       Dar um pequeno tempo para o navegador
       preparar o próximo frame.

       Isso ajuda principalmente em celulares,
       tablets e computadores mais fracos.
    */

    setTimeout(
        () => {

            mapa.easeTo({

                pitch:
                    mapaEm3D
                        ? CONFIG_MAPA.pitch3D
                        : 0,

                bearing:
                    mapaEm3D
                        ? CONFIG_MAPA.bearing3D
                        : 0,


                /*
                   1200ms deixa a mudança visível
                   sem ficar lenta demais.
                */

                duration:
                    1200,


                /*
                   Começa normalmente e desacelera
                   conforme chega ao destino.
                */

                easing:
                    (
                        t
                    ) => {

                        return (
                            1 -
                            Math.pow(
                                1 - t,
                                3
                            )
                        );

                    },


                /*
                   Mantém a animação ativa.
                */

                essential:
                    true

            });


            /*
               Liberar o botão somente depois
               da animação terminar.
            */

            setTimeout(
                () => {

                    mudandoModoMapa =
                        false;

                },
                1250
            );

        },
        50
    );

}

/* =========================================================
   EVENTO DO BOTÃO 2D / 3D
========================================================= */

if (
    botaoModoMapa
) {

    botaoModoMapa.addEventListener(
        "click",
        mudarModoMapa
    );

}


atualizarBotaoModoMapa();


/* =========================================================
   CONTROLES DO MAPBOX
========================================================= */

mapa.addControl(

    new mapboxgl.NavigationControl({

        showCompass:
            true,

        showZoom:
            true

    }),

    "bottom-right"

);

/* =========================================================
   POPUP DE PERMISSÃO DE LOCALIZAÇÃO
========================================================= */

function abrirPopupLocalizacao() {

    if (
        !localizacaoModal
    ) {

        return;

    }


    /*
       Preparar estado inicial.

       Primeiro o popup existe na tela,
       mas o card começa 45px abaixo.
    */

    localizacaoModal.classList.remove(
        "preparando-popup",
        "popup-entrando"
    );


    localizacaoModal.classList.add(
        "aberto",
        "preparando-popup"
    );


    localizacaoModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
       Pequena espera para o navegador
       renderizar o estado inicial.

       Essa é a mesma lógica que funcionou
       nas outras transições do BVenture.
    */

    setTimeout(
        () => {

            if (
                !localizacaoModal
                    .classList
                    .contains(
                        "aberto"
                    )
            ) {

                return;

            }


            localizacaoModal.classList.add(
                "popup-entrando"
            );

        },
        100
    );


    /*
       Depois da animação, limpar
       as classes temporárias.
    */

    setTimeout(
        () => {

            if (
                !localizacaoModal
            ) {

                return;

            }


            localizacaoModal.classList.remove(
                "preparando-popup",
                "popup-entrando"
            );

        },
        800
    );

}


/* =========================================================
   FECHAR POPUP DE LOCALIZAÇÃO
========================================================= */

function fecharPopupLocalizacao() {

    if (
        !localizacaoModal
    ) {

        return;

    }


    localizacaoModal.classList.remove(
        "aberto",
        "preparando-popup",
        "popup-entrando"
    );


    localizacaoModal.setAttribute(
        "aria-hidden",
        "true"
    );

}

/* =========================================================
   BOTÃO — AGORA NÃO
========================================================= */

negarLocalizacao.addEventListener(
    "click",
    () => {

        localizacaoPermitida = false;

        fecharPopupLocalizacao();


    }
);


/* =========================================================
   BOTÃO — PERMITIR LOCALIZAÇÃO
========================================================= */

if (
    permitirLocalizacao
) {

    permitirLocalizacao.addEventListener(
        "click",
        () => {

            /*
               Fechar primeiro o popup do BVenture.
            */

            fecharPopupLocalizacao();


            if (
    "geolocation" in navigator
) {

    /*
       O Mapbox continua sendo ativado
       para mostrar precisão e acompanhar
       a localização.
    */

    try {

        geolocalizacao.trigger();

    }

    catch (erro) {

        console.warn(
            "Não foi possível ativar o controle do Mapbox.",
            erro
        );

    }


    /*
       O navegador fornece as coordenadas
       usadas pelo BVenture.
    */

    navigator.geolocation.watchPosition(

        receberLocalizacaoJogador,

        (erro) => {

            console.warn(
                "Erro ao acompanhar localização:",
                erro
            );

        },

        {

            enableHighAccuracy:
                true,

            timeout:
                10000,

            maximumAge:
                0

        }

    );

}

else {

    console.warn(
        "Geolocalização não disponível neste dispositivo."
    );

}

        }
    );

}

/* =========================================================
   OBTER AVATAR DO JOGADOR
========================================================= */

function obterAvatarJogador() {

    try {

        const jogador =
            JSON.parse(
                localStorage.getItem(
                    "bventureJogador"
                )
            );


        if (
            jogador &&
            typeof jogador.avatar === "string" &&
            jogador.avatar.trim()
        ) {

            return jogador.avatar.trim();

        }

    }

    catch (erro) {

        console.warn(
            "Não foi possível carregar o avatar do jogador.",
            erro
        );

    }


    return null;

}

/* =========================================================
   CRIAR / ATUALIZAR MARCADOR DO JOGADOR
========================================================= */

function atualizarMarcadorJogador(
    longitude,
    latitude
) {

    const avatar =
        obterAvatarJogador();


    /*
       Se nenhum avatar tiver sido escolhido,
       mantém o ponto padrão do Mapbox.
    */

    if (
        !avatar
    ) {

        return;

    }


    /*
       Criar somente uma vez.
    */

    if (
        !marcadorJogador
    ) {

        const elemento =
            document.createElement(
                "div"
            );


        elemento.className =
            "marcador-jogador";


        const imagem =
            document.createElement(
                "img"
            );


        imagem.src =
            avatar;


        imagem.alt = 
            t("Sua localização");


        imagem.draggable =
            false;


        elemento.appendChild(
            imagem
        );


        marcadorJogador =
            new mapboxgl.Marker({

                element:
                    elemento,

                anchor:
                    "center"

            })
                .setLngLat([
                    longitude,
                    latitude
                ])
                .addTo(
                    mapa
                );


        /*
           Avisar ao CSS que agora existe
           um avatar personalizado.

           Assim escondemos somente o ponto
           padrão, mantendo o círculo de precisão.
        */

        document.body.classList.add(
            "avatar-jogador-ativo"
        );

    }


    /*
       Nas próximas atualizações do GPS,
       apenas mover o avatar.
    */

    else {

        marcadorJogador.setLngLat([
            longitude,
            latitude
        ]);

    }

}

/* =========================================================
   GEOLOCALIZAÇÃO
========================================================= */

const geolocalizacao =
    new mapboxgl.GeolocateControl({

        positionOptions: {

            enableHighAccuracy:
                true,

            timeout:
                10000,

            maximumAge:
                0

        },

        trackUserLocation:
            true,

        showUserHeading:
            true,

        showAccuracyCircle:
            true,

        fitBoundsOptions: {

            maxZoom:
                17

        }

    });


mapa.addControl(

    geolocalizacao,

    "bottom-right"

);
/* =========================================================
   CONTROLAR BOTÃO AZUL DE LOCALIZAÇÃO
========================================================= */

mapa.on(
    "load",
    () => {

        const botaoGeolocalizacao =
            document.querySelector(
                ".mapboxgl-ctrl-geolocate"
            );


        if (!botaoGeolocalizacao) {
            return;
        }


        botaoGeolocalizacao.addEventListener(
            "click",
            (evento) => {

                /*
                    Impedir que o Mapbox execute
                    seu comportamento próprio.
                */

                evento.preventDefault();
                evento.stopPropagation();
                evento.stopImmediatePropagation();


                /* =========================================
                   AINDA NÃO TEM PERMISSÃO
                ========================================== */

                if (!localizacaoPermitida) {

                    abrirPopupLocalizacao();

                    return;

                }


                /* =========================================
                   PERMISSÃO JÁ CONCEDIDA,
                   MAS AINDA SEM COORDENADAS
                ========================================== */

                if (!localizacaoJogador) {

                    return;

                }


                /* =========================================
                   LOCALIZAÇÃO DISPONÍVEL

                   AGORA O BOTÃO SERVE SOMENTE PARA
                   VOLTAR À POSIÇÃO DO JOGADOR.
                ========================================== */

                mapa.easeTo({

                    center: [
                        localizacaoJogador.longitude,
                        localizacaoJogador.latitude
                    ],

                    zoom: 16,

                    pitch:
                        mapaEm3D
                            ? CONFIG_MAPA.pitch3D
                            : 0,

                    bearing:
                        mapaEm3D
                            ? CONFIG_MAPA.bearing3D
                            : 0,

                    duration: 900,

                    easing:
                        (t) =>
                            1 - Math.pow(
                                1 - t,
                                3
                            ),

                    essential: true

                });

            },

            true
        );

    }
);

/* =========================================================
   MANTER MODO DO MAPA AO CENTRALIZAR NO JOGADOR
========================================================= */

geolocalizacao.on(
    "trackuserlocationstart",
    () => {

        /*
           Esperar o Mapbox iniciar a centralização
           e depois restaurar o modo escolhido.
        */

        setTimeout(
            () => {

                mapa.easeTo({

                    pitch:
                        mapaEm3D
                            ? CONFIG_MAPA.pitch3D
                            : 0,

                    bearing:
                        mapaEm3D
                            ? CONFIG_MAPA.bearing3D
                            : 0,

                    duration:
                        650,

                    easing:
                        (t) =>
                            1 - Math.pow(1 - t, 3),

                    essential:
                        true

                });

            },
            100
        );

    }
);


/* =========================================================
   MAPA CARREGADO
========================================================= */

mapa.on(
    "load",
    async () => {

        await carregarLocaisDesbloqueadosFirebase();

        adicionarMarcadores();

        atualizarProgresso();


        /*
           Primeiro mostrar o popup temático
           do BVenture.

           A permissão real só será solicitada
           depois que o jogador clicar em
           "Permitir localização".
        */

        if (!localizacaoPermitida) {

    setTimeout(
        () => {

            abrirPopupLocalizacao();

        },
        500
    );

}
else {

    navigator.geolocation.watchPosition(

        receberLocalizacaoJogador,

        (erro) => {

            console.warn(
                "Erro ao restaurar localização:",
                erro
            );

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}

    }
);


/* =========================================================
   LOCALIZAÇÃO RECEBIDA
========================================================= */

function receberLocalizacaoJogador(
    posicao
) {

    if (
        !posicao ||
        !posicao.coords
    ) {

        return;

    }

    localizacaoPermitida = true;

    sessionStorage.setItem(
    "bventureLocalizacaoPermitida",
    "true"
);


    const latitude =
        posicao.coords.latitude;


    const longitude =
        posicao.coords.longitude;


    const precisao =
        posicao.coords.accuracy;


    /* =====================================================
       GUARDAR LOCALIZAÇÃO
    ===================================================== */

    localizacaoJogador = {

        latitude:
            latitude,

        longitude:
            longitude,

        precisao:
            precisao

    };


    /* =====================================================
       ATUALIZAR AVATAR
    ===================================================== */

    atualizarMarcadorJogador(
        longitude,
        latitude
    );


    /* =====================================================
       PRIMEIRA LOCALIZAÇÃO
    ===================================================== */

    if (
        primeiraLocalizacao
    ) {

        primeiraLocalizacao =
            false;


        mapa.easeTo({

            center: [
                longitude,
                latitude
            ],

            zoom:
                16,

            pitch:
                mapaEm3D
                    ? CONFIG_MAPA.pitch3D
                    : 0,

            bearing:
                mapaEm3D
                    ? CONFIG_MAPA.bearing3D
                    : 0,

            duration:
                900,

            essential:
                true

        });

    }

}

/* =========================================================
   ERRO DE GEOLOCALIZAÇÃO
========================================================= */

geolocalizacao.on(
    "error",
    (erro) => {

        console.warn(
            "Erro de geolocalização:",
            erro
        );

    }
);


/* =========================================================
   CONVERTER GRAUS PARA RADIANOS
========================================================= */

function grausParaRadianos(
    graus
) {

    return graus *
        (
            Math.PI / 180
        );

}


/* =========================================================
   CALCULAR DISTÂNCIA ENTRE DOIS PONTOS
   FÓRMULA DE HAVERSINE
========================================================= */

function calcularDistanciaMetros(
    latitude1,
    longitude1,
    latitude2,
    longitude2
) {

    const RAIO_TERRA =
        6371000;


    const lat1 =
        grausParaRadianos(
            latitude1
        );


    const lat2 =
        grausParaRadianos(
            latitude2
        );


    const diferencaLatitude =
        grausParaRadianos(
            latitude2 -
            latitude1
        );


    const diferencaLongitude =
        grausParaRadianos(
            longitude2 -
            longitude1
        );


    const a =

        Math.sin(
            diferencaLatitude / 2
        ) ** 2

        +

        Math.cos(
            lat1
        )

        *

        Math.cos(
            lat2
        )

        *

        Math.sin(
            diferencaLongitude / 2
        ) ** 2;


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return RAIO_TERRA * c;

}


/* =========================================================
   ABRIR POPUP DE PROXIMIDADE
========================================================= */

function abrirPopupProximidade({
    titulo,
    texto,
    distancia = null
}) {

    if (!proximidadeModal) {
        return;
    }


    if (proximidadeTitulo) {
        proximidadeTitulo.textContent = t(titulo);
    }

    if (proximidadeTexto) {
        proximidadeTexto.textContent = t(texto);
    }


    /*
        Mostrar ou esconder a distância.
    */

    if (
        distancia !== null &&
        proximidadeDistancia &&
        proximidadeDistanciaBox
    ) {

        proximidadeDistancia.textContent =
            distancia;

        proximidadeDistanciaBox.style.display =
            "";
    }

    else if (proximidadeDistanciaBox) {

        proximidadeDistanciaBox.style.display =
            "none";

    }


    /*
        Preparar o estado inicial.
    */

    proximidadeModal.classList.remove(
        "aberto"
    );

    proximidadeModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
        Esperar o navegador desenhar o estado
        inicial antes de iniciar a transição.
    */

    setTimeout(
        () => {

            if (
                !proximidadeModal
            ) {
                return;
            }

            proximidadeModal.classList.add(
                "aberto"
            );

        },
        100
    );

}


/* =========================================================
   FECHAR POPUP DE PROXIMIDADE
========================================================= */

function fecharPopupProximidade() {

    if (!proximidadeModal) {
        return;
    }

    proximidadeModal.classList.remove(
        "aberto"
    );

    proximidadeModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   EVENTOS DO POPUP DE PROXIMIDADE
========================================================= */

if (fecharProximidade) {

    fecharProximidade.addEventListener(
        "click",
        fecharPopupProximidade
    );

}


if (proximidadeModalFundo) {

    proximidadeModalFundo.addEventListener(
        "click",
        fecharPopupProximidade
    );

}

/* =========================================================
   VERIFICAR PROXIMIDADE
========================================================= */

function verificarProximidade(
    local
) {

    /*
       Modo de desenvolvimento:

       não importa onde o jogador esteja.
    */

    if (
        MODO_DESENVOLVIMENTO
    ) {

        return {

            permitido:
                true,

            distancia:
                0,

            motivo:
                "desenvolvimento"

        };

    }


    /*
       Não recebeu localização.
    */

    if (
        !localizacaoJogador
    ) {

        return {

            permitido:
                false,

            distancia:
                null,

            motivo:
                "sem-localizacao"

        };

    }


    /*
       Segurança caso algum local
       esteja sem coordenadas.
    */

    if (
        !Array.isArray(
            local.coordenadasMapa
        ) ||
        local.coordenadasMapa.length !== 2
    ) {

        return {

            permitido:
                false,

            distancia:
                null,

            motivo:
                "coordenada-invalida"

        };

    }


    const longitudeLocal =
        Number(
            local.coordenadasMapa[0]
        );


    const latitudeLocal =
        Number(
            local.coordenadasMapa[1]
        );


    /*
       Distância jogador → ponto turístico.
    */

    const distancia =
        calcularDistanciaMetros(

            localizacaoJogador.latitude,
            localizacaoJogador.longitude,

            latitudeLocal,
            longitudeLocal

        );


    const permitido =
        distancia <=
        RAIO_DESBLOQUEIO_METROS;


    return {

        permitido:
            permitido,

        distancia:
            distancia,

        motivo:
            permitido
                ? "proximo"
                : "distante"

    };

}


/* =========================================================
   LOCAIS DESBLOQUEADOS
========================================================= */

let locaisDesbloqueadosFirebase = [];
let missoesExtrasConcluidasFirebase = [];

function obterLocaisDesbloqueados() {

    return locaisDesbloqueadosFirebase;

}

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


                            locaisDesbloqueadosFirebase =
                                Array.isArray(
                                    dados.locaisDesbloqueados
                                )
                                    ? dados.locaisDesbloqueados
                                    : [];


                            missoesExtrasConcluidasFirebase =
                                Array.isArray(
                                    dados.missoesExtrasConcluidas
                                )
                                    ? dados.missoesExtrasConcluidas
                                    : [];


                            console.log(
                                "Locais desbloqueados carregados:",
                                locaisDesbloqueadosFirebase
                            );


                            console.log(
                                "Missões extras concluídas carregadas:",
                                missoesExtrasConcluidasFirebase
                            );

                        }

                        catch (erro) {

                            console.error(
                                "Erro ao carregar progresso do usuário:",
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
   VERIFICAR SE LOCAL JÁ FOI DESBLOQUEADO
========================================================= */

function localJaDesbloqueado(
    id
) {

    return obterLocaisDesbloqueados()
        .includes(
            id
        );

}


/* =========================================================
   ADICIONAR MARCADORES
========================================================= */

function adicionarMarcadores() {

    if (
        typeof pontosTuristicos ===
            "undefined" ||
        !Array.isArray(
            pontosTuristicos
        )
    ) {

        return;

    }


    const desbloqueados =
        obterLocaisDesbloqueados();


    pontosTuristicos.forEach(
        (local) => {

            if (
                !Array.isArray(
                    local.coordenadasMapa
                ) ||
                local.coordenadasMapa.length !== 2
            ) {

                return;

            }


            const elemento =
                document.createElement(
                    "button"
                );


            elemento.type =
                "button";


            elemento.className =
                "marcador-local";


            /*
               IMPORTANTE:

               O CSS de .marcador-local precisa
               continuar com:

               position: absolute !important;

               Não remova essa regra.
            */

            elemento.dataset.localId =
                local.id;


            elemento.setAttribute(
                "aria-label",
                `${t("Abrir")} ${local.nome}`
            );


            elemento.setAttribute(
                "title",
                local.nome
            );


            /*
               Local já desbloqueado:
               marcador começa verde.
            */

            if (
                desbloqueados.includes(
                    local.id
                )
            ) {

                elemento.classList.add(
                    "desbloqueado"
                );

            }


            /*
               Clique no ponto turístico.
            */

            elemento.addEventListener(
                "click",
                () => {

                    abrirLocal(
                        local
                    );

                }
            );


            /*
               Criar marcador Mapbox.
            */

            new mapboxgl.Marker({

                element:
                    elemento,

                anchor:
                    "bottom"

            })

                .setLngLat(
                    local.coordenadasMapa
                )

                .addTo(
                    mapa
                );

        }
    );

}

/* =========================================================
   ABRIR POPUP DO LOCAL
========================================================= */

function abrirLocal(
    local
) {

    const proximidade =
        verificarProximidade(
            local
        );


    /* =====================================================
       VERIFICAR SE O JOGADOR ESTÁ PRÓXIMO
    ===================================================== */

    if (
        !proximidade.permitido
    ) {

        /*
           Localização ainda não disponível.
        */

        if (
            proximidade.motivo ===
            "sem-localizacao"
        ) {

           abrirPopupProximidade({

    titulo:
        "Localização indisponível",

    texto:
        "Ative a localização do dispositivo para que o BVenture possa verificar sua proximidade deste ponto.",

    distancia:
        null

});

return;

        }


        /*
           Jogador está longe.
        */

        if (
            proximidade.motivo ===
            "distante"
        ) {

            const distancia =
                Math.round(
                    proximidade.distancia
                );


            const textoDistancia =
                distancia >= 1000

                    ? `${(
                        distancia / 1000
                    ).toFixed(1)} km`

                    : `${distancia} m`;


           abrirPopupProximidade({

    titulo:
        "Você está longe deste local",

    texto:
        "Aproxime-se deste ponto de exploração para desbloqueá-lo.",

    distancia:
        textoDistancia

});

return;

        }


        return;

    }


    /* =====================================================
       GUARDAR LOCAL SELECIONADO
    ===================================================== */

    localSelecionado =
        local;

    /* =====================================================
        ATUALIZAR MISSÃO EXTRA
        ===================================================== */

        if (
            acessarMissaoExtra
        ) {

            const missaoExtraConcluida =
                missoesExtrasConcluidasFirebase.includes(
                    local.id
                );


            acessarMissaoExtra.disabled =
                missaoExtraConcluida;


            const tituloMissaoExtra =
                acessarMissaoExtra.querySelector(
                    ".info-missao-extra-texto strong"
                );


            const descricaoMissaoExtra =
                acessarMissaoExtra.querySelector(
                    ".info-missao-extra-texto small"
                );

            const setaMissaoExtra =
                acessarMissaoExtra.querySelector(
                    ".info-missao-extra-seta"
                );


            if (
                missaoExtraConcluida
            ) {

                if (
                    tituloMissaoExtra
                ) {

                    tituloMissaoExtra.textContent =
                        t("Missão concluída");

                }


                if (
                    descricaoMissaoExtra
                ) {

                    descricaoMissaoExtra.textContent =
                        t("Você já completou este desafio");

                }

                if (
                    setaMissaoExtra
                ) {

                    setaMissaoExtra.style.display =
                        "none";

                }

            }

            else {

                if (
                    tituloMissaoExtra
                ) {

                    tituloMissaoExtra.textContent =
                        t("Acessar missão extra");

                }


                if (
                    descricaoMissaoExtra
                ) {

                    descricaoMissaoExtra.textContent =
                        t("Complete um novo desafio neste local");

                }

                if (
                    setaMissaoExtra
                ) {

                    setaMissaoExtra.style.display =
                        "";

                }

            }

        }


    /* =====================================================
       NOME DO LOCAL
    ===================================================== */

    if (
        localNome
    ) {

        localNome.textContent =
            local.nome;

    }


    /* =====================================================
   IMAGEM PRINCIPAL
===================================================== */

if (localImagem) {

    /* remove imediatamente a imagem do local anterior */

    localImagem.style.opacity = "0";
    localImagem.removeAttribute("src");
    localImagem.alt = "";


    if (
        local.imagens &&
        local.imagens.principal
    ) {

        const caminhoImagem =
            local.imagens.principal;

        const imagemPreCarregada =
            new Image();


        imagemPreCarregada.onload = () => {

            /*
               Segurança:
               só mostra a imagem se o jogador
               ainda estiver neste mesmo local.
            */

            if (localSelecionado !== local) {
                return;
            }


            localImagem.src =
                caminhoImagem;

            localImagem.alt =
                `${t("Imagem de")} ${local.nome}`;


            requestAnimationFrame(() => {

                localImagem.style.opacity =
                    "1";

            });

        };


        imagemPreCarregada.onerror = () => {

            if (localSelecionado !== local) {
                return;
            }


            localImagem.removeAttribute(
                "src"
            );

            localImagem.alt =
                "";

            localImagem.style.opacity =
                "0";

        };


        imagemPreCarregada.src =
            caminhoImagem;

    }

}


    /* =====================================================
       BOTÃO
    ===================================================== */

    atualizarBotaoDesbloquear();


    /* =====================================================
   ABRIR POPUP COM TRANSIÇÃO
===================================================== */

if (
    modal
) {

    /*
        Limpar qualquer estado anterior.
    */

    modal.classList.remove(
        "aberto"
    );


    /*
        Garantir que o navegador registre
        primeiro o estado fechado.
    */

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
        Pequena espera antes da entrada.

        Isso permite que o CSS anime:
        opacity
        translateY
        scale
    */

    setTimeout(
        () => {

            modal.classList.add(
                "aberto"
            );

        },
        100
    );

}

}


/* =========================================================
   ATUALIZAR BOTÃO DO POPUP

   LOCAL BLOQUEADO:
   Desbloquear

   LOCAL DESBLOQUEADO:
   Acessar informações
========================================================= */

function atualizarBotaoDesbloquear() {

    if (
        !desbloquearLocal ||
        !localSelecionado
    ) {

        return;

    }


    const texto =
        desbloquearLocal.querySelector(
            "span"
        );


    if (
        !texto
    ) {

        return;

    }


    const desbloqueado =
        localJaDesbloqueado(
            localSelecionado.id
        );


    /* =====================================================
       LOCAL JÁ DESBLOQUEADO
    ===================================================== */

    if (
        desbloqueado
    ) {

        texto.textContent =
            t("Acessar informações");


        desbloquearLocal.classList.add(
            "acessar-informacoes"
        );


        desbloquearLocal.setAttribute(
            "aria-label",
            `${t("Acessar informações de")} ${localSelecionado.nome}`
        );

    }


    /* =====================================================
       LOCAL AINDA BLOQUEADO
    ===================================================== */

    else {

        texto.textContent =
            t("Desbloquear");


        desbloquearLocal.classList.remove(
            "acessar-informacoes"
        );


        desbloquearLocal.setAttribute(
            "aria-label",
            `${t("Desbloquear")} ${localSelecionado.nome}`
        );

    }

}


/* =========================================================
   FECHAR POPUP DO LOCAL
========================================================= */

function fecharModal() {

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
   BOTÃO X DO POPUP
========================================================= */

if (
    fecharLocal
) {

    fecharLocal.addEventListener(
        "click",
        fecharModal
    );

}


/* =========================================================
   FUNDO DO POPUP
========================================================= */

if (
    fecharModalFundo
) {

    fecharModalFundo.addEventListener(
        "click",
        fecharModal
    );

}


/* =========================================================
   BOTÃO PRINCIPAL DO LOCAL

   BLOQUEADO
   → abre puzzle

   DESBLOQUEADO
   → abre informações
========================================================= */

if (
    desbloquearLocal
) {

    desbloquearLocal.addEventListener(
        "click",
        () => {

            if (
                !localSelecionado
            ) {

                return;

            }


            const desbloqueado =
                localJaDesbloqueado(
                    localSelecionado.id
                );


            /*
               Primeiro fecha o popup pequeno.
            */

            fecharModal();


            /*
               Se já foi desbloqueado,
               não joga o puzzle novamente.
            */

            if (
                desbloqueado
            ) {

                abrirInformacoesLocal(
                    localSelecionado
                );


                return;

            }


            /*
               Primeira vez:
               abrir quebra-cabeça.
            */

            abrirPuzzle(
                localSelecionado
            );

        }
    );

}


/* =========================================================
   ABRIR PUZZLE
========================================================= */

function abrirPuzzle(
    local
) {

    if (
        !puzzleModal ||
        !puzzleTabuleiro
    ) {

        return;

    }


    /*
       Segurança extra.

       Mesmo que alguma outra parte do código
       tente abrir o puzzle de um local já
       desbloqueado, manda direto para as
       informações.
    */

    if (
        localJaDesbloqueado(
            local.id
        )
    ) {

        abrirInformacoesLocal(
            local
        );


        return;

    }


    /*
       Precisa existir imagem principal.
    */

    if (
        !local.imagens ||
        !local.imagens.principal
    ) {

        console.error(
            `BVenture: ${local.nome} não possui imagem principal.`
        );


        return;

    }


    localSelecionado =
        local;


    puzzleConcluido =
        false;


    primeiraPecaSelecionada =
        null;


    /* =====================================================
       TÍTULO DO PUZZLE
    ===================================================== */

    if (
        puzzleTitulo
    ) {

        puzzleTitulo.textContent =
            local.nome;

    }


    /* =====================================================
       CRIAR PUZZLE
    ===================================================== */

    criarPuzzle(
        local.imagens.principal
    );


    /* =====================================================
       ABRIR
    ===================================================== */

    puzzleModal.classList.add(
        "aberto"
    );


    puzzleModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================================
   CRIAR PUZZLE
========================================================= */

function criarPuzzle(
    imagem
) {

    /*
       Ordem correta:

       0 1 2
       3 4 5
       6 7 8
    */

    ordemPuzzle =
        [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8
        ];


    /*
       Embaralhar.
    */

    embaralharArray(
        ordemPuzzle
    );


    /*
       Caso o embaralhamento tenha,
       por coincidência, deixado tudo certo,
       troca as duas primeiras peças.
    */

    if (
        puzzleEstaCorreto()
    ) {

        [
            ordemPuzzle[0],
            ordemPuzzle[1]
        ] = [
            ordemPuzzle[1],
            ordemPuzzle[0]
        ];

    }


    /*
       Desenhar.
    */

    desenharPuzzle(
        imagem
    );


    atualizarStatusPuzzle(
        "Selecione uma peça para começar."
    );

}


/* =========================================================
   EMBARALHAR ARRAY
========================================================= */

function embaralharArray(
    array
) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

}


/* =========================================================
   DESENHAR PUZZLE 3x3
========================================================= */

function desenharPuzzle(
    imagem
) {

    if (
        !puzzleTabuleiro
    ) {

        return;

    }


    /*
       Limpar peças anteriores.
    */

    puzzleTabuleiro.innerHTML =
        "";


    /*
       Criar as nove peças.
    */

    ordemPuzzle.forEach(
        (
            numeroPeca,
            posicaoAtual
        ) => {

            const peca =
                document.createElement(
                    "button"
                );


            peca.type =
                "button";


            peca.className =
                "puzzle-peca";


            peca.dataset.posicao =
                String(
                    posicaoAtual
                );


            peca.dataset.peca =
                String(
                    numeroPeca
                );


            /*
               Descobrir onde esta peça ficava
               originalmente na imagem.

               Exemplo:

               peça 0 → linha 0 / coluna 0
               peça 1 → linha 0 / coluna 1
               peça 4 → linha 1 / coluna 1
            */

            const linha =
                Math.floor(
                    numeroPeca / 3
                );


            const coluna =
                numeroPeca % 3;


            /*
               Como o background-size será
               definido pelo CSS para representar
               a imagem 3x3, usamos:

               0%
               50%
               100%
            */

            const x =
                coluna * 50;


            const y =
                linha * 50;


            peca.style.backgroundImage =
                `url("${imagem}")`;


            peca.style.backgroundPosition =
                `${x}% ${y}%`;


            peca.setAttribute(
                "aria-label",
                `${t("Peça")} ${numeroPeca + 1}`
            );


            /*
               Clique na peça.
            */

            peca.addEventListener(
                "click",
                () => {

                    selecionarPeca(
                        posicaoAtual,
                        imagem
                    );

                }
            );


            puzzleTabuleiro.appendChild(
                peca
            );

        }
    );

}


/* =========================================================
   SELECIONAR / TROCAR PEÇAS
========================================================= */

function selecionarPeca(
    posicao,
    imagem
) {

    /*
       Depois de concluído,
       não permite novas trocas.
    */

    if (
        puzzleConcluido
    ) {

        return;

    }


    /* =====================================================
       PRIMEIRA PEÇA
    ===================================================== */

    if (
        primeiraPecaSelecionada ===
        null
    ) {

        primeiraPecaSelecionada =
            posicao;


        marcarPecaSelecionada(
            posicao
        );


        atualizarStatusPuzzle(
            "Agora escolha a peça que deseja trocar."
        );


        return;

    }


    /* =====================================================
       CLICOU NA MESMA PEÇA
    ===================================================== */

    if (
        primeiraPecaSelecionada ===
        posicao
    ) {

        primeiraPecaSelecionada =
            null;


        removerSelecaoPuzzle();


        atualizarStatusPuzzle(
            "Selecione uma peça para começar."
        );


        return;

    }


    /* =====================================================
       TROCAR POSIÇÕES
    ===================================================== */

    const primeira =
        primeiraPecaSelecionada;


    [
        ordemPuzzle[primeira],
        ordemPuzzle[posicao]
    ] = [
        ordemPuzzle[posicao],
        ordemPuzzle[primeira]
    ];


    primeiraPecaSelecionada =
        null;


    /*
       Redesenhar depois da troca.
    */

    desenharPuzzle(
        imagem
    );


    /* =====================================================
       VERIFICAR RESULTADO
    ===================================================== */

    if (
        puzzleEstaCorreto()
    ) {

        concluirPuzzle();

    }

    else {

        atualizarStatusPuzzle(
            "Peças trocadas. Continue organizando a imagem."
        );

    }

}


/* =========================================================
   MARCAR PEÇA SELECIONADA
========================================================= */

function marcarPecaSelecionada(
    posicao
) {

    removerSelecaoPuzzle();


    const peca =
        puzzleTabuleiro
            ?.querySelector(
                `[data-posicao="${posicao}"]`
            );


    peca?.classList.add(
        "selecionada"
    );

}


/* =========================================================
   REMOVER SELEÇÃO DAS PEÇAS
========================================================= */

function removerSelecaoPuzzle() {

    puzzleTabuleiro
        ?.querySelectorAll(
            ".puzzle-peca"
        )
        .forEach(
            (peca) => {

                peca.classList.remove(
                    "selecionada"
                );

            }
        );

}


/* =========================================================
   VERIFICAR SE PUZZLE ESTÁ CORRETO
========================================================= */

function puzzleEstaCorreto() {

    return ordemPuzzle.every(
        (
            numeroPeca,
            indice
        ) =>

            numeroPeca ===
            indice

    );

}


/* =========================================================
   PUZZLE CONCLUÍDO
========================================================= */

async function concluirPuzzle() {

    if (
        puzzleConcluido ||
        !localSelecionado
    ) {

        return;

    }


    puzzleConcluido =
        true;


    /*
       Guardamos o local porque o puzzle
       será fechado antes de abrir as
       informações.
    */

    const localConcluido =
        localSelecionado;


    /* =====================================================
       MENSAGEM DE SUCESSO
    ===================================================== */

    atualizarStatusPuzzle(
        "Quebra-cabeça concluído! Local desbloqueado.",
        true
    );


    /* =====================================================
       SALVAR DESBLOQUEIO
    ===================================================== */

    const localSalvo =
        await registrarLocalDesbloqueado(
            localConcluido
        );

    if (!localSalvo) {

        puzzleConcluido =
            false;

        atualizarStatusPuzzle(
            t("Não foi possível salvar o desbloqueio. Verifique sua conexão e tente novamente."),
            false
        );

        return;

    }


    /* =====================================================
       PIN CINZA → VERDE
    ===================================================== */

    atualizarPinDesbloqueado(
        localConcluido.id
    );


    /* =====================================================
       ATUALIZAR PORCENTAGEM
    ===================================================== */

    atualizarProgresso();


    /*
       Espera um pouco para o jogador
       visualizar a conclusão.

       Depois:

       puzzle fecha
       ↓
       informações abrem
    */

    setTimeout(
        () => {

            fecharPuzzleModal();


            abrirInformacoesLocal(
                localConcluido
            );

        },
        650
    );

}


/* =========================================================
   REGISTRAR LOCAL DESBLOQUEADO
========================================================= */

async function registrarLocalDesbloqueado(
    local
) {

    const usuario =
        auth.currentUser;

    if (!usuario) {

        console.error(
            "Não foi possível registrar o local: usuário não autenticado."
        );

        return false;

    }


    /* =====================================================
       NÃO DUPLICAR LOCAL
    ===================================================== */

    if (
        locaisDesbloqueadosFirebase.includes(
            local.id
        )
    ) {

       return true;

    }


    /* =====================================================
       ATUALIZAR MEMÓRIA DO JOGO
    ===================================================== */

    locaisDesbloqueadosFirebase.push(
        local.id
    );


    /* =====================================================
   SALVAR NO FIRESTORE
===================================================== */

try {

    await updateDoc(
        doc(
            db,
            "usuarios",
            usuario.uid
        ),
        {
            locaisDesbloqueados:
                locaisDesbloqueadosFirebase
        }
    );

    console.log(
        "Local desbloqueado salvo no Firestore:",
        local.id
    );

    return true;

}

catch (erro) {

    console.error(
        "Erro ao salvar local desbloqueado:",
        erro
    );


    /* =============================================
       DESFAZER ALTERAÇÃO LOCAL SE O FIREBASE FALHAR
    ============================================= */

    locaisDesbloqueadosFirebase =
        locaisDesbloqueadosFirebase.filter(
            (id) =>
                id !== local.id
        );

    return false;

}

}

/* =========================================================
   ATUALIZAR PIN DESBLOQUEADO
========================================================= */

function atualizarPinDesbloqueado(
    id
) {

    const marcador =
        document.querySelector(
            `.marcador-local[data-local-id="${id}"]`
        );


    marcador?.classList.add(
        "desbloqueado"
    );

}


/* =========================================================
   STATUS DO PUZZLE
========================================================= */

function atualizarStatusPuzzle(
    texto,
    sucesso = false
) {

    if (
        !puzzleStatus
    ) {

        return;

    }


    puzzleStatus.textContent =
        t(texto);


    puzzleStatus.classList.toggle(
        "sucesso",
        sucesso
    );

}


/* =========================================================
   EMBARALHAR NOVAMENTE
========================================================= */

if (
    puzzleEmbaralhar
) {

    puzzleEmbaralhar.addEventListener(
        "click",
        () => {

            if (
                !localSelecionado ||
                !localSelecionado.imagens?.principal ||
                puzzleConcluido
            ) {

                return;

            }


            /*
               Segurança:

               se o local já tiver sido salvo como
               desbloqueado, não permite jogar de novo.
            */

            if (
                localJaDesbloqueado(
                    localSelecionado.id
                )
            ) {

                const localAtual =
                    localSelecionado;


                fecharPuzzleModal();


                abrirInformacoesLocal(
                    localAtual
                );


                return;

            }


            primeiraPecaSelecionada =
                null;


            criarPuzzle(
                localSelecionado
                    .imagens
                    .principal
            );

        }
    );

}


/* =========================================================
   FECHAR PUZZLE
========================================================= */

function fecharPuzzleModal() {

    if (
        !puzzleModal
    ) {

        return;

    }


    puzzleModal.classList.remove(
        "aberto"
    );


    puzzleModal.setAttribute(
        "aria-hidden",
        "true"
    );


    primeiraPecaSelecionada =
        null;

}


/* =========================================================
   BOTÃO X DO PUZZLE
========================================================= */

if (
    fecharPuzzle
) {

    fecharPuzzle.addEventListener(
        "click",
        fecharPuzzleModal
    );

}

/* =========================================================
   ABRIR INFORMAÇÕES DO LOCAL
========================================================= */

function abrirInformacoesLocal(
    local
) {

    if (
        !local ||
        !infoLocalModal
    ) {

        return;

    }


    /*
       As informações só podem ser abertas
       se o local já tiver sido desbloqueado.
    */

    if (
        !localJaDesbloqueado(
            local.id
        )
    ) {

        console.warn(
            "BVenture: tentativa de acessar informações de um local bloqueado."
        );


        return;

    }


    /*
       Parar qualquer galeria anterior
       antes de abrir um novo local.
    */

    pararGaleriaAutomatica();


    localSelecionado =
        local;


    /* =====================================================
   NOME DO LOCAL
        ===================================================== */

        if (
            infoLocalNome
        ) {

            infoLocalNome.textContent =
                local.nome || "";

        }


        /* =====================================================
        CATEGORIA
        ===================================================== */

        if (
            infoLocalCategoria
        ) {

            infoLocalCategoria.textContent =
                t(local.categoria || "");

        }


        /* =====================================================
        HISTÓRIA
        ===================================================== */

        if (
            infoLocalHistoria
        ) {

            infoLocalHistoria.textContent =
                t(local.historia || "");

        }


        /* =====================================================
        VOCÊ SABIA?
        ===================================================== */

        if (
            infoLocalCuriosidade
        ) {

            infoLocalCuriosidade.textContent =
                t(local.voceSabia || "");

        }


        /* =====================================================
        INFORMAÇÕES PARA VISITA
        ===================================================== */

        if (
            infoLocalVisita
        ) {

            infoLocalVisita.textContent =
                t(local.visita || "");

        }


        /* =====================================================
        ACESSIBILIDADE
        ===================================================== */

        if (
            infoLocalAcessibilidade
        ) {

            infoLocalAcessibilidade.textContent =
                t(local.acessibilidade || "");

        }


        /* =====================================================
        DICA BVENTURE
        ===================================================== */

        if (
            infoLocalDica
        ) {

            infoLocalDica.textContent =
                t(local.dicaBventure || "");

        }


    /* =====================================================
       CRIAR GALERIA
    ===================================================== */

    criarGaleriaInformacoes(
        local
    );


    /* =====================================================
       ABRIR MODAL
    ===================================================== */

    infoLocalModal.classList.add(
        "aberto"
    );


    infoLocalModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "info-local-aberto"
    );

}


/* =========================================================
   PARAR GALERIA AUTOMÁTICA
========================================================= */

function pararGaleriaAutomatica() {

    /*
       Parar intervalo principal.
    */

    if (
        intervaloGaleria
    ) {

        clearInterval(
            intervaloGaleria
        );


        intervaloGaleria =
            null;

    }


    /*
       Parar espera usada depois
       de uma interação manual.
    */

    if (
        timeoutGaleria
    ) {

        clearTimeout(
            timeoutGaleria
        );


        timeoutGaleria =
            null;

    }

}


/* =========================================================
   DESCOBRIR QUAL IMAGEM ESTÁ VISÍVEL
========================================================= */

function obterIndiceGaleriaAtual() {

    if (
        !infoGaleria
    ) {

        return 0;

    }


    const largura =
        infoGaleria.clientWidth;


    if (
        largura <= 0
    ) {

        return 0;

    }


    const indice =
        Math.round(
            infoGaleria.scrollLeft /
            largura
        );


    return indice;

}


/* =========================================================
   IR PARA UMA IMAGEM DA GALERIA
========================================================= */

function irParaImagemGaleria(
    indice
) {

    if (
        !infoGaleria
    ) {

        return;

    }


    const slides =
        infoGaleria.querySelectorAll(
            ".info-galeria-slide"
        );


    if (
        slides.length === 0
    ) {

        return;

    }


    const indiceSeguro =
        Math.max(
            0,
            Math.min(
                slides.length - 1,
                indice
            )
        );


    const slideDestino =
        slides[indiceSeguro];


    /*
       Faz a passagem horizontal suave
       até a próxima imagem.
    */

    slideDestino.scrollIntoView({

        behavior:
            "smooth",

        block:
            "nearest",

        inline:
            "start"

    });


    atualizarIndicadorGaleria(
        indiceSeguro
    );

}

/* =========================================================
   INICIAR GALERIA AUTOMÁTICA
========================================================= */

function iniciarGaleriaAutomatica() {

    /*
       Evita criar dois timers
       ao mesmo tempo.
    */

    pararGaleriaAutomatica();


    if (
        !infoGaleria
    ) {

        return;

    }


    const slides =
        infoGaleria.querySelectorAll(
            ".info-galeria-slide"
        );


    /*
       Se não houver pelo menos duas fotos,
       não precisa fazer troca automática.
    */

    if (
        slides.length <= 1
    ) {

        return;

    }


    /*
       Troca a cada 10 segundos.
    */

    intervaloGaleria =
        setInterval(
            () => {

                /*
                   Não fazer nada se o popup
                   de informações estiver fechado.
                */

                if (
                    !infoLocalModal
                        ?.classList
                        .contains(
                            "aberto"
                        )
                ) {

                    return;

                }


                /*
                   Descobrir a imagem atual.
                */

                const atual =
                    obterIndiceGaleriaAtual();


                /*
                   Se estiver na última foto,
                   volta para a primeira.

                   Caso contrário,
                   avança uma.
                */

                const proximo =
                    atual >=
                    slides.length - 1

                        ? 0

                        : atual + 1;


                /*
                   Fazer a troca com animação.
                */

                irParaImagemGaleria(
                    proximo
                );

            },

            TEMPO_TROCA_GALERIA
        );

}


/* =========================================================
   REINICIAR CONTAGEM AUTOMÁTICA
========================================================= */

function reiniciarGaleriaAutomatica() {

    /*
       Exemplo:

       usuário passou manualmente
       para a segunda imagem.

       O timer antigo é cancelado
       e começa uma nova espera.
    */

    pararGaleriaAutomatica();


    timeoutGaleria =
        setTimeout(
            () => {

                iniciarGaleriaAutomatica();

            },

            TEMPO_TROCA_GALERIA
        );

}


/* =========================================================
   CRIAR GALERIA DE IMAGENS
========================================================= */

function criarGaleriaInformacoes(
    local
) {

    if (
        !infoGaleria
    ) {

        return;

    }


    /*
       Limpar galeria anterior.
    */

    infoGaleria.innerHTML =
        "";


    /*
       Pegar as imagens 2 e 3
       definidas no locais.js.

       Exemplo:

       galeria: [
           "imagem1.jpg",
           "imagem2.jpg"
       ]
    */

    const imagens =
        Array.isArray(
            local.imagens?.galeria
        )

            ? local.imagens.galeria

            : [];


    /* =====================================================
       CRIAR CADA SLIDE
    ===================================================== */

    imagens.forEach(
        (
            caminhoImagem,
            indice
        ) => {

            /*
               Container da foto.
            */

            const slide =
                document.createElement(
                    "div"
                );


            slide.className =
                "info-galeria-slide";


            /*
               Imagem.
            */

            const imagem =
                document.createElement(
                    "img"
                );


            imagem.src =
                caminhoImagem;


            imagem.alt =
                `${local.nome} — ${t("imagem")} ${indice + 2}`;


            imagem.loading =
                "lazy";


            imagem.draggable =
                false;


            /*
               Colocar imagem dentro do slide.
            */

            slide.appendChild(
                imagem
            );


            /*
               Colocar slide na galeria.
            */

            infoGaleria.appendChild(
                slide
            );

        }
    );


    /* =====================================================
       VOLTAR SEMPRE PARA A PRIMEIRA FOTO
    ===================================================== */

    requestAnimationFrame(
        () => {

            infoGaleria.scrollLeft =
                0;


            atualizarIndicadorGaleria(
                0
            );


            /*
               Começar a contar os 10 segundos.

               A primeira foto fica visível
               por 10 segundos antes da troca.
            */

            iniciarGaleriaAutomatica();

        }
    );

}


/* =========================================================
   ATUALIZAR INDICADORES DA GALERIA
========================================================= */

function atualizarIndicadorGaleria(
    indiceAtivo
) {

    if (
        !infoGaleriaIndicadores
    ) {

        return;

    }


    const indicadores =
        infoGaleriaIndicadores
            .querySelectorAll(
                "span"
            );


    indicadores.forEach(
        (
            indicador,
            indice
        ) => {

            indicador.classList.toggle(
                "ativo",
                indice === indiceAtivo
            );

        }
    );

}


/* =========================================================
   DETECTAR FOTO VISÍVEL DURANTE O SCROLL
========================================================= */

if (
    infoGaleria
) {

    infoGaleria.addEventListener(
        "scroll",
        () => {

            const largura =
                infoGaleria.clientWidth;


            if (
                largura <= 0
            ) {

                return;

            }


            /*
               Descobrir qual foto está
               ocupando a tela.
            */

            const indice =
                Math.round(
                    infoGaleria.scrollLeft /
                    largura
                );


            /*
               Atualizar indicador.
            */

            atualizarIndicadorGaleria(
                indice
            );

        },

        {
            passive:
                true
        }
    );

}


/* =========================================================
   INTERAÇÃO MANUAL COM A GALERIA
========================================================= */

if (
    infoGaleria
) {

    /* =====================================================
       COMEÇOU A ARRASTAR
    ===================================================== */

    infoGaleria.addEventListener(
        "pointerdown",
        () => {

            /*
               Para a troca automática enquanto
               o jogador estiver mexendo.
            */

            pararGaleriaAutomatica();

        },

        {
            passive:
                true
        }
    );


    /* =====================================================
       TERMINOU DE ARRASTAR
    ===================================================== */

    infoGaleria.addEventListener(
        "pointerup",
        () => {

            /*
               Quando terminar de arrastar,
               começa uma nova contagem.

               Assim ele terá 10 segundos
               completos na foto escolhida.
            */

            reiniciarGaleriaAutomatica();

        },

        {
            passive:
                true
        }
    );


    /* =====================================================
       TOQUE / ARRASTE CANCELADO
    ===================================================== */

    infoGaleria.addEventListener(
        "pointercancel",
        () => {

            reiniciarGaleriaAutomatica();

        },

        {
            passive:
                true
        }
    );

}


/* =========================================================
   FECHAR INFORMAÇÕES
========================================================= */

function fecharInformacoesLocal() {

    if (
        !infoLocalModal
    ) {

        return;

    }


    /*
       MUITO IMPORTANTE:

       cancelar a troca automática
       quando fechar o popup.

       Assim não fica um setInterval
       funcionando escondido.
    */

    pararGaleriaAutomatica();


    infoLocalModal.classList.remove(
        "aberto"
    );


    infoLocalModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "info-local-aberto"
    );

}


/* =========================================================
   BOTÃO X DAS INFORMAÇÕES
========================================================= */

if (
    fecharInfoLocal
) {

    fecharInfoLocal.addEventListener(
        "click",
        fecharInformacoesLocal
    );

}


/* =========================================================
   FUNDO DAS INFORMAÇÕES
========================================================= */

if (
    fecharInfoLocalFundo
) {

    fecharInfoLocalFundo.addEventListener(
        "click",
        fecharInformacoesLocal
    );

}


/* =========================================================
   ACESSAR MISSÃO EXTRA
========================================================= */

function acessarMissaoExtraDoLocal() {

    if (
        !localSelecionado
    ) {

        console.error(
            "BVenture: nenhum local selecionado para a missão extra."
        );

        return;

    }


    const idLocal =
        localSelecionado.id;


    /* =============================================
       VERIFICAR SE A MISSÃO JÁ FOI CONCLUÍDA
    ============================================= */

    if (
        missoesExtrasConcluidasFirebase.includes(
            idLocal
        )
    ) {

        console.log(
            "BVenture: missão extra já concluída:",
            idLocal
        );

        return;

    }


    /* =============================================
       PREPARAR DESTINO
    ============================================= */

    const destino =
        `missao-extra.html?local=${encodeURIComponent(idLocal)}`;


    /* =============================================
       MOSTRAR LOADING
    ============================================= */

    if (
        typeof mostrarLoading ===
        "function"
    ) {

        mostrarLoading();

    }


    /* =============================================
       IR PARA A MISSÃO EXTRA
    ============================================= */

    setTimeout(
        () => {

            window.location.href =
                destino;

        },
        700
    );

}


/* =========================================================
   BOTÃO ACESSAR MISSÃO EXTRA
========================================================= */

if (
    acessarMissaoExtra
) {

    acessarMissaoExtra.addEventListener(
        "click",
        acessarMissaoExtraDoLocal
    );

}




/* =========================================================
   PROGRESSO DO MAPA
========================================================= */

function atualizarProgresso() {

    /*
       Verificar se a lista de locais existe.
    */

    if (
        typeof pontosTuristicos ===
            "undefined" ||
        !Array.isArray(
            pontosTuristicos
        )
    ) {

        return;

    }


    /*
       Buscar locais já desbloqueados.
    */

    const desbloqueados =
        obterLocaisDesbloqueados();


    /*
       Quantidade total de pontos
       existentes no locais.js.

       Atualmente: 21 locais.
    */

    const total =
        pontosTuristicos.length;


    /*
       Contar somente IDs que realmente
       existem na lista atual.

       Isso evita que algum ID antigo salvo
       no localStorage altere a porcentagem.
    */

    const quantidade =
        desbloqueados.filter(
            (id) => {

                return pontosTuristicos.some(
                    (local) => {

                        return (
                            local.id ===
                            id
                        );

                    }
                );

            }
        ).length;


    /*
       Calcular porcentagem.

       Exemplo:

       1 de 21
       5%

       21 de 21
       100%
    */

    const porcentagem =
        total > 0

            ? Math.round(
                (
                    quantidade /
                    total
                ) * 100
            )

            : 0;


    /*
       Mostrar na interface.
    */

    if (
        mapaPorcentagem
    ) {

        mapaPorcentagem.textContent =
            `${porcentagem}%`;

    }

}


/* =========================================================
   VOLTAR PARA MISSÕES
========================================================= */

if (
    botaoVoltar
) {

    botaoVoltar.addEventListener(
        "click",
        () => {

            /*
               Informar ao app.html qual tela
               deve aparecer.
            */

            sessionStorage.setItem(
                "bventureTela",
                "missoes"
            );


            /* =============================================
               EVITAR CLIQUES DUPLOS
            ============================================= */

            botaoVoltar.disabled =
                true;


            /* =============================================
               MOSTRAR LOADING
            ============================================= */

            if (
                typeof mostrarLoading ===
                "function"
            ) {

                mostrarLoading();

            }


            /* =============================================
               VOLTAR PARA O APLICATIVO
            ============================================= */

            setTimeout(
                () => {

                    window.location.href =
                        "app.html";

                },
                700
            );

        }
    );

}


/* =========================================================
   TECLA ESC
========================================================= */

document.addEventListener(
    "keydown",
    (evento) => {

        /*
           Só executar se a tecla pressionada
           for ESC.
        */

        if (
            evento.key !==
            "Escape"
        ) {

            return;

        }


        /* =================================================
           1 — INFORMAÇÕES DO LOCAL
        ================================================= */

        if (
            infoLocalModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            fecharInformacoesLocal();


            return;

        }


        /* =================================================
           2 — PUZZLE
        ================================================= */

        if (
            puzzleModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            fecharPuzzleModal();


            return;

        }


        /* =================================================
           3 — POPUP INICIAL DO LOCAL
        ================================================= */

        if (
            modal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            fecharModal();

        }

    }
);


/* =========================================================
   PÁGINA SENDO FECHADA / RECARREGADA
========================================================= */

/*
   Cancela o timer da galeria caso o usuário
   saia do mapa ou recarregue a página.
*/

window.addEventListener(
    "beforeunload",
    () => {

        pararGaleriaAutomatica();

    }
);


/* =========================================================
   PÁGINA FICOU OCULTA
========================================================= */

/*
   Se o jogador trocar de aba, minimizar o navegador
   ou bloquear o celular, não precisamos continuar
   trocando as imagens escondidas.

   Quando ele voltar, a contagem de 10 segundos
   começa novamente.
*/

document.addEventListener(
    "visibilitychange",
    () => {

        /* =================================================
           PÁGINA OCULTA
        ================================================= */

        if (
            document.hidden
        ) {

            pararGaleriaAutomatica();


            return;

        }


        /* =================================================
           PÁGINA VOLTOU
        ================================================= */

        if (
            infoLocalModal
                ?.classList
                .contains(
                    "aberto"
                )
        ) {

            iniciarGaleriaAutomatica();

        }

    }
);


/* =========================================================
   FIM — MAPA BVENTURE
========================================================= */