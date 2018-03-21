# Easiest way to get npm@5 https://github.com/npm/npm/issues/16807
FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --quiet

COPY . .
