#!/bin/bash

cd tests/acceptance

docker-compose build
RESULT=$?

if [[ $RESULT != 0 ]]; then
  exit $RESULT
fi

docker-compose run tests
RESULT=$?

docker-compose down

exit $RESULT
