import { app } from "../../server.js";
import { renderHome, renderDetail, renderOffline } from "./renders.js";

export default function routes() {
	app
		.get("/", renderHome)
		.get("/city/:city", renderDetail)
		.get("/offline", renderOffline)
}