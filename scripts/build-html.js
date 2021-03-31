import pug from "pug";
import fs from "file-system";

function createHtml() {
	const title = "Weather app";
	const data = {
		pageTitle: title
	}

	const html = pug.renderFile("./views/home.pug", data); // compile and render file

	fs.writeFile("./dist/index.html", html, (err) => { // write the html to the dist folder
		if (err) console.log(err); // show error if present
	})
}

createHtml();