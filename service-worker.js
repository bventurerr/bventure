const CACHE_NAME = "bventure-v3";

const ARQUIVOS_CACHE = [
    "./",
    "./index.html",
    "./login.html",
    "./manifest.json",

    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png",
    "./assets/icons/icon-maskable-192.png",
    "./assets/icons/icon-maskable-512.png",
    "./assets/icons/apple-touch-icon.png"
];


// ======================================================
// INSTALAÇÃO
// ======================================================

self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ARQUIVOS_CACHE);
            })
    );

    // Ativa a nova versão sem esperar o SW antigo encerrar
    self.skipWaiting();

});


// ======================================================
// ATIVAÇÃO
// ======================================================

self.addEventListener("activate", (event) => {

    event.waitUntil(

        caches.keys()
            .then((nomesCaches) => {

                return Promise.all(

                    nomesCaches.map((nomeCache) => {

                        if (nomeCache !== CACHE_NAME) {
                            return caches.delete(nomeCache);
                        }

                    })

                );

            })
            .then(() => self.clients.claim())

    );

});


// ======================================================
// REQUISIÇÕES
// ======================================================

self.addEventListener("fetch", (event) => {

    const request = event.request;

    // Somente GET
    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    // Não interfere em Firebase, Mapbox, Google etc.
    if (url.origin !== self.location.origin) {
        return;
    }


    // ==================================================
    // NAVEGAÇÃO / HTML
    // Sempre tenta buscar a versão mais recente
    // ==================================================

    if (request.mode === "navigate") {

        event.respondWith(

            fetch(request)
                .then((response) => {

                    const copia = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(request, copia);
                        });

                    return response;

                })
                .catch(async () => {

                    const cache = await caches.match(request);

                    if (cache) {
                        return cache;
                    }

                    return caches.match("./index.html");

                })

        );

        return;
    }


    // ==================================================
    // CSS / JS / IMAGENS / OUTROS ARQUIVOS LOCAIS
    // Network First
    // ==================================================

    event.respondWith(

        fetch(request)
            .then((response) => {

                // Só armazena respostas válidas
                if (response && response.status === 200) {

                    const copia = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(request, copia);
                        });

                }

                return response;

            })
            .catch(async () => {

                const cache = await caches.match(request);

                if (cache) {
                    return cache;
                }

                return Response.error();

            })

    );

});