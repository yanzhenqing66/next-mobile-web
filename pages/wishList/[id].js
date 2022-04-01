
let page = 1
function FavorDetail({ id, resolvedUrl, foldInfo, image }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [hasMore, setHasMore] = useState(true)
  const detailList = useSelector(state => state.favorDetailReducer)
  const [editVisible, setEditVisible] = useState(false)
  const [pageStatus, setPageStatus] = useState(1)  // 1展示列表 2展示删除 3展示private

  const getDetailList = async () => {
    const params = formatParams({
      curPage: page,
      pageSize: 20,
      folderId: id
    })

    const res = await dispatch(getFavorDetails(params))
    if (res) {
      if (res.data) {
        res.data.contents.length && page++
        setHasMore(res.data.contents.length >= 20)
      } else if (res == '2') {
        setPageStatus(2)
      } else {
        setPageStatus(3)
      }
    }
  }

  const updFollowGood = useCallback((event, foldId) => {
    event.stopPropagation()
    event.preventDefault()
    updLike(foldId)
  }, [detailList])

  const updLike = (foldId) => {
    const params = {
      folderIds: [id],
      contentId: foldId
    }
    updFoldGood(params).then(res => {
      if (res.code === 200) {
        const data = detailList.map(item => {
          if (item.id === foldId) {
            item.followBool = !item.followBool
          }
          return item
        })
        dispatch(getDelList(data))
      }
    })
  }

  const goBack = useCallback(() => {
    window.history.length == 1 ? router.push('/') : router.back()
  }, [])

  const editFavorCard = () => {
    setEditVisible(true)
  }

  const closeEdit = useCallback(() => {
    setEditVisible(false)
  }, [])

  const goDetail = id => {
    reportLog({page: 'wishlist_detail', item_id: id, tab_id: 'favorites'})
  }


  useEffect(() => {
    EventBus.on('SaveFold', () => {
      router.reload()
    })
    return () => {
      EventBus.delete('SaveFold')
      page = 1
      dispatch(removeFavorDatail())
    }
  }, [])

  const renderCon = () => {
    if (pageStatus == 1) {
      return (
        <main style={{ minHeight: 'calc(100vh - 150px)', backgroundColor: '#f6f6f6' }}>
          <Waterfall
            data={detailList}
            followOpt={foldInfo.created}
            updFollowGood={updFollowGood}
            goDetail={goDetail}
          />
          <InfiniteScroll loadMore={getDetailList} hasMore={hasMore}>
            <InfiniteScrollContent hasMore={hasMore} />
          </InfiniteScroll>
        </main>
      )
    } else {
      return <PrivateList pageStatus={pageStatus} />
    }
  }

  return (
    <div className={style.favorDetail}>
      <Head title={'Poppy Shopping | WishList: ' + foldInfo.name} image={image} desc={foldInfo.folderDesc} />
      <div className={style.favorDetailTitle}>
        <TopHead
          left={<LeftOutline fontSize={23} onClick={goBack} />}
          right={
            <div style={{ display: 'flex' }}>
              <Share url={resolvedUrl} />
              {
                foldInfo.created ?
                  <MoreOutline
                    fontSize={30}
                    style={{
                      cursor: 'pointer',
                      marginLeft: 30
                    }}
                    onClick={editFavorCard} />
                  : null
              }
            </div>
          }
        />
      </div>
      <FavorInfo foldInfo={foldInfo} id={id} />
      {renderCon()}
      <EditFavor
        editVisible={editVisible}
        foldInfo={foldInfo}
        id={id}
        close={closeEdit}
      />
      <OpenWishApp image={image} />
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const { query: { id: ids }, resolvedUrl, req } = ctx
  
  const id = ids.split('_q_')[1] ? ids.split('_q_')[1] : ids

  const cookies = useParseCookies(req)

  const headers = {
    'device-id': cookies['device-id'] || '',
    'X-Poppy-Token': cookies.poppy_token || '',
    'platform-id': 'web'
  }

  const { data: foldInfo } = await getExtendInfo(id, headers)

  const params = formatParams({
    curPage: 1,
    pageSize: 1,
    folderId: id
  })

  const { data } = await getWishFirstPic(params, headers)
  const image = data?.contents[0]?.featuredImage?.src || ''

  return {
    props: {
      id,
      resolvedUrl,
      foldInfo,
      image
    }
  }
}

import React, { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { InfiniteScroll } from 'antd-mobile'
import { MoreOutline, LeftOutline } from 'antd-mobile-icons'
import { reportLog } from '@/utils/pixelTrack'
import useParseCookies from '@/hooks/useParseCookies'
import Head from '@/components/common/head'
import formatParams from '@/utils/formatParams'
import EventBus from '@/utils/eventBus'
import { getFavorDetails, getDelList, removeFavorDatail } from '@/store/favorDetail/action'
import TopHead from '@/components/common/topHead'
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'
import { getExtendInfo, getWishFirstPic } from '@/api/wishList'
import { updFoldGood } from '@/api/goodsDetail'
import FavorInfo from '@/components/content/favorDetail/favorInfo'
import Share from '@/components/common/share'
const Waterfall = dynamic(import('@/components/common/waterfall'), { ssr: false })
const PrivateList = dynamic(import('@/components/content/favorDetail/privateList'))
const EditFavor = dynamic(import('@/components/content/favorDetail/editFavor'))
const OpenWishApp = dynamic(import('@/components/content/wishList/openWishApp'))
import style from '@/styles/comp_style/favorDetail.module.scss'

export default FavorDetail