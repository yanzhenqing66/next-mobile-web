import { memo } from 'react'
import privateImg from '@/assets/images/wishList/private.svg'
import removed from '@/assets/images/wishList/removed.svg'
import style from './privateList.module.scss'

function PrivateList({pageStatus}) {
  return (
    <div className={style.private_list}>
      <img src={pageStatus === 2 ? privateImg : removed } />
      <h2>
        {
          pageStatus === 2 ? 'This list has been removed' : 'This list is private now'
        }
      </h2>
    </div>
  )
}

export default memo(PrivateList)