import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import mainReducer from "./reducers/main"

const store = createStore(mainReducer, applyMiddleware(thunk))

//为store配置热更新
if (module.hot) {
  module.hot.accept("./reducers/main", () => {
    const nextRootReducer = require("./reducers/main").default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
