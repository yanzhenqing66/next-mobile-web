import { memo } from 'react'
import { useRouter } from 'next/router'
import { Ellipsis } from 'antd-mobile'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import FollowBtn from '../../../common/followBtn'
import style from './favorInfo.module.scss'

function FavorInfo({ foldInfo, id }) {
  const router = useRouter()

  const goProfile = () => {
    router.push({
      pathname: '/profile',
      query: { userId: foldInfo.userId }
    })
  }

  return (
    <header className={style.fd_info}>
      <h1>{foldInfo.name}</h1>
      <div className={style.fd_info_title}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={goProfile}
        >By {foldInfo.nickName}</span>
        <span className='space'>|</span>
        <span>{foldInfo.count} items</span>
        {foldInfo.favorCount >= 100 ? <span className='space'>|</span> : null}
        {foldInfo.favorCount >= 100 ? <span>{foldInfo.favorCount} follower</span> : null}
      </div>
      {
        !foldInfo.created ? <FollowBtn id={id} /> : null
      }
      <div className={style.fd_info_desc}>
        <Ellipsis
          direction='end'
          expandText={<CaretDownOutlined style={{ color: '#222' }} />}
          collapseText={<CaretUpOutlined style={{ color: '#222' }} />}
          content={foldInfo.folderDesc}
          rows={4}
        />
      </div>
    </header>
  )
}

export default memo(FavorInfo)