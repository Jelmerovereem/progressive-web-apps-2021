import getWeatherData from "./getWeatherData.js";

async function sendWeatherData(req, res) {
	let searchString;
	if (req.body.type === "city") {
		searchString = `q=${req.body.city}`;
	} else if (req.body.type === "coords") {
		searchString = `lat=${req.body.coords.lat}&lon=${req.body.coords.lon}`;
	}
	
	const weatherData = await getWeatherData(searchString);

	res.setHeader("Content-Type", "application/json");
	res.send({weatherData});
}

async function nojsSearchCity(req, res) {
	let city = req.body.city;
	res.redirect(`/city/${city}`);
}

export { sendWeatherData, nojsSearchCity };