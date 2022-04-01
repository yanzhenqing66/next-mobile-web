
const cardList = [
  {id: 8, card_type: 'Visa', card_src: '/images/Visa.svg'},
  {id: 6, card_type: 'MasterCard', card_src: '/images/MasterCard.svg'},
  {id: 2, card_type: 'American_Express', card_src: '/images/American_Express.svg'},
  {id: 4, card_type: 'Discover', card_src: '/images/Discover.svg'},
  {id: 3, card_type: 'Diners_Club', card_src: '/images/Diners_Club.svg'},
  {id: 5, card_type: 'JCB', card_src: '/images/JCB.svg'},
  {id: 7, card_type: 'UnionPay', card_src: '/images/UnionPay.svg'}
]

export default function handler(req, res) {
  if(req.method === 'GET') {
    res.status(200).json({data: cardList})
  }else {
    res.status(400).end('request error')
  }
}