import { useRouter } from 'next/router'
import {Button} from 'antd-mobile'
import comingSoon from '@/assets/images/follow/comingsoon.svg'
import style from './nofollowGoods.module.scss'

function NofollowGoods () {
  const router = useRouter()

  return (
    <div className={style.no_follow_goods}>
      <img src={comingSoon} />
      <h2>Coming Soon</h2>
      <p>The store you visit is under construction.</p>
      <Button className={style.conBtn} onClick={() => router.push('/')}>Continue shopping</Button>
    </div>
  )
}

export default NofollowGoods