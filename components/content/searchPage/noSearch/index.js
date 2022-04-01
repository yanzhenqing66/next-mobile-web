import React from 'react'
import {useRouter} from 'next/router'
import {Button} from 'antd-mobile'
import noInfo from '@/assets/images/noInfo.svg'
import style from './noSearch.module.scss'

function NoSearch () {
  const router = useRouter()
  return (
    <div className={style.noSearch}>
      <img src={noInfo} />
      <p>We couldn't find any results</p>
      <Button 
        fill='outline' 
        shape='rounded' 
        className={style.goHome} 
        onClick={() => router.push('/')}
      >Go Home</Button>
    </div>
  )
}

export default NoSearch