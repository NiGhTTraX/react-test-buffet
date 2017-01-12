#!/bin/bash

cd tests/acceptance

docker-compose build

docker-compose run tests
RESULT=$?

docker-compose down

exit $RESULT
