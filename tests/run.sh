#!/usr/bin/env bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

npm run test:unit --silent
npm run test:acceptance --silent

cp ./acceptance/results/coverage/*.json ../.nyc_output/
./coverage.js

# nyc will create the report relative to cwd so we need to be in root.
cd ..

node_modules/.bin/nyc report
node_modules/.bin/nyc check-coverage
