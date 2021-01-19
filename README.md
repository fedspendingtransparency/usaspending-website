# USAspending Website

[![Build Status](https://travis-ci.com/fedspendingtransparency/usaspending-website.svg?branch=dev)](https://travis-ci.com/fedspendingtransparency/usaspending-website) [![Test Coverage](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/badges/coverage.svg)](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/coverage)

[The USAspending website](https://www.usaspending.gov/) is the public-facing site offering information on Government spending for the United States. It utilizes the [Data Transparency User Interface Library](https://github.com/fedspendingtransparency/data-transparency-ui).

## Development Set Up
To run the USAspending website locally, follow the directions below.

Assumptions:

* You're able to install software on your machine.
* You have git installed on your machine and are able to clone code repositories from GitHub. If this isn't the case, the easiest way to get started is to install [GitHub Desktop](https://desktop.github.com/ "GitHub desktop"), available for Windows or Mac.
* You're familiar with opening a terminal on your machine and using the command line as needed.

### Install Prerequisites and Code

1. If you're not already running Node.js, download and run the installer for your operating system. We build using **Node.js 10.15.3 (LTS)** which we recommend downloading using [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm).

2. You also need npm. We use version `6.14.5`.

```shell
        npm i -g npm@6.14.5
```

3. From the command line, clone the USAspending website repository from GitHub to your local machine:

```shell
        git clone https://github.com/fedspendingtransparency/usaspending-website.git
```

4. Change to the `usaspending-website` directory that was created when you cloned the USAspending Website repository.

```shell
        cd usaspending-website
```

5. Perform a clean install to get an exact dependency tree:

```shell
        npm ci
```

### Configuration File

The build and bundling of the USAspending website artifacts is requires environment variables to be defined at at bundle-time, so that their values are injected into Javascript artifacts, or used in logic of the bundling scripts. To output a result consistent with configuration. The important ones are listed below along with their default values:

| ENV VAR         | VALUE                            |
|-----------------|----------------------------------|
| USASPENDING_API | https://api.usaspending.gov/api/ |
| MAPBOX_TOKEN    | ''                               |
| GA_TRACKING_ID  | ''                               |

These values can be set in one of 3 methods:

1. In a git-ignored `.env` file, if using `docker-compose` to perform the build of artifacts 
```
        USAPENDING_API=http://localhost:8000/api
```
- Confirm by running: `docker-comopse config` to see the values picked up by the compose file
2. Using `export` to set them in the current executing shell environment. `docker-compose` will also pick these up.
```
        export USAPENDING_API=http://localhost:8000/api
        npm ci
```
3. On the command-line, prior to a shell command, to inject into the sub-shell environment
```
        USAPENDING_API=http://localhost:8000/api npm ci
```

The latter methods in this list take precedence over environment variables set in an earlier method. Using a `.env` file is clean, and preferred if always using `docker-compose` to build website artifacts or run `npm` scripts. If you build or run `npm` scripts on your local desktop development environment with the `npm` CLI, or switch between this and Docker, setting up your shell with `export` is preferred. Both can be done as the latter will override the former.

### Scripts

| Script       | Output                                                      |
|--------------|-------------------------------------------------------------|
| `npm start`  | dev server with hot reloading                               |
| `npm prod`   | generates static assets w/ production optimization          |
| `npm dev`    | generates static assets w/ development optimization         |
| `npm lint`   | executes linter                                             |
| `npm test`   | executes unit tests                                         |
| `npm sass`   | dev server w/ scss source maps                              |
| `npm travis` | executes travis validation script                           |
| `npm ci`     | clean existing Node dependencies and install dependencies   |

### Build and Deployment
To keep a clean workspace, our CI/CD pipelines use Docker to gather Node dependencies, build artifacts, and deploy them. Developers can simlarly do this in their local development environments to reduce tool install and dependency management.

To run the website _**locally**_ with pre-built/bundled artifacts, first build the artifacts, then run an `nginx` container to host them:

1. From usaspending-website root, build artifacts and output to `./public`, then remove the builder container (with `down`)
```bash
docker-compose run build-usaspending-website && docker-compose down
```

2. Mount the static artifacts to a running container of an nginx image and host at port `8020`
```bash
docker-compose up usaspending-website
```

The app should now be running at `http://localhost:8020`.
