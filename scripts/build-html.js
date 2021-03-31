import pug from "pug";
import fs from "file-system";

function createHtml() {
	const title = "Weather app";
	const data = {
		pageTitle: title
	}
	const compiledFunction = pug.compileFile("./views/home.pug"); // compile the pug file to html string
	const html = compiledFunction(data); // compile the homepage with the data

	fs.writeFile("./dist/index.html", html, (err) => { // write the html to the dist folder
		if (err) console.log(err); // show error if present
	})
}

createHtml();