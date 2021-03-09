import gulp from "gulp";
import cleanCss from "gulp-clean-css";
import concat from "gulp-concat";

gulp.src([
	"./static/styles/*.css"
	])
.pipe(cleanCss())
.pipe(concat("main.css"))
.pipe(gulp.dest("./dist/styles/"))