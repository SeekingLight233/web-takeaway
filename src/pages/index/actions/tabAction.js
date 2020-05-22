/**
 * @description 创建并返回action
 */
import { ADD_TODO, CHANGE_TAB } from "./actionTypes"

export const addTodo = (obj) => {
  return {
    type: ADD_TODO,
    obj: obj, //给action的参数
  }
}
export const changeTab = (obj) => {
  return {
    type: CHANGE_TAB,
    obj: obj,
  }
}
