import { memo, useContext, useEffect, useState } from 'react'
import { Button, Toast } from 'antd-mobile'
import { getStoreIm } from '@/api/me'
import { getCollectStatus } from "@/api/goodsDetail";
import SvgIcon from '@/components/common/svgIcon'
import { ProductContext } from '../module'
import { fbTrack } from '@/utils/pixelTrack'
import IconFont from '@/components/common/IconFont'
import style from './footBtn.module.scss'

function FootBtn() {
  const {
    id,
    goBuy,
    data,
    dispatch,
    token,
    loadMsg
  } = useContext(ProductContext)

  const { storeId, productSource } = data

  const [collectStatus, setCollectStatus] = useState(false)

  const getCollect = () => {
    if (token) {
      getCollectStatus(id).then((res) => {
        if (res.code === 200) {
          setCollectStatus(res.data)
        }
      })
    }
  }

  useEffect(() => {
    getCollect()
  }, [loadMsg])

  const addWishList = () => {
    fbTrack('AddToWishlist', {
      contentId: [id]
    })
    dispatch({ type: 'setWishVisible', data: true })
  }

  const goChat = () => {
    if (token) {
      getStoreIm(storeId).then(res => {
        location.href = `https://im.poppyapps.com/mchat/${res.data.username.toLowerCase()}?token=${token}&platform=web&id=${id}`
      })
    } else {
      Toast.show({
        content: 'Please log in first',
        position: 'bottom'
      })
    }
  }

  return (
    <footer className={style.footBtn}>
      {
        productSource ?
          <div className={style.chat} onClick={goChat}>
            <SvgIcon src='/images/navBar/messageActive.svg' className={style.msg} />
            <p>Chat</p>
          </div>
          : null
      }
      <div className={style.favor} onClick={addWishList}>
        {
          collectStatus
            ? <IconFont type='icon-likeAct' className={style.favorIcon} />
            : <IconFont type='icon-wishlist' className={style.favorIcon} />
        }
        <p>Favorite</p>
      </div>

      {
        productSource ?
          <>
            <Button
              className={style.addCart}
              shape='rounded'
              onClick={() => goBuy('cart')}
            >
              Add to cart
            </Button>
            <Button
              className={style.goBuy}
              onClick={() => goBuy('buy')}
              shape='rounded'
            >
              Checkout
            </Button>
          </>
          :
          <Button
            className={style.download}
            onClick={goBuy}
            shape='rounded'
          >
            Download app to buy
          </Button>
      }
    </footer>
  )
}

export default memo(FootBtn)
