import {GET_CHECKOUT_INFO, DEL_CHECKOUT_INFO} from '../constant'
import storageUtil from '@/utils/storageUtil'

const store = storageUtil.getStore('check_info') || {}
function checkoutReducer(state=store, action) {
  const {type, data} = action
  if(type === GET_CHECKOUT_INFO) {
    storageUtil.setStore('check_info', {...state, ...data})
    return {...state, ...data}
  }else if (type === DEL_CHECKOUT_INFO) {
    storageUtil.removeStore('check_info')
    return {}
  }else {
    return state
  }
}

export default checkoutReducer
