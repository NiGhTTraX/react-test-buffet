#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

# The visual tests might create new files in the mounted volume and we want them
# to be owned by us.
export DOCKER_USER=$(id -u)

docker-compose build
RESULT=$?

if [[ $RESULT != 0 ]]; then
  exit $RESULT
fi

# If we don't create it here, docker-compose will and it will be owned by root.
mkdir -p screenshots

docker-compose run tests
RESULT=$?

docker-compose down

exit $RESULT
