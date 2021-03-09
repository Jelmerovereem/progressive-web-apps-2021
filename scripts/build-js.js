import gulp from "gulp";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import rollup from "gulp-rollup";

gulp.src([
	"./static/scripts/main.js"])
	.pipe(rollup({
		input: "./static/scripts/main.js",
		allowRealFiles: true,
		format: "esm"
	}))
	.pipe(babel())
	.pipe(uglify())
	.pipe(concat("main.js"))
	.pipe(gulp.dest("./dist/scripts/"))