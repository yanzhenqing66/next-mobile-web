import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { NavBar, Toast } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import Head from "@/components/common/head"
const ImgUpload = dynamic(import('@/components/content/profile/imgUpload'))
const EditInfo = dynamic(import('@/components/content/profile/editInfo'))
import { updateUser } from '@/api/me'
import { anth_login_dispatch } from '@/store/user/actions/auth'
import { formatBirth } from '@/utils/formatDate'

const formatSet = (sex) => {
  if (!sex) return 0
  const sexList = ['Not specified', 'Male', 'Female', 'Other']
  return sexList.indexOf(sex[0])
}

const getBirth = (birth) => {
  if (!birth) return null
  return formatBirth(birth)
}

function EditProfile() {
  const router = useRouter()
  const dispatch = useDispatch()

  const onFinish = (e) => {
    Toast.show({
      icon: 'loading',
      content: 'loading...',
    })
    const sex = formatSet(e.sex)
    const birthday = getBirth(e.birthday)

    const params = {
      nickName: e.nickName,
      sex,
      birthday,
      location: e.location ? e.location : ''
    }
    updataProfile(params)
  }

  const updataProfile = async (params) => {
    try {
      const res = await updateUser(params)
      if (res.code === 200) {
        dispatch(anth_login_dispatch())
        Toast.show({
          icon: 'success',
          content: 'Saved successfully',
        })
      }
    } catch (error) {
      Toast.show({
        icon: 'fail',
        content: 'Failed to modify personal information. Please try again!',
      })
    }
  }

  const goBack = () => {
    router.back()
  }

  return (
    <>
      <Head />
      <NavBar onBack={goBack}>Edit Profile</NavBar>
      <ImgUpload />
      <EditInfo onFinish={onFinish} />
    </>
  )
}

export default EditProfile