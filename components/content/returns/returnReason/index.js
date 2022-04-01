import { useState, memo, useEffect } from 'react'
import { TextArea, ImageUploader } from 'antd-mobile'
import { uploadRefundPic } from '@/api/returns'
import SvgIcon from '@/components/common/svgIcon'
import rem from '@/utils/rem'
import style from './returnReason.module.scss'

function ReturnReason({ getReason, getPhote }) {
  const [reason, setReason] = useState('')
  const [fileList, setFileList] = useState([])

  const uploadFile = async (file) => {
    const formdata = new FormData()
    formdata.append('resource', file)
    const { data } = await uploadRefundPic(formdata)
    return {
      url: data
    }
  }

  const reasonChange = (e) => {
    setReason(e)
    setTimeout(() => {
      getReason(e)
    }, 500)
  }

  useEffect(() => {
    getPhote(fileList)
  }, [fileList])

  return (
    <div className={style.return_reason}>
      <p className={style.return_reason_title}>Write reasons for return/refund</p>
      <TextArea
        placeholder='Why do you want to return the item?'
        rows={5}
        style={{
          '--font-size': rem(12)
        }}
        value={reason}
        onChange={reasonChange}
      />
      <ImageUploader
        value={fileList}
        onChange={setFileList}
        upload={uploadFile}
        maxCount={6}
        children={
          <div className={style.return_reason_addPic}>
            <SvgIcon src='/images/order/addPic.svg' />
            <p>Add a photo</p>
          </div>
        }
        style={{ '--cell-size': rem(80) }}
      />
    </div>
  )
}

export default memo(ReturnReason)