import {useRef} from 'react'
import { ImageViewer, Toast } from 'antd-mobile'
import { CameraOutline } from 'antd-mobile-icons'
import { useSelector, useDispatch } from 'react-redux'
import {uploadFile} from 'js-file-operation'
import { uptHeadPic } from '@/api/me'
import {anth_login_dispatch} from '@/store/user/actions/auth'
import style from './imgUpload.module.scss'

function ImgUpload() {
  const headRef  = useRef()
  const { headPicture } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const uptHead = () => {
    headRef.current.dispatchEvent(new MouseEvent('click'))
  }

  const getFileData = (e) => {
    const file = e.target.files[0]
    uploadFile(file, ['png', 'jpg', 'jpeg', 'gif', 'svg'])
      .then(async (file) => {
        const formdata = new FormData()
        formdata.append('picture', file)
        const res = await uptHeadPic(formdata)
        if(res.code === 200) {
          dispatch(anth_login_dispatch())
          Toast.show({
            content: 'Avatar uploaded successfully'
          })
        }
      })
      .catch((err) => {
        Toast.show({
          content: err
        })
      })
  }

  return (
    <div className={style.imgUpload}>
      <img
        src={headPicture}
        onClick={() => {
          ImageViewer.show({ image: headPicture })
        }}
      />

      <CameraOutline
        fontSize={25}
        className={style.uptHead}
        color="#fff"
        onClick={uptHead}
      />
      <input
        type="file"
        style={{display: 'none'}}
        ref={headRef}
        onClick={(e) => (e.target.value = '')}
        onChange={getFileData}
      />
    </div>
  )
}

export default ImgUpload