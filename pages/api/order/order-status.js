
//  1:待付款(pending) 2:待发货(processing) 3:待收货 (shipped)4:已完成(completed) 5:关闭(cancel)

 const orderStatusData = [
   {id: 1, value: 'pending'},
   {id: 2, value: 'processing'},
   {id: 3, value: 'shipped'},
   {id: 4, value: 'completed'},
   {id: 5, value: 'cancel'},
 ]

export default function handler(req, res) {
  if(req.method === 'GET') {
    res.status(200).json({orderStatusData})
  }else {
    res.status(400).end('request error')
  }
}