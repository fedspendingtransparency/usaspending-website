FROM node:4

RUN npm install --global gulp

RUN mkdir /node-workspace
COPY package.json /node-workspace 

WORKDIR /node-workspace

RUN npm install

COPY . /node-workspace

VOLUME /node-workspace

RUN mkdir /test-results

CMD gulp
