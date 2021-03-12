export default function backgroundCss(weatherDesc) {
	if (weatherDesc === "snow" || weatherDesc === "clouds" || weatherDesc === "mist") {
		return `linear-gradient(to bottom, rgba(97,132,186,0.8), rgba(143,169,206,0.8))`;
	} else if (weatherDesc === "drizzle" || weatherDesc === "rain") {
		return `linear-gradient(to bottom, rgba(89,106,132,0.8), rgba(117,133,149,0.8))`;
	} else {
		return `linear-gradient(to bottom, rgba(22,119,210,0.8), rgba(107,165,228,0.8))`;
	}
}