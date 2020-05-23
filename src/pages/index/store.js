import { createStore } from "redux";
import mainReducer from "./reducers/main";

const store = createStore(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//为store配置热更新
if (module.hot) {
  module.hot.accept("./reducers/main", () => {
    const nextRootReducer = require("./reducers/main").default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
