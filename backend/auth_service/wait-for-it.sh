#!/usr/bin/env bash
#   wait-for-it.sh
#
#   Use this script to test if a given TCP host/port are available
#   Usage: wait-for-it.sh host:port [-t timeout] [-- command args]
#
#   Credits: https://github.com/vishnubob/wait-for-it

set -e

TIMEOUT=15
QUIET=0
HOST=""
PORT=""

usage() {
  echo "Usage: $0 host:port [-t timeout] [-q] [-- command args]"
  echo "  -t TIMEOUT  Timeout in seconds, zero for no timeout (default: $TIMEOUT)"
  echo "  -q          Quiet mode, don't output any status messages"
  echo "  --          Separator indicating the end of wait-for-it options"
  exit 1
}

echoerr() {
  if [ "$QUIET" -ne 1 ]; then
    printf "%s\n" "$@" >&2
  fi
}

parse_args() {
  while [ $# -gt 0 ]; do
    case "$1" in
      *:* )
        HOST=$(printf "%s\n" "$1" | cut -d : -f 1)
        PORT=$(printf "%s\n" "$1" | cut -d : -f 2)
        shift
        ;;
      -t)
        shift
        TIMEOUT=$1
        shift
        ;;
      -q)
        QUIET=1
        shift
        ;;
      --)
        shift
        COMMAND=("$@")
        break
        ;;
      *)
        usage
        ;;
    esac
  done

  if [ -z "$HOST" ] || [ -z "$PORT" ]; then
    echoerr "Error: you need to provide host and port"
    usage
  fi
}

wait_for() {
  echoerr "Waiting for $HOST:$PORT..."

  start_ts=$(date +%s)
  while :
  do
    if nc -z "$HOST" "$PORT" >/dev/null 2>&1; then
      echoerr "$HOST:$PORT is available after $(( $(date +%s) - start_ts )) seconds"
      break
    fi
    sleep 1
    if [ "$TIMEOUT" -ne 0 ] && [ $(( $(date +%s) - start_ts )) -ge $TIMEOUT ]; then
      echoerr "Timeout occurred after waiting $TIMEOUT seconds for $HOST:$PORT"
      exit 1
    fi
  done
}

run_command() {
  if [ "${#COMMAND[@]}" -gt 0 ]; then
    exec "${COMMAND[@]}"
  fi
}

main() {
  parse_args "$@"
  wait_for
  run_command
}

main "$@"
