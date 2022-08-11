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

# Clean Node module dependencies and install them fresh
RUN npm config set https-proxy "http://daqnlb102-6cabec7b59104787.elb.us-gov-west-1.amazonaws.com:3128/"
RUN npm config set proxy "http://daqnlb102-6cabec7b59104787.elb.us-gov-west-1.amazonaws.com:3128/"
RUN npm config set registry "http://registry.npmjs.org/"
#RUN npm install --verbose -g npm@la
RUN npm cache clear --force
RUN npx npm-force-resolutions
RUN npm install --verbose --legacy-peer-deps
RUN npm audit fix --verbose --force
# Now copy the remaining source files
# Files in .dockerignore will not be copied
COPY . /node-workspace