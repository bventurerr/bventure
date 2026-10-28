const CACHE_NAME = "bventure-v5";

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

    // Nova versão assume imediatamente
    self.skipWaiting();

});


// ======================================================
// ATIVAÇÃO
// ======================================================

self.addEventListener("activate", (event) => {

    event.waitUntil(

        (async () => {

            // Remove caches antigos
            const nomesCaches = await caches.keys();

            await Promise.all(

                nomesCaches.map((nomeCache) => {

                    if (nomeCache !== CACHE_NAME) {
                        return caches.delete(nomeCache);
                    }

                })

            );


            // Assume todas as páginas abertas
            await self.clients.claim();


            // Avisa páginas/PWA que existe uma nova versão
            const clientes = await self.clients.matchAll({
                type: "window",
                includeUncontrolled: true
            });

            clientes.forEach((cliente) => {

                cliente.postMessage({
                    tipo: "BVENTURE_ATUALIZADO"
                });

            });

        })()

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


    // Firebase, Mapbox, Google etc. continuam normais
    if (url.origin !== self.location.origin) {
        return;
    }


    // ==================================================
    // HTML / NAVEGAÇÃO
    // NETWORK FIRST
    // ==================================================

    if (request.mode === "navigate") {

        event.respondWith(

            (async () => {

                try {

                    const response = await fetch(request);

                    if (response && response.ok) {

                        const cache = await caches.open(CACHE_NAME);

                        await cache.put(
                            request,
                            response.clone()
                        );

                    }

                    return response;

                }

                catch (erro) {

                    const cache = await caches.match(request);

                    if (cache) {
                        return cache;
                    }

                    return caches.match("./index.html");

                }

            })()

        );

        return;
    }


    // ==================================================
    // CSS / JS / IMAGENS / ARQUIVOS LOCAIS
    // NETWORK FIRST
    // ==================================================

    event.respondWith(

        (async () => {

            try {

                const response = await fetch(request);

                if (
                    response &&
                    response.status === 200
                ) {

                    const cache = await caches.open(CACHE_NAME);

                    await cache.put(
                        request,
                        response.clone()
                    );

                }

                return response;

            }

            catch (erro) {

                const cache = await caches.match(request);

                if (cache) {
                    return cache;
                }

                return Response.error();

            }

        })()

    );

});