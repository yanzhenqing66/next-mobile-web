import { useState, memo } from 'react'
import dynamic from 'next/dynamic'
import { Button, Space } from 'antd-mobile'
import { CheckOutline, AddCircleOutline } from 'antd-mobile-icons'
import { updFoldGood } from '@/api/goodsDetail'
import IconFont from '@/components/common/IconFont'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), { ssr: false })
import style from './selWishList.module.scss'

function SelWishList({ id, wishList, onSelStatus, onCloseWish, refreshWish }) {
  const [status, useStatus] = useState(0)

  const addFolder = (ids) => {
    const params = {
      folderIds: [ids],
      contentId: id
    }
    updFoldGood(params)
      .then(res => {
        if (res.code === 200) {
          refreshWish()
          useStatus(status => status + 1)
        }
      })
  }
  const SaveWish = () => {
    onCloseWish(status)
  }

  return (
    <div className={style.selWishList}>
      <h3>Select a list to add to :</h3>
      <ul className={style.wishList}>
        {
          wishList?.map(item => (
            <li key={item.id} onClick={() => addFolder(item.id)}>
              <div className={style.cover}>
                <LazyLoad src={item.cover} />
              </div>
              <Space direction="vertical" className={style.wishInfo}>
                <h5>{item.name}</h5>
                <Space align="center">
                  {
                    item.isShow ?
                      <IconFont type="icon-unlock" />
                      : <IconFont type="icon-lock" />
                  }
                  <span className={style.count}>{item.count} Items</span>
                </Space>
              </Space>
              {
                item.existCurContent ? <CheckOutline color="#222" className={style.checkIcon} /> : null
              }
            </li>
          ))
        }
      </ul>
      <footer className={style.wishOperation}>
        <Space align="center" onClick={onSelStatus}>
          <AddCircleOutline fontSize={24} />
          <span>Create a new list</span>
        </Space>
        <Button
          className={style.SaveBtn}
          onClick={SaveWish}
        >Save</Button>
      </footer>
    </div>
  )
}

export default memo(SelWishList)