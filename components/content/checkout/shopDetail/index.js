import { Fragment, useCallback, useState } from 'react'
import { useImmer } from 'use-immer'
import { Input, List } from 'antd-mobile'
import { useSelector, useDispatch } from 'react-redux'
import { edit_shop_note } from '@/store/checkout/action' 
import formatPrice from '@/utils/formatPrice'
import IconFont from '@/components/common/IconFont'
import LazyLoad from '@/components/common/lazyLoad'
import style from './shopDetail.module.scss'
import ShippingRules from './components/shippingRules'
import rem from '@/utils/rem'

function ShopDetail() {
  const orderInfo = useSelector(state => state.checkoutReducer)
  const {notes} = useSelector(state => state.editCheckReducer)
  const dispatch = useDispatch()
  const [ruleVis, setRuleVis] = useState()
  const [shipRules, setShipRules] = useImmer({})

  const closeRule = useCallback(() => {
    setRuleVis(false)
  }, [])

  return (
    <div className={style.wrap}>
      {
        orderInfo?.shops ? orderInfo.shops?.map(item => (
          <Fragment key={item.shopId}>
            <header className={style.header}>
              <IconFont type='icon-shop' />
              <h3>{item.shopBrand}</h3>
            </header>
            {
              item?.skus?.map(item2 => (
                <div className={style.goods} key={item2.skuId}>
                  <div className={style.goods_img}>
                    <LazyLoad src={item2.skuPicUrl} />
                  </div>
                  <div className={style.goods_desc}>
                    <h4 className={style.title}>{item2.productName}</h4>
                    <p className={style.attr}>{item2.skuAttribute}</p>
                    <p className={style.pro_price}>
                      <span>{item.currencyMark + ' ' + formatPrice(item2.skuPrice)}</span>
                      <span className={style.skuNum}>{'x'+ item2.skuNum}</span>
                    </p>
                  </div>
                </div>
              ))
            }
            <List 
              className={style.detail}
              style={{
                '--padding-left': 0,
              }}
            >
              <List.Item
                prefix='Delivery method'
                extra={item?.price?.shippingFee ? item.currencyMark + formatPrice(item?.price?.shippingFee) : 'Free shipping'}
                onClick={() => {
                  setShipRules(draft => {
                    draft.templateFreeType = item?.templateFreeType
                    draft.templateShippingFee = item?.templateShippingFee
                    draft.freeShippingPrice = item?.freeShippingPrice
                  })
                  setRuleVis(true)
                }}
              />
              <List.Item prefix="Message for the seller">
                <Input
                  placeholder='Please send them out ASAP, thank you'
                  style={{ '--font-size': rem(10) }}
                  value={notes?.filter(item => item?.shopId == item.shopId)[0]?.note}
                  onChange={val => {
                    dispatch(edit_shop_note({shopId: item.shopId, note: val}))
                  }}
                />
              </List.Item>
            </List>
            <div className={style.price}>
              <p><span>Subtotal</span><span>{item.currencyMark + formatPrice(item?.price?.subTotal)}</span></p>
              <p><span>Shipping fee</span><span>{item.currencyMark + formatPrice(item?.price?.shippingFee)}</span></p>
              <p><span>Total</span><span>{item.currencyMark + formatPrice(item?.price?.total)}</span></p>
            </div>
          </Fragment>
        )) : null
      }
      <ShippingRules
        visible={ruleVis}
        close={closeRule}
        shipRules={shipRules}
      />
    </div>
  )
}

export default ShopDetail