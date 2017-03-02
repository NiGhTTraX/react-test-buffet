#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

docker-compose build
RESULT=$?

if [[ $RESULT != 0 ]]; then
  exit $RESULT
fi

# If we don't create these here, docker-compose will and they will be owned by
# root.
mkdir -p screenshots/chrome screenshots/firefox

docker-compose up -d selenium
echo Waiting for the browsers to connect to the Selenium hub...
# TODO: poll the hub for its status
sleep 5

docker-compose up tests tests_firefox

RESULT=$(docker-compose ps -q \
  | xargs docker inspect -f '{{ .State.ExitCode }}' \
  | grep -v 0 | wc -l | tr -d ' ')

docker-compose down

exit $RESULT
