import { useEffect, useState } from "react"
import { Button, Toast } from "antd-mobile"
import Head from "@/components/common/head"
import { delCartGoods } from "@/api/cart"
import CartGoods from "@/components/content/cart/cartGoods"
import Checkout from "@/components/content/cart/checkout"
import { getCartList } from "@/components/content/cart/request"
import style from '@/styles/comp_style/cart.module.scss'

function Cart() {
  const { data, mutate } = getCartList()
  const [canBuy, setCanBuy] = useState(true)

  useEffect(() => {
    if (data?.shops?.length) {
      const isCanBuy = data?.shops?.every(item => {
        return item?.skus?.every(item2 => item2.canBuy)
      })
      setCanBuy(isCanBuy)
    }
  }, [data])

  const removeAll = () => {
    let skuIds = []
    data?.shops?.map(item => {
      item?.skus?.map(item2 => {
        if (!item2.canBuy) {
          skuIds.push(item2.skuId)
        }
      })
    })
    delCartGoods({ skuIds })
      .then(res => {
        Toast.show({
          content: `${res.data} items have been removed.`,
          position: 'bottom'
        })
        mutate()
      })
      .catch(() => {
        Toast.show({
          content: 'Deletion failed. Please try again',
          position: 'bottom'
        })
      })
  }

  return (
    <>
      <Head title='Poppy Shopping | Cart' />
      <h1 className={style.title}>Cart ({data?.cartNum ?? '0'})</h1>
      <div className={style.removeNot}>
        <p>One or more of your items is now out of stock.</p>
        <Button
          shape="rounded"
          color="primary"
          size="mini"
          className={style.notBtn}
          onClick={removeAll}
        >Remove All</Button>
        <style jsx>{`
          div {
            display: ${canBuy ? 'none' : ''};
          }
        `}</style>
      </div>
      <CartGoods />
      {data?.shops?.length ? <Checkout /> : null}
    </>
  )
}

export default Cart