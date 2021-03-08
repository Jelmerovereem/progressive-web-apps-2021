// require express
const express = require("express");

const app = express();

app.use(express.static("static"));

app.get("/", renderHome);

function renderHome(req, res) {
	res.send("Hello world");
}

app.listen(7000, () => console.log("Server is running on port 7000"));