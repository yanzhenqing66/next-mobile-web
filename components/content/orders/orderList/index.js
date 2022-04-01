import { useRouter } from "next/router"
import { loadOrderList } from "../request"
import useGetParams from "@/hooks/useGetParams"
import useLoadMore from "@/hooks/useLoadMore"
import LoadPage from "@/components/common/loadPage"
import OrderItem from "../orderItem"
import InfiniteScrollContent from "@/components/common/InfiniteScrollContent"
import NoOrder from "../noOrder"
import style from './orderList.module.scss'

function getKey(page, preData, key=1) {
  if (preData && !preData.length) return null
  return `order/list?orderStatus=${key}&curPage=${page + 1}&pageSize=${10}`
}

function OrderList() {
  const router = useRouter()
  const { key } = useGetParams(router.asPath)
  const { data, error, loading, setSize, size } = loadOrderList((page, preData) => getKey(page, preData, key))

  const loadMore = () => {
    setSize(val => val + 1)
  }

  useLoadMore(loadMore)

  const isLoadingMore = size > 0 && data && typeof data[size - 1] === "undefined"

  const orderList = data ? [].concat(...data) : []

  if (loading) {
    return <LoadPage fixed />
  } else if (error && !orderList?.length) {
    return <NoOrder />
  } else if (!orderList?.length) {
    return <NoOrder />
  } else {
    return (
      <div className={style.wrap}>
        {
          orderList.map(item => (
            <OrderItem item={item} key={item.orderNo} orderKey={key} />
          ))
        }
        <InfiniteScrollContent hasMore={isLoadingMore} />
      </div>
    )
  }
}

export default OrderList