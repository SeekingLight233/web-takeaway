import React from "react"
import "./Order.scss"
import { connect } from "react-redux"
import { getOrderData } from "../actions/orderAction"
import Listitem from "./ListItem/Listitem"
/**
 * @description Order页面
 */
class Order extends React.Component {
  constructor(props) {
    super(props)
    //像这种异步的操作尽量放到构造器中执行
    this.page = 0
    this.fetchData(this.page)
  }
  fetchData(page) {
    this.props.dispatch(getOrderData(page))
  }
  renderList() {
    let { list } = this.props
    return list.map((item, index) => {
      return <Listitem itemData={item} key={index}></Listitem>
    })
  }
  render() {
    return (
      <div className="order">
        <div className="header">订单</div>
        <div className="order-list">{this.renderList()}</div>
      </div>
    )
  }
}

export default connect((state) => ({
  list: state.orderReducer.list,
}))(Order)
