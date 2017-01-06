import gulp from 'gulp';
import connect from 'gulp-connect';
import chalk from 'chalk';
import sass from 'gulp-sass';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';
import replace from 'gulp-replace';
import gulpif from 'gulp-if';
import cssNano from 'gulp-cssnano';
import merge from 'merge-stream';
import git from 'gulp-git';
import header from 'gulp-header';
import moment from 'moment-timezone';
import mocha from 'gulp-mocha';
import path from 'path';
import fs from 'fs';
import emoji from 'node-emoji';

// linting
import eslint from 'gulp-eslint';

// for debugging webpack
//import StatsPlugin from 'stats-webpack-plugin';

let minified = false;

const environmentTypes = {
    DEVLOCAL: 0,
    DEVHOSTED: 1,
    PROD: 2,
    LOCAL: 3
};

const serverDeps = [];

let commitHash = '';
let coreHash = '';
const currentTime = moment().tz('America/New_York').format('MMMM D, YYYY h:mm A z');

// set the environment
let environment = environmentTypes.DEVLOCAL;
process.env.NODE_ENV = 'development';
let constantsFile = 'GlobalConstants_dev.js';

gulp.task('setDev', () => {
    minified = false;
    environment = environmentTypes.DEVLOCAL;
    constantsFile = 'GlobalConstants_dev.js';

    // set the NodeJS environment so that Redux compiles correctly in production modes
    process.env.NODE_ENV = 'development';

    gutil.log('You are running in ' + chalk.black.bgYellow(' DEVELOPMENT (LOCAL) ') + ' mode.');
});

gulp.task('setDevHosted', () => {
    minified = false;
    environment = environmentTypes.DEVHOSTED;
    process.env.NODE_ENV = 'development';
    constantsFile = 'GlobalConstants_dev.js';

    gutil.log('You are running in ' + chalk.black.bgYellow(' DEVELOPMENT (HOSTED) ') + ' mode.');
})

gulp.task('setProd', () => {
    minified = true;
    environment = environmentTypes.PROD;
    process.env.NODE_ENV = 'production';
    constantsFile = 'GlobalConstants_prod.js';

    gutil.log('You are running in ' + chalk.black.bgGreen(' PRODUCTION (HOSTED) ') + ' mode.');
});

gulp.task('setLocal', () => {
    minified = true;
    environment = environmentTypes.LOCAL;
    process.env.NODE_ENV = 'production';
    constantsFile = 'GlobalConstants_local.js';

    // update the local server dependencies to wait for the minification and HTML modification process
    serverDeps.push('modifyHtml');

    gutil.log('You are running in ' + chalk.black.bgGreen(' PRODUCTION (LOCAL) ') + ' mode.');
});

// check for version changes of critical libraries
gulp.task('criticalVersionCheck', () => {
    // get the current expected versions
    const criticalLibs = JSON.parse(fs.readFileSync('./criticalVersions.json'));
        
    let requiresReinstall = false;
    const misalignedLibs = [];

    // iterate through the libraries and check the node_modules directory
    Object.keys(criticalLibs).forEach((lib) => {
        const expectedVersion = criticalLibs[lib];
        const packagePath = `./node_modules/${lib}/package.json`;
        // read the package.json file
        const packageData = JSON.parse(fs.readFileSync(packagePath));
        const packageVersion = packageData.version;
        
        if (packageVersion !== expectedVersion) {
            requiresReinstall = true;
            misalignedLibs.push(lib);
        }
    });

    if (requiresReinstall) {
        let message = `\n${emoji.get(':warning:')}  ${chalk.white.bgRed('WARNING WARNING WARNING')} ${emoji.get(':warning:')}\nThe following critical libraries are not aligned with the versions required by the codebase:\n`;
        misalignedLibs.forEach((lib) => {
            message += `\n- ${lib}`;
        });
        message += `\n\nPerform a clean install by deleting your ${chalk.bold('node_modules')} folder and then running ${chalk.bold('npm install')}\n${emoji.get(':warning:')}  ${chalk.white.bgRed('WARNING WARNING WARNING')} ${emoji.get(':warning:')}`;

        gutil.log(message);

        // do not continue
        process.exit(1);
    }
});

// clear out the existing folder contents and also the webpack build cache
// NOTE: this will make the build take a long time
gulp.task('clean', ['criticalVersionCheck'], () => {
    return del(['./public/**/*', './cache/**/*']);
});

// get the current git metadata
gulp.task('meta', ['clean'], (done) => {
    git.revParse({
        args: '--short HEAD',
        quiet: true
    }, (err, hash) => {
        commitHash = hash;
        gutil.log('This build is based on commit ' + chalk.cyan(hash) + '.');
        done();
    });
});

// copy the correct constants file into the source directory
gulp.task('copyConstants', ['meta'], () => {

    let file = constantsFile;

    return gulp.src('./' + file)
        .pipe(rename('GlobalConstants.js'))
        .pipe(gulp.dest('./src/js'))
        .on('end', () => {
            gutil.log('Using ' + chalk.magenta(file) + ' as the constants file...');
        });
});

