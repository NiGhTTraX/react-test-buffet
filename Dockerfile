FROM node:6

USER ${DOCKER_USER:-root}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY tools tools
RUN npm install --unsafe-perm --quiet

COPY . .
