const CACHE_VERSION = "v1";
const CORE_ASSETS = [
	"/offline",
	"/assets/favicon.png",
	"/styles/main.css",
	"manifest.json",
	"/assets/sun.png",
	"/assets/moon.png",
	"/assets/back.svg"
]
const EXCLUDE_FILES = [
"/"
]

self.addEventListener("install", (event) => {
	console.log("installing service worker");

	event.waitUntil(
			caches.open(CACHE_VERSION)
				.then(cache => {
					cache.addAll(CORE_ASSETS).then(() => self.skipWaiting());
				})
		)
})

self.addEventListener("activate", (event) => {
	console.log("activating service worker")
	event.waitUntil(clients.claim());
})

self.addEventListener("fetch", async (event) => {
	//console.log(`fetch event: ${event.request.url}`);
	console.log(getPathName(event.request.url))
		if (event.request.method === "GET" && CORE_ASSETS.includes(getPathName(event.request.url))) {
			//console.log(`core get request: ${event.request.url}`);
			event.respondWith(
				caches.open(CACHE_VERSION).then(cache => cache.match(event.request.url))
				)
		} else if (isHtmlGetRequest(event.request)) {
			//console.log(`html get request: ${event.request.url}`);

			event.respondWith(
				caches.open("html-runtime-cache")
					.then(cache => cache.match(event.request))
					.then((response) => {
						if (response) {
							return response
						} else {
							fetchAndCache(event.request, "html-runtime-cache")
						}
					})
					.then(response => response ? response : fetchAndCache(event.request, "html-runtime-cache"))
					.catch(() => {
						return caches.open(CACHE_VERSION).then(cache => cache.match("/offline"))
					})
			)
		}
})

function getPathName(requestUrl) {
	const url = new URL(requestUrl);
	return url.pathname;
}

function fetchAndCache(request, cachename) {
	return fetch(request)
			.then(response => {
				if (getPathName(request.url) !== "/") {
					const clone = response.clone();
					caches.open(cachename)
						.then(cache => cache.put(request, clone))
						return response
				} else {
					return response
				}
			})
}

function isHtmlGetRequest(request) {
 return request.method === "GET" && (request.headers.get("accept") !== null && request.headers.get("accept").indexOf("text/html") > -1)
} 