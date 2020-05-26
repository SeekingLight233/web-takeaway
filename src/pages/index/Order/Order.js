import React from "react"
import "./Order.scss"
import { connect } from "react-redux"
import { getOrderData } from "../actions/orderAction"
import ScrollView from "component/ScrollView/ScrollView"
import Listitem from "./ListItem/Listitem"
/**
 * @description Order页面
 */
class Order extends React.Component {
  constructor(props) {
    super(props)
    this.page = 0
    this.fetchData(this.page)
    //是否触底
    this.state = {
      isend: false,
    }
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
  loadPage = () => {
    this.page++
    if (this.page > 3) {
      this.setState({
        isend: true,
      })
    } else {
      this.fetchData(this.page)
    }
  }
  render() {
    return (
      <div className="order">
        <div className="header">订单</div>
        <ScrollView loadCallback={this.loadPage} isend={this.state.isend}>
          <div className="order-list">{this.renderList()}</div>
        </ScrollView>
      </div>
    )
  }
}

export default connect((state) => ({
  list: state.orderReducer.list,
}))(Order)
