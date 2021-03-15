import { weatherApiConfig } from "../../server.js";
import fetchData from "../helpers/fetchData.js";
import backgroundCss from "../backgroundCss.js";

function renderHome(req, res) {
	res.sendFile("dist/index.html");
}

async function renderDetail(req, res) {
	const city = req.params.city;

	const url = `${weatherApiConfig.baseUrl}?q=${city}&units=${weatherApiConfig.units}&appid=${weatherApiConfig.apiKey}`;
	const weatherData = await fetchData(url);

	const weatherDesc = weatherData.weather[0].main.toLowerCase();
	const backgroundGradient = await backgroundCss(weatherDesc);
	
	res.render("detail", {
		weatherData,
		pageTitle: `Weather app - ${city}`,
		backgroundGradient: backgroundGradient
	});
}

export { renderHome, renderDetail };