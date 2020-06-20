import "./Menu.scss";

import React from "react";

import { connect } from "react-redux";

import { getListData, itemClick } from "../actions/menuAction";

import MenuItem from "./MenuItem/MenuItem";
// import ShopBar from './ShopBar/ShopBar';

/**
 * 点菜tab页面
 * @description <Menu />
 */

class Menu extends React.Component {
  constructor(props) {
    super(props);
    console.log("初始化构造器");

    //获取店铺菜单
    //tips:同步操作不要放到这里，会阻塞渲染
    this.props.dispatch(getListData());
  }
  renderRightList(array) {
    let _array = array || []; //类型保护，否则undefined.map会抛出异常
    return _array.map((item, index) => {
      if (!item.chooseCount) {
        //给数据项中添加一个属性,用来存储购物车中的数量
        //因为item已经在store上了，直接添加进去就不用往store同步这个属性，很巧妙
        item.chooseCount = 0;
      }
      return (
        <MenuItem key={index} data={item} _index={index}>
          {item.name}
        </MenuItem>
      );
    });
  }
  /**
   * 点击切换右边数据
   */
  itemClick(index) {
    this.props.dispatch(
      itemClick({
        currentLeftIndex: index,
      })
    );
  }
  /**
   * 渲染右边的列表
   */
  renderRight() {
    let index = this.props.currentLeftIndex;
    let array = this.props.listData.food_spu_tags || [];
    let currentItem = array[index]; //取出食物种类对应的索引

    if (currentItem) {
      //每个食物种类上会有个title eg:“今晚吃鸡”
      let title = (
        <p key={1} className="right-title">
          {currentItem.name}
        </p>
      );
      return [
        title, //手动在数组里写jsx不要忘了给key
        <div key={2} className="right-list">
          <div className="right-list-inner">
            {this.renderRightList(currentItem.spus)}
          </div>
        </div>,
      ];
    } else {
      return null;
    }
  }
  /**
   * 渲染左边的列表
   */
  renderLeft() {
    let list = this.props.listData.food_spu_tags || [];

    return list.map((item, index) => {
      let cls =
        this.props.currentLeftIndex === index
          ? "left-item active"
          : "left-item";
      return (
        <div
          key={index}
          className={cls}
          onClick={() => {
            this.itemClick(index);
          }}
        >
          <div className="item-text">
            {item.icon ? (
              <img className="item-icon" src={item.icon}></img>
            ) : null}
            {item.name}
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="menu-inner">
        <div className="left-bar">
          <div className="left-bar-inner">{this.renderLeft()}</div>
        </div>
        <div className="right-content">{this.renderRight()}</div>
      </div>
    );
  }
}

export default connect((state) => ({
  listData: state.menuReducer.listData,
  currentLeftIndex: state.menuReducer.currentLeftIndex,
}))(Menu);
