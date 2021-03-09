import browserSync from "browser-sync";

const bs = browserSync.create();

browserSync({server: "./dist/"})