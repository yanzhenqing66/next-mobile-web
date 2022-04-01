import { useState } from 'react'
import dynamic from 'next/dynamic'
import { FacebookFilled, TwitterOutlined } from '@ant-design/icons'
const Modal = dynamic(import('../modal'), { ssr: false })
import IconFont from '../IconFont'
import SvgIcon from '../svgIcon'
import style from './share.module.scss'

function Share({ url }) {
  const [shareVis, setShareVis] = useState(false)

  const openShare = (e) => {
    e.stopPropagation()
    setShareVis(true)
  }

  const close = () => {
    setShareVis(false)
  }

  const shareFacebook = () => {
    window.open(`http://www.facebook.com/sharer.php?kid_directed_site=0&u=${`https://www.poppyapps.com${url}`}`, `_blank`, `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`)
  }

  const shareTwitter = () => {
    window.open(`https://twitter.com/share?url=${`https://www.poppyapps.com${url}`}`, `_blank`, `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`)
  }

  const sharePin = () => {
    window.open(`https://www.pinterest.com/pin/create/button/?url=${`https://www.poppyapps.com${url}`}`, `_blank`, `width=750, height=800, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`)
  }

  return (
    <div
      className={style.share}
    >
      <SvgIcon src='/images/common/share.svg' onClick={openShare} className={style.pic} />
      <Modal visible={shareVis} onClose={close} bodyStyles={{ height: 300 }}>
        <div className={style.shareList}>
          <FacebookFilled className={style.shareFacebook} onClick={shareFacebook} />
          <TwitterOutlined className={style.shareTwitter} onClick={shareTwitter} />
          <IconFont className={style.pinterest} onClick={sharePin} type="icon-pinterest" />
        </div>
      </Modal>
    </div>
  )
}

export default Share