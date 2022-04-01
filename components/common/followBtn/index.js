import { useState, useEffect } from 'react'
import { Button } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
import formatParams from '@/utils/formatParams'
import { getFollowStatus, unFollow as CancelFollow, following } from '@/api/common'
import style from './followBtn.module.scss'

FollowBtn.defaultProps = {
  type: 1
}

// type 关注对象类型 1.收藏夹 2.店铺 3.用户
function FollowBtn({ id, type }) {
  const [followStatus, setFollowStatus] = useState(false)
  const [loading, setLoading] = useState(false)

  const getFollow = async () => {
    const params = formatParams({
      collectObjectId: id,
      collectObjectType: type
    })
    const { data } = await getFollowStatus(params)
    setFollowStatus(data)
  }


  const unFollow = () => {
    const params = {
      collectObjectId: id,
      collectObjectType: type, //关注对象类型 1.收藏夹 2.店铺 3.用户
    }
    setLoading(true)
    CancelFollow(params).then(res => {
      setLoading(false)
      if (res.code === 200) {
        getFollow()
      }
    })
  }

  const follow = () => {
    const params = {
      collectObjectId: id,
      collectObjectType: type, //关注对象类型 1.收藏夹 2.店铺 3.用户
    }
    setLoading(true)
    following(params).then(res => {
      setLoading(false)
      if (res.code === 200) {
        getFollow()
      }
    })
  }

  useEffect(() => {
    getFollow()
  }, [])


  return (
    <>
      {
        followStatus ?
          <Button
            className={style.following}
            fill='outline'
            onClick={unFollow}
            loading={loading}
            size='mini'
          >Following</Button>
          :
          <Button
            className={style.follow}
            loading={loading}
            onClick={follow}
            size='mini'
          >
            <AddOutline color="#fff" fontSize={13} />
            <span> Follow</span>
          </Button>
      }
    </>
  )
}

export default FollowBtn