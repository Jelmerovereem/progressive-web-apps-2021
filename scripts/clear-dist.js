import fs from "file-system";
import rimraf from "rimraf";

rimraf("./dist/*", () => {console.log("cleared dist")});