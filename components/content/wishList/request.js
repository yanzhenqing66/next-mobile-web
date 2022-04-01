import useSWRInfinite from 'swr/infinite'
import { getRecentList as getRecentListApi } from '@/api/wishList'
import useGetParams from '@/hooks/useGetParams'
import formatParams from '@/utils/formatParams';

function fetchGetRecentList (url) {
  const params = formatParams(useGetParams(url))
  return getRecentListApi(params).then(res => res.data.contents)
}

export const getRecentList = (key) => {
  const {data, error, size, setSize, mutate} = useSWRInfinite(key, (key) => fetchGetRecentList(key), {
    revalidateFirstPage: false
  })

  return {
    data,
    error,
    size,
    setSize,
    loading: !data && !error,
    mutate
  }
}
