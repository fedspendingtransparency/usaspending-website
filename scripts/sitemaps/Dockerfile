FROM node:12.18.4

ARG SITEMAP_CODE

# create folder
RUN mkdir /node-workspace
# set workspace, where our frontend code lives in the docker container
# WORKDIR /node-workspace
# copy sitemaps directory to the docker containers working directory
COPY . /node-workspace

WORKDIR /node-workspace/scripts/sitemaps
# install sitemaps dependencies
RUN cd /node-workspace/scripts/sitemaps && npm ci

VOLUME /node-workspace
