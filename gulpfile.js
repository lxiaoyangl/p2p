/* 
  gulpfile.js gulp的任务配置文件 gulp要做的任务 全部都写在此文件中 
*/
// 从gulp中引入对应的方法
var {
    src,
    dest,
    parallel,
    watch
} = require("gulp");

// 引入插件
var uglify = require("gulp-uglify"); // 压缩js插件
var rename = require("gulp-rename"); // 重命名插件
var less = require("gulp-less"); // 编译less插件
var cleanCss = require("gulp-clean-css"); // 压缩css插件
var browserSync = require("browser-sync").create(); // 启动服务器插件
var reload = browserSync.reload; // 热加载

// js任务
function js() {
    return src("./js/*.js") // 要处理的文件源
        .pipe(uglify()) // 压缩处理
        .pipe(
            rename({
                // 重命名
                suffix: ".min"
            })
        )
        .pipe(dest("./dist/js")) // 输出
        .pipe(reload({ // 热加载
            stream: true
        }))
}

// css任务
function css() {
    return src("./less/*.less") // 要处理的文件源
        .pipe(less()) // 编译
        .pipe(cleanCss()) // 压缩css
        .pipe(
            rename({
                // 重命名
                suffix: ".min"
            })
        )
        .pipe(dest("./dist/css")) // 输出
        .pipe(reload({ // 热加载
            stream: true
        }))
}

// 启动服务器
function serve() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3033
    });
}

// 观察者【上帝之眼】
function auto() {
    watch("./less/*.less", css); // css
    watch("./js/*.js", js); // js
    watch("**/*.html").on("change", reload) // html
}

// 暴露
exports.js = js;
exports.css = css;
exports.serve = serve;
exports.auto = auto;

// 一起执行 暴露默认 default
exports.default = parallel(js, css, serve, auto);