// copy the assets
gulp.task('copyAssets', ['copyConstants'], () => {

    // combine all the copy streams into a single stream
    // return the stream to wait for the task to complete
    return merge(
        // copy fonts
        gulp.src('./src/fonts/**/*')
            .pipe(gulp.dest('./public/fonts'))
            .on('end', () => {
                gutil.log('Fonts copied');
            }),

        // copy graphics
        gulp.src('./src/graphics/**/*')
            .pipe(gulp.dest('./public/graphics'))
            .on('end', () => {
                gutil.log('Graphics copied');
            }),

         // copy images
        gulp.src('./src/img/**/*')
            .pipe(gulp.dest('./public/img'))
            .on('end', () => {
                gutil.log('Images copied');
            }),

        // copy CSS files
        gulp.src('./src/css/**/*.css')
            .pipe(gulp.dest('./public/css'))
            .on('end', () => {
                gutil.log('CSS copied');
            }),

        // copy markdown files
        gulp.src('./src/help/**/*.md')
            .pipe(gulp.dest('./public/help'))
            .on('end', () => {
                gutil.log('Markdown copied');
            }),

        // copy the main index file
        gulp.src('./index.html')
            .pipe(gulp.dest('./public'))
            .on('end', () => {
                gutil.log('index.html copied');
            })
    );
});

// build the SASS
gulp.task('sass', ['copyAssets'], () => {

    if (environment == environmentTypes.DEVLOCAL) {
        // set up a watcher for future SASS changes
        gulp.watch(['src/css/**/*.scss', 'src/_scss/**/*.scss'])
            .on('change', () => {
                gutil.log(chalk.green('Starting SASS recompile...'));
                return gulp.src('./src/css/**/*.scss')
                    .pipe(sourcemaps.init())
                    .pipe(sass.sync().on('error', sass.logError))
                    .pipe(sourcemaps.write())
                    .pipe(gulp.dest('./public/css'))
                    // auto reload the browser
                    .pipe(connect.reload())
                    .on('end', () => {
                        gutil.log(chalk.green('SASS compiled.'));
                    });
            });
    }

    // compile SASS files
    return gulp.src('src/css/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        // add in the commit hash and timestamp header
        .pipe(header('/* Build ' + commitHash  + '\n' + currentTime + ' */\n\n'))
        // .pipe(gulpif(minified, cssNano()))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('webpackCore', ['sass'], (callback) => {

    // the Core consists of the common libraries used throughout the application
    // this task compiles these libraries into a Webpack DLL to reduce subsequent build times (in dev) and to further reduce  the application bundle size

    const config = {
        entry: {
            'core': ['react', 'react-dom', 'q', 'react-addons-css-transition-group', 'react-router', 'redux', 'lodash', 'jquery', 'moment', 'svg4everybody', 'dompurify', 'babel-polyfill']
        },
        output: {
            path: './public/js',
            publicPath: 'js/',
            filename: 'core.js',
            library: '[name]_[hash]'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader' // the babel loader tells webpack to compile JS/JSX files using Babel
            },{
                test: /\.json$/,
                loader: 'json-loader' // the JSON loader tells webpack how to handle JSON files (as JSON files)
            },{
                test: /\/node_modules\/aws-sdk/,
                loader: 'transform?aws-sdk/dist-tools/transform' // this loader is used to to bundle the AWS SDK
            }]
        },
        node: {
            fs: "empty" // this is a hack to get the AWS SDK to compile properly in webpack
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') // this lets some libraries compile in a compressed production mode, if available (for prod only)
            }),
            new webpack.DllPlugin({
                path: './public/js/manifest.json',
                name: '[name]_[hash]',
                context: '.'
            }),
            new webpack.optimize.DedupePlugin() // remove duplicated items
        ]
    };

    // only minify if not local development
    if (environment != environmentTypes.DEVLOCAL) {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: true,
            warnings: false,
            sourceMap: false
        }));

        // also use a hashed file name (based on content, not commit)
        config.output.filename = 'core.[hash].js';
    }


    // actually build the core
    // also extract the file hash from the core so its hashed file name can be included in the HTML script tag
    webpack(config, (err, stats) => {
        coreHash = stats.hash;
        if(err) throw new gutil.PluginError("webpack", err);
        callback();
    });
});

