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

# TODO: run in parallel
docker-compose run tests && docker-compose run tests_firefox
RESULT=$?

docker-compose down

exit $RESULT
