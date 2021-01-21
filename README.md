# USAspending Website

[![Build Status](https://travis-ci.com/fedspendingtransparency/usaspending-website.svg?branch=dev)](https://travis-ci.com/fedspendingtransparency/usaspending-website) [![Test Coverage](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/badges/coverage.svg)](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/coverage)

[The USAspending website](https://www.usaspending.gov/) is the public-facing site offering information on Government spending for the United States. It utilizes the [Data Transparency User Interface Library](https://github.com/fedspendingtransparency/data-transparency-ui).

## Development Set Up
To run the USAspending website locally, follow the directions below.

Assumptions:

* You're able to install software on your machine.
* You have git installed on your machine and are able to clone code repositories from GitHub. If this isn't the case, the easiest way to get started is to install [GitHub Desktop](https://desktop.github.com/ "GitHub desktop"), available for Windows or Mac.
* You're familiar with opening a terminal on your machine and using the command line as needed.

### Installation
_Get the code and install the runtime and dependencies_

1. If you're not already running Node.js, download and run the installer for your operating system. We build using **Node.js 10.15.3 (LTS)** which we recommend downloading using [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm).
2. You also need the Node Package Manager (`npm`) CLI. We use version `6.14.5`.

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

### Configuration
_Alter configuration to non-default values by changing environment variable values._

Our application makes use of of certain environment varialbes. The important ones are listed below along with their default values:

| ENV VAR           | DEFAULT VALUE (if not set)       | PURPOSE 
|-------------------|----------------------------------|----------------------------------------------------|
| `ENV`             | dev                              | Determine bundling optimizations and feature flags | 
| `USASPENDING_API` | https://api.usaspending.gov/api/ | API URL to get backend data                        |
| `MAPBOX_TOKEN`    | ''                               | Product key for use of MapBox features             |
| `GA_TRACKING_ID`  | ''                               | Google Analytics key for tracking usage in prod    |

These values can be set in one of 3 methods:

1. In a git-ignored `.env` file, if using `docker` or `docker-compose` to execute scripts 

    ```bash
    # .env file
    USAPENDING_API=http://localhost:8000/api
    # ... next var
    ```
    - Confirm Docker Compose picks up vars by running: `docker-compose config` to see the values applied
    - Also can be applied with `docker run --env-file .env ...`
    - _NOTE: Default env var values are set in the `Dockerfile` and will be used in `docker run` if none are provided_
2. Using `export` to set them in the current executing shell environment.

    ```bash
    $ export USAPENDING_API=http://localhost:8000/api
    $ npm dev
    ```
    - `docker-compose` will also pick these up, but `docker run` will not and fall back to `Dockerfile` defaults.
3. On the command-line, prior to a shell command, to inject into the sub-shell environment

    ```bash
    $ USAPENDING_API=http://localhost:8000/api npm dev
    ```

The latter methods in this list take precedence over environment variables set in an earlier method. 
- If you build or run `npm` scripts on your local desktop development environment with the `npm` CLI, or switch between this and Docker, setting up your shell with `export` (or a tool like `direnv`) is most flexible. 
- If you only run scripts/builds in Docker or Docker Compose, using a `.env` file is a simple, clean, config-file-driven approach 

### Scripts
_Custom and life-cycle scripts to execute, as defined under the `scripts` property in `package.json`_

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

### Bundling and Deployment
_Bundling and running the website_

To keep a clean workspace, our CI/CD pipelines use Docker to gather Node dependencies, bundle artifacts, and deploy them. Developers can similarly do this in their local development environments to reduce tool install/versioning and dependency management.

To run the website _**locally**_ with pre-bundled artifacts, first download NPM packages, then generate and bundle static artifacts, then run an `nginx` container to host them. You can do this all in _one step_ with just:
```bash
docker-compose build && docker-compose run --rm bundle-usaspending-website && docker-compose up usaspending-website
``` 
- _The first two steps can take 5+ minutes each, so this could be a total of ~10 minutes before ready._

To do this in individual, sequential steps, from the `usaspending-website` source root:
1. Ensure your `usaspending-website` Docker image has the latest dependencies:

    ```bash
    docker-compose build
    ```
1. Generate and bundle static artifacts and output to `./public`

    ```bash
    docker-compose run -rm bundle-usaspending-website
    ```
2. Mount the static artifacts to a running container of an nginx image and host at port `8020`

    ```bash
    docker-compose up usaspending-website
    ```

You should see console logs, and the app should now be running at `http://localhost:8020`.
