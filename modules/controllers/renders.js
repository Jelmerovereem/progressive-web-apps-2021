import { weatherApiConfig } from "../helpers/apiconfig.js";
import fetchData from "../helpers/fetchData.js";
import backgroundCss from "../backgroundCss.js";
import compression from "compression";

function renderHome(req, res) {
	res.sendFile(compression("dist/index.html"));
}

async function renderDetail(req, res) {
	console.log("rendering detail page")
	const city = req.params.city;
	console.log(`city: ${city}`)
	if (city !="") {
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
}

function renderOffline(req, res) {
	res.render("offline");
}

export { renderHome, renderDetail, renderOffline };