import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { useSelector } from 'react-redux'
import SvgIcon from '../../svgIcon'
import styled from '@emotion/styled'

import homeActive from '@/public/images/navBar/homeActive.svg'
import homeSvg from '@/public/images/navBar/home.svg'
import wishlistSvg from '@/public/images/navBar/wishlist.svg'
import meSvg from '@/public/images/navBar/account.svg'
import wishlistActive from '@/public/images/navBar/wishlistActive.svg'
import meActive from '@/public/images/navBar/accountActive.svg'
import cart from '@/public/images/navBar/cart.svg'
import cartActive from '@/public/images/navBar/cartActive.svg'
// import message from '@/public/images/navBar/message.svg'

import rem from '@/utils/rem'
import style from './navBar.module.scss'

const Icon = styled(SvgIcon)`
  svg {
    width: ${rem(24)};
    height: ${rem(24)};
  }

  rect {
    fill: #222;
    stroke: rgb(184, 211, 62);
  }
`

function TabBar() {
  const router = useRouter()
  // const token = useSelector(state => state.tokenReducer)

  const goPage = (page) => {
    router.push(page)
  }

  // const goMsg = () => {
  //   location.href = `https://im.poppyapps.com/mchat?token=${token}&platform=web`
  // }

  return (
    <nav className={style.footer}>
      <Link href='/'>
        <a className={style.link}>
          <Icon src={router.pathname === '/' ? homeActive : homeSvg} />
          <span>Home</span>
        </a>
      </Link>
      <Link href='/wishList'>
        <a className={style.link}>
          <Icon src={router.pathname === '/wishList'
            || router.pathname === '/wishList/recentView'
            || router.pathname === '/wishList/following'
            ? wishlistActive : wishlistSvg} />
          <span>Wish List</span>
        </a>
      </Link>
      {/* <div className={style.link} onClick={() => goMsg()}>
        <Icon src={message} />
        <span>Message</span>
      </div> */}
      <div className={style.link} onClick={() => goPage('/cart')}>
        <Icon src={router.pathname === '/cart' ? cartActive : cart} />
        <span>Cart</span>
      </div>
      <div className={style.link} onClick={() => goPage('/me')}>
        <Icon src={router.pathname === '/me' ? meActive : meSvg} />
        <span>Me</span>
      </div>
    </nav>
  )
}

export default TabBar