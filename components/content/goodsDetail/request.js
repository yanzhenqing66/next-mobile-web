import useSWR from "swr"
import { Map } from "immutable"
import { getDetailData, getDetailView, getBrandGoods, getRelated } from "@/api/goodsDetail"
import { getStoreDetail } from "@/api/wishList"
import useGetParams from "@/hooks/useGetParams"
import formatParams from "@/utils/formatParams"

function fetchBrandGoods(key) {
  const params = formatParams(useGetParams(key))
  return getBrandGoods(params).then(res => res.data.contents)
}

export function getBrandGoodsSwr(id) {
  const { data, error } = useSWR(`product/innerRelated?productId=${id}&curPage=1&pageSize=20`, (key) => fetchBrandGoods(key))

  return {
    data,
    error,
    loading: !data && !error
  }
}

function fetchRelateGoods(key) {
  const params = formatParams(useGetParams(key))
  return getRelated(params).then(res => res.data.contents)
}

export function getRelateSwr(id) {
  const { data, error } = useSWR(`product/related?productId=${id}&curPage=1&pageSize=20`, key => fetchRelateGoods(key))

  return {
    data,
    error,
    loading: !data && !error
  }
}

export const getGoodsdetail = async (id, headers) => {
  try {
    const params = formatParams({
      curPage: 1,
      pageSize: 3,
      productId: id,
    })
    const res = await Promise.all([getDetailData({ id }, headers), getDetailView(params, headers)])

    const mapData = Map(res?.[0]?.data)
    mapData.set('detailDesc', mapData.get('description')?.replace(/<.*?>/gi, ""))

    const { data: store } = await getStoreDetail(mapData.get('storeId'), headers);

    return {
      detailData: mapData.toObject(),
      reviews: res?.[1].data,
      store
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      },
    }
  }
}
