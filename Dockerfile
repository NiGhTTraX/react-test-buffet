FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY tools tools
RUN npm install --quiet

COPY . .
