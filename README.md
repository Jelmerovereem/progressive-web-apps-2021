# Progressive Web Apps @cmda-minor-web · 20-21

This application shows you the weather for all over the world! With the interactive map you can search all over the world.

![Screenshots](https://user-images.githubusercontent.com/58043913/109636627-1978a500-7b4c-11eb-8931-e4d987fda056.png)

Live link to the application: [progressive-weatherapp.herokuapp.com](https://progressive-weatherapp.herokuapp.com/)


## Course description
For [this course](https://github.com/cmda-minor-web/progressive-web-apps-2021) we learn to build a server side rendered application. Implement a service worker with some functionalities. In the end the application will be a real and optimized in performance **Progressive Web App**!

## Table of Contents
1. [Features](#features)
1. [Install](#install)
1. [Building](#build)
1. [Templating engine](#templating-engine)
1. [Rendering](#rendering)
1. [Static building](#static-building)


## Features

- [x] Interactive map
- [x] Weather based on searched city
- [x] Weather based on your own location
- [x] Clickable pop-up forwarding to a detail page
- [x] Detail page with a "last updated on" reminder
- [x] Detail page with the temperature and weather description
- [x] Background visuals matching the weather and local time
- [x] Pre built files, so server can serve files way faster
- [x] Compression, compress middleware so files are smaller and faster loading time
- [x] Minify and bundle CSS and JS files to optimize performance
- [x] Offline caching, so you can see weather offline
- [ ] Weather forecast, for upcoming days

## Install
```sh
$ git clone https://github.com/Jelmerovereem/progressive-web-apps-2021
$ cd progressive-web-apps-2021/
```

Once you're in the directory, install the required node modules:

```sh
$ npm install
```

Then build the static dist folder
```sh
$ npm run build
```

Finally, start the server:
```sh
$ npm run start-server
```

Or build & start the server with:
```sh
$ npm run bas
```
## Build
#### Server
For building and running the server I use the [express framework](https://expressjs.com/).  
This minimalist web framework is very useful for setting up a server.  
You first require express:
```js
const express = require("express");
```

After that you init your app:
```js
const app = express();
```

Config your express-app:
```js
app.use(express.static("static")); // indicate which folder will be the public/static folder
app.set("view engine", "ejs"||"pug") // indicate which templating engine you're using

// at the bottom of your file
const port = 7000;
app.listen(port, () => console.log(`Server is running on port ${port}`)); // your url will be localhost:7000
```

#### Templating engine
I use [pug](https://pugjs.org/) as my templating engine for this project.
I've already worked with [ejs](https://ejs.co/) before, so it'll be more of a challenge if I use pug this time.

To let express know what template engine I'm using:
```js
app.set("view engine", "pug");
```

#### Rendering
Now we can render our files:
```js
app.get("/", renderHome); // if app receives a get request on "/", call function renderHome

function renderHome(req, res) {
	res.render("home"); // render the home file inside your "views" folder
}
```

Passing data with rendering:
```js
function renderHome(req, res) {
	const title = "Weather app";
	res.render("home", {
		pageTitle: title // pass data as an object
	});
}
```

Inside your templating engine file:
```pug
html(lang="en")
	head
		title #{pageTitle}
```

#### Static building
I followed the talk from Declan for pre-building your website. I followed his steps and now the home page is pre-build inside the `dist/` folder. The templating engine is rendered, the static assets are copy pasted and the CSS & JavaScript files are also pre-built.

_Remove old files_
```js
import rimraf from "rimraf";

rimraf("./dist/*", () => {console.log("cleared dist")});
```

_Building HTML / render template file_
```js
import pug from "pug";
import fs from "file-system";

function createHtml() {
	const title = "Weather app";
	const data = {
		pageTitle: title
	}
	const compiledFunction = pug.compileFile("./views/home.pug"); // compile the pug file to html string
	const html = compiledFunction(data); // compile the homepage with the data

	fs.writeFile("./dist/index.html", html, (err) => { // write the html to the dist folder
		if (err) console.log(err); // show error if present
	})
}
```

_Copy paste static assets_
```js
import gulp from "gulp";

gulp.src([ // copy paste manifest and serviceworker
	"./static/manifest.json",
	"./static/service-worker.js"
	]).pipe(gulp.dest("./dist/"))
gulp.src("./static/assets/**/*.*").pipe(gulp.dest("./dist/assets/")) // copy paste all other static assets
```

_Build CSS_
```js
import gulp from "gulp";
import cleanCss from "gulp-clean-css";
import concat from "gulp-concat";

gulp.src([
	"./static/styles/*.css"
	])
.pipe(cleanCss()) // minifies the CSS files
.pipe(concat("main.css")) // concat all css files to one file
.pipe(gulp.dest("./dist/styles/"))
```

_Build js_
```js
import gulp from "gulp";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import rollup from "gulp-rollup";

gulp.src([
	"./static/scripts/main.js"])
	.pipe(rollup({ // bundle the ES6 module files
		input: "./static/scripts/main.js",
		allowRealFiles: true,
		format: "esm"
	}))
	.pipe(babel()) // create backwards compatible JavaScript. Mostly syntax
	.pipe(uglify()) // minify javascript
	.pipe(concat("main.js")) // concact all JavaScript files to one file
	.pipe(gulp.dest("./dist/scripts/"))
```

## Manifest and Service Worker
A (good) Progressive Web app needs to work offline and be able to install as an (desktop)app! For this to work your can implement a manifest and service worker.

### Manifest
The manifest is a JSON file where you give instructions on how to display the app when someone installs it as an app. Here is mine:
```json
{
	"name": "Weather app",
	"short_name": "Weather app",
	"description": "Get the weather details from all over the world with a interactive map.",
	"theme_color": "#fc043c",
	"background_color": "#fc043c",
	"display": "standalone",
	"Scope": "/",
	"start_url": "/",
	"icons": [
		{
			"src": "assets/favicon.png",
			"sizes": "72x72",
			"type": "image/png"
		}]
}
```

### Service worker
A service worker manages the users network requests. With a service worker you can intercept / modify network traffic, cache files and resources, add push notifications, etc.

You can call/intercept different events from the service worker to get your application to work offline:
* Install
* Activate
* Fetch

How I used the service worker:
```js
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
				.then(response => response ? response : fetchAndCache(event.request, "html-runtime-cache")) // if cache does not already exists, cache the request
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
```

## APIs used

- [The OpenWeather map API](https://openweathermap.org/api)  
With this API you can fetch weather data from all over the world. It has all different kind of fetches you can do. If you want 4 days forecast or just the current weather data, everything is possible.
- [Leaflet map](https://leafletjs.com/)
- ~~[Unsplash API](https://unsplash.com/developers)~~

### API Response
This is what an API response looks like from The OpenWeather API
```js
data = {
	clouds: {}, // The cloudiness in %
	coord: {},  // City geo location. Lon and lat
	dt: ,         // Last time when weather was updates in unix (UTC)
	id: ,         // The city ID
	main: {},   // The main weather information, temperature, feelslike, etc.
	name: ,       // City name
	sys: {},    // More about the country and timezone
	timezone: ,   // How many seconds difference from the UTC timezone
	visibility: , // The visiblity meter
	weather:[], // An array with weather objects containing weather information like description and id for icon
	wind: {}    // Information about the wind speed, degrees, etc.
}
```

## Sources
- Teacher: Declan Rek - [Voorhoede](https://voorhoede.nl)
- Student assistent: Wouter van der Heijde - [CMD minor](https://github.com/cmda-minor-web)
- [Web.dev about adding a manifest](https://web.dev/add-manifest/)
- [More about service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)