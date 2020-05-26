import { ADD_TODO, CHANGE_TAB } from "../actions/actionTypes"

import { TABKEY } from "../config"

const initState = {
  tabs: [
    {
      name: "首页",
      key: TABKEY.home, //key用来生产className
    },
    {
      name: "订单",
      key: TABKEY.order,
    },
    {
      name: "我的",
      key: TABKEY.my,
    },
  ],
  activeKey: TABKEY.my, //默认进入主页
}

const changeTab = (state, action) => {
  //取到activeKey
  let activeKey = action.obj.activeKey
  //这里并没有触犯不可变值的原则
  return { ...state, activeKey }
}

const tabReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return addTodo(state, action)
    case CHANGE_TAB:
      return changeTab(state, action)
    default:
      return state
  }
}

export default tabReducer
