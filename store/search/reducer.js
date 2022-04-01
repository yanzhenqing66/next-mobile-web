import { SET_SEARCH_LIST, DEL_SEARCH_LIST } from './constant'
import storageUtil from '@/utils/storageUtil'

const initListState = {
  scrollTop: 0,    //列表滑动位置
  listData: [],    //列表数据
  pageIndex: 1,         //当前分页页码
  itemIndex: -1,    //点击的条目index
  activeTab: 0
}

const store = storageUtil.getStore('searchList') || initListState

const goodsReducer = (state = store, action) => {
  const { type, data } = action
  switch (type) {
    case SET_SEARCH_LIST:
      storageUtil.setStore('searchList', data)
      return { ...data }
    case DEL_SEARCH_LIST:
      storageUtil.removeStore('searchList')
      return initListState
    default: return state
  }
}

export default goodsReducer