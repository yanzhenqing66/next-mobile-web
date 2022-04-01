import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { Input, Button, NavBar } from 'antd-mobile'
import { useRequest, useDataTypeCheck, useOnlyView } from '@/hooks/useRequest'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), {ssr: false})
import { createFavorCard } from '@/api/wishList'
import { throttle } from '@/utils/optimizeFn'
import style from './createWishList.module.scss'


function CreateWishList({ featuredImage, goBackWishList }) {
  const [wishParams, setWishParams] = useState({
    isShow: false,
    name: ''
  })
  let params = {
    isShow: wishParams.isShow ? 1 : 0,
    cover: featuredImage,
    name: wishParams.name
  }
  const { data, error, loading, run } = useRequest(createFavorCard, params, { manual: true })
  const msg = useDataTypeCheck(data)
  useOnlyView(msg, error, loading)

  const [errStatus, setErrStatus] = useState(0)

  useEffect(() => {
    if (data == 1) {
      goBackWishList()
    }
  }, [data])

  useEffect(() => {
    return () => {
      params = null
    }
  }, [])

  const nameChange = (name) => {
    if (!name.length) {
      setErrStatus(1)
    } else {
      setErrStatus(0)
    }
    setWishParams({ ...wishParams, name })
  }

  const createWishlist = throttle(() => {
    if (!wishParams.name) {
      return
    } else {
      run()
    }
  })

  const inputStatus = () => {
    switch (errStatus) {
      case 1:
        return style.activeTip
      default:
        return style.errorInput
    }
  }

  return (
    <div className={style.createWishList}>
      <header className={style.createHeader}>
        <NavBar onBack={goBackWishList}><h3>New wish list</h3></NavBar>
      </header>
      <main className={style.createMain}>
        <div className={style.cover}>
          <LazyLoad src={featuredImage} />
        </div>
        <section className={style.createName}>
          <Input
            placeholder="List name"
            onChange={nameChange}
            style={{
              borderBottom: '2px solid #222',
              marginBottom: 20
            }}
          ></Input>
          <p
            className={inputStatus()}
          >Wishlist name is required</p>
        </section>
      </main>
      <footer className={style.createFooter}>
        <Button
          className={style.SaveBtn}
          onClick={createWishlist}
          loading={loading}
        >Save</Button>
      </footer>
    </div>
  )
}

export default CreateWishList