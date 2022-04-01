import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { NavBar } from 'antd-mobile'
import LoginModal from '@/components/content/login'

function Login () {
  const router = useRouter()
  const [loginVisible, setLoginVisible] = useState(true)

  const onClose = useCallback(() => {
    // router.back()
    setLoginVisible(false)
  }, [])

  return (
    <>
      <NavBar onBack={() => router.back()} />
      <LoginModal loginVisible={loginVisible} onClose={onClose} />
    </>
  )
}

export default Login