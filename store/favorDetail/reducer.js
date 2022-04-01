import {GET_FAVOR_DETAIL, REMOVE_FAVOR_DETAIL, GET_DEL_LIST} from './constant'

const favorDetailReducer = (state=[], action) => {
  const {type, data} = action
  if(type === GET_FAVOR_DETAIL) {
    return [...state, ...data]
  }else if (type === GET_DEL_LIST) {
    return [...data]
  }else if (type === REMOVE_FAVOR_DETAIL) {
    return []
  } else {
    return state
  }
}

export default favorDetailReducer