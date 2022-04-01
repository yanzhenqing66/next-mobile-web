import { memo } from 'react'
import LazyLoad from '@/components/common/lazyLoad'
import css from 'styled-jsx/css'
import { refundDetailSwr } from '../request'
import rem from '@/utils/rem'
import formatPrice from '@/utils/formatPrice'

function ItemDetail({ refundNo }) {
  const { data } = refundDetailSwr(refundNo)

  return (
    <div className='mtb borBot f13'>
      <h5 className='fw600 mt20'>Item details</h5>
      <div className='flex mtb20 box'>
        <LazyLoad src={data.skuPicUrl} width={rem(86)} height={rem(86)} className='br8' />
        <div className='info ml10 flexCol'>
          <p className='max2Line'>{data.productName}</p>
          <p className='fw400 f10'>{data.skuAttribute}</p>
          <p><b>$ {formatPrice(data.refundFee)}</b> <span className='f10'>x{data.returnNum}</span></p>
        </div>
        <style jsx>{itemCss}</style>
      </div>
    </div>
  )
}

const itemCss = css`
  .info {
    flex: 1;
    justify-content: space-around;
  }
  
`

export default memo(ItemDetail)