#!/bin/bash

###
# Lint any staged JS/JSX files.
###

# Exclude .eslintrc.js as it gives a warning when linting it.
CHANGED_JS_FILES=`git diff --cached --name-only --diff-filter=ACM \
                  | grep -E '\.jsx?$' \
                  | grep -v 'eslintrc\.js'`

# Bail out if there's nothing to lint.
if [ $? != 0 ]; then
  exit 0
fi


# This requires npm to be installed on the host. While this project aims to
# provide a Docker image to run the app in dev mode, some dev dependencies are
# best installed on the host.
# The --silent flag is to not output the entire npm ERR epilogue.
npm run --silent lint:files -- $CHANGED_JS_FILES


if [ $? != 0 ]; then
  echo Fix lint errors before committing
  exit 1
fi
