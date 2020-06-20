import tabReducer from "./tabReducer";
import menuReducer from "./menuReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  tabReducer,
  menuReducer,
});

export default reducers;
