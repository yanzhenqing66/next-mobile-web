kill -9 $(ps -ef | grep node_h5_prod | awk {'print $2'})
yarn
yarn build
nohup yarn start >web.log 2>&1 &