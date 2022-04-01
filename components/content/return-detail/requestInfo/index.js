import { memo } from 'react'
import css from 'styled-jsx/css'
import rem from '@/utils/rem'
import { refundDetailSwr, refundStatus } from '../request'
import formatPrice from '@/utils/formatPrice'
import { formatOrderDate } from '@/utils/formatDate'

const Status = (status) => {
  return refundStatus.find(item => item.id === status).name
}

function RequestInfo({ refundNo }) {
  const { data } = refundDetailSwr(refundNo)
  return (
    <div className='info_box borBot f13 lh18 fw400'>
      <h5 className='fs13 fw600'>Request information</h5>
      <p>Refund No. {data.refundNo}</p>
      <p>Refund total: $ {formatPrice(data.refundFee)}</p>
      <p>Request on: {formatOrderDate(data.applyTime)}</p>
      <p>Status: {Status(data.status)}</p>
      <style jsx>{infoCss}</style>
    </div>
  )
}

const infoCss = css`
  .info_box {
    margin-top: ${rem(32)};
    padding-bottom: ${rem(24)};
  }

  h5 {
    margin-bottom: ${rem(20)};
  }
`

export default memo(RequestInfo)