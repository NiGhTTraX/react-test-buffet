#!/bin/bash

EXPECTED_BROWSERS=$1
HOST=${2:-localhost}
PORT=${3:-4444}


nodes_connected() {
  status=$(curl -X GET -s http://${1}:${2}/grid/api/hub/ \
    -d '{"configuration":["slotCounts"]}')

  if [ $? != 0 ]; then
    echo -1
    return
  fi

  echo $status | python -c \
    'import json,sys;obj=json.load(sys.stdin);print obj["slotCounts"]["free"]'
}

echo Waiting for ${EXPECTED_BROWSERS} browsers to connect to the Selenium hub...

while true; do
  if [[ $(nodes_connected $HOST $PORT) == $EXPECTED_BROWSERS ]]; then
    printf "\n"
    exit 0
  fi

  printf "."
  sleep 1
done

