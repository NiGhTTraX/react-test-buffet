#!/bin/bash

trap cleanup EXIT
cleanup() {
  docker-compose down -v
}

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

# If we don't create these here, docker-compose will and they will be owned by
# root.
mkdir -p screenshots/chrome screenshots/firefox

rm -rf ./results
mkdir -p ./results/coverage

export NODE_ENV=coverage

docker-compose build

# --force-recreate and --remove-orphans in case we've run a debug instance
# before and it left things behind.
docker-compose up -d --force-recreate --remove-orphans selenium

./wait-for-nodes.sh 2

# compose up exits with 0 no matter what.
docker-compose up chrome_tests firefox_tests

# Aggregate results from all the containers.
RESULT=$(docker-compose ps -q \
  | xargs docker inspect -f '{{ .State.ExitCode }}' \
  | grep -v 0 | wc -l | tr -d ' ')

if [ ${RESULT} != 0 ]; then
  echo App logs:
  docker-compose logs app

  echo Selenium logs:
  docker-compose logs selenium
fi

exit ${RESULT}
