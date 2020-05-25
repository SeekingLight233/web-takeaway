import { LIST_DATA } from "../actions/actionTypes"

const initState = {
  items: [],
}
const getListData = (state, action) => {
  return { ...state, items: action.obj.data.poilist }
}

const contentListReducer = (state = initState, action) => {
  switch (action.type) {
    case LIST_DATA:
      return getListData(state, action)
    default:
      return state
  }
}
export default contentListReducer
