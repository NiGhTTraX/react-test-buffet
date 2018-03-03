#!/usr/bin/env bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

export NODE_ENV=tests

# If we don't create these here, docker-compose will and they will be owned by
# root.
mkdir -p screenshots/chrome screenshots/firefox

rm -rf ./acceptance/results
mkdir -p ./acceptance/results/coverage

docker-compose build
docker-compose up -d selenium

./wait-for-nodes.sh 2
