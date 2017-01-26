#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

docker-compose build
RESULT=$?

if [[ $RESULT != 0 ]]; then
  exit $RESULT
fi

docker-compose run tests
RESULT=$?

docker-compose down

exit $RESULT
