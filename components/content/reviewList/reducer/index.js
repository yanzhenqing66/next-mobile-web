import { List, Map } from 'immutable'

export const reviewsInitState = Map({
  data: List([]),
  hasMore: false,
  activeTab: '1',
  loading: false
})

export function reviewsReducer(state, action) {
  const { type, data } = action
  switch(type) {
    case 'set_data':
      return state.update('data', (val) => val.push(...data))

    case 'clear_data': 
      return state.update('data', val => val.clear())

    case 'hasMore': 
      return state.set('hasMore', data)

    case 'activeTab':
      return state.set('activeTab', data)

    case 'loading':
      return state.set('loading', data)

    default:
      return state
  }


}