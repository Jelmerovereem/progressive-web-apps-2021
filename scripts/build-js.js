import gulp from "gulp";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import rollup from "gulp-rollup";

gulp.src([
	"./static/scripts/main.js"])
	.pipe(rollup({ // bundle the ES6 module files
		input: "./static/scripts/main.js",
		allowRealFiles: true,
		format: "esm"
	}))
	.pipe(babel()) // create backwards compatible JavaScript. Mostly syntax
	.pipe(uglify()) // minify javascript
	.pipe(concat("main.js")) // concact all JavaScript files to one file
	.pipe(gulp.dest("./dist/scripts/"))