FROM node:16.14.2

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

RUN npm install --verbose -g npm@8.5.0
RUN npm install --verbose -g webpack@5.67.0
RUN npm install -g webpack-cli@4.10.0
RUN npm ci --legacy-peer-deps

# Now copy the remaining source files
# Files in .dockerignore will not be copied
COPY . /node-workspace
