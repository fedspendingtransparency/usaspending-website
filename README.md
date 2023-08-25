# USAspending Website

[![Build Status](https://travis-ci.com/fedspendingtransparency/usaspending-website.svg?branch=qat)](https://travis-ci.com/fedspendingtransparency/usaspending-website) [![Test Coverage](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/badges/coverage.svg)](https://codeclimate.com/github/fedspendingtransparency/usaspending-website/coverage)

[The USAspending website](https://www.usaspending.gov/) is the public-facing site offering information on Government spending for the United States. It utilizes the [Data Transparency User Interface Library](https://github.com/fedspendingtransparency/data-transparency-ui).

## Development Set Up
- To contribute to frontend development, follow _Install and Configure_ below. 
- To simply run the USAspending website locally, jump to _Build and Run with Docker_ below.

_Assumptions_:

* You're able to install software on your machine.
* You have git installed on your machine and are able to clone code repositories from GitHub. If this isn't the case, the easiest way to get started is to install [GitHub Desktop](https://desktop.github.com/ "GitHub desktop"), available for Windows or Mac.
* You're familiar with opening a terminal on your machine and using the command line as needed.

### Install and Configure
_Get the code and install the runtime and dependencies_

1. From the command line, clone the USAspending website repository from GitHub to your local machine, and get into the root directory:
    ```shell
    $ git clone https://github.com/fedspendingtransparency/usaspending-website
    $ cd usaspending-website
    ```
1. Download [Node Version Manager (`nvm`)](https://github.com/nvm-sh/nvm) and install **Node.js `18.17.0`**
    ```shell
    $ nvm install 18.17.0
    ```
1. Set Node Package Manager (`npm`) CLI to version `9.8.1`.
    ```shell
    $ npm i -g npm@9.8.1
    ```
1. Perform an install to get an exact dependency tree:
    ```shell
    $ npm ci --legacy-peer-deps
    ```
1. Run the site in a local dev server:
    ```shell
    $ npm start
    ```

### Configuration
_Alter configuration to non-default values by changing environment variable values._

Our site makes use of certain environment variables. Defaults are provided, but can be overridden by `export` of new values in your local shell. These are the important ones:

| ENV VAR           | DEFAULT VALUE (if not set)       | PURPOSE 
|-------------------|----------------------------------|-----------------------------------------------------|
| `ENV`             | prod                             | Determine bundling optimizations and feature flags  | 
| `USASPENDING_API` | https://api.usaspending.gov/api/ | API URL to get backend data                         |
| `MAPBOX_TOKEN`    | ''                               | Product key for use of MapBox features              |
| `GA_TRACKING_ID`  | ''                               | Google Analytics key for anonymously tracking usage |

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
| `npm run build-storybook`     | builds storybook files                         |
| `npm run storybook`     | starts storybook server so you can interact with stories   |

### Build and Run with Docker
Docker can be used to build static site artifacts and/or run the site locally. Ensure your environment variables are configured and use this "one-liner" (or decompose and run each `docker` command separately):

```bash
docker build -t usaspending-website . && \
docker run --rm -v $(pwd)/public:/node-workspace/public \
  -e ENV \
  -e USASPENDING_API \
  -e MAPBOX_TOKEN \
  -e GA_TRACKING_ID \
  usaspending-website npm run ${ENV} && \
docker run --rm -v $(pwd)/public:/usr/share/nginx/html:ro -p 8020:80 nginx:1.18
```

_The first two steps can take 5+ minutes each, so this could be a total of ~10 minutes before ready._

What this does:
1. Ensure your `usaspending-website` Docker image has the latest dependencies:
1. Generate and bundle static artifacts and output to `./public`
1. Mount the static artifacts to a running container of an nginx image and host at port `8020`


You should see console logs, and the app should now be running at `http://localhost:8020`.

### Troubleshooting
Common build issues
1. Webpack cannot be found:
    `npm i -g webpack`
1. npm install finishes with vulnerabilities:
    `npx force-resolutions` then `npm install`
   If there are still vulnerabilities after this, they may be newly discovered and we may have to update versions of packages, discuss with the team before doing so

