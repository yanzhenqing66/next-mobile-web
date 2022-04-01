kill -9 $(ps -ef | grep 'start -p 8889' | awk {'print $2'})
yarn
yarn build:pre
nohup yarn pre >web.log 2>&1 &


