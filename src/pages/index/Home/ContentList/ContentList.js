import "./ContentList.scss"
import React from "react"
import { connect } from "react-redux"
import { getListData } from "../../actions/contentListAction"
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
      return <div key={index}>{item.name}</div>
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
