import React from 'react'
import { Loading3QuartersOutlined } from '@ant-design/icons'
// import { SpinLoading } from 'antd-mobile'
import style from './loading.module.scss'

function Loading({position}) {
  return (
    <div className={style.loading}>
       {/* <SpinLoading color='primary' /> */}
      <Loading3QuartersOutlined spin className={style.load} />
      <style jsx>{`
        div {
          position: ${position};
        }
      `}</style>
    </div>
  )
}

Loading.defaultProps = {
  position: 'absolute'
}

export default Loading