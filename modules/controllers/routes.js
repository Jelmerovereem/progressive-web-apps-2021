import { app } from "../../server.js";
import { renderHome, renderDetail } from "./renders.js";

export default function routes() {
	app
		.get("/", renderHome)
		.get("/:city", renderDetail);
}