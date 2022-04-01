import { DEL_GOODS_LIST, SET_GOODS_LIST } from './constant'

export const delGoods = () => ({type: DEL_GOODS_LIST})

export const saveGoods = (data) => ({type: SET_GOODS_LIST, data})
