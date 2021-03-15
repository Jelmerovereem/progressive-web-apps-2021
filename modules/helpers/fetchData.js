import fetch from "node-fetch";

export default function fetchData(url) {
	return fetch(url)
		.then(res => res.ok ? res.json() : console.error(res.ok))
}