import tabReducer from "./tabReducer"
import categoryReducer from "./categoryReducer"
import contentListReducer from "./contentListReducer"
import orderReducer from "./orderReducer"

import { combineReducers } from "redux"
//将reducers打包传给store
const reducers = combineReducers({
  tabReducer,
  categoryReducer,
  contentListReducer,
  orderReducer,
})

export default reducers
