#!/bin/bash

cd tests/acceptance

docker-compose build

docker-compose -f docker-compose.yml -f docker-compose.debug.yml \
  run --service-ports tests
RESULT=$?

docker-compose down

exit $RESULT
