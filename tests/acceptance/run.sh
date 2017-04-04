#!/bin/bash

trap cleanup EXIT
cleanup() {
  docker-compose down -v
}

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

docker-compose build

# If we don't create these here, docker-compose will and they will be owned by
# root.
mkdir -p screenshots/chrome screenshots/firefox

docker-compose up -d selenium

./wait-for-nodes.sh 2

# compose up exits with 0 no matter what.
docker-compose up acceptance_chrome acceptance_firefox

# Aggregate results from all the containers.
RESULT=$(docker-compose ps -q \
  | xargs docker inspect -f '{{ .State.ExitCode }}' \
  | grep -v 0 | wc -l | tr -d ' ')

echo App logs:
docker-compose logs app

echo Selenium logs:
docker-compose logs selenium

exit $RESULT
