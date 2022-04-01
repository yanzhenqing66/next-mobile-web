import { useRouter } from 'next/router'
import { getOrderItemDetail } from '../request'
import LoadPage from '@/components/common/loadPage'
import useGetParams from '@/hooks/useGetParams'
import Item from './item'
import NoOrder from '../noOrder'
import style from './itemDetailList.module.scss'

function ItemDetailList() {
  const router = useRouter()
  const { orderNo } = useGetParams(router.asPath)
  const { data, error, loading } = getOrderItemDetail(orderNo)

  if (loading) {
    return <LoadPage fixed />
  } else if (error) {
    return <NoOrder />
  } else {
    return (
      <div className={style.wrap}>
        {
          data?.map(item => (
            <Item item={item} key={item.id} />
          ))
        }
      </div>
    )
  }
}

export default ItemDetailList