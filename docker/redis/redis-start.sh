#!/usr/bin/env bash

# start server in background and wait for 1 sec
redis-server --daemonize yes && sleep 1

# slurp all data from file to redis in memory db (note the dir)
redis-cli -x set interleague-matchups < /redis/interleague-matchups.json

# persist data to disk
redis-cli save

# stop background server
redis-cli shutdown

# start the server normally
redis-server
