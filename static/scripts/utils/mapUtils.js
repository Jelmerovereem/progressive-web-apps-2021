import { mapboxAccessToken } from "../utils/key.js";

/* Init leaflet map */
export const leafletMap = L.map("map", {zoomControl: false}).setView([52.2351,5.2294], 5);
L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
	tileSize: 512,
	zoomOffset: -1,
	accessToken: mapboxAccessToken
}).addTo(leafletMap);

L.control.zoom({position: "bottomright"}).addTo(leafletMap)

export const popup = L.popup();