import { useRef } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Toast } from 'antd-mobile'
import { uploadFile } from 'js-file-operation'
import { LeftOutline, PictureOutline } from 'antd-mobile-icons'
import { anth_login_dispatch } from '@/store/user/actions/auth'
import TopHead from '@/components/common/topHead'
import { uptBackgroundPic } from '@/api/me'
import profileCover from '@/public/images/me/profileCover.svg'
import style from './cover.module.scss'

function Cover({ backgroundPicture, userId }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const bgcImgRef = useRef()

  const uplaodPic = () => {
    bgcImgRef.current.dispatchEvent(new MouseEvent('click'))
  }

  const getFileData = (e) => {
    const file = e.target.files[0]
    uploadFile(file, ['png', 'jpg', 'jpeg', 'gif', 'svg'])
      .then(async (file) => {
        const formdata = new FormData()
        formdata.append('picture', file)
        const res = await uptBackgroundPic(formdata)
        if (res.code === 200) {
          dispatch(anth_login_dispatch())
          Toast.show({
            content: 'uploaded successfully'
          })
        }
      })
      .catch((err) => {
        Toast.show({
          content: err
        })
      })
  }

  const url = (
    backgroundPicture ? backgroundPicture : profileCover
  )

  return (
    <div
      className={style.cover}
      style={{ backgroundImage: `url(${url})` }}
    >
      <div className={style.top}>
        <TopHead
          left={<LeftOutline fontSize={24} color="#f1f1f1" onClick={() => router.back()} />}
        />
      </div>
      {
        userId ? null : <PictureOutline className={style.change_pic} onClick={uplaodPic} />
      }
      <input
        type="file"
        style={{ display: 'none' }}
        ref={bgcImgRef}
        onClick={(e) => (e.target.value = '')}
        onChange={getFileData}
      />
    </div>
  )
}

export default Cover