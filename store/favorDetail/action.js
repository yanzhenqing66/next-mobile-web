import { GET_FAVOR_DETAIL, REMOVE_FAVOR_DETAIL, GET_DEL_LIST } from './constant'
import { getFavorDetail } from '@/api/wishList'

export const getFavorList = data => ({type: GET_FAVOR_DETAIL, data})

export const getDelList =  data => ({type: GET_DEL_LIST, data})

export const removeFavorDatail = () => ({type: REMOVE_FAVOR_DETAIL})

export const getFavorDetails = params => {
  return dispatch => {
    return getFavorDetail(params).then(res => {
      if (res.code === 200) {
        const data = res.data.contents
        data.map(item => {
          item.followBool = true
        })
        dispatch(getFavorList(data))
        return res
      }else if (res.code === 1040) {
        return '2'
      }else {
        return '3'
      }
    })
  }
}
