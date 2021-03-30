import { leafletMap } from "./utils/mapUtils.js";
import { searchInput, getLocationBtn, searchBtn, errMsg} from "./utils/searchUtils.js";
import fetchData from "./modules/fetch.js";
import toMap from "./modules/toMap.js";
import getCoordinates from "./modules/getCoordinates.js";

const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			} 
		};

function initEventListeners() {
	searchBtn.addEventListener("click", async () => {
		options.body = JSON.stringify({type: "city", city: searchInput.value});
		const weatherData = await fetchData("/getWeatherData", options);
		if(Object.keys(weatherData).length != 0) {
			errMsg.classList.remove("showError");
			toMap(weatherData.weatherData)
		} else {
			errMsg.classList.add("showError");
			errMsg.innerText = "Kon opgegeven stad niet vinden. Probeer iets anders :)";
		}
	})

	getLocationBtn.addEventListener("click", async () => {
		const coordsObj = await getCoordinates();
		const coords = {
			lat: coordsObj.coords.latitude,
			lon: coordsObj.coords.longitude
		}
		console.log(coords)
		options.body = JSON.stringify({type: "coords", coords});
		const weatherData = await fetchData("/getWeatherData", options);
		toMap(weatherData.weatherData);
	})

	leafletMap.on("click", async (e) => {
		const coords = {
			lat: e.latlng.lat,
			lon: e.latlng.lng
		}
		options.body = JSON.stringify({type: "coords", coords});
		const weatherData = await fetchData("/getWeatherData", options);
		toMap(weatherData.weatherData);
	})

	leafletMap.on("move", () => leafletMap.invalidateSize())
}

initEventListeners();