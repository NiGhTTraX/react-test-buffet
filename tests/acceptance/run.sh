#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

docker-compose build
RESULT=$?

if [[ $RESULT != 0 ]]; then
  exit $RESULT
fi

# If we don't create it here, docker-compose will and it will be owned by root.
mkdir -p screenshots

docker-compose up -d selenium
echo Waiting for Chrome to connect to the Selenium hub...
# TODO: poll the hub for its status
sleep 5

docker-compose run tests
RESULT=$?

docker-compose down

exit $RESULT
