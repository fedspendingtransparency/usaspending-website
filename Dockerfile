FROM node:10

RUN mkdir /node-workspace
COPY package.json /node-workspace 
COPY package-lock.json /node-workspace --no-cache

WORKDIR /node-workspace

RUN npm ci --no-cache

COPY . /node-workspace

VOLUME /node-workspace

RUN mkdir /test-results
