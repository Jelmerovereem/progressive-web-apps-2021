import gulp from "gulp";

gulp.src([ // copy paste manifest and serviceworker
	"./static/manifest.json",
	"./static/service-worker.js"
	]).pipe(gulp.dest("./dist/"))
gulp.src("./static/assets/**/*.*").pipe(gulp.dest("./dist/assets/")) // copy paste all other static assets