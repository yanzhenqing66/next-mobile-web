import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk'
import { envFlag } from '@/utils/env'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user/reducers/user'
import tokenReducer from './user/reducers/authToken'
import goodsReducer from './home/reducer'
import searchReducer from './search/reducer'
import favorDetailReducer from './favorDetail/reducer'
import followReducer from './follow/reducer'
import checkoutReducer from './checkout/reducers/reducer'
import editCheckReducer from './checkout/reducers/editCheckReducer'

const reducers = combineReducers({
  user,
  tokenReducer,
  goodsReducer,
  favorDetailReducer,
  followReducer,
  checkoutReducer,
  editCheckReducer,
  searchReducer
})

const middleware = [thunk]

let composeEnhancers = compose

if (!envFlag) {
  composeEnhancers = composeWithDevTools
}

export default createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))