import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import useFetchState from '@/hooks/useFetchState'
import LoadPage from '@/components/common/loadPage'
import { getFavorList } from '@/api/wishList'
import Category from '@/components/content/wishList/favorites/components/category'
import formatParams from '@/utils/formatParams'
import WishLayout from '@/components/content/wishList/wishLayout'
import FavorLayout from '@/components/content/wishList/favorites/favorLayout'
import Discover from '@/components/content/wishList/favorites/components/discover'
import WishDefault from '@/components/content/wishList/wishDefault'
const TopBar = dynamic(import('@/components/common/topBar'))


function Favorites() {
  const [data, setData] = useFetchState([])
  const [type, setType] = useState(0)
  const [status, setStatus] = useState(0)

  useEffect(() => {
    getFavorLists()
  }, [type])

  const getFavorLists = () => {
    const params = formatParams({
      curPage: 1,
      pageSize: 100,
      type
    })
    getFavorList(params).then(res => {
      if (res.code === 200) {
        setData(res.data)
        setStatus(1)
      } else {
        setStatus(0)
      }
    }).catch((err) => {
      if(err.code === 401) {
        setStatus(401)
      }else {
        setStatus(2)
      }
    })
  }

  const getType = (id) => {
    setType(id)
  }

  const renderList = () => {
    if (status === 1) {
      return <FavorLayout data={data} />
    } else if (status === 401) {
      return <Discover />
    } else if(status === 2) {
      return <WishDefault preview='https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/noFavor.svg'  title='No favorites yet' />
    }else {
      return <LoadPage fixed />
    }
  }

  return (
    <WishLayout>
      <Category getType={getType} />
      {renderList()}
      <TopBar />
    </WishLayout>
  )
}

export default Favorites
