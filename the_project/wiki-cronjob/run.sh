#!/bin/sh
set -e

LOCATION=$(curl -sI https://en.wikipedia.org/wiki/Special:Random | grep -i '^location:')

ARTICLE_URL="https://${LOCATION#*//}"
ARTICLE_URL=$(echo "$ARTICLE_URL" | tr -d '\r\n')

curl -X POST http://todo-backend-svc:2345/todos \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"To read: $ARTICLE_URL\"}"