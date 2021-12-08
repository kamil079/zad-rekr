const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const c = require("ansi-colors");
const browserSync = require("browser-sync").create();

const server = function (cb) {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        open: true,
        notify: false,
    });
    cb();
};

function ourErrors(err) {
    console.log(c.red("-----------------"));
    console.log(c.red(err.messageFormated).toString());
    console.log(c.red("-----------------"));
    this.emit("end");
}

function compileSass(cb) {
    console.log("Sass");
    gulp
        .src("./scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "nested" }).on("error", ourErrors))
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false,
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
    cb();
}

const watcher = function (cb) {
    gulp.watch("./scss/main.scss", gulp.series(compileSass));
    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch("./scss/**/*.scss").on("change", browserSync.reload);
    cb();
};

exports.default = gulp.parallel(compileSass, server, watcher);
