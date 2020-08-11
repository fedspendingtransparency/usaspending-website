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

The USAspending website expects a certain number of environment variables to be defined at runtime. The important ones are listed below along with their default values:

| ENV VAR        | VALUE                            |
|----------------|----------------------------------|
| API            | https://api.usaspending.gov/api/ |
| MAPBOX_TOKEN   | ''                               |
| GA_TRACKING_ID | ''                               |

### Scripts

| Script     | Output                                              |
|------------|-----------------------------------------------------|
| `npm start`  | dev server with hot reloading                       |
| `npm prod`   | generates static assets w/ production optimization  |
| `npm dev`    | generates static assets w/ development optimization |
| `npm lint`   | executes linter                                     |
| `npm test`   | executes unit tests                                 |
| `npm sass`   | dev server w/ scss source maps                      |
| `npm travis` | executes travis validation script                   |

### Deployment Build Step with DockerFile
When deploying we use the dockerfile for our build step. We can simulate that process as follows:

```
# from usaspending-website root, build the container image
docker build -t usaspending-website .
# generate static artifacts in ./public
docker run -i --rm=true -v $(pwd)/public:/node-workspace/public usaspending-website /bin/sh -c 'npm run dev'
# mount the static artifacts to an nginx image and run
docker run -p 8020:80 -v $(pwd)/public:/usr/share/nginx/html:ro nginx
```

The app should now be running at `http://localhost:8020`.
