import { leafletMap } from "../utils/mapUtils.js";

const iconsUrl = `http://openweathermap.org/img/wn/`;

export default function toMap(weatherData) {
	const coordinates = weatherData.coord;
	const temp = Math.round(weatherData.main.temp);
	const city = weatherData.name;
	const icon = weatherData.weather[0].icon;
	leafletMap.setView(coordinates, 13);
	const marker = L.marker(coordinates).addTo(leafletMap);
	const markerHtml = `
		<div class="temp-header">
			<span>${temp}°C</span>
			<img src="${iconsUrl}${icon}@2x.png" class="weatherIcon" alt="weather-icon">
		</div>
		<p><a href="/city/${city}">${city}</a></p>
	`;
	marker.bindPopup(markerHtml).openPopup();
}