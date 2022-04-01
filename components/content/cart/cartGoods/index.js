import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Checkbox, Stepper, Dialog, Button } from 'antd-mobile'
import css from 'styled-jsx/css'
import rem from '@/utils/rem'
import { debounce } from '@/utils/optimizeFn'
import { updCartSelect, updCartNum, delCartGoods } from '@/api/cart'
import { getCartList } from '../request'
import formatPrice from '@/utils/formatPrice'
import IconFont from "@/components/common/IconFont"
import LoadPage from '@/components/common/loadPage'
import LazyLoad from '@/components/common/lazyLoad'
const NoCartGoods = dynamic(import('../noCartGoods'))
import GoLogin from '@/components/common/goLogin'
import Loading from '@/components/common/loading'
import { reportLog } from '@/utils/pixelTrack'
// import addwish from '@/assets/images/cart/addwish.svg'
import storeUtils from '@/utils/storageUtil'
import style from './cartGoods.module.scss'


function CartGoods() {
  const router = useRouter()
  const { data, error, loading, isValidating, mutate } = getCartList()

  const selCart = debounce((val, id) => {
    const params = {
      skuIds: [id],
      isSelected: val ? 1 : 0
    }
    updCartSelect(params).then(() => {
      mutate()
    })
  })

  const delCart = (id) => {
    Dialog.show({
      content: 'Are you sure you want to remove this item?',
      closeOnAction: true,
      actions: [
        [
          {
            key: '0',
            text: 'Cancel'
          },
          {
            key: '1',
            text: 'Remove',
            onClick: async () => {
              const params = {
                skuIds: Array.isArray(id) ? id : [id]
              }
              await delCartGoods(params)
              mutate()
            }
          }
        ]
      ]
    })
  }

  const stepperChange = debounce((val, id) => {
    if (val == 0) {
      delCart(id)
      return
    }
    const params = {
      skuId: id,
      skuNum: val
    }
    updCartNum(params)
      .then(() => {
        mutate()
      })
      .catch(err => {
        if (err.code === 1051) {
          mutate()
        }
      })
  })

  const shopSel = (data) => {
    return data.every(item => item.isSelected)
  }

  const shopSelChange = (val, data) => {
    const ids = data.map(item => item.skuId)
    const params = {
      skuIds: ids,
      isSelected: val ? 1 : 0
    }
    updCartSelect(params).then(() => {
      mutate()
    })
  }

  const shopDisable = (data) => {
    return data.every(item => !item.canBuy)
  }

  const removeStore = (list) => {
    const skuIds = list.map(item => item.skuId)
    delCart(skuIds)
  }

  const goDetail = (id) => {
    reportLog({ page: 'cart', item_id: id })
    router.push(`/productDetail/${id}`)
  }

  if (loading) {
    return <LoadPage fixed />
  } else if (error?.response?.status == '401') {
    return <GoLogin />
  } else if (!data && error) {
    return <NoCartGoods />
  } else {
    return (
      <div className={style.wrap}>
        {
          data?.shops?.length ? data.shops.map(item => (
            <div className={style.container} key={item.shopId}>
              <div className={style.remove}>
                <p>The store is closed</p>
                <Button shape='rounded' color='primary' size='mini' onClick={() => removeStore(item?.skus)}>Remove All</Button>
                <style jsx>{`
                  div {
                    display: ${item?.noBuyType === 1 ? '' : 'none'};
                  }
                `}</style>
              </div>
              <Checkbox
                checked={shopSel(item?.skus)}
                block
                style={{ '--icon-size': rem(18) }}
                onChange={(val) => shopSelChange(val, item?.skus)}
                disabled={shopDisable(item?.skus)}
              >
                <div className={style.top}>
                  <IconFont type="icon-shop" className={style.shop} />
                  <h3>{item.shopBrand}</h3>
                </div>
              </Checkbox>
              {
                item?.skus?.map(item2 => (
                  <section className={style.content} key={item2.skuId}>
                    <Checkbox
                      style={{ '--icon-size': rem(18) }}
                      checked={item2.isSelected}
                      onChange={val => selCart(val, item2.skuId)}
                      disabled={!item2.canBuy}
                    />
                    <div
                      className={style.goods_img}
                      onClick={() => goDetail(item2.productId)}
                    >
                      <LazyLoad src={item2.skuPicUrl} />
                      {
                        item2.noBuyType === 3 || item2.noBuyType === 5
                          ? <div className={style.error}>
                            {item2.noBuyType === 3 ? 'Sold Out' : 'Not Available'}
                          </div>
                          : null
                      }
                    </div>
                    <div
                      className={style.goods_desc}
                      onClick={() => goDetail(item2.productId)}
                    >
                      <h4>{item2.productName}</h4>
                      {
                        item2.noBuyType === 4 ?
                          <p className={style.reselect}>Please reselect product options</p>
                          : <p className={style.goods_attr}>{item2.skuAttribute}</p>
                      }
                      <p className={style.goods_price}>{item.currencyMark} {formatPrice(item2.skuPrice)}</p>
                    </div>
                    {/* <div className={style.right}>
                      <img src={addwish} className={style.addwish} />
                    </div> */}
                    <div className={style.stepCount}>
                      <p>{item2?.noBuyType === 2 ? 'Out of Stock' : ''}</p>
                      <style jsx>{stockCss}</style>
                      {
                        item2.noBuyType === 4
                          ? <Button
                            shape='rounded'
                            color='primary'
                            size='mini'
                            onClick={() => goDetail(item2.productId)}
                          >Reselect</Button>
                          : <Stepper
                            value={item2.skuNum}
                            className={style.step}
                            min={0}
                            max={100}
                            digits={0}
                            inputReadOnly
                            disabled={item2.noBuyType === 3 || item2.noBuyType === 5}
                            onChange={(val) => stepperChange(val, item2.skuId)}
                          />
                      }
                    </div>
                  </section>
                ))
              }
            </div>
          )) : (
            <div className={style.noCart}>
              <Button
                shape='rounded'
                color='primary'
                onClick={() => router.push('/')}
              >Continue shopping</Button>
            </div>
          )
        }
        {
          isValidating ? <Loading position='fixed' /> : null
        }
      </div>
    )
  }
}

export default CartGoods

const stockCss = css`
  p {
    font-size: ${rem(10)};
    color: #F93A3A;
    margin-bottom: ${rem(8)};
    text-align: center;
  }
`