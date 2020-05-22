import tabReducer from "./tabReducer"
import { combineReducers } from "redux"
//将reducers打包传给store
const reducers = combineReducers({
  tabReducer,
})

export default reducers
