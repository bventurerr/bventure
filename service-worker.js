const CACHE_NAME = "bventure-v1";

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

    self.skipWaiting();

});


// ======================================================
// ATIVAÇÃO
// ======================================================

self.addEventListener("activate", (event) => {

    event.waitUntil(

        caches.keys().then((nomesCaches) => {

            return Promise.all(

                nomesCaches.map((nomeCache) => {

                    if (nomeCache !== CACHE_NAME) {
                        return caches.delete(nomeCache);
                    }

                })

            );

        })

    );

    self.clients.claim();

});


// ======================================================
// REQUISIÇÕES
// ======================================================

self.addEventListener("fetch", (event) => {

    const request = event.request;

    // Apenas requisições GET podem ser armazenadas em cache
    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    // Não interferir em serviços externos
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        fetch(request)
            .then((response) => {

                // Guarda uma cópia atualizada dos arquivos locais
                const copia = response.clone();

                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(request, copia);
                    });

                return response;

            })
            .catch(() => {

                // Se estiver sem conexão, tenta usar a versão em cache
                return caches.match(request);

            })

    );

});