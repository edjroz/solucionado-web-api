#!/bin/sh

# Create base container fror MSSQL Service.

port=-1

get_unused_port()
{
    while [ "$port" -eq "-1" ]
    do
        p="$(jot -r 1  4444 65000)"
        r=$(nc -z 127.0.0.1 $p > /dev/null 2>&1 && echo "used")
        if [ "$r" != "used" ]
        then
            port=$p
        fi
    done
}

get_unused_port

export DOCKER_PORT=$port

# Run test suite

ava test/integration/**/*.test.js
