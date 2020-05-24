import tabReducer from "./tabReducer";
import categoryReducer from "./categoryReducer";
import { combineReducers } from "redux";
//将reducers打包传给store
const reducers = combineReducers({
  tabReducer,
  categoryReducer,
});

export default reducers;
