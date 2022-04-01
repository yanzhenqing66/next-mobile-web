import {AUTH_TOKEN, DEL_TOKEN} from '../constant'
import storageUtil from '@/utils/storageUtil'

const initState = storageUtil.getItem('poppy_token') || ''

const tokenReducer = (state=initState, action) => {
  const {type, data} = action
  switch(type) {
    case AUTH_TOKEN:
      storageUtil.setItem('poppy_token', data)
      return data
    case DEL_TOKEN: 
      storageUtil.removeItem('poppy_token')
      return ''
    default: return state
  }
}

export default tokenReducer