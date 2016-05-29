#!/bin/sh

cp ./tools/git-hooks/* .git/hooks &> /dev/null \
  && echo Git hooks installed. || echo Git hooks NOT installed.
