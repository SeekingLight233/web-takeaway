import "./ContentList.scss"
import React from "react"
import { connect } from "react-redux"
import { getListData } from "../../actions/contentListAction"

import ListItem from "./ListItem/ListItem"
/**
 * @description  附近商家
 */
class ContentList extends React.Component {
  constructor(props) {
    super(props)
    this.fetchData()
  }
  fetchData() {
    this.props.dispatch(getListData())
  }

  renderItems() {
    console.log(this.props)
    let { list } = this.props
    return list.map((item, index) => {
      // 将每一个item上的数据通过组件传递进去
      return <ListItem key={index} itemData={item}></ListItem>
    })
  }

  render() {
    return (
      <div className="list-content">
        <h4 className="list-title">
          <span className="title-line"></span>
          <span>附近商家</span>
          <span className="title-line"></span>
        </h4>
        {this.renderItems()}
      </div>
    )
  }
}
export default connect((state) => ({
  list: state.contentListReducer.items,
}))(ContentList)
