const CACHE_VERSION = "v1"; // init a version for versioning (not yet in use)
const CORE_ASSETS = [ // init assets that need to be cached
	"/offline",
	"/assets/favicon.png",
	"/styles/main.css",
	"manifest.json",
	"/assets/sun.png",
	"/assets/moon.png",
	"/assets/back.svg"
]
const EXCLUDE_FILES = [ // init assets that need to be excluded from caching
	"/" // home page
]

self.addEventListener("install", (event) => { // install the service worker in the browser
	console.log("installing service worker");
	/* if service worker isn't installed yet */
	event.waitUntil(
			caches.open(CACHE_VERSION) // open given version
				.then(cache => {
					cache.addAll(CORE_ASSETS).then(() => self.skipWaiting()); // cache all the given assets
				})
		)
})

self.addEventListener("activate", (event) => {
	console.log("activating service worker")
	event.waitUntil(clients.claim()); // check all tabs and handle all requests
	caches.keys().then((keyList) => { // get all cache storages
		return Promise.all(
			keyList.map((cache) => {
				if (cache.includes(CACHE_VERSION) && cache !== CACHE_VERSION) { // if cache is not current version
					return caches.delete(cache) // delete cache
				}
			}))
	})
})

self.addEventListener("fetch", async (event) => {
	if (event.request.method === "GET" && CORE_ASSETS.includes(getPathName(event.request.url))) { // if a request matches a core asset
		event.respondWith(
			caches.open(CACHE_VERSION).then(cache => cache.match(event.request.url)) // check if cache already exists
		)
	} else if (isHtmlGetRequest(event.request)) { // if it isn't a core asset but it is a html request
		event.respondWith(
			caches.open("html-runtime-cache") // open the html-runtime-cache
				.then(cache => cache.match(event.request)) // check if cache already exists
				.then((response) => {
					if (response) {
						return response;
					} else { // if cache does not already exists, cache the request and send msg to client
						if (getPathName(event.request.url) !== "/") {
							postMessageToClient(event, getPathName(event.request.url))
						}
						return fetchAndCache(event.request, "html-runtime-cache");
					}
				})
				.catch(() => {
					return caches.open(CACHE_VERSION).then(cache => cache.match("/offline")) // if request is not cached, view offline page
				})
		)
	}
})

/* Helper functions */

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
					.then(cache => cache.put(request, clone)) // cache request
					return response
			} else {
				return response
			}
		})
}

function isHtmlGetRequest(request) {
	return request.method === "GET" && (request.headers.get("accept") !== null && request.headers.get("accept").indexOf("text/html") > -1)
}

async function postMessageToClient(event, url) { // send url for localstorage
	const client = await clients.get(event.resultingClientId);
	if (client) {
		client.postMessage({
			msg: "localStorage",
			url: url
		})
	} else {
		console.error("Client is undefined");
	}
}