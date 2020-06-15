import { CHANGE_TAB, GET_FILTER_DATA, CHANGE_FILTER } from "./actionTypes"
import axios from "axios"

export const changeTab = (obj) => (dispatch) => {
  dispatch({
    type: CHANGE_TAB,
    obj,
  })
}

export const getFilterData = (obj) => async (dispatch) => {
  let resp = await axios({
    method: 'get',
    url: '/json/filter.json',
  })
  //将数据结果dispatch出去
  dispatch({
    type: GET_FILTER_DATA,
    obj: resp.data
  })
}
//更改tab栏上显示的当前筛选字段
export const changeFilter = (obj) => async (dispatch) => {
  //将数据结果dispatch出去
  dispatch({
    type: CHANGE_FILTER,
    obj
  })

  //改变完过滤器之后将面板关闭
  dispatch({
    type: CHANGE_TAB,
    obj: {
      closePanel: true
    }
  })
}
