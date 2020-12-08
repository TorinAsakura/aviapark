var browserSync = require('browser-sync'),

    gulp = require('gulp'),
    html2jade = require('gulp-html2jade'),
    jade = require('gulp-jade'),
    obfuscate = require('gulp-obfuscate'),
    requirejs = require('gulp-requirejs'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rjs = require('gulp-requirejs'),
    wrap = require('gulp-wrap-amd'),
    coffee = require('gulp-coffee'),
    historyApiFallback = require('connect-history-api-fallback'),
    prefix = require('gulp-autoprefixer');

var config = {
    server: {baseDir: "./public"},
    watchOptions: {debounceDelay: 1000},
    tunnel: true,
    host: 'localhost',
    port: 9999,
    logPrefix: "BrowserSync:",
    middleware: [ historyApiFallback() ]
};

var requirePaths = {

};

var paths = {
    public: {
        basePath:  './public/',
        css:  './public/css/',
        js: './public/js/',
        fixtures: './public/js/fixtures/',
        fonts: './public/fonts/',
        img: './public/img/',
        map: './public/map/'
    },
    src: {
        builds: {
            js: './src/builds/js/',
            js_app: './src/builds/js/application/',
            css: './src/builds/css/',
            templates: './src/builds/js/application/templates/'
        },
        application: {
            requirejs: './src/application/vendor/js/require.js',
            index:  './src/application/layouts/index.jade',
            layouts:  './src/application/layouts/**/*.jade',
            coffee: ['./src/application/coffee/**/*.coffee'],
            js: ['./src/application/js/**/*.js'],
            fixtures: ['./src/application/coffee/fixtures/**/*.json'],
            templates: {
                jade: ['./src/application/templates/**/*.jade']
            },
            styles: [
                './src/application/scss/**/*.scss'
            ],
            vendor:
                {
                   js: [
                        './src/makeup/js/libs/jquery-2.1.4.min.js',
                        './src/makeup/js/libs/snap.svg-min.js',
                        './src/makeup/js/libs/svg-injector.min.js',
                        './src/makeup/js/plugins/**/*.js',
                        './src/application/vendor/js/jquery.unveil.js',
                        './src/application/vendor/js/jquery.mockjax.min.js',
                        './src/application/vendor/js/lodash.min.js',
                        './src/application/vendor/js/jade/jade.js',
                        './src/application/vendor/js/jade/runtime.js',
                        './src/application/vendor/js/backbone/backbone.js',
                        './src/application/vendor/js/backbone/backbone.wreqr.js',
                        './src/application/vendor/js/backbone/backbone.babysitter.js',
                        './src/application/vendor/js/backbone/backbone.marionette.js',
                        './src/application/vendor/js/leaflet/leaflet.js',
                        './src/application/vendor/js/leaflet/leaflet.label.js',
                        './src/application/vendor/js/leaflet/leaflet.markercluster.js',
                        './src/application/vendor/js/instafetch.js'
                    ],
                    css: [
                        './src/application/vendor/css/leaflet/leaflet.css',
                        './src/application/vendor/css/leaflet/leaflet.ie.css',
                        './src/application/vendor/css/leaflet/leaflet.label.css'

                    ]
            }
        },
        makeup: {
            html: ['./src/makeup/**/*.html'],
            statics: [
                './src/makeup/about.html',
                './src/makeup/contacts.html',
                './src/makeup/dealers.html',
                './src/makeup/jobs.html',
                './src/makeup/kino.html',
            ],
            styles: './src/makeup/scss/styles.scss',
            js: [
                './src/makeup/js/libs/modernizr.js',
                './src/makeup/js/animations.js'
            ],
            css: './src/makeup/css',
            fonts: ['./src/makeup/fonts/**/*.*'],
            img: ['./src/makeup/img/**/*.*'],

            templates: './src/makeup/jade',
            map: './src/makeup/map/**/*.json',
            jade: './src/makeup/jade/*'
        }
    }
};

gulp.task('makeup:jade', function() {
    gulp.src(paths.src.makeup.html)
        .pipe(html2jade({nspaces:2, donotencode: true, noemptypipe: true}))
        .pipe(gulp.dest(paths.src.makeup.templates));
});

// In case of update makeup
gulp.task('makeup', ['makeup:jade']);

gulp.task('build:map', function () {
    gulp.src(paths.src.makeup.map)
        .pipe(gulp.dest(paths.public.map));
});

gulp.task('build:index', function () {
    gulp.src(paths.src.application.index)
        .pipe(jade({ client: false }))
        .pipe(gulp.dest(paths.public.basePath));
});

gulp.task('build:styles:makeup', function () {
    return gulp.src(paths.src.makeup.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix('last 5 Chrome versions', 'ff >= 4', 'Safari >= 6.1', 'Opera >= 12.1', 'ie >= 9'))
        .pipe(gulp.dest(paths.src.builds.css));
});

gulp.task('build:styles:application', function () {
    return gulp.src(paths.src.application.styles)
        .pipe(sass())
        .pipe(gulp.dest(paths.src.builds.css));
});

gulp.task('build:styles:vendor', function () {
    return gulp.src(paths.src.application.vendor.css)
        .pipe(concatCss("vendor.css"))
        .pipe(gulp.dest(paths.public.css));
});

gulp.task('build:styles', [
        'build:styles:makeup',
        'build:styles:application',
        'build:styles:vendor'
    ], function () {
    return gulp.src(paths.src.builds.css + '**/*.css')
        .pipe(concatCss("styles.css"))
        .pipe(gulp.dest(paths.public.css));
});

gulp.task('build:templates', function () {
    gulp.src(paths.src.application.templates.jade)
        .pipe(jade({ client: true }))
        .pipe(wrap({ }))
        .pipe(gulp.dest(paths.src.builds.templates));
});

gulp.task('build:scripts:coffee', ['build:scripts:application:mv'], function () {
    return gulp.src(paths.src.application.coffee)
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest(paths.src.builds.js));
});