gulp.task('webpack', ['webpackCore'], () => {
    // this task compiles the application code
    // to reduce the initial load time of the application, files are chunked and the chunks are loaded dynamically as required

    const jsFile = 'app.' + commitHash + '.js';
    
    const config = {
        output: {
            publicPath: 'js/',
            filename: 'app.js',
            chunkFilename: 'chunk.[chunkhash].js' // including the hash in chunk filenames allows the client to cache them, but discard the cache when the chunk is updated
        },
        resolve: {
            root: [
                path.resolve('./src/js')
            ],
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                include: /src\/js/,
                exclude: /node_modules/,
                loader: 'babel-loader', // the babel loader tells webpack to compile JS/JSX files using Babel
                query: {
                    cacheDirectory: './cache/', // after initial load, subsequent builds draw from a cache (in dev only) to reduce build time
                    compact: true
                }
            },{
                test: /\.json$/,
                loader: 'json-loader' // the JSON loader tells webpack how to handle JSON files (as JSON files)
            },{
                test: /\/node_modules\/aws-sdk/,
                loader: 'transform?aws-sdk/dist-tools/transform'  // this loader is used to to bundle the AWS SDK
            }]
        },
        node: {
            fs: "empty" // this is a hack to get the AWS SDK to compile properly in webpack
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') // this lets some libraries compile in a compressed production mode, if available (for prod only)
            }),
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require('./public/js/manifest.json') // this tells webpack where the DLL libraries in the Core are
            })
        ]
    };

    // watch if in local dev mode
    if (environment == environmentTypes.DEVLOCAL) {

        // enable debugging on the JS output
        config.devtool = 'eval';
        config.debug = true;

        gulp.watch('src/js/**/*') // drop the leading . to allow gulp to detect new files that are created after the initial build
            .on('change', () => {
                gutil.log(chalk.cyan('Starting JS recompile...'));
                const watchConfig = Object.assign(config, {quiet: true});
                return gulp.src('./src/js/app.jsx')
                    .pipe(sourcemaps.init())
                    .pipe(webpackStream(watchConfig))
                    .on('end', (err, stats) => {
                        gutil.log(chalk.cyan('Reloading JS...'));
                    })
                    .on('error', (err) => {
                        // show the error in terminal
                        gutil.log(err);
                        gutil.log(chalk.red('COMPILE ERRORS OCCURRED'));
                    })
                    .pipe(gulp.dest('./public/js'))
                    .pipe(connect.reload());
            });
    }
    else if (environment != environmentTypes.DEVHOSTED) {
        // if it's not a development environment, minify everything
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false,
            comments: false
        }));

        // use the commit hash to version the app.js file
        config.output.filename = jsFile;
    }
    else {
        // even in the hosted environment, use the commit hash
        config.output.filename = jsFile;
    }

    return gulp.src('./src/js/app.jsx')
        .pipe(sourcemaps.init())
        .pipe(webpackStream(config))
        .pipe(gulp.dest('./public/js'))
        .pipe(connect.reload())
        .on('end', () => {
            gutil.log(chalk.cyan('Reloading JS...'));
        })
        .on('error', (err) => {
            // show the error in terminal
            gutil.log(err);
            gutil.log(chalk.red('COMPILE ERRORS OCCURRED'));
        });

});


// after minifying, change the HTML script tag to point to the minified file
gulp.task('modifyHtml', ['webpack'], () => {
    const cssFile = 'main.' + commitHash + '.css';
    const jsFile = 'app.' + commitHash + '.js';
    const coreFile = 'core.' + coreHash + '.js';

    return merge(
        gulp.src('./public/index.html')
            // replace the app.js script reference with one that points to the minified file
            // add in a ?v=[git hash] param to override browser caches when a new version is deployed
            .pipe(replace('app.js', jsFile))
            .pipe(replace('core.js', coreFile))
            // now do the same thing (without minification) for the CSS file
            .pipe(replace('main.css', cssFile))
            .pipe(gulp.dest('./public')),
        // now we have to rename the CSS file to match (JS renaming is handled by minification process)
        gulp.src('./public/css/main.css')
            .pipe(vinylPaths(del))
            .pipe(rename(cssFile))
            .pipe(gulp.dest('./public/css'))
    );
});


// serve the frontend locally
gulp.task('serve', serverDeps, () => {

    let reload = true;
    if (environment != environmentTypes.DEVLOCAL) {
        reload = false;
    }

    connect.server({
        root: './public',
        port: 3000,
        livereload: reload
    });
});

// lint the codebase
gulp.task('lint', () => {
    return gulp.src(['src/**/*.js', 'src/**/*.jsx', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


// user-initiated gulp tasks
gulp.task('buildDev', ['setDevHosted', 'modifyHtml'], () => {

});

gulp.task('dev', ['setDev', 'webpack', 'serve'], () => {

});

gulp.task('buildLocal', ['setLocal', 'modifyHtml'], () => {

});

gulp.task('local', ['setLocal', 'modifyHtml', 'serve'], () => {

});

gulp.task('production', ['setProd', 'modifyHtml'], () => {

});

gulp.task('default', ['local']);



// run unit tests
gulp.task('expresso', () => {
    return gulp.src(['./__unittests__/**/*-spec.js','./__unittests__/**/*-spec.jsx', '!./__unittests__/support/*.js'], { read: false })
        .pipe(mocha({
            compilers: {
                js: require('babel-core/register')
            },
            require: ['./__unittests__/setup.js']
        }))
})

gulp.task('mocha', () => {
    return gulp.src(['./__unittests__/**/*-spec.js','./__unittests__/**/*-spec.jsx', '!./__unittests__/support/*.js'], { read: false })
        .pipe(mocha({
            compilers: {
                js: require('babel-core/register')
            },
            require: ['./__unittests__/setup.js'],
            reporter: 'mocha-junit-reporter',
            reporterOptions: {
                mochaFile: './__unittests__/mocha.xml'
            }
        }))
})
