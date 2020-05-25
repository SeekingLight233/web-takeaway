import "./ListItem.scss"
import React from "react"
import { connect } from "react-redux"
// import { getListData } from "../../actions/contentListAction"
/**
 * @description  列表单个组件
 */
class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="item-content">
        <img className="item-img"></img>
        <div className="brand">品牌</div>
        <div className="item-info-content">
          <p className="item-title">商家名称</p>
          <div className="item-desc">
            <div className="item-score">xxx</div>
            <div className="item-count">xx</div>
            <div className="item-distance">xx</div>
            <div className="item-time">xx</div>
          </div>
          <div className="item-price">
            <div className="item-pre-price"></div>
          </div>
          <div className="item-others">
            <div className="other-info">
              <img src="" className="other-tag"></img>
              <div src="" className="other-content"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect((state) => ({
  //   list: state.contentListReducer.items,
}))(ListItem)
