import {
  GET_LIST_DATA,
  LEFT_CLICK,
  ADD_SELECTI_ITEM,
  MINUS_SELECTI_ITEM,
  SHOW_CHOOSE_CONTENT,
  CLEAR_CAR,
} from "../actions/actionTypes";

const initState = {
  listData: {},
  currentLeftIndex: 0, //当前点的是哪一个
  showChooseContent: false, //默认隐藏掉
};

const itemClick = (state, action) => {
  return { ...state, currentLeftIndex: action.obj.currentLeftIndex };
};
const getListData = (state, action) => {
  return { ...state, listData: action.obj.data };
};

const addSelectItem = (state, action) => {
  return {
    ...state,
    listData: dealWithSelectItem(state, action, ADD_SELECTI_ITEM),
  };
};
const minusSelectItem = (state, action) => {
  return {
    ...state,
    listData: dealWithSelectItem(state, action, MINUS_SELECTI_ITEM),
  };
};
const chooseContent = (state, action) => {
  return { ...state, showChooseContent: action.obj.flag };
};

/**
 * @description 利用传过来的index取出store中对应的item上的数据，以便进行购物车的逻辑
 */
const dealWithSelectItem = (state, action, type) => {
  //取出这家店的所以菜品数据
  let listData = state.listData;
  let list = listData.food_spu_tags || [];

  // 因为currentLeftIndex这个值在用户点击其他栏目时会动态变化
  // 如果用户从购物车里操作增减，就用outIndex进行当前菜品的定位

  let currentItem =
    list[
      action.obj.outIndex === undefined
        ? state.currentLeftIndex
        : action.obj.outIndex
    ];

  // 对当前点击这个item的chooseCount加一或减一
  if (type === ADD_SELECTI_ITEM) {
    currentItem.spus[action.obj.index].chooseCount++;
  } else {
    currentItem.spus[action.obj.index].chooseCount--;
  }
  //重新深拷贝刚才操作的listData
  let _listData = JSON.parse(JSON.stringify(listData));

  return _listData;
};
/**
 * @description 将chooseCount全部置为0
 */
const clearCar = (state) => {
  let listData = state.listData;
  // 找到外层，左边list列表
  let list = listData.food_spu_tags || [];

  for (let i = 0; i < list.length; i++) {
    let spus = list[i].spus || [];
    for (let j = 0; j < spus.length; j++) {
      spus[j].chooseCount = 0;
    }
  }
  return { ...state, listData: JSON.parse(JSON.stringify(listData)) };
};

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LIST_DATA:
      return getListData(state, action);
    case LEFT_CLICK:
      return itemClick(state, action);
    case ADD_SELECTI_ITEM:
      return addSelectItem(state, action);
    case MINUS_SELECTI_ITEM:
      return minusSelectItem(state, action);
    case SHOW_CHOOSE_CONTENT:
      return chooseContent(state, action);
    case CLEAR_CAR:
      return clearCar(state, action);
    default:
      return state;
  }
};

export default menuReducer;
