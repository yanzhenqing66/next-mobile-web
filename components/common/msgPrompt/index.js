import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './msgPrompt.module.scss'

function MsgPrompt({ leftrender, title, load, closeLoad }) {

  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    if (load) {
      setIsLoad(true)
    }
    setTimeout(() => {
      setIsLoad(false)
      closeLoad()
    }, 1500)
  }, [load])

  return (
    <div className={style.msgPrompt} style={{ display: isLoad ? '' : 'none' }}>
      <section className={style.imgTip}>
        {leftrender}
      </section>
      <section className={style.title}>
        {title}
      </section>
    </div>
  )
}

MsgPrompt.proptypes = {
  load: PropTypes.bool
}

export default MsgPrompt