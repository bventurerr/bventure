/* =========================================================
   BVENTURE
   LOCAIS DE EXPLORAÇÃO — BOA VISTA
========================================================= */

/*
   Mapbox:
   [longitude, latitude]

   imagens.principal:
   → popup de desbloqueio
   → quebra-cabeça

   imagens.galeria:
   → informações após desbloquear
*/


const pontosTuristicos = [


    /* =====================================================
       01 — PARQUE DO RIO BRANCO
    ===================================================== */

    {
        id: "parque-rio-branco",

        nome: "Parque do Rio Branco",

        coordenadasMapa: [
            -60.671209,
            2.811733
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/parqueriobranco.webp",

            galeria: [
                "pontos-turisticos/locais-webp/parqueriobranco1.webp",
                "pontos-turisticos/locais-webp/parqueriobranco2.webp"
            ]
        },

        categoria:
            "Parque urbano • Lazer • Turismo",

        historia:
            "O Parque do Rio Branco foi inaugurado em dezembro de 2020 e nasceu de um grande projeto de transformação da margem direita do Rio Branco. Antes, parte dessa área era conhecida como Beiral e sofria com problemas de alagamento durante o período chuvoso. O processo de revitalização começou em 2017 e envolveu obras de drenagem, urbanização e reorganização da área, além da transferência de famílias que viviam no local. O espaço foi transformado em um grande complexo turístico e de lazer, com áreas esportivas, fontes, espaços de convivência, Selvinha Amazônica e o Mirante Edileusa Lóz. Hoje, é um dos principais cartões-postais de Boa Vista e representa uma das maiores transformações urbanas recentes da cidade.",

        voceSabia:
            "O parque abriga o Mirante Edileusa Lóz e a maior Selvinha Amazônica de Boa Vista, além de estar conectado à Orla Taumanan por uma passarela.",

        visita:
            "Espaço público com entrada gratuita. A área externa é de livre acesso, enquanto algumas atrações internas podem possuir horários próprios.",

        acessibilidade:
            "Possui áreas amplas e urbanizadas para circulação. As condições podem variar conforme a atração dentro do parque.",

        dicaBventure:
            "Vá no fim da tarde. Além de fazer menos calor, você pode aproveitar o pôr do sol às margens do Rio Branco."
    },


    /* =====================================================
       02 — MIRANTE EDILEUSA LÓZ
    ===================================================== */

    {
        id: "mirante-edileusa-loz",

        nome: "Mirante Edileusa Lóz",

        coordenadasMapa: [
            -60.670216,
            2.810638
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/miranteedileuza.webp",

            galeria: [
                "pontos-turisticos/locais-webp/miranteedileuza1.webp",
                "pontos-turisticos/locais-webp/miranteedileuza2.webp"
            ]
        },

        categoria:
            "Mirante • Arquitetura • Turismo",

        historia:
            "O Mirante Edileusa Lóz foi construído como uma das principais atrações do projeto do Parque do Rio Branco, inaugurado em 2020. A visitação ao observatório começou posteriormente e transformou a estrutura em um dos símbolos mais reconhecidos da nova área turística da capital. Com 120 metros de altura e uma plataforma de observação localizada a aproximadamente 93 metros do solo, foi projetado para oferecer uma visão panorâmica de 360° de Boa Vista e do Rio Branco. A estrutura conta com elevadores e um trecho com piso de vidro. Além de funcionar como atração turística, o mirante permite observar de cima o crescimento urbano e parte do desenho planejado da cidade.",

        voceSabia:
            "No observatório existe um trecho de piso de vidro, onde é possível olhar diretamente para baixo.",

        visita:
            "Entrada gratuita. O funcionamento divulgado é de quarta a domingo, das 15h às 21h, mas o horário deve ser confirmado antes da visita, pois pode sofrer alterações.",

        acessibilidade:
            "O acesso ao observatório é realizado por elevadores, incluindo um elevador panorâmico.",

        dicaBventure:
            "Vá antes de anoitecer. Assim, você pode ver Boa Vista durante o dia e acompanhar as luzes da cidade começando a aparecer."
    },


    /* =====================================================
       03 — ORLA TAUMANAN
    ===================================================== */

    {
        id: "orla-taumanan",

        nome: "Orla Taumanan",

        coordenadasMapa: [
            -60.668636,
            2.813650
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/orlataumanan.webp",

            galeria: [
                "pontos-turisticos/locais-webp/orlataumanan1.webp",
                "pontos-turisticos/locais-webp/orlataumanan2.webp"
            ]
        },

        categoria:
            "Orla • Cultura • Gastronomia",

        historia:
            "A Orla Taumanan foi inaugurada em 2004 às margens do Rio Branco, próxima à região histórica onde Boa Vista começou a se desenvolver. Sua criação buscou valorizar a relação da cidade com o rio, oferecendo um espaço destinado à contemplação, alimentação, lazer e eventos culturais. A própria identidade do lugar faz referência aos povos originários de Roraima: “Taumanan” significa “paz” em macuxi. Suas plataformas também receberam nomes indígenas. Com o passar dos anos, a Orla tornou-se um dos cartões-postais mais conhecidos da capital e posteriormente passou a se conectar ao Parque do Rio Branco, formando um importante corredor turístico.",

        voceSabia:
            "As plataformas da Orla são chamadas Meiremê, associada a “arco-íris”, e Weikepá, associada a “nascer do sol”.",

        visita:
            "Espaço público e gratuito. Restaurantes, quiosques e outros estabelecimentos possuem horários próprios.",

        acessibilidade:
            "A Orla possui área urbanizada de circulação, mas os recursos disponíveis podem variar entre os diferentes trechos.",

        dicaBventure:
            "Explore no final da tarde e depois continue a caminhada em direção ao Parque do Rio Branco."
    },


    /* =====================================================
       04 — PRAÇA DAS ÁGUAS
    ===================================================== */

    {
        id: "praca-das-aguas",

        nome: "Praça das Águas",

        coordenadasMapa: [
            -60.677688,
            2.825316
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/pracasdasaguas.webp",

            galeria: [
                "pontos-turisticos/locais-webp/pracasdasaguas1.webp",
                "pontos-turisticos/locais-webp/pracasdasaguas2.webp"
            ]
        },

        categoria:
            "Praça • Lazer • Turismo",

        historia:
            "A Praça das Águas foi inaugurada em 2000 e tornou-se um dos espaços mais conhecidos do Complexo Ayrton Senna. Desde sua criação, destacou-se pelas fontes, cascatas e pelo uso da água como elemento central de sua paisagem. Com o passar dos anos, tornou-se um importante espaço de convivência e lazer para os moradores de Boa Vista. Uma grande revitalização foi concluída em 2016, recuperando as fontes e trazendo melhorias no piso, bancos, paisagismo, iluminação e acessibilidade. A modernização também incorporou novas tecnologias de iluminação. Atualmente, a praça é especialmente movimentada durante a noite.",

        voceSabia:
            "As fontes combinam água, iluminação colorida e música, criando um espetáculo especialmente interessante durante a noite.",

        visita:
            "Espaço público com entrada gratuita. As fontes e estabelecimentos próximos podem funcionar em horários específicos.",

        acessibilidade:
            "A revitalização da praça incluiu melhorias destinadas à acessibilidade.",

        dicaBventure:
            "Tente desbloquear este ponto depois do pôr do sol para ver a praça iluminada."
    },


    /* =====================================================
       05 — PORTAL DO MILÊNIO
    ===================================================== */

    {
        id: "portal-do-milenio",

        nome: "Portal do Milênio",

        coordenadasMapa: [
            -60.676928,
            2.824731
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/portaldomilenio.webp",

            galeria: [
                "pontos-turisticos/locais-webp/portaldomilenio1.webp",
                "pontos-turisticos/locais-webp/portaldomilenio2.webp"
            ]
        },

        categoria:
            "Monumento • Arquitetura • Turismo",

        historia:
            "O Portal do Milênio foi construído na passagem do século XX para o XXI e inaugurado em 2000 como um monumento dedicado à chegada do novo milênio. Instalado junto à Praça das Águas, passou a representar a ideia de modernização e desenvolvimento de Boa Vista naquele período. Sua arquitetura de grandes dimensões tornou o monumento facilmente reconhecível e ajudou a transformá-lo em um dos símbolos visuais da capital. Posteriormente, o Portal e seu entorno receberam intervenções e revitalizações, incluindo melhorias na iluminação e no revestimento. Atualmente, integra o Complexo Ayrton Senna e permanece como um dos pontos mais fotografados da região.",

        voceSabia:
            "O próprio nome do monumento surgiu porque ele foi construído para marcar a virada para o novo milênio.",

        visita:
            "Monumento externo de acesso gratuito em área pública.",

        acessibilidade:
            "Está integrado à área urbanizada da Praça das Águas, que recebeu melhorias de acessibilidade durante sua revitalização.",

        dicaBventure:
            "Afaste-se um pouco antes de tirar a foto. Assim, você consegue enquadrar melhor toda a estrutura do Portal."
    },


    /* =====================================================
       06 — PARQUE ANAUÁ
    ===================================================== */

    {
        id: "parque-anaua",

        nome: "Parque Anauá",

        coordenadasMapa: [
            -60.680607,
            2.837195
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/parqueanaua.webp",

            galeria: [
                "pontos-turisticos/locais-webp/parqueanaua1.webp",
                "pontos-turisticos/locais-webp/parqueanaua2.webp"
            ]
        },

        categoria:
            "Parque • Natureza • Cultura",

        historia:
            "O Parque Anauá faz parte da história do lazer e da cultura de Boa Vista há décadas e tornou-se um dos maiores espaços públicos de convivência da capital. Sua extensa área passou a receber atividades esportivas, caminhadas, encontros familiares, apresentações culturais, feiras e grandes eventos promovidos no estado. Diferentemente de uma praça tradicional, o Anauá funciona como um grande complexo, reunindo áreas abertas, vegetação, lago e diferentes equipamentos públicos. Por sua dimensão e importância cultural, tornou-se referência para grandes celebrações realizadas em Roraima. Ao longo dos anos, diferentes áreas receberam reformas e projetos de modernização.",

        voceSabia:
            "O Parque Anauá é tão grande que reúne diferentes áreas de lazer, cultura, esporte e natureza dentro do mesmo espaço.",

        visita:
            "Entrada gratuita. O funcionamento informado é diariamente, aproximadamente das 6h30 às 22h, sujeito a alterações.",

        acessibilidade:
            "Por ser uma área extensa, as condições de acessibilidade podem variar de acordo com o setor visitado.",

        dicaBventure:
            "Em vez de tentar conhecer tudo de uma vez, escolha uma área do parque e transforme a caminhada em parte da exploração."
    },


    /* =====================================================
       07 — COMPLEXO AYRTON SENNA
    ===================================================== */

    {
        id: "complexo-ayrton-senna",

        nome: "Complexo Ayrton Senna",

        coordenadasMapa: [
            -60.682830,
            2.829901
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/complexoayrtonsenna.webp",

            galeria: [
                "pontos-turisticos/locais-webp/complexoayrtonsenna1.webp",
                "pontos-turisticos/locais-webp/complexoayrtonsenna2.webp"
            ]
        },

        categoria:
            "Esporte • Lazer • Turismo",

        historia:
            "O Complexo Poliesportivo Ayrton Senna foi desenvolvido durante a década de 1990 e transformou-se em um dos principais corredores de esporte e lazer de Boa Vista. Estendendo-se por mais de dois quilômetros ao longo da Avenida Capitão Ene Garcez, reúne diferentes praças, quadras, pistas, espaços infantis e áreas de convivência. Com o passar dos anos, novas estruturas foram incorporadas ou revitalizadas, fazendo com que o complexo também se tornasse um importante eixo turístico. É nele que estão alguns dos lugares mais conhecidos da capital, como a Praça das Águas e o Portal do Milênio. Dessa forma, o Ayrton Senna não representa apenas um ponto, mas um conjunto de espaços ligados à vida esportiva e social de Boa Vista.",

        voceSabia:
            "A Praça das Águas e o Portal do Milênio fazem parte do próprio Complexo Ayrton Senna.",

        visita:
            "Área pública de acesso gratuito. Estabelecimentos e atrações específicas possuem horários próprios.",

        acessibilidade:
            "Algumas áreas possuem estruturas adaptadas, mas as condições variam ao longo do complexo.",

        dicaBventure:
            "Depois de desbloqueá-lo, abra o mapa: existem outros pontos do BVenture dentro ou muito próximos do complexo."
    },

        /* =====================================================
       08 — BOSQUE DOS PAPAGAIOS
    ===================================================== */

    {
        id: "bosque-dos-papagaios",

        nome: "Bosque dos Papagaios",

        coordenadasMapa: [
            -60.658176,
            2.858713
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/bosquedospapagaios.webp",

            galeria: [
                "pontos-turisticos/locais-webp/bosquedospapagaios1.webp",
                "pontos-turisticos/locais-webp/bosquedospapagaios2.webp"
            ]
        },

        categoria:
            "Natureza • Meio ambiente • Educação ambiental",

        historia:
            "O Parque Ecológico Bosque dos Papagaios foi criado como um espaço dedicado à preservação ambiental, ao lazer e à educação ambiental dentro da área urbana de Boa Vista. Localizado no bairro Paraviana, preserva uma área de vegetação onde os visitantes podem conhecer elementos da fauna e da flora regional. Ao longo do tempo, o bosque passou a receber atividades educativas e ações de conscientização ambiental. Suas trilhas oferecem uma experiência diferente dos monumentos e das grandes construções da região central. Atualmente, o Bosque dos Papagaios também é reconhecido como um dos atrativos turísticos de natureza da capital.",

        voceSabia:
            "Apesar do nome, a experiência no bosque não se resume aos papagaios: o local permite observar diferentes elementos da fauna e da flora de Roraima.",

        visita:
            "Entrada gratuita. O funcionamento divulgado é de terça a domingo, das 8h às 18h, sujeito a alterações.",

        acessibilidade:
            "Como possui áreas naturais e trilhas, as condições de acesso podem variar de um trecho para outro.",

        dicaBventure:
            "Preste atenção ao caminho e aos animais. Esse é um ótimo local para missões ambientais dentro do jogo."
    },


    /* =====================================================
       09 — PRAÇA DO CENTRO CÍVICO
    ===================================================== */

    {
        id: "praca-centro-civico",

        nome: "Praça do Centro Cívico Joaquim Nabuco",

        coordenadasMapa: [
            -60.672117,
            2.820464
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/pracadoccjn.webp",

            galeria: [
                "pontos-turisticos/locais-webp/pracadoccjn1.webp",
                "pontos-turisticos/locais-webp/pracadoccjn2.webp"
            ]
        },

        categoria:
            "História • Praça • Urbanismo",

        historia:
            "A Praça do Centro Cívico Joaquim Nabuco ocupa uma posição especial na história e no planejamento de Boa Vista. A região central foi estruturada durante a transformação urbana promovida a partir da década de 1940, quando Boa Vista se tornou capital do então Território Federal do Rio Branco. O planejamento adotou um desenho radial, com grandes avenidas convergindo para o Centro Cívico, formando uma estrutura semelhante a um leque. Ao redor da praça foram instalados importantes edifícios administrativos, religiosos e monumentos, reforçando sua função como centro político da capital. Mesmo com a expansão de Boa Vista, o Centro Cívico permanece como referência para compreender sua formação urbana.",

        voceSabia:
            "Boa Vista é conhecida por seu planejamento em formato radial: várias avenidas convergem para a região do Centro Cívico.",

        visita:
            "Espaço público de acesso gratuito, sem necessidade de ingresso.",

        acessibilidade:
            "Possui calçadas e áreas urbanizadas, embora as condições possam variar conforme o trecho.",

        dicaBventure:
            "Abra o mapa enquanto estiver no local e observe como várias avenidas parecem partir do Centro Cívico."
    },


    /* =====================================================
       10 — MONUMENTO AO GARIMPEIRO
    ===================================================== */

    {
        id: "monumento-garimpeiro",

        nome: "Monumento ao Garimpeiro",

        coordenadasMapa: [
            -60.671968,
            2.820315
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/monumentoaogarimpeiro.webp",

            galeria: [
                "pontos-turisticos/locais-webp/monumentoaogarimpeiro1.webp",
                "pontos-turisticos/locais-webp/monumentoaogarimpeiro2.webp"
            ]
        },

        categoria:
            "Monumento • História",

        historia:
            "Localizado no Centro Cívico, o Monumento ao Garimpeiro está relacionado a um período importante e controverso da história econômica e social de Roraima. A atividade garimpeira teve grande presença no estado, principalmente nas décadas de 1970 e 1980, atraindo trabalhadores e contribuindo para intensos fluxos migratórios. O monumento foi criado como homenagem aos garimpeiros daquele período e tornou-se um dos elementos mais conhecidos da paisagem central de Boa Vista. Antes dele, a área possuía um obelisco construído em 1962. Atualmente, além de referência urbana, o monumento ajuda a contar uma fase da história de Roraima marcada pela mineração e pelas transformações sociais e ambientais associadas à atividade.",

        voceSabia:
            "Antes do Monumento ao Garimpeiro, existia um obelisco nessa região do Centro Cívico.",

        visita:
            "Monumento externo em espaço público, com visitação gratuita.",

        acessibilidade:
            "Pode ser observado a partir das áreas urbanizadas do Centro Cívico.",

        dicaBventure:
            "Depois de encontrar o monumento, observe também os edifícios ao redor. Você estará em uma das regiões mais importantes para entender a história da capital."
    },


    /* =====================================================
       11 — CATEDRAL CRISTO REDENTOR
    ===================================================== */

    {
        id: "catedral-cristo-redentor",

        nome: "Catedral Cristo Redentor",

        coordenadasMapa: [
            -60.673477,
            2.819657
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/catedralcr.webp",

            galeria: [
                "pontos-turisticos/locais-webp/catedralcr1.webp",
                "pontos-turisticos/locais-webp/catedralcr2.webp"
            ]
        },

        categoria:
            "Religioso • Arquitetura • Cultura",

        historia:
            "A Catedral Cristo Redentor está ligada à presença e à organização da Igreja Católica em Roraima e ocupa uma posição de destaque no Centro Cívico de Boa Vista. Com o crescimento da cidade e a consolidação das estruturas religiosas da região, tornou-se um dos principais templos católicos da capital e referência para importantes celebrações da Diocese de Roraima. Sua localização próxima a prédios públicos e monumentos faz com que a Catedral também integre a paisagem planejada da região central. Ao longo dos anos, tornou-se palco de missas, celebrações e acontecimentos religiosos importantes para a comunidade. Hoje, além de sua função religiosa, constitui uma referência arquitetônica e cultural.",

        voceSabia:
            "Sua localização permite conhecer diversos pontos históricos e turísticos do Centro Cívico em uma única caminhada.",

        visita:
            "Entrada gratuita. Os horários de abertura variam conforme as missas e outras atividades religiosas.",

        acessibilidade:
            "Recomenda-se consultar as condições de acesso disponíveis no local.",

        dicaBventure:
            "Se estiver acontecendo uma celebração, respeite o ambiente e priorize a exploração e as fotografias da parte externa."
    },


    /* =====================================================
       12 — IGREJA MATRIZ NOSSA SENHORA DO CARMO
    ===================================================== */

    {
        id: "igreja-matriz-nossa-senhora-do-carmo",

        nome: "Igreja Matriz Nossa Senhora do Carmo",

        coordenadasMapa: [
            -60.668425,
            2.815118
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/igrejamatriznossasenhora.webp",

            galeria: [
                "pontos-turisticos/locais-webp/igrejamatriznossasenhora1.webp",
                "pontos-turisticos/locais-webp/igrejamatriznossasenhora2.webp"
            ]
        },

        categoria:
            "Religioso • História • Patrimônio",

        historia:
            "A história da Igreja Matriz Nossa Senhora do Carmo está diretamente ligada às origens de Boa Vista. A presença religiosa na região remonta aos primeiros períodos de ocupação do povoado às margens do Rio Branco e ganhou maior organização durante o século XIX. Em 1856, com a chegada dos franciscanos, a igreja foi elevada à condição de matriz, acompanhando o desenvolvimento do pequeno povoado que posteriormente daria origem à cidade. O templo atual é conhecido por características arquitetônicas de influência germânica e está situado em uma das regiões mais antigas da capital. Por isso, a Matriz constitui um importante testemunho da formação social, religiosa e urbana de Boa Vista.",

        voceSabia:
            "Nossa Senhora do Carmo é a padroeira de Boa Vista, e a igreja está localizada em uma das áreas históricas mais antigas da cidade.",

        visita:
            "Entrada gratuita, respeitando os horários de abertura e celebrações religiosas.",

        acessibilidade:
            "Não há informação pública suficientemente detalhada para garantir todos os recursos disponíveis. Consulte as condições no local.",

        dicaBventure:
            "Depois da visita, explore o entorno a pé. Outros pontos ligados à história antiga de Boa Vista ficam nas proximidades."
    },


    /* =====================================================
       13 — CASA DA PETITA BRASIL
    ===================================================== */

    {
        id: "casa-petita-brasil",

        nome: "Casa da Petita Brasil",

        coordenadasMapa: [
            -60.669178,
            2.813539
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/casadapetita.webp",

            galeria: [
                "pontos-turisticos/locais-webp/casadapetita1.webp",
                "pontos-turisticos/locais-webp/casadapetita2.webp"
            ]
        },

        categoria:
            "Patrimônio • História • Arquitetura",

        historia:
            "A Casa da Petita Brasil, também conhecida como Casarão da Família Brasil, é uma das construções residenciais históricas preservadas em Boa Vista. Foi construída quando a região ainda era conhecida como Vila de Boa Vista do Rio Branco e pertenceu inicialmente ao coronel Bento Ferreira Marques Brasil. A residência apresenta características arquitetônicas antigas e parte dos materiais utilizados em sua construção precisou chegar à região por transporte fluvial, algo significativo diante das dificuldades de deslocamento da época. Em 1993, o imóvel foi oficialmente tombado como patrimônio histórico pelo município. O casarão está ligado à família Brasil e à trajetória de Petita Brasil, professora, escritora, artista e produtora cultural.",

        voceSabia:
            "Materiais pouco comuns na construção moderna de Boa Vista podem ser encontrados no casarão, ajudando a preservar características da arquitetura de outra época.",

        visita:
            "O exterior pode ser observado e fotografado. Não há horário regular de visitação interna confirmado, portanto o BVenture não indica que a entrada no imóvel seja garantida.",

        acessibilidade:
            "Para a missão, o mais seguro é considerar a observação externa. Não há confirmação suficiente sobre acessibilidade interna.",

        dicaBventure:
            "Observe os detalhes da fachada e compare a construção com os prédios modernos ao redor."
    },


    /* =====================================================
       14 — PONTE DOS MACUXIS
    ===================================================== */

    {
        id: "ponte-dos-macuxis",

        nome: "Ponte dos Macuxis",

        coordenadasMapa: [
            -60.670080,
            2.795702
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/pondedosmacuxis.webp",

            galeria: [
                "pontos-turisticos/locais-webp/pondedosmacuxis1.webp",
                "pontos-turisticos/locais-webp/pondedosmacuxis2.webp"
            ]
        },

        categoria:
            "História • Engenharia • Paisagem",

        historia:
            "A Ponte dos Macuxis surgiu da necessidade de melhorar a ligação terrestre entre Boa Vista e localidades situadas do outro lado do Rio Branco. Sua construção começou na década de 1970 e a ponte foi inaugurada em 1975, tornando-se uma importante obra de infraestrutura para Roraima. Antes de sua existência, a travessia dependia muito mais de embarcações, dificultando o deslocamento de pessoas, mercadorias e veículos. Com aproximadamente 1,2 km de extensão, passou a integrar uma rota estratégica para municípios como Cantá e Bonfim e para o acesso em direção à fronteira com a Guiana. Seu nome homenageia o povo Macuxi, um dos principais povos indígenas de Roraima.",

        voceSabia:
            "A construção da ponte mudou significativamente a ligação rodoviária entre Boa Vista e as áreas localizadas do outro lado do Rio Branco.",

        visita:
            "Não existe cobrança para atravessar a ponte. Ela funciona principalmente como via de circulação, não como atração com horário de visitação.",

        acessibilidade:
            "Para o BVenture, o ponto de desbloqueio deve ficar em uma área pública e segura próxima à ponte, e não na pista.",

        dicaBventure:
            "Não pare na pista para completar a missão. Procure o ponto seguro definido no mapa para observar a ponte."
    },

        /* =====================================================
       15 — CENTRO DE ARTESANATO
    ===================================================== */

    {
        id: "centro-de-artesanato",

        nome: "Centro de Artesanato",

        coordenadasMapa: [
            -60.667845,
            2.814817
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/centrodeartesanato.webp",

            galeria: [
                "pontos-turisticos/locais-webp/centrodeartesanato1.webp",
                "pontos-turisticos/locais-webp/centrodeartesanato2.webp"
            ]
        },

        categoria:
            "Artesanato • Cultura • Compras",

        historia:
            "O Centro de Artesanato de Boa Vista foi desenvolvido como um espaço destinado à valorização e à comercialização do trabalho produzido por artesãos locais. Sua importância vai além da venda de lembranças: o artesanato ajuda a preservar e divulgar elementos da identidade cultural de Roraima. Peças produzidas com diferentes materiais, técnicas e referências regionais permitem ao visitante conhecer aspectos da cultura amazônica e roraimense através da arte. Integrado à região turística do Complexo Ayrton Senna, o espaço também aproxima produtores locais de moradores e visitantes. O Centro de Artesanato passou a integrar rotas de atrativos turísticos divulgadas para Boa Vista.",

        voceSabia:
            "Muitas peças utilizam referências à fauna, à flora e às diferentes culturas presentes em Roraima.",

        visita:
            "O acesso ao espaço é gratuito, mas os produtos são vendidos individualmente. Os horários dos boxes podem variar.",

        acessibilidade:
            "Não há informação oficial recente suficientemente detalhada sobre todos os recursos disponíveis.",

        dicaBventure:
            "Procure uma peça que represente algo característico de Roraima. O desafio aqui é observar os detalhes da cultura local."
    },


    /* =====================================================
       16 — TEATRO MUNICIPAL DE BOA VISTA
    ===================================================== */

    {
        id: "teatro-municipal",

        nome: "Teatro Municipal de Boa Vista",

        coordenadasMapa: [
            -60.683526,
            2.816349
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/teatromunicipal.webp",

            galeria: [
                "pontos-turisticos/locais-webp/teatromunicipal1.webp",
                "pontos-turisticos/locais-webp/teatromunicipal2.webp"
            ]
        },

        categoria:
            "Cultura • Arte • Arquitetura",

        historia:
            "O Teatro Municipal de Boa Vista foi inaugurado em dezembro de 2017 como um dos principais investimentos em infraestrutura cultural da capital. Sua criação ofereceu à cidade um espaço de grande porte preparado especificamente para espetáculos de teatro, dança, música, festivais e outras manifestações artísticas. O complexo foi projetado com palco amplo, áreas técnicas, espaços de apoio aos artistas e uma grande sala para o público. Desde sua inauguração, passou a receber produções locais e atrações de outras regiões, contribuindo para ampliar o acesso da população à cultura e oferecendo aos artistas roraimenses uma estrutura profissional para apresentações.",

        voceSabia:
            "A sala principal possui capacidade para cerca de 1.100 pessoas, e o complexo utiliza mais de 2 mil placas solares.",

        visita:
            "O acesso depende da programação. Há eventos gratuitos e pagos, portanto horários e valores variam.",

        acessibilidade:
            "O teatro foi projetado considerando recursos de acessibilidade e circulação para diferentes públicos.",

        dicaBventure:
            "Confira a programação antes da visita. Talvez você consiga desbloquear o local e ainda assistir a um espetáculo."
    },


    /* =====================================================
       17 — MERCADO MUNICIPAL SÃO FRANCISCO
    ===================================================== */

    {
        id: "mercado-municipal-sao-francisco",

        nome: "Mercado Municipal São Francisco",

        coordenadasMapa: [
            -60.669247,
            2.827483
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/mercadomunicipalsf.webp",

            galeria: [
                "pontos-turisticos/locais-webp/mercadomunicipalsf1.webp",
                "pontos-turisticos/locais-webp/mercadomunicipalsf2.webp"
            ]
        },

        categoria:
            "Gastronomia • Cultura • Comércio",

        historia:
            "O Mercado Municipal São Francisco foi fundado em 1979 e, ao longo das décadas, tornou-se um dos espaços comerciais tradicionais de Boa Vista. O mercado reúne pequenos comerciantes e diferentes tipos de produtos, incluindo frutas, grãos, alimentos regionais, refeições, artesanato e serviços, fazendo parte do cotidiano de muitos moradores. Depois de anos de funcionamento, o prédio passou por uma ampla revitalização e foi reinaugurado em 2018 com estrutura mais moderna. A reforma reorganizou os boxes, ampliou corredores e trouxe melhorias de conforto e acessibilidade, preservando sua característica de mercado popular.",

        voceSabia:
            "No mesmo lugar é possível encontrar refeições, frutas, produtos regionais, artesanato e diferentes serviços.",

        visita:
            "Entrada gratuita. O horário divulgado é aproximadamente das 6h30 às 17h, mas os boxes podem seguir horários próprios.",

        acessibilidade:
            "A revitalização incluiu corredores mais amplos e estruturas voltadas à acessibilidade, incluindo banheiros acessíveis.",

        dicaBventure:
            "Vá pela manhã. É um bom lugar para conhecer sabores locais e experimentar um café da manhã regional."
    },


    /* =====================================================
       18 — PRAÇA DO MIRANDINHA
    ===================================================== */

    {
        id: "praca-mirandinha",

        nome: "Praça do Mirandinha",

        coordenadasMapa: [
            -60.657676,
            2.842622
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/mirandinha.webp",

            galeria: [
                "pontos-turisticos/locais-webp/mirandinha1.webp",
                "pontos-turisticos/locais-webp/mirandinha2.webp"
            ]
        },

        categoria:
            "Praça • Natureza • Lazer",

        historia:
            "A Praça Jorge Manoel da Silva, mais conhecida como Praça do Mirandinha, foi inaugurada em 2011 no bairro Caçari, às margens do igarapé Mirandinha — origem do nome pelo qual o espaço se tornou popularmente conhecido. O projeto transformou a área em um espaço de lazer e convivência para os moradores da região, oferecendo locais destinados a caminhada, descanso, brincadeiras e encontros familiares. Com o passar do tempo, a praça também recebeu atividades e eventos culturais. A presença de elementos da Selvinha Amazônica, incluindo a conhecida iguana gigante, ajudou a criar uma identidade visual própria para o local.",

        voceSabia:
            "Uma iguana gigante é um dos elementos mais reconhecíveis da Praça do Mirandinha.",

        visita:
            "Espaço público de acesso gratuito.",

        acessibilidade:
            "Possui áreas urbanizadas para circulação, embora não haja descrição oficial recente detalhando todos os recursos acessíveis.",

        dicaBventure:
            "Procure a iguana gigante. Ela pode servir como referência para confirmar que você chegou ao ponto correto."
    },


    /* =====================================================
       19 — RORAIMA GARDEN SHOPPING
    ===================================================== */

    {
        id: "roraima-garden-shopping",

        nome: "Roraima Garden Shopping",

        coordenadasMapa: [
            -60.644944,
            2.855385
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/gardenrr.webp",

            galeria: [
                "pontos-turisticos/locais-webp/gardenrr1.webp",
                "pontos-turisticos/locais-webp/gardenrr2.webp"
            ]
        },

        categoria:
            "Compras • Gastronomia • Lazer",

        historia:
            "O Roraima Garden Shopping foi inaugurado em novembro de 2014, durante um período de expansão do comércio e dos serviços em Boa Vista. Instalado no bairro Caçari, o empreendimento foi planejado não apenas como um centro comercial, mas também como espaço de convivência, reunindo lojas, restaurantes, serviços, cinema e áreas destinadas ao lazer. Sua implantação acompanhou o crescimento urbano da capital e a demanda por novos espaços de compras e entretenimento. Com o passar dos anos, o Garden tornou-se parte do cotidiano da cidade e passou a aparecer também entre os locais incluídos em rotas turísticas de Boa Vista.",

        voceSabia:
            "O complexo possui mais de 1.600 vagas de estacionamento e conta com salas de cinema.",

        visita:
            "Entrada gratuita. Segunda a sábado, geralmente das 10h às 22h. Aos domingos e feriados, os horários das lojas e da praça de alimentação podem ser diferentes.",

        acessibilidade:
            "O shopping possui estrutura moderna de circulação. Recursos específicos devem ser confirmados diretamente com o estabelecimento.",

        dicaBventure:
            "É um bom ponto para fazer uma pausa nas horas mais quentes antes de continuar explorando Boa Vista."
    },


    /* =====================================================
       20 — PÁTIO RORAIMA SHOPPING
    ===================================================== */

    {
        id: "patio-roraima-shopping",

        nome: "Pátio Roraima Shopping",

        coordenadasMapa: [
            -60.706551,
            2.850390
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/patiorr.webp",

            galeria: [
                "pontos-turisticos/locais-webp/patiorr1.webp",
                "pontos-turisticos/locais-webp/patiorr2.webp"
            ]
        },

        categoria:
            "Compras • Gastronomia • Entretenimento",

        historia:
            "O Pátio Roraima Shopping foi inaugurado em novembro de 2014 e marcou uma nova fase da expansão comercial de Boa Vista. Sua implantação ocorreu em uma área de crescimento urbano da capital e contribuiu para mudanças no entorno, incluindo melhorias de acesso e novas opções de transporte. Ao reunir comércio, alimentação, serviços, lazer e cinema em um único complexo, tornou-se um importante espaço de convivência para moradores e visitantes. Ao longo dos anos, o empreendimento acompanhou o desenvolvimento da região onde está instalado e passou a integrar também roteiros que apresentam diferentes opções de lazer e turismo da capital.",

        voceSabia:
            "O complexo possui cinema com múltiplas salas e diferentes formatos de exibição.",

        visita:
            "Entrada gratuita. Compras, alimentação, cinema e atrações são pagos separadamente. O funcionamento geral costuma ser de segunda a sábado, das 10h às 22h, e aos domingos em horário diferenciado.",

        acessibilidade:
            "Possui ambiente estruturado para circulação, mas os recursos específicos de acessibilidade devem ser confirmados diretamente com o estabelecimento.",

        dicaBventure:
            "Aproveite o local para descansar, comer alguma coisa e abrir o mapa para escolher sua próxima missão."
    },


    /* =====================================================
       21 — MONUMENTO AOS PIONEIROS

       A pasta/ID continuam usando:
       monumento-dos-peregrinos
    ===================================================== */

    {
        id: "monumento-dos-peregrinos",

        nome: "Monumento aos Pioneiros",

        coordenadasMapa: [
            -60.668880,
            2.813699
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/monumentodosperegrinos.webp",

            galeria: [
                "pontos-turisticos/locais-webp/monumentodosperegrinos1.webp",
                "pontos-turisticos/locais-webp/monumentodosperegrinos2.webp"
            ]
        },

        categoria:
            "História • Monumento",

        historia:
            "Foi feito em 1995 pelo artista plástico Luiz Canará, dentro do Projeto Raízes, e fica na Praça Barreto Leite, no berço histórico de Boa Vista, de frente para o Rio Branco. O monumento conta a chegada das primeiras famílias que ajudaram a formar a cidade e o povo roraimense. É um grande painel, com 5 metros de altura por 15 metros de largura, cuja composição cria a impressão de que os elementos saem da parede.",

        voceSabia:
            "O fundo da obra tem o formato do Monte Roraima. Na frente há um casal em uma canoa, representando a chegada dos primeiros moradores, além de um homem a cavalo ligado aos fazendeiros e à pecuária e o busto de Macunaíma. A obra também apresenta animais e plantas da região, como os buritizais. Próximo dali fica o Veleiro, de 1975, considerado o marco zero da cidade.",

        visita:
            "A entrada é gratuita e não há horário fixo, pois o monumento fica ao ar livre em uma praça pública e pode ser visitado durante o dia ou à noite.",

        acessibilidade:
            "Ainda não há confirmação sobre rampas, piso tátil ou calçada adaptada no local. A acessibilidade permanece em verificação.",

        dicaBventure:
            "Chegue no fim da tarde. Em frente ao monumento fica a plataforma Weikepá, da Orla Taumanan. Depois de observar o painel, aproveite para conhecer a Orla e o Rio Branco. O Centro de Artesanato também fica próximo."
        },


    /* =====================================================
       22 — IGREJA DE SÃO FRANCISCO DAS CHAGAS
    ===================================================== */

    {
        id: "paroquia-sao-francisco",

        nome: "Igreja de São Francisco das Chagas",

        coordenadasMapa: [
            -60.6711372,
            2.8288901
        ],

        imagens: {
            principal:
                "pontos-turisticos/locais-webp/paroquiadesf.webp",

            galeria: [
                "pontos-turisticos/locais-webp/paroquiadesf1.webp",
                "pontos-turisticos/locais-webp/paroquiadesf2.webp"
            ]
        },

        categoria:
            "Patrimônio Histórico e Religioso",

        historia:
            "A história da Igreja de São Francisco das Chagas começou em 1953, com o lançamento de sua pedra fundamental. Na ocasião, padres, irmãs da Consolata e integrantes das Filhas de Maria colocaram uma cruz de madeira no local e enterraram uma espécie de “cápsula do tempo”, contendo uma nota de dinheiro e nomes de autoridades e personalidades da época. A construção contou com a participação e doações da comunidade. Em 1970, tornou-se paróquia e, devido à sua importância para a memória de Boa Vista, foi tombada pelo município em 15 de outubro de 1993, por meio do Decreto nº 2.614.",

        voceSabia:
            "Durante a fundação da igreja, foi enterrada uma espécie de cápsula do tempo, preservando registros daquele momento histórico. Em 2023, a comunidade também celebrou os 70 anos da Igreja São Francisco das Chagas.",

        visita:
            "Entrada gratuita e o horário pode variar conforme as missas e atividades da paróquia.",

        acessibilidade:
            "Consultar local.",

        dicaBventure:
            "Durante a exploração, observe os detalhes da igreja e do seu entorno. O local faz parte da história de Boa Vista desde a década de 1950 e guarda memórias de várias gerações da cidade."
    }

];