#!/bin/bash

cd tests/acceptance

docker-compose build
RESULT=$?

if [[ $RESULT != 0 ]]; then
  exit $RESULT
fi

# After the selenium container is up connect to vnc://localhost:5900 with
# password 'secret'.
docker-compose -f docker-compose.yml -f docker-compose.debug.yml \
  run --service-ports tests
RESULT=$?

docker-compose down

exit $RESULT
