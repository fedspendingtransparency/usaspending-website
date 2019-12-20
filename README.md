# USAspending Website

[![Build Status](https://travis-ci.com/fedspendingtransparency/usaspending-website.svg?branch=dev)](https://travis-ci.com/fedspendingtransparency/usaspending-website) [![Test Coverage](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/badges/coverage.svg)](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/coverage)

[The USAspending website](https://www.usaspending.gov/) is the public-facing site offering information on Government spending for the United States. It is utilizing the [Data Transparency User Interface Library](https://github.com/fedspendingtransparency/data-transparency-ui)

## Docker Set Up

The quickets way to run a local version of the code is with  [Docker](https://www.docker.com/), using the provided Dockerfile.

**You will need to create your GlobalConstants files first (see below).** Then, to build the Docker image, artifacts, and run in a simple Nginx configuration:

```
# from usaspending-website root, build the container image
docker build -t usaspending-website .

# generate static artifacts in ./public
docker run -i --rm=true -v $(pwd)/public:/node-workspace/public usaspending-website /bin/sh -c 'npm run dev'

# mount the static artifacts to an nginx image and run
docker run -p 8020:80 -v $(pwd)/public:/usr/share/nginx/html:ro nginx
```

The app should now be running at `http://localhost:8020`.

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


### Configuration File

The `usaspending-website` folder provides a single configuration file named `GlobalConstants.js`. Here you may adjust the `API` property to use either a local api or the production api. By default, `npm run start` uses the local API url (`http://localhost:8000/api/`). To use the production API, simply overwrite the `API` property or rewrite the `npm` script to use `webpack.prod.config.js`.

### Build Application

Several Webpack configurations are available to build the frontend web site for various use cases.

#### Hosted Production

If you are building the web site for a hosted production environment, run:

```bash
	$ npm run prod
```
This will build the frontend files to the `/public` directory, which you can then deploy on your host. In this mode, JavaScript files are minified, debugging tools are disabled, and the `GlobalConstants.js` file will use the production api.

#### Local Development

Finally, if you are a frontend developer, use:

```bash
	$ npm start
```

This will build the frontend files to the `/public` directory and also start a web server on port 3000. In this mode, JavaScript files are uncompressed and sourcemapped, debugging tools are enabled and the `GlobalConstants.js` file will assume the use of a local api. Additionally, SASS files in the `/src/_scss` and `/src/css` folders are watched, along with JS files in the `/src/js` folder, and these files are recompiled (and the browser automatically refreshed) whenever a change is detected.

This mode also differs from `production` by using incremental Webpack builds. This means that the code is recompiled every time a change is detected in a source JS/JSX file, but the builds are *incremental*, meaning they take significantly less time than a complete build by recycling compiled code for unmodified parts. When making changes to the source code, you should always develop in `dev` mode to take advantage of this feature.

#### Running Tests

To run the automated test suite, run `npm test`.

#### Additional Configurations

Additional Webpack configurations are available for common tasks:

* `npm run lint` runs the linter for JavaScript ES6 style checking.
* `npm run dev` builds the web application in development mode, but generates static files rather than creating a web server. This is useful if you are hosting a remote development environment.
* `npm run sass` builds the web application in development mode with a local server (the same as `npm start`), but also includes sourcemapping for Sass files. However, this does result in slower builds.
* `npm run travis` is reserved for the Travis CI system and runs the linter and Jest tests in a single thread with error reporting.
