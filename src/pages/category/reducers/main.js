import tabReducer from "./tabReducer";
import { combineReducers } from "redux";
import contentListReducer from "./contentListReducer";
import headerReducer from "./headerReducer";

const reducers = combineReducers({
  headerReducer,
  contentListReducer,
});

export default reducers;
