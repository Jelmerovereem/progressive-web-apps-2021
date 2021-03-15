import gulp from "gulp";

gulp.src("./static/manifest.json").pipe(gulp.dest("./dist/"))
gulp.src("./static/assets/**/*.*").pipe(gulp.dest("./dist/assets/"))