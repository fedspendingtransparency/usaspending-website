FROM node:12.18.4

RUN mkdir /sitemaps
COPY package.json /sitemaps
COPY package-lock.json /sitemaps

WORKDIR /sitemaps

RUN npm i

COPY . /sitemaps

VOLUME /sitemaps
