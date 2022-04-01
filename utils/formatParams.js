function formatParams(params) {
  let result = ''
  Object.keys(params).forEach(key => {
    result += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`
  })
  return result.substring(0, result.length-1)
}
export default formatParams
