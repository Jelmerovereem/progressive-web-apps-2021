// require express
import express from "express";
import pug from "pug";

import bodyParser from "body-parser";
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

import fetch from "node-fetch";


export const app = express();

import routes from "./modules/controllers/routes.js";
import fetchData from "./modules/helpers/fetchData.js";
import backgroundCss from "./modules/backgroundCss.js";

app.use(express.static("dist"))
app.use(urlencodedParser);
app.use(bodyParser.json())
app.set("view engine", "pug");

routes();

app.post("/getWeatherData", getWeatherData);

export const weatherApiConfig = {
	baseUrl: "https://api.openweathermap.org/data/2.5/weather",
	units: "metric",
	apiKey: "5c8601ba0008d71d05e037ba2a55d3c9"
}

async function getWeatherData(req, res) {
	let searchString;
	if (req.body.type === "city") {
		searchString = `q=${req.body.city}`;
	} else if (req.body.type === "coords") {
		searchString = `lat=${req.body.coords.lat}&lon=${req.body.coords.lon}`;
	}
	
	const url = `${weatherApiConfig.baseUrl}?${searchString}&units=${weatherApiConfig.units}&appid=${weatherApiConfig.apiKey}`;
	const weatherData = await fetchData(url);
	
	res.setHeader("Content-Type", "application/json");
	res.send({weatherData});
}

app.listen(process.env.PORT || 7000, () => console.log("Server is running on port 7000"));