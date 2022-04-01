import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), {ssr: false})
import style from './profileInfo.module.scss'

function ProfileInfo({ user, userId }) {
  const router = useRouter()
  return (
    <div className={style.profile_info}>
      <section className={style.head_pic}><LazyLoad src={user.headPicture} /></section>
      <h4>{user.nickName}</h4>
      <p className={style.desc}>{user.biography}</p>
      {
        userId ? null : 
          <section
            className={style.edit}
            onClick={() => router.push('/profile/edit')}
          >edit profile</section>
      }
    </div>
  )
}

export default ProfileInfo