import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {useSelector} from 'react-redux'
import useGetParams from '@/hooks/useGetParams'
import { getUserDetail } from '@/api/me'
import Head from "@/components/common/head"
import Cover from "@/components/content/profile/cover"
import ProfileInfo from "@/components/content/profile/profileInfo"
import MyWishList from '@/components/content/profile/myWishlist'

function Profile() {
  const router = useRouter()
  const {userId} = useGetParams(router.asPath)
  const [otherUser, setOtherUser] = useState({})
  const user = useSelector(state => state.user)

  useEffect(() => {
    if(userId) {
      getUser()
    }
  }, [])

  const getUser = async () => {
    const {data} = await getUserDetail(userId)
    setOtherUser(data)
  }

  return (
    <>
      <Head />
      <Cover 
        userId={userId}
        backgroundPicture={userId ? otherUser.backgroundPicture : user.backgroundPicture} />
      <ProfileInfo userId={userId} user={userId ? otherUser : user} />
      <div style={{height: 8, width: '100%', backgroundColor: '#F8F8F8', margin: '12px 0 15px 0'}}></div>
      <MyWishList userId={userId} />
    </>
  )
}

export default Profile