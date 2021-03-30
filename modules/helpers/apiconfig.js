import dotenv from "dotenv";
dotenv.config();

export const weatherApiConfig = {
	baseUrl: "https://api.openweathermap.org/data/2.5/weather",
	units: "metric",
	apiKey: process.env.apikey
}