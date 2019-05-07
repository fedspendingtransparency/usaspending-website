# USAspending Website

[![Build Status](https://travis-ci.org/fedspendingtransparency/usaspending-website.svg?branch=dev)](https://travis-ci.org/fedspendingtransparency/usaspending-website) [![Test Coverage](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/badges/coverage.svg)](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/coverage)

[The USAspending website](https://beta.usaspending.gov/) is the public-facing site offering information on Government spending for the United States.

## Development Set Up

To stand up a local copy of the USAspending website, follow the directions below.

Assumptions:

* You're able to install software on your machine.
* You have git installed on your machine and are able to clone code repositories from GitHub. If this isn't the case, the easiest way to get started is to install [GitHub Desktop](https://desktop.github.com/ "GitHub desktop"), available for Windows or Mac.
* You're familiar with opening a terminal on your machine and using the command line as needed.


### Install Prerequisites and Code

1. If you're not already running Node.js, download and run the installer for your operating system. We build using **Node.js 10.15.3 (LTS)**: [https://nodejs.org/en/](https://nodejs.org/en/ "Node.js installer").

2. You should also have *npm* (Node's package manager). This is typically included as part of the Node.js install. We use version 6.4.1. This is used to install the software dependencies the web site and the build system require.

3. From the command line, clone the USAspending website repository from GitHub to your local machine:

        $ git clone https://github.com/fedspendingtransparency/usaspending-website.git

4. Change to the `usaspending-website` directory that was created when you cloned the USAspending Website repository.

5. Install the web application's package dependencies:

        $ npm install


### Create Configurations

The `usaspending-website` folder provides three sample `GlobalConstants` files:

 * `sampleGlobalConstants_dev.js`
 * `sampleGlobalConstants_prod.js`.

Use these sample files to create files named `GlobalConstants_dev.js` and `GlobalConstants_prod.js` respectively.

You **must** have *both* `GlobalConstants_dev.js` and `GlobalConstants_prod.js` created before building the application. 

The sample files require you to provide values for:

* `API` (string) is the base API URL for the server that is hosting the API.
	* The USAspending API is located at `https://api.usaspending.gov/api/`, with the trailing slash included.
* `DEV` (boolean) indicates if you are running the application in development mode or for production use. Enabling development mode activates certain debugging functionality at the expense of some performance.
* `PERF_LOG` (boolean) indicates if you want to enable performance logging data in the JavaScript console. This requires `DEV` to be enabled as well.

`DEV` and `PERF_LOG` should be disabled when deploying to a hosted public, staging, or production environment.

**TIP!** You can use separate `GlobalConstants_dev.js` and `GlobalConstants_prod.js` files to point to different API endpoints that align with different environments.

### Build Application

Several Webpack configurations are available to build the frontend web site for various use cases.

#### Hosted Production

If you are building the web site for a hosted production environment, run:

```bash
	$ npm run prod
```
This will build the frontend files to the `/public` directory, which you can then deploy on your host. In this mode, JavaScript files are minified, debugging tools are disabled, and the `GlobalConstants_prod.js` file is used as the GlobalConstants file.

#### Local Development

Finally, if you are a frontend developer, use:

```bash
	$ npm start
```

This will build the frontend files to the `/public` directory and also start a web server on port 3000. In this mode, JavaScript files are uncompressed and sourcemapped, debugging tools are enabled and the `GlobalConstants_dev.js` file is used as the GlobalConstants file. Additionally, SASS files in the `/src/_scss` and `/src/css` folders are watched, along with JS files in the `/src/js` folder, and these files are recompiled (and the browser automatically refreshed) whenever a change is detected.

This mode also differs from `production` by using incremental Webpack builds. This means that the code is recompiled every time a change is detected in a source JS/JSX file, but the builds are *incremental*, meaning they take significantly less time than a complete build by recycling compiled code for unmodified parts. When making changes to the source code, you should always develop in `dev` mode to take advantage of this feature.

#### Running Tests

To run the automated test suite, run `npm test`.

#### Additional Configurations

Additional Webpack configurations are available for common tasks:

* `npm run lint` runs the linter for JavaScript ES6 style checking.
* `npm run dev` builds the web application in development mode, but generates static files rather than creating a web server. This is useful if you are hosting a remote development environment.
* `npm run sass` builds the web application in development mode with a local server (the same as `npm start`), but also includes sourcemapping for Sass files. However, this does result in slower builds.
* `npm run travis` is reserved for the Travis CI system and runs the linter and Jest tests in a single thread with error reporting.
