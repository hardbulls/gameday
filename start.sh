#!/bin/sh -e

PORT="${PORT:-3000}"

docker run --rm -it -v "${PWD}:/app" -w "/app" -p "${PORT}:3000" --entrypoint "/bin/bash" node:20

