FROM node:12.18.4

RUN mkdir /node-workspace
COPY package.json /node-workspace 
COPY package-lock.json /node-workspace

WORKDIR /node-workspace

RUN npm ci

COPY . /node-workspace

RUN mkdir /test-results
