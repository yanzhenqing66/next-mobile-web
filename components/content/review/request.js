import useSWRInfinite from 'swr/infinite'
import { getToReviewApi } from '@/api/order'

function fetchReview(url) {
  return getToReviewApi(url).then(res => res.data.contents)
}

export const getToReview = (key) => {
  const { data, error, mutate, size, setSize } = useSWRInfinite(key, fetchReview)

  return {
    data,
    error,
    mutate,
    size,
    setSize,
    loading: !error && !data
  }
}