gulp.task('build:scripts:vendor', function () {
    return gulp.src(paths.src.application.vendor.js)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.public.js));
});

gulp.task('build:scripts:fixtures', function () {
    return gulp.src(paths.src.application.fixtures)
        .pipe(gulp.dest(paths.public.fixtures));
});

gulp.task('build:scripts:requirejs:mv', function () {
    return gulp.src(paths.src.application.requirejs)
        .pipe(gulp.dest(paths.public.js));
});

gulp.task('build:scripts:application:mv', function () {
    return gulp.src(paths.src.application.js)
        .pipe(gulp.dest(paths.src.builds.js_app));
});

gulp.task('build:scripts:makeup:mv', function () {
    return gulp.src(paths.src.makeup.js)
        .pipe(gulp.dest(paths.public.js));
});

gulp.task('build:fonts', function () {
    return gulp.src(paths.src.makeup.fonts)
        .pipe(gulp.dest(paths.public.fonts));
});

gulp.task('build:img', function () {
    return gulp.src(paths.src.makeup.img)
        .pipe(gulp.dest(paths.public.img));
});

gulp.task('sass', function() {
    return gulp.src(paths.src.makeup.styles)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.src.makeup.css))
});

requireBuild = function (){
    rjs({
        baseUrl: './src/builds/js/application/',
        name: 'app',
        out: 'app.js'
    }).pipe(gulp.dest('./public/js'));
}

gulp.task('build:move:makeup:html', function(){
    return gulp.src(paths.src.makeup.statics)
        .pipe(gulp.dest(paths.public.basePath));
})

gulp.task('build:scripts', [
        'build:scripts:fixtures',
        'build:scripts:vendor',
        'build:scripts:requirejs:mv',
        'build:scripts:makeup:mv',
        'build:scripts:coffee'
    ], requireBuild
);

gulp.task('build:scripts:application:up', ['build:scripts:application:mv'], requireBuild);
gulp.task('build:scripts:coffee:up', ['build:scripts:coffee'], requireBuild);

// Build project to public
gulp.task('build',
    [   'build:map', 'build:move:makeup:html',
        'build:index', 'build:templates',
        'build:fonts', 'build:img',
        'build:styles', 'build:scripts'
    ]
);

gulp.task('server:start', function () {
    browserSync(config);
});

// Build and start server
gulp.task('server', ['server:start', 'build', 'watch'], function(){
    gulp.watch(paths.public.basePath+'**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function() {
    gulp.watch(paths.src.application.fixtures, ['build:scripts:fixtures']);
    gulp.watch(paths.src.application.js, ['build:scripts:application:up']);
    gulp.watch(paths.src.application.coffee, ['build:scripts:coffee:up']);
    gulp.watch(paths.src.application.layouts, ['build:index']);
    gulp.watch(paths.src.application.templates.jade, ['build:index']);
    gulp.watch(paths.src.application.templates.jade, ['build:templates', 'build:scripts']);
    gulp.watch(paths.src.application.styles, ['build:styles']);
    gulp.watch('src/makeup/scss/**/*.scss', ['build:styles', 'sass']);
    gulp.watch(paths.src.makeup.jade, function(ev) {
        return gulp.src(ev.path)
          .pipe(jade({pretty: true}))
          .pipe(gulp.dest('./src/makeup'));
    });
});