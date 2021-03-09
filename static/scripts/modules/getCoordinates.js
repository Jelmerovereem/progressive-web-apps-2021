export default async function getCoordinates() {
	if (navigator.geolocation) {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		})
	} else {
		alert("This browser does not support geolocation")
	}
}