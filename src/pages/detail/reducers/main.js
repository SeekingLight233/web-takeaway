import tabReducer from "./tabReducer";
import menuReducer from "./menuReducer";
import commentReducer from "./commentReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  tabReducer,
  menuReducer,
  commentReducer,
});

export default reducers;
