import gulp from "gulp";

gulp.src([
	"./static/manifest.json",
	"./static/service-worker.js"
	]).pipe(gulp.dest("./dist/"))
gulp.src("./static/assets/**/*.*").pipe(gulp.dest("./dist/assets/"))