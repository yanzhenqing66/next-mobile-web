import { useEffect, useState, memo, useCallback } from 'react'
import { useImmer } from 'use-immer'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Button, ImageViewer } from 'antd-mobile'
import formatPrice from '@/utils/formatPrice'
import { fbTrack, pinTrack, adEvent, reportLog } from '@/utils/pixelTrack'
import { arrayEquals } from '@/utils/equalValue'
import { useDetailState } from '../module'
const Modal = dynamic(import('@/components/common/modal'), { ssr: false })
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), { ssr: false })
import OptItem from './item'
import storageUtil from '@/utils/storageUtil'
import style from './optionModal.module.scss'

const createSkuInfo = (variants) => {
  const optionSku = variants.map(item => {
    item.optionSku = [item.option1, item.option2, item.option3].filter(item2 => item2)
    return item
  })
  return optionSku
}

const selSku = (sku, optSkuInfo) => {
  return new Promise(resolve => {
    const skus = Object.values(sku)
    const selSkus = optSkuInfo?.find(item => {
      return arrayEquals(item.optionSku, skus)
    })
    resolve(selSkus)
  })
}

function OptionModal() {
  const router = useRouter()
  const { id, optionVisible, data, activeTab, dispatch, token } = useDetailState()
  const { variants, attributes } = data
  const [optSkuInfo, setOptSkuInfo] = useState([])
  const [selOptionInfo, setSelOptionInfo] = useImmer({})
  const [skuNum, setSkuNum] = useState(1)
  const [info, setInfo] = useState(null)
  const [showSku, setShowSku] = useState(false)
  const [isSoldOut, setIsSoldOut] = useState(false)

  const selOptions = (value, name) => {
    setSelOptionInfo(draft => {
      draft[name] = value
    })
    selSku({ ...selOptionInfo, [name]: value }, optSkuInfo).then(createInfo)
  }

  const createInfo = (selInfo) => {
    if (!selInfo) {
      setIsSoldOut(false)
      return
    }
    setInfo(selInfo)
    setIsSoldOut(selInfo.stock > 0)
  }

  const defaultDel = () => {
    if (attributes.length === 1 && attributes[0]?.values[0]?.value === 'Default Title') {
      selSku({ 'Default Title': 'Default Title' }, optSkuInfo).then(createInfo)
      setShowSku(true)
    } else {
      setInfo(optSkuInfo[0])
    }
  }

  useEffect(() => {
    const optionSku = createSkuInfo(variants)
    setOptSkuInfo(optionSku)
  }, [])

  useEffect(() => {
    defaultDel()
  }, [optSkuInfo])

  const stockChange = useCallback((val) => {
    setSkuNum(val)
  }, [])

  const goBuy = () => {
    const params = {
      skuId: info.id,
      skuNum
    }

    storageUtil.setStore('checkOpt', params)
    reportAddLog()
    if (token) {
      router.push('/cart/checkout')
    } else {
      storageUtil.setStore('redirect', router.asPath)
      router.push({ pathname: '/login', query: { redirect: router.asPath } })
    }
  }

  const reportAddLog = () => {
    fbTrack('AddToCart', {
      content_type: 'product',
      contents: [{ id, quantity: skuNum }],
      currency: 'USD',
      value: formatPrice(info.price),
    })
    pinTrack('AddToCart', {
      value: formatPrice(info.price),
      order_quantity: 1,
      currency: 'USD',
      product_id: id,
      line_items: [{
        product_id: id,
        product_price: formatPrice(info.price),
        product_quantity: 1,
      }],
    })
    adEvent('w5ysrh', {
      product_id: id,
      sku_id: info.id,
      currency: 'USD',
      order_quantity: skuNum,
      price: info.price,
      active_tab: activeTab
    })
    reportLog({ event: 'click_button', page: 'detail', item_id: id, button: 'window_buy', item_type: 'inner' })
  }

  const onClose = useCallback(() => {
    dispatch({ type: 'setOptionVisible', data: false })
  }, [])

  return (
    <Modal
      visible={optionVisible}
      onClose={onClose}
      bodyStyles={{
        height: '70vh'
      }}
    >
      <div className={style.option_modal}>
        <header className={style.goods_info}>
          <div className={style.info_img}>
            <LazyLoad
              src={info?.featuredImage?.src}
              onClick={() => {
                ImageViewer.show({ image: info?.featuredImage?.src })
              }}
            />
          </div>
          <section className={style.price}>
            <p>$ {formatPrice(info?.price)}</p>
            <p>{info?.sku}</p>
          </section>
        </header>
        <OptItem
          selOptions={selOptions}
          showSku={showSku}
          selOptionInfo={selOptionInfo}
          stock={info?.stock}
          skuNum={skuNum}
          stockChange={stockChange}
        />
        <footer className={style.optFoot}>
          <Button
            className={style.gobuy}
            onClick={goBuy}
            shape='rounded'
            disabled={!isSoldOut}
          >
            Buy Now
          </Button>
        </footer>
      </div>
    </Modal>
  )
}

export default memo(OptionModal)