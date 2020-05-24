import "./Category.scss";
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getHeaderData } from "../../actions/categoryAction";
/**
 * @description  外卖类别
 */
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }
  fetchData() {
    this.props.dispatch(getHeaderData());
  }

  renderItems() {
    let { items } = this.props;
    items = items.splice(0, 8);
    return items.map((item, index) => {
      return (
        <div key={index} className="category-item">
          <img className="item-icon" src={item.url}></img>
          <p className="item-name">{item.name}</p>
        </div>
      );
    });
  }

  render() {
    return (
      //内层元素用浮动别忘了在父元素上清除浮动
      <div className="category-content clearfix">{this.renderItems()}</div>
    );
  }
}
export default connect((state) => ({
  items: state.categoryReducer.items,
}))(Category);
