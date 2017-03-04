#!/bin/bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

docker-compose build
docker-compose -f docker-compose.debug.yml run --service-ports acceptance_debug
docker-compose down
