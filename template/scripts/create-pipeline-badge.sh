#!/bin/bash

LINT_OK=__tests__/lint.ok
TS_OK=__tests__/ts.ok
UNIT_OK=__tests__/unit.ok

STATUS_BADGE=__tests__/status.svg
SUCCESS_BADGE=__tests__/__badges__/success.svg
FAILURE_BADGE=__tests__/__badges__/failure.svg

if [[ "$1" == "reset" ]]; then
  cp $FAILURE_BADGE $STATUS_BADGE
  echo "🚨 Failure badge created 🚨"
elif [[ $# = 0 && -f "$LINT_OK" && -f "$TS_OK" && -f "$UNIT_OK" ]]; then
  cp $SUCCESS_BADGE $STATUS_BADGE
  echo "✅ Success badge created! ✅"
  rm -f $LINT_OK && rm -f $TS_OK && rm -f $UNIT_OK
fi
