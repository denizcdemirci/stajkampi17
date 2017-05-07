var gulp = require("gulp"),
  path = require("path"),
  notify = require("gulp-notify"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  spritesmith = require("gulp.spritesmith"),
  iconfont = require("gulp-iconfont"),
  iconfontCss = require("gulp-iconfont-css"),
  less = require("gulp-less"),
  minifyCSS = require("gulp-minify-css"),
  webserver = require("gulp-webserver");

var handleError = function() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit("end");
};

gulp.task("sprite", function() {
  var spriteData = gulp.src("app/dev/sprite/*.png")
    .pipe(spritesmith({
      imgName: "sprite.png",
      cssName: "sprite.less",
      imgPath: "../img/sprite.png"
    }));

  spriteData.img.pipe(gulp.dest("app/assets/img/"));
  spriteData.css.pipe(gulp.dest("app/dev/less/partials/"));
});

gulp.task("iconfont", function() {
  gulp.src(["app/dev/icon/*.svg"])
    .pipe(iconfontCss({
      path: "less",
      fontName: "icon",
      targetPath: "../../../dev/less/partials/icon.less",
      fontPath: "../font/icon/"
    }))
    .pipe(iconfont({
      fontName: "icon",
      normalize: true
     }))
    .pipe(gulp.dest("app/assets/font/icon/"));
});

gulp.task("less", function() {
  gulp.src("app/dev/less/*.less")
    .pipe(concat("main.min.css"))
    .pipe(less().on("error", handleError))
    .pipe(minifyCSS())
    .pipe(gulp.dest("app/assets/css/"));
});

gulp.task("javascript", function() {
  gulp.src([
      "app/dev/js/jquery-3.2.1.js",
      "app/dev/js/app.js"
    ])
    .pipe(concat("app.min.js"))
    .pipe(uglify().on("error", handleError))
    .pipe(gulp.dest("app/assets/js/"))
});

gulp.task("webserver", function() {
  gulp.src("app")
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      port: 9988
    }));
});

gulp.task("watch", function() {
  gulp.watch("app/dev/sprite/*.png", ["sprite"]);
  gulp.watch("app/dev/icon/*.svg", ["iconfont"]);
  gulp.watch("app/dev/less/**/*.less", ["less"]);
  gulp.watch("app/dev/js/*.js", ["javascript"]);
});

gulp.task("default", ["sprite", "iconfont", "less", "javascript"]);
gulp.task("dev", ["sprite", "iconfont", "less", "javascript", "webserver", "watch"]);
