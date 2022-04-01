import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux'
import { List, NavBar } from 'antd-mobile'
import {LeftOutline} from 'antd-mobile-icons'
import Head from '@/components/common/head'
import TopHead from "@/components/common/topHead"
import { del_token } from '@/store/user/actions/authToken'
import { anth_login_dispatch, cancel_login } from '@/store/user/actions/auth'
import IconFont from '@/components/common/IconFont'
import style from './settings.module.scss'
import { useEffect } from 'react'

const Item = List.Item
function Settings() {
  const router = useRouter()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(del_token())
    dispatch(cancel_login())
    close()
  }

  const close = () => {
    router.push('/me')
  }

  useEffect(() => {
    dispatch(anth_login_dispatch())
  }, [])

  const userType = (
    <>
      {
        user.authUserType && user.authUserType === 'GOOGLE'
         ? <IconFont type='icon-google' style={{fontSize: 22}} /> : <IconFont style={{fontSize: 22}} type='icon-Facebook' />
      }
    </>
  )

  return (
    <div className={style.settings}>
      <Head />
      <NavBar onBack={close}>Settings</NavBar>
      <List>
        <Item style={{color: '#919191'}}>Account</Item>
        <Item prefix={userType} extra={user.email}></Item>
        <Item prefix="Poppy ID" extra={<span style={{color: '#b2b2b2'}}>{user.id}</span>}></Item>
      </List>
      <div className={style.signOut} onClick={signOut}>Sign out</div>
    </div>
  )
}

export default Settings