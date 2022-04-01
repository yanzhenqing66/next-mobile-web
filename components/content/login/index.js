
function isBrowser() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}
function LoginModal(props) {
  const { loginVisible, onClose } = props
  const router = useRouter()
  const [googleShow] = useState(isBrowser() && isFacebookApp())
  const [isIos] = useState(isBrowser() && getSystem() === 'ios')
  const [googleLoad, setGoodleLoad] = useState(true)
  const [loading, setLoading] = useState(false)

  const resGoogle = (res) => {
    if (res.accessToken) {
      const params = {
        accessToken: res.accessToken,
        linkType: 'GOOGLE',
      }
      LoginAuth(params)
    } else {
      Toast.show({
        content: 'Authorization login failed, please try again !!!',
        position: 'bottom'
      })
    }
  }

  const responseFacebook = (res) => {
    if (res.accessToken) {
      const params = {
        accessToken: res.accessToken,
        linkType: 'FACEBOOK',
      }
      LoginAuth(params)
    } else {
      Toast.show({
        content: 'Authorization login failed, please try again !!!',
        position: 'bottom'
      })
    }
  }

  const LoginAuth = async (params) => {
    props.del_token()
    setLoading(true)
    loginAuth(params).then(res => {
      setLoading(false)
      if (res.code === 200) {
        props.auth_login(res.data.user)
        props.auth_token(res.data.token)
        pinTrack('CompleteRegistration', {
          value: 0.01,
          currency: 'USD'
        })
        const redirect = storeUtils.getStore('redirect')
        const checkOpt = storeUtils.getStore('checkOpt')
        if (redirect && checkOpt) {
          router.push('/cart/checkout')
        } else if (redirect) {
          router.replace(redirect)
        } else {
          router.reload()
        }
        storeUtils.removeStore('redirect')
        onClose()
      } else {
        Toast.show({
          content: 'Authorization login failed, please try again !!!',
          position: 'bottom'
        })
      }
    })
  }

  const googleFinishLoad = () => {
    setGoodleLoad(false)
  }

  return (
    <Modal
      visible={loginVisible}
      onClose={onClose}
    >
      {
        loading ? <Loading /> : (
          <div className={style.wrap}>
            <CloseOutline fontSize={22} onClick={onClose} />
            <section className={style.join}>
              <LazyLoad
                src="https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/brand.svg"
                width={rem(78)}
                height={rem(78)}
                style={{ display: 'inline-block' }}
              />
              <h3>Poppy shopping</h3>
              <h5 className={style.tips}>Your shopping discovery starts here</h5>
              <ul className={style.loginOpt}>
                <li>
                  <GoogleLogin
                    resGoogle={resGoogle}
                    onAutoLoadFinished={googleFinishLoad}
                  >
                    {
                      googleLoad ? <Loading /> : (
                        <p className={style.child}>
                          <IconFont type='icon-google' style={{ fontSize: 22 }} />
                          <span>Continue with Google</span>
                        </p>
                      )
                    }
                  </GoogleLogin>
                  <style jsx>{`
                    li {
                      display: ${googleShow ? 'none' : ''}
                    }
                  `}</style>
                </li>
                {
                  isIos
                    ? (
                      <li>
                        <FacebookLogin
                          resFaceBook={responseFacebook}
                        >
                          <p className={style.child}>
                            <IconFont type='icon-Facebook' style={{ fontSize: 22, marginLeft: 8 }} />
                            <span>Continue with Facebook</span>
                          </p>
                        </FacebookLogin>
                      </li>

                    )
                    : (
                      <li>
                        <FaceBookBtn
                          appId='564066568077341'
                          // xfbml={true}
                          // cookie={true}
                          returnScopes={true}
                          callback={responseFacebook}
                          redirectUri={`https://www.poppyapps.com/login?redirect`}
                          render={renderProps => (
                            !renderProps.isSdkLoaded
                              ? <Loading />
                              : <p className={style.child} onClick={renderProps.onClick}>
                                <IconFont type='icon-Facebook' style={{ fontSize: 22, marginLeft: 8 }} />
                                <span>Continue with Facebook</span>
                              </p>
                          )}
                        />
                      </li>
                    )
                }
              </ul>
            </section>
            <Footer />
          </div>
        )
      }
    </Modal>
  )
}

import React, { useState, memo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CloseOutline } from 'antd-mobile-icons'
import { Toast } from 'antd-mobile'
import { loginAuth } from "@/api/login"
import Loading from '@/components/common/loading'
import LazyLoad from '@/components/common/lazyLoad'
import IconFont from '@/components/common/IconFont'
import { auth_login } from '@/store/user/actions/auth'
import { auth_token, del_token } from '@/store/user/actions/authToken'
import { pinTrack } from '@/utils/pixelTrack'
import storeUtils from '@/utils/storageUtil'
import FacebookLogin from './components/facebookLogin'
import GoogleLogin from './components/googleLogin'
import FaceBookBtn from 'react-facebook-login/dist/facebook-login-render-props'
const Modal = dynamic(import('@/components/common/modal'), { ssr: false })
const Footer = dynamic(import('./components/footer'))
import rem from '@/utils/rem'
import { isFacebookApp, getSystem } from '@/hooks/useGetPlatForm'
import style from './login.module.scss'

LoginModal.propTypes = {
  onClose: PropTypes.func,
  getUserInfo: PropTypes.func
}

export default connect(
  state => ({ token: state.tokenReducer }),
  {
    auth_login,
    auth_token,
    del_token
  }
)(memo(LoginModal))
