import "./MenuItem.scss";

import React from "react";

import { connect } from "react-redux";

import { addSelectItem, minusSelectItem } from "../../actions/menuAction";
/**
 * 每个菜品的组件
 * @description <MenuItem />
 */
class MenuItem extends React.Component {
  /**
   * 添加菜品数量
   */
  addSelectItem() {
    this.props.dispatch(
      addSelectItem({
        index: this.props._index,
      })
    );
  }
  /**
   * 减少菜品数量
   */
  minusSelectItem() {
    this.props.dispatch(
      minusSelectItem({
        index: this.props._index,
      })
    );
  }
  render() {
    let item = this.props.data;
    return (
      <div className="menu-item">
        <img className="img" src={item.picture} />
        <div className="menu-item-right">
          <p className="item-title">{item.name}</p>
          <p className="item-desc two-line">{item.description}</p>
          <p className="item-zan">{item.praise_content}</p>
          <p className="item-price">
            ￥{item.min_price}
            <span className="unit">/{item.unit}</span>
          </p>
        </div>
        <div className="select-content">
          <div className="plus"></div>
        </div>
      </div>
    );
  }
}

export default connect()(MenuItem);
