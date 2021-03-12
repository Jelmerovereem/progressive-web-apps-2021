// require express
import express from "express";
//const express = require("express");
import pug from "pug";
//export const pug = require("pug");

import bodyParser from "body-parser";
//const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

import fetch from "node-fetch";
//const fetch = require("node-fetch");

import fetchData from "./modules/fetchData.js";

import backgroundCss from "./modules/backgroundCss.js";

const app = express();

//app.use(express.static("static"));
app.use(express.static("dist"))
app.use(urlencodedParser);
app.use(bodyParser.json())
//app.set("view engine", "ejs");
app.set("view engine", "pug");
app.get("/", renderHome);
app.get("/:city", renderDetail);
app.post("/getWeatherData", getWeatherData);

const weatherApiConfig = {
	baseUrl: "https://api.openweathermap.org/data/2.5/weather",
	units: "metric",
	apiKey: "5c8601ba0008d71d05e037ba2a55d3c9"
}

function renderHome(req, res) {
	res.sendFile("dist/index.html");
	/*const title = "Weather app";
	res.render("home", {
		pageTitle: title // pass data as an object
	});*/
}

async function renderDetail(req, res) {
	const city = req.params.city;

	const url = `${weatherApiConfig.baseUrl}?q=${city}&units=${weatherApiConfig.units}&appid=${weatherApiConfig.apiKey}`;
	const weatherData = await fetchData(url);

	console.log(weatherData);
	console.log(new Date(weatherData.dt * 1000))
	const weatherDesc = weatherData.weather[0].main.toLowerCase();
	const backgroundGradient = await backgroundCss(weatherDesc);
	
	res.render("detail", {
		weatherData,
		pageTitle: `Weather app - ${city}`,
		backgroundGradient: backgroundGradient
	});
}

async function getWeatherData(req, res) {
	console.log(req.body)
	let searchString;
	if (req.body.type === "city") {
		searchString = `q=${req.body.city}`;
	} else if (req.body.type === "coords") {
		searchString = `lat=${req.body.coords.lat}&lon=${req.body.coords.lon}`;
	}
	
	const url = `${weatherApiConfig.baseUrl}?${searchString}&units=${weatherApiConfig.units}&appid=${weatherApiConfig.apiKey}`;
	const weatherData = await fetchData(url);
	console.log(weatherData)

/*	const weatherData = await fetch(`${weatherApiConfig.baseUrl}?${searchString}&units=${weatherApiConfig.units}&appid=${weatherApiConfig.apiKey}`)
	.then(res => res.ok ? res.json() : res.ok);*/
	
	res.setHeader("Content-Type", "application/json");
	res.send({weatherData});
}

app.listen(process.env.PORT || 7000, () => console.log("Server is running on port 7000"));