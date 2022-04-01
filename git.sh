#!/bin/bash
git checkout .
git pull
yarn
kill -9 $(ps -ef | grep pro_app | awk {'print $2'})
yarn build
nohup yarn start > ~/pro.log 2>1 &
