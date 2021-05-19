FROM node:14.17.0

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

# Clean Node module dependencies and install them fresh
RUN npm ci

# Now copy the remaining source files
# Files in .dockerignore will not be copied
COPY . /node-workspace
