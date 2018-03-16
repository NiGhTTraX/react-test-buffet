#!/usr/bin/env bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

export NODE_ENV=tests

# If we don't create these here, docker-compose will and they will be owned by
# root.
mkdir -p screenshots/chrome screenshots/firefox

rm -rf ./acceptance/results
mkdir -p ./acceptance/results/coverage

# Check if the hub is already ready form a previous run.
# When running the acceptance tests the hub container will
# always get removed so there's no risk of staleness. This
# is an optimization for TDD-ing.
set +e
./wait-for-nodes.sh 2 0 2>&1 > /dev/null
if [[ $? == 0 ]]; then
    echo Hub was already ready.
    exit 0
fi
set -e

docker-compose build
docker-compose up -d selenium

./wait-for-nodes.sh 2
