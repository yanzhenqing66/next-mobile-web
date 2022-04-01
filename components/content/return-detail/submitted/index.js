import { memo } from 'react'
import { ClockCircleFill, CheckCircleFill, ExclamationCircleFill } from 'antd-mobile-icons'
import css from 'styled-jsx/css'
import { refundDetailSwr } from '../request'
import rem from '@/utils/rem'
import { formatOrderDate } from '@/utils/formatDate'

const title = (status) => {
  switch (status) {
    case 1:
      return (
        <>
          <p className='f13'><ClockCircleFill color='#FAA61A' /> Return request submitted!</p>
          <p className='fw400'>Please wait for the seller to confirm.</p>
        </>
      )
    case 2:
      return (
        <>
          <p className='f13'><ClockCircleFill color='#FAA61A' /> Return request accepted!</p>
          <p className='fw400'>Please send the item back to seller and provide tracking number</p>
        </>
      )
    case 4:
      return (
        <>
          <p className='f13'><CheckCircleFill color="#00AA11" /> Refund successfully issued!</p>
          <p className='fw400 f10'>We have issued your refund via your original payment method. It could take up to 14 business days for your refund to be posted to your account. </p>
        </>
      )
    case 5:
      return (
        <p className='f13'><ExclamationCircleFill color='#D43131' /> Return request cancelled!</p>
      )
    default:
      return (
        <>
          <p className='f13'><ExclamationCircleFill color='#D43131' /> Return request failed!</p>
          <p className='fw400'>You can contact seller for more information</p>
        </>
      )
  }
}

const result = (status, updateTime) => {
  switch(status) {
    case 4: 
      return <p className='mt20 textC'>Seller accepted your refund request on {formatOrderDate(updateTime)}</p>
    case 3:
    case 6: 
      return <p className='mt20 textC'>Your refund was rejected on {formatOrderDate(updateTime)}</p>
    case 5: 
      return <p className='mt20 textC'>Your request was cancelled on {formatOrderDate(updateTime)}</p>
    default: return null
  }
}

function Submitted({ refundNo }) {
  const { data } = refundDetailSwr(refundNo)

  return (
    <>
      <div className='submit_box flexCenter bgf8 br8'>
        <div className='wrap lh16'>
          {title(data.status)}
        </div>
        <style jsx>{styleSub}</style>
      </div>
      {result(data.status, data.updateTime)}
    </>
  )
}

const styleSub = css`
  .submit_box {
    height: ${rem(92)};
  }
  
  .wrap {
    width: ${rem(280)};
    text-align: center;
  }
`

export default memo(Submitted)
