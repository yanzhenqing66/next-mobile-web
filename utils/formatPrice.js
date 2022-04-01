function formatPrice(price) {
  if(!price) return 0.00
  return (price/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export default formatPrice