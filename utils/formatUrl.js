function formatUrl(url) {
  if(!url) return ''
  const reg = /["',，.。/、\]\[【】\！!?？——_<>%;‘’；)《（）》(&+=`“”·*#@@]/g
  const str = url.replace(reg, '').replace(/\s/g, '-')?.slice(0, 70)
  return str
}

export { formatUrl }