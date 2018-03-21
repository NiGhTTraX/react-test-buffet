#!/bin/bash

trap cleanup EXIT
cleanup() {
  docker-compose down -v
}

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

export NODE_ENV=coverage

./selenium.sh

# compose up exits with 0 no matter what.
docker-compose up chrome_tests firefox_tests

# Aggregate results from all the containers.
RESULT=$(docker-compose ps -q \
  | xargs docker inspect -f '{{ .State.ExitCode }}' \
  | grep -v 0 | wc -l | tr -d ' ')

if [ $RESULT != 0 ]; then
  echo App logs:
  docker-compose logs app

  echo Selenium logs:
  docker-compose logs selenium
fi

exit $RESULT
