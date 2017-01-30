FROM node:7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g yarn --silent

COPY package.json yarn.lock ./
COPY tools tools
RUN yarn install --pure-lockfile

COPY . .
