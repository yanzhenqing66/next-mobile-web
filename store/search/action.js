import { DEL_SEARCH_LIST, SET_SEARCH_LIST } from './constant'

export const delGoods = () => ({type: DEL_SEARCH_LIST})

export const saveGoods = (data) => ({type: SET_SEARCH_LIST, data})