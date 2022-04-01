import useSWR from "swr"
import { getTrackApi } from '@/api/order'

function fecthTrack(id) {
  return getTrackApi(id).then(res => res.data)
}

export const getTrackSwr = (id) => {
  const { data, error } = useSWR(`tracking/getTrackDetail?orderNo=${id}&loginUserId`, () => fecthTrack(id))

  return {
    loading: !error && !data,
    data,
    error
  }
}