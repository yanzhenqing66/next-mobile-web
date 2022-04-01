import React, { memo, useContext } from 'react'
import { Space } from 'antd-mobile'
import formatPrice from '@/utils/formatPrice'
import { ProductContext } from '../module'
import FollowScore from '../../followScore'
import style from './title.module.scss'

function Title() {
  const { data, reviewScore, reviewTotal } = useContext(ProductContext)
  const { title, price, compareAtPrice, currencyMark } = data

  return (
    <div className={style.detailTitle}>
      <h1>{title}</h1>
      <Space className={style.price}>
        <b>{currencyMark + ' ' + formatPrice(price)}</b>
        {
          compareAtPrice > 0 && compareAtPrice != price ? <span className={style.original_price}>{currencyMark + ' ' + formatPrice(compareAtPrice)}</span> : null
        }
        {
          compareAtPrice > 0 && price / compareAtPrice <= 0.95 ? <span className={style.discount}>{Math.round((1 - (price / compareAtPrice)) * 100)}% off</span> : null
        }
      </Space>
      <div className='mt10'>
        <FollowScore score={reviewScore} total={reviewTotal} />
      </div>
    </div>
  )
}

export default memo(Title)
