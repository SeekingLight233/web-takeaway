import React from "react"

import { connect } from "react-redux"
import { addTodo } from "../actions/tabAction"

class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  click() {
    //分发action
    this.props.dispatch(
      addTodo({
        num: 10,
      })
    )
  }
  render() {
    let num = this.props.num
    return <div onClick={() => this.click()}>{num}</div>
  }
}
//通过connect将store绑定到当前组件的属性上
//这样 就不用手动订阅了
export default connect((state) => ({
  //注入属性
  num: state.tabReducer.num,
}))(Main)
