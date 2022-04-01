import {authLogin} from '@/api/auth'
import {AUTH_LOGIN, CANCEL_LOGIN} from '../constant'

export const auth_login = data => ({type: AUTH_LOGIN, data})
export const cancel_login = () => ({type : CANCEL_LOGIN})

export const anth_login_dispatch = () => {
  return async dispatch => {
    const res = await authLogin()
    if(res.code === 200) {
      dispatch(auth_login(res.data))
    }
  }
}

export const cancel_login_dispatch = () => {
  return async dispatch => {
    dispatch(cancel_login)
  }
}