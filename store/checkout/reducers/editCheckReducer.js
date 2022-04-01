import { EDIT_ADDRESS_ID, EDIT_SHOP_NOTE, CLEAR_INFO } from '../constant'
import storageUtil from '@/utils/storageUtil'
// notes: [{shopId: '', note: ''}]

const initState = {
  addressId: '',
  notes: []
}

const store = storageUtil.getStore('edit_check_info') || initState

const editCheckReducer = (state = store, action) => {
  const { type, data } = action
  if (type === EDIT_ADDRESS_ID) {
    storageUtil.setStore('edit_check_info', { ...state, addressId: data })
    return { ...state, addressId: data }
  } else if (type === EDIT_SHOP_NOTE) {
    const list = JSON.parse(JSON.stringify(state))
    if(list?.notes.find(item => item.shopId == data?.shopId)) {
      list?.notes?.map(item => {
        if (item?.shopId === data?.shopId) {
          item.note = data.note
        }
      })
    }else {
      list.notes.push(data)
    }
    storageUtil.setStore('edit_check_info', { ...list })
    return { ...list }
  } else if (type === CLEAR_INFO) {
    storageUtil.removeStore('edit_check_info')
    return {addressId: '', notes: []}
  } else {
    return state
  }
}

export default editCheckReducer