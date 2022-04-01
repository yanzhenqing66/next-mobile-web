import produce from 'immer'
import { DEL_GOODS_LIST, SET_GOODS_LIST, SET_GOODS_INFO } from './constant'

const initListState = {
  scrollTop: 0,    //列表滑动位置
  listData: [],    //列表数据
  pageIndex: 1,    //当前分页页码
  itemIndex: -1,   //点击的条目index
  activeTab: 0
}

const goodsReducer = (state = initListState, action) =>
  produce(state, draft => {
    const { type, data } = action
    switch (type) {
      case SET_GOODS_LIST:
        draft.listData.push(...data)
        break
      case SET_GOODS_INFO:
        draft.scrollTop = data.scrollTop
        draft.pageIndex = data.pageIndex
        draft.itemIndex = data.itemIndex
        draft.activeTab = data.activeTab
        break
      case DEL_GOODS_LIST:
        return initListState
      default:
        break
    }
  })

export default goodsReducer