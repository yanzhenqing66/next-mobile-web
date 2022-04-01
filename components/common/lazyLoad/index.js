import React, { useEffect } from 'react'
import { Image } from 'antd-mobile'
import error from '@/assets/images/error.svg'
import css from './lazyLoad.module.scss'

const loadLogo = (
  <img src={error} alt="null" />
)

const LazyLoad = props => {
  const { src, width, height, style, alt, onClick, lazy, fit, className } = props

  useEffect(() => {
    document.ondragstart = function () {
      return false
    }
  }, [])

  return (
    <Image
      src={src}
      alt={alt}
      placeholder={loadLogo}
      fallback={loadLogo}
      style={{
        ...style,
        '--width': width,
        '--height': height
      }}
      className={`${css.lazyWrap} ${className}`}
      onClick={onClick}
      lazy={lazy}
      fit={fit}
    />
  )
}

LazyLoad.defaultProps = {
  alt: 'null',
  fit: 'cover',
}

export default LazyLoad
