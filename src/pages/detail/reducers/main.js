import tabReducer from "./tabReducer";
import menuReducer from "./menuReducer";
import commentReducer from "./commentReducer";
import restaurantReducer from "./restanurantReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  tabReducer,
  menuReducer,
  commentReducer,
  restaurantReducer,
});

export default reducers;
