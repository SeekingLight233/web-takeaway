import { TABKEY } from "../config"
import { CHANGE_TAB, GET_FILTER_DATA } from "../actions/actionTypes"
let tabs = {}
tabs[TABKEY.cate] = {
  key: TABKEY.cate,
  text: "全部分类",
  obj: {},
}
tabs[TABKEY.type] = {
  key: TABKEY.type,
  text: "综合排序",
  obj: {},
}
tabs[TABKEY.filter] = {
  key: TABKEY.filter,
  text: "筛选",
  obj: {},
}
// 初始化state
const initState = {
  tabs,
  activeKey: TABKEY.cate,
  filterData: {},
  closePanel: true
}

const changeTab = (state, action) => {
  return { ...state, activeKey: action.obj.activeKey, closePanel: action.obj.closePanel }
}

const getFilterData = (state, action) => {
  return { ...state, filterData: action.obj.data }
}

const headerReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return changeTab(state, action)
    case GET_FILTER_DATA:
      return getFilterData(state, action)
    default:
      return state
  }
}

export default headerReducer
