# syntax=docker/dockerfile:1
FROM node:22.14.0

# Default environment variables
ENV ENV=prod USASPENDING_API=https://api.usaspending.gov/api/ MAPBOX_TOKEN='' GA_TRACKING_ID=''

RUN mkdir /node-workspace && mkdir /test-results

# Copy JUST the package files first.
# This allows Docker to NOT re-fetch all NPM packages if neither of these two files
# have changed, and instead use the cached layer containing all those dependent packages.
# Greatly speeds up repeated docker build calls on the same machine (like CI/CD boxes) 
# by leveraging the docker image cache
COPY package.json package-lock.json /node-workspace/

WORKDIR /node-workspace

# DTUI and Usaspending-website have preinstall scripts that run npx npm-force-resolutions
# the command will fail unless specifically pointing to npm-force-resolution@0.0.3
# With the current dependencies we need --legacy-peer-deps in both npm install and ci
# The npm ci will fail without npm install --package-lock-only due to dependency differences

#FE Devs building docker locally may require you to uncomment the next two lines
# RUN npm config set https-proxy "http://p1proxy.frb.org:8080/"
# RUN npm config set proxy "http://p1proxy.frb.org:8080/"
RUN npm install -g npm@10.8.3
RUN npm install -g webpack@5.105.0
RUN npm install -g webpack-cli@5.1.4

# FontAwesome Pro credentials are passed via BuildKit secret mounts (not ARG/ENV) so they
# never land in image layer history or the final image's environment. ~/.npmrc is removed
# again immediately after npm ci, since npm lifecycle scripts of any (transitive) dependency
# could otherwise read it while it exists.
RUN --mount=type=secret,id=fatoken --mount=type=secret,id=fabaseencode \
    echo "@fortawesome:registry=https://npm.fontawesome.com/" >> ~/.npmrc && \
    echo "@awesome.me:registry=https://npm.fontawesome.com/" >> ~/.npmrc && \
    echo "//npm.fontawesome.com/:username=$(cat /run/secrets/fatoken)" >> ~/.npmrc && \
    echo "//npm.fontawesome.com/:_password=$(cat /run/secrets/fabaseencode)" >> ~/.npmrc && \
    npm ci --legacy-peer-deps && \
    rm -f ~/.npmrc

# Now copy the remaining source files
# Files in .dockerignore will not be copied
COPY . /node-workspace
