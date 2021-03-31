# Progressive Web Apps @cmda-minor-web · 20-21

This application shows you the weather for all over the world! With the interactive map you can search all over the world.

![Screenshots](https://user-images.githubusercontent.com/58043913/109636627-1978a500-7b4c-11eb-8931-e4d987fda056.png)

Live link to the application: [progressive-weatherapp.herokuapp.com](https://progressive-weatherapp.herokuapp.com/)


## Course description
For [this course](https://github.com/cmda-minor-web/progressive-web-apps-2021) we learn to build a server side rendered application. Implement a service worker with some functionalities. In the end the application will be a real and optimized in performance **Progressive Web App**!

## Table of Contents
1. [Install](#install)
2. [Building](#build)
3. [Templating engine](#templating-engine)
4. [Rendering](#rendering)
5. [Static building](#static-building)

## Install
```
git clone https://github.com/Jelmerovereem/progressive-web-apps-2021
cd progressive-web-apps-2021/
```

Once you're in the directory, install the required node modules:

```
npm install
```

Then build the static dist folder
```
npm run build
```

Finally, start the server:
```
npm run start-server
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
app.listen(7000, () => console.log("Server is running on port 7000")); // your url will be localhost:7000
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

_Building HTML / render template file_
```js
function createHtml() {
	const title = "Weather app";
	const data = {
		pageTitle: title
	}
	const compiledFunction = pug.compileFile("./views/home.pug");
	const html = compiledFunction(data);

	fs.writeFile("./dist/index.html", html, (err) => {
		if (err) console.log(err);
	})
}
```

_Copy paste static assets_
```js
import gulp from "gulp";

gulp.src("./static/assets/**/*.*").pipe(gulp.dest("./dist/assets/"))
```

_Build CSS_
```js
import gulp from "gulp";
import cleanCss from "gulp-clean-css";
import concat from "gulp-concat";

gulp.src([
	"./static/styles/*.css"
	])
.pipe(cleanCss())
.pipe(concat("main.css"))
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
	.pipe(rollup({
		input: "./static/scripts/main.js",
		allowRealFiles: true,
		format: "esm"
	}))
	.pipe(babel())
	.pipe(uglify())
	.pipe(concat("main.js"))
	.pipe(gulp.dest("./dist/scripts/"))
```

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