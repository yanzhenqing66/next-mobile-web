import { memo } from 'react'
import { useRefundContext } from '../module'
import formatPrice from '@/utils/formatPrice'
import style from './refundA.module.scss'

function RefundAmount() {
  const { refundFee } = useRefundContext()
  return (
    <div className={style.refund_amount}>
      <p className={style.refund_amount_head}>
        Refund amount
      </p>
      <div className={style.refund_amount_price}>
        <p className={style.refund_amount_pleft}>
          $ {formatPrice(refundFee)}
        </p>
      </div>
    </div>
  )
}

export default memo(RefundAmount)