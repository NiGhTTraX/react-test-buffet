#!/bin/bash

set -e

trap cleanup EXIT
cleanup() {
  docker-compose -f docker-compose.debug.yml down -v
}

cd "$( dirname "${BASH_SOURCE[0]}" )"

docker-compose -f docker-compose.debug.yml build
docker-compose -f docker-compose.debug.yml run --service-ports acceptance_debug
