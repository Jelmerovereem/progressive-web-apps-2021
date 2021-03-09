export default function fetchData(url, options) {
	return fetch(url, options)
		.then(res => res.ok ? res.json() : res.ok);
}