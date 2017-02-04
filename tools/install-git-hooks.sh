#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

if [ -d ../.git/hooks ]; then
  cp git-hooks/* ../.git/hooks/
  echo Git hooks installed.
else
  echo Git hooks NOT installed.
fi
