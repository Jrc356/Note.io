FROM node:10.13-alpine

ENV NODE_ENV production
ENV TOKEN_LENGTH 225
ENV DB_HOST 'db'
ENV DB_USER 'noteio'
ENV DB_PASSWORD 'noteio!'
ENV DB_NAME 'Notes'


WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/server
RUN mkdir -p /usr/src/app/client

ADD server/ server/
ADD client/ client/

RUN cd server && npm install --production --silent && mv node_modules ../

EXPOSE 3000