// require express
import express from "express";
import pug from "pug";

import bodyParser from "body-parser";
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

import fetch from "node-fetch";

import compression from "compression";

export const app = express();

import routes from "./modules/controllers/routes.js";
import posts from "./modules/controllers/posts.js";

app.use(express.static("dist"));
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(compression())
app.set("view engine", "pug");

routes();
posts();

const port = process.env.PORT || 7000;
app.listen(port, () => {
	if (process.env.NODE_ENV !== "production") {
		import("localhost-logger").then(localLog => {
			localLog.default(port);
		});
	}
	console.log(`Server is running on port ${port}`);
});