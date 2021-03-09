import pug from "pug";
import fs from "file-system";
import gulp from "gulp";

function createHtml() {
	const title = "Weather app";
	const data = {
		pageTitle: title
	}
	const compiledFunction = pug.compileFile("./views/home.pug");
	const html = compiledFunction(data);

	fs.writeFile("./dist/index.html", html, (err) => {
		if (err) console.log(err);
	})
}

createHtml();