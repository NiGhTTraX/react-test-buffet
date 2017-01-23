#!/bin/bash

cd tests/acceptance

docker-compose build
RESULT=$?

if [[ $RESULT != 0 ]]; then
  exit $RESULT
fi

docker-compose -f docker-compose.yml -f docker-compose.debug.yml \
  run --service-ports tests
RESULT=$?

docker-compose down

exit $RESULT
