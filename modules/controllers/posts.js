import { app } from "../../server.js";
import { sendWeatherData, nojsSearchCity } from "../sendWeatherData.js";

export default function posts() {
	app
		.post("/getWeatherData", sendWeatherData)
		.post("/searchCity", nojsSearchCity)
}