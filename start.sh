#!/bin/bash

set -e

trap cleanup EXIT
cleanup() {
  docker-compose -f docker-compose.dev.yml down -v
}

cd "$( dirname "${BASH_SOURCE[0]}" )"

docker-compose -f docker-compose.dev.yml up --build
