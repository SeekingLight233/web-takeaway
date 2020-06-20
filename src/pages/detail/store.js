import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./reducers/main";

let createHistory = require("history").createHashHistory;
import { routerMiddleware } from "react-router-redux";
//创建hash路由
const history = createHistory();
//创建初始化tab
history.replace("menu");
//创建路由中间件
const historyMid = routerMiddleware(history);

const store = createStore(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, historyMid)
);

//为store配置热更新
if (module.hot) {
  module.hot.accept("./reducers/main", () => {
    const nextRootReducer = require("./reducers/main").default;
    store.replaceReducer(nextRootReducer);
  });
}

module.exports = {
  store,
  history,
};
