import { HEAD_DATA } from "../actions/actionTypes";

const initState = {
  items: [],
};
//将数据
const getCategory = (state, action) => {
  return { ...state, items: action.obj.data.primary_filter };
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case HEAD_DATA:
      return getCategory(state, action);
    default:
      return state;
  }
};
export default categoryReducer;
