import { useRouter } from 'next/router'
import { Button, Checkbox, Dialog } from 'antd-mobile'
import rem from '@/utils/rem'
import { updCartSelect } from '@/api/cart'
import formatPrice from '@/utils/formatPrice'
import { getCartList } from '../request'
import style from './checkout.module.scss'

function Checkout() {
  const router = useRouter()
  const { data, mutate } = getCartList()

  const allSelChange = (val) => {
    const params = {
      skuIds: [],
      isSelected: val ? 1 : 0
    }
    updCartSelect(params).then(() => {
      mutate()
    })
  }

  const goChenkout = () => {
    if (data?.price?.total < 50) {
      Dialog.show({
        content: 'Payment cannot be completed for the order less than 50 cents',
        closeOnMaskClick: true,
        closeOnAction: true,
        actions: [
          {
            key: '0',
            text: 'OK',
          },
        ],
      })
      return
    }
    router.push('/cart/checkout')
  }

  return (
    <div className={style.checkout}>
      <Checkbox
        checked={data?.allSelected}
        style={{ '--icon-size': rem(18) }}
        onChange={val => allSelChange(val)}
      >All</Checkbox>
      <p className={style.total}>
        {data?.shops[0]?.currencyMark}
        {data?.price?.total > 0 ? formatPrice(data?.price?.total) : '0.00'}
      </p>
      <Button
        shape='rounded'
        color='primary'
        className={style.checkClick}
        disabled={!data?.selectedNum}
        onClick={goChenkout}
      >Checkout ({data?.selectedNum ?? '0'})</Button>
    </div>
  )
}

export default Checkout