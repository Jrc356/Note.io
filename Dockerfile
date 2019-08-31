FROM node:10.13-alpine

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/server
RUN mkdir -p /usr/src/app/client

ADD server/ server/
ADD client/ client/

RUN cd server && npm install --production --silent && mv node_modules ../

EXPOSE 3000