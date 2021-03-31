import gulp from "gulp";
import cleanCss from "gulp-clean-css";
import concat from "gulp-concat";

gulp.src([
	"./static/styles/*.css"
	])
.pipe(cleanCss()) // minifies the CSS files
.pipe(concat("main.css")) // concat all css files to one file
.pipe(gulp.dest("./dist/styles/"))