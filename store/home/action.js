import { DEL_GOODS_LIST, SET_GOODS_LIST, SET_GOODS_INFO } from './constant'

export const delGoods = () => ({type: DEL_GOODS_LIST})

export const saveGoodsList = (data) => ({type: SET_GOODS_LIST, data})

export const saveGoodsInfo = (data) => ({type: SET_GOODS_INFO, data})
