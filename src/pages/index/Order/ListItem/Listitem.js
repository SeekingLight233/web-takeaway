import "./ListItem.scss"
import React from "react"
import { connect } from "react-redux"
/**
 * @description  订单列表单个组件
 */
class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  /**
   * @description 渲染具体的菜品
   * @param {*} data
   */
  renderProduct(data) {
    let list = data.product_list
    list.push({ type: "more" })
    return list.map((item, index) => {
      if (item.type === "more") {
        return (
          <div className="product-item" key={index}>
            <span>...</span>
            <div className="p-total-count">
              总计{data.product_count}个菜，实付
              <span className="total-price">￥{data.total}</span>
            </div>
          </div>
        )
      }
      return (
        <div className="product-item" key={index}>
          {item.product_name}
          <div className="p-count">x{item.product_count}</div>
        </div>
      )
    })
  }

  /**
   * @description 是否渲染评价按钮
   */
  renderComment(data) {
    let evaluation = !data.is_comment
    if (evaluation) {
      return (
        <div className="evaluation clearfix">
          <div className="evaluation-btn">评价</div>
        </div>
      )
    }
    return null
  }

  render() {
    let data = this.props.itemData
    return (
      <div className="order-item">
        <div className="order-item-inner">
          <img className="item-img" src={data.poi_pic}></img>
          <div className="item-right">
            <div className="item-top">
              <p className="order-name one-line">{data.poi_name}</p>
              <div className="arrow"></div>
              <div className="order-state">{data.status_description}</div>
            </div>
            <div className="item-bottom">{this.renderProduct(data)}</div>
          </div>
        </div>
        {this.renderComment(data)}
      </div>
    )
  }
}
export default connect((state) => ({
  //   list: state.contentListReducer.items,
}))(ListItem)
