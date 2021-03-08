# Progressive Web Apps @cmda-minor-web · 20-21

In this course we will convert the client side web application previously made Web App From Scratch into a server side rendered application. We also add functionalities based on the Service Worker and turn the application into a Progressive Web App. Ultimately we are going to implement a series of optimisations to improve the performance of the application.  

## Learning goals
- [] _You understand the difference between client side and server side rendering and you can apply server side rendering
in your application_
- [] _You understand how a Service Worker works and you can implement it in your application._
- [] _You understand how the critical render path works and how you can optimize it for a better runtime and / or perceived performance._


<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->
## Install
```
git clone https://github.com/Jelmerovereem/progressive-web-apps-2021
cd progressive-web-apps-2021/
```

Once you're in the directory, install the required node modules:

```
npm install
```

Finally, start the server:
```
npm start or node server.js
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
I'll use or [ejs](https://ejs.co/) or [pug](https://pugjs.org/) as my templating engine for this project.
I've already worked with EJS before, so it'll be more of a challenge if I use pug this time.

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


<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
