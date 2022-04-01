import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Button } from 'antd-mobile'
import { SettingOutlined } from '@ant-design/icons'
import Head from '@/components/common/head'
import LazyLoad from '@/components/common/lazyLoad'
import Login from '@/components/content/login'
const MyOrder = dynamic(import('@/components/content/me/myOrder'))
const Support = dynamic(import('@/components/content/me/support'))
const About = dynamic(import('@/components/content/me/about'))
import SvgIcon from '@/components/common/svgIcon'
import useGetParams from '@/hooks/useGetParams'
import style from './me.module.scss'

function Me() {
  const router = useRouter()
  const token = useSelector(state => state.tokenReducer)
  const { headPicture, nickName } = useSelector(state => state.user)
  const [loginVis, setLoginVis] = useState(false)
  const { redirectPath } = useGetParams(router.asPath)

  const goLogin = () => {
    setLoginVis(true)
  }

  const closeLoginModal = () => {
    setLoginVis(false)
  }

  useEffect(() => {
    if (!token && redirectPath) {
      setLoginVis(true)
    }
  }, [])

  return (
    <>
      <Head title='Poppy Shopping | Me' />
      <div className={style.me}>
        <section className={style.user}>
          {headPicture
            ? <LazyLoad src={headPicture} className={style.user_ava} />
            : <SvgIcon src='/images/me/photo.svg' className={style.user_ava} />
          }
          <section className={style.info}>
            <div>
              <h3 className={style.nickname}>
                {nickName ? nickName : 'Account'}
              </h3>
              <div className={style.login}>
                {
                  nickName ?
                    <Link href="/profile">
                      <a style={{ color: '#222' }}>Personal profile</a>
                    </Link>
                    : <span onClick={goLogin}>Click to login in</span>
                }
              </div>
            </div>
            {
              token ? <SettingOutlined
                style={{ fontSize: 23, color: '#222' }}
                onClick={() => router.push('/me/settings')}
              /> : null
            }
          </section>
        </section>
        {token ? <MyOrder /> : null}
        <section className={style.editUser}>
          <Support />
          <About />
        </section>
        {
          token ? null :
            <Button className={style.loginBtn} onClick={goLogin}>Log in</Button>
        }
      </div>
      <Login
        loginVisible={loginVis}
        onClose={closeLoginModal}
      />
    </>
  )
}

export default Me