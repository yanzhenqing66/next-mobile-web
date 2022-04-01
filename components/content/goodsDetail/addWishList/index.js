import React, { useCallback, useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
const Modal = dynamic(import('@/components/common/modal'), { ssr: false })
import { getWishList } from '@/api/goodsDetail'
import SelWishList from './selWishList'
import CreateWishList from './createWishList'
import { ProductContext } from '../module'

function AddWishList() {
  const token = useSelector(state => state.tokenReducer)
  const {
    id,
    wishVisible,
    featuredImage,
    dispatch
  } = useContext(ProductContext)

  const [wishList, setWishList] = useState([])
  const [listStatus, setListStatus] = useState(true)

  const onCloseWish = (status) => {
    dispatch({ type: 'setWishVisible', data: false })
    if (typeof status === 'number' && status > 0) {
      dispatch({ type: 'setLoadMsg', data: true })
    }
  }

  useEffect(() => {
    getWish()
  }, [])

  const getWish = () => {
    if (!token) return
    getWishList(id).then(res => {
      if (res.code === 200) {
        setWishList(res.data)
      }
    })
  }

  const onSelStatus = useCallback(() => {
    setListStatus(false)
  }, [])

  const goBackWishList = useCallback(() => {
    getWish()
    setListStatus(true)
  }, [])

  const refreshWish = () => {
    getWish()
  }

  return (
    <Modal
      visible={wishVisible}
      onClose={onCloseWish}
    >
      {
        listStatus ?
          <SelWishList
            id={id}
            wishList={wishList}
            onSelStatus={onSelStatus}
            onCloseWish={onCloseWish}
            refreshWish={refreshWish}
          />
          : <CreateWishList featuredImage={featuredImage} goBackWishList={goBackWishList} />
      }
    </Modal>
  )
}

export default AddWishList