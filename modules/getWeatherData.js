import fetchData from "./helpers/fetchData.js";
import { weatherApiConfig } from "./helpers/apiconfig.js";

export default async function getWeatherData(searchString) {
	const url = `${weatherApiConfig.baseUrl}?${searchString}&units=${weatherApiConfig.units}&appid=${weatherApiConfig.apiKey}`;
	const weatherData = await fetchData(url);
	return weatherData;
}