import useSWR from "swr"
import { getPreReturnInfoApi } from "@/api/returns"

function fetchReturnInfo (params) {
  return getPreReturnInfoApi(params).then(res => res.data)
}

export const preReturnInfoSwr = (params) => {
  const { data, error } = useSWR('refund/preSubmit', () => fetchReturnInfo(params))
  return {
    data,
    error,
    loading: !data && !error
  }
}