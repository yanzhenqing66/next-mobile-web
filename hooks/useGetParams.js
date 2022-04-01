import qs from 'qs'

const useGetParams = (url) => {
  if(!url) return
  return qs.parse(url.split('?')[1])
}

export default useGetParams