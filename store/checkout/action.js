import {
  GET_CHECKOUT_INFO,
  DEL_CHECKOUT_INFO,
  EDIT_ADDRESS_ID,
  EDIT_SHOP_NOTE,
  CLEAR_INFO
} from './constant'
import { getCheckoutApi, buyNowApi } from '@/api/cart'
import storageUtil from '@/utils/storageUtil'

export const get_check_info = data => ({ type: GET_CHECKOUT_INFO, data })
export const del_check_info = () => ({ type: DEL_CHECKOUT_INFO })

export const get_checkInfo_async = (id) => {
  return dispatch => {
    const checkOpt = storageUtil.getStore('checkOpt')
    if (checkOpt) {
      const parmas = {
        addressId: id,
        ...checkOpt
      }
      buyNowApi(parmas).then(res => {
        dispatch(get_check_info(res.data))
      })
    } else {
      const url = id ? `order/preSubmitOrder?addressId=${id}` : `order/preSubmitOrder`
      getCheckoutApi(url).then(res => {
        dispatch(get_check_info(res.data))
      })
    }
  }
}

export const edit_address_id = data => ({ type: EDIT_ADDRESS_ID, data })
export const edit_shop_note = data => ({ type: EDIT_SHOP_NOTE, data })
export const clear_info = () => ({ type: CLEAR_INFO })