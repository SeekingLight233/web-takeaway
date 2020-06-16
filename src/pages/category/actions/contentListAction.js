//修改从index页面拷贝过来的拉取数据的逻辑
import { GET_LIST_DATA } from "./actionTypes";
import axios from "axios";

/**
 * @param {Function} dispatch 分发操作
 * @param {Function} getState 可获取当前store中的数据
 */
export const getListData = (obj) => async (dispatch, getState) => {
  let url = "/json/list.json";
  //传递参数，更改过滤条件
  if (obj.filterData || getState().contentListReducer.filterData) {
    url = "/json/listparams.json";
  }

  let res = await axios({
    method: "get",
    url,
  });

  dispatch({
    type: GET_LIST_DATA,
    filterData: obj.filterData,
    toFirstPage: obj.toFirstPage,
    obj: res.data,
  });
};
