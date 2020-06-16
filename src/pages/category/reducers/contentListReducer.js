import { GET_LIST_DATA } from "../actions/actionTypes";

const initState = {
  items: [],
};
const getListData = (state, action) => {
  console.log(action);
  if (action.currentPage === 0) {
    return { ...state, items: action.obj.data.poilist };
  } else {
    let items = state.items;

    return { ...state, items: items.concat(action.obj.data.poilist) };
  }
};

const contentListReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LIST_DATA:
      return getListData(state, action);
    default:
      return state;
  }
};
export default contentListReducer;
