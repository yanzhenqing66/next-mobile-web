import {AUTH_LOGIN, CANCEL_LOGIN} from '../constant'


const initState = {
  addTime: '',
  authUserType: '',
  city: '',
  country: '',
  deviceId: '',
  email: '',
  headPicture: '',
  id: null,
  lastLoginTime: '',
  name: '',
  role: '',
  sex: '',
  nickName: ''
}
const userReducer = (state=initState, action) => {
  const {type, data} = action
  if(type === AUTH_LOGIN) {
    return Object.assign({}, {...state}, {...data})
  }else if (type === CANCEL_LOGIN) {
    return initState
  }else {
    return state
  }
}

export default userReducer