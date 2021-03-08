// require express
const express = require("express");

const pug = require("pug");

const app = express();

app.use(express.static("static"));
//app.set("view engine", "ejs");
app.set("view engine", "pug");
app.get("/", renderHome);

function renderHome(req, res) {
	const title = "Weather app";
	res.render("home", {
		pageTitle: title // pass data as an object
	});
}

app.listen(7000, () => console.log("Server is running on port 7000"));