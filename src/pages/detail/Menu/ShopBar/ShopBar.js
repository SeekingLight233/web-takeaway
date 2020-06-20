import "./ShopBar.scss";

import React from "react";

import { connect } from "react-redux";

import {
  showChoose,
  addSelectItem,
  minusSelectItem,
  clearCar,
} from "../../actions/menuAction";

class ShopBar extends React.Component {
  /**
   * 计算总价
   * @description 主要靠每一个item中存在chooseCount这个字段进行实现
   */
  getTotalPrice() {
    //先把这家店中所有的数据取出来
    let listData = this.props.listData.food_spu_tags || [];
    let totalPrice = 0;
    let dotNum = 0;
    let chooseList = []; //当前选择的菜品

    for (let i = 0; i < listData.length; i++) {
      let spus = listData[i].spus || [];
      for (let j = 0; j < spus.length; j++) {
        let chooseCount = spus[j].chooseCount;
        if (chooseCount > 0) {
          dotNum += chooseCount;
          spus[j]._index = j;
          spus[j]._outIndex = i;
          chooseList.push(spus[j]);
          totalPrice += spus[j].min_price * chooseCount;
        }
      }
    }

    return {
      dotNum,
      totalPrice,
      chooseList,
    };
  }
  /**
   * 添加菜品数量
   */
  addSelectItem(item) {
    this.props.dispatch(
      addSelectItem({
        index: item._index,
        outIndex: item._outIndex,
      })
    );
  }
  /**
   * 减少菜品数量
   */
  minusSelectItem(item) {
    this.props.dispatch(
      minusSelectItem({
        index: item._index,
        outIndex: item._outIndex,
      })
    );
  }
  //渲染选中的项目
  renderChooseItem(data) {
    let array = data.chooseList || [];
    return array.map((item, index) => {
      return (
        <div key={index} className="choose-item">
          <div className="item-name">{item.name}</div>
          <div className="price">¥{item.min_price * item.chooseCount}</div>
          {/* 这里和之前的逻辑是一样的 */}
          <div className="select-content">
            <div
              onClick={() => this.minusSelectItem(item)}
              className="minus"
            ></div>
            <div className="count">{item.chooseCount}</div>
            <div
              onClick={() => this.addSelectItem(item)}
              className="plus"
            ></div>
          </div>
        </div>
      );
    });
  }
  /**
   *  打开或隐藏购物车已选择列表
   */
  openChooseContent() {
    let flag = this.props.showChooseContent;
    this.props.dispatch(
      showChoose({
        flag: !flag,
      })
    );
  }
  /**
   *  晴空购物车
   */
  clearCar() {
    this.props.dispatch(clearCar());
    this.props.dispatch(
      showChoose({
        flag: false,
      })
    );
  }
  render() {
    //类型保护
    let shipping_fee = this.props.listData.poi_info
      ? this.props.listData.poi_info.shipping_fee
      : 0;
    let data = this.getTotalPrice();
    return (
      <div className="shop-bar">
        {this.props.showChooseContent ? (
          <div className="choose-content">
            <div className="content-top">
              <div className="clear-car">清空购物车</div>
            </div>
            {this.renderChooseItem(data)}
          </div>
        ) : null}
        <div className="bottom-content">
          <div className="shop-icon" onClick={() => this.openChooseContent()}>
            {data.dotNum > 0 ? (
              <div className="dot-num">{data.dotNum}</div>
            ) : null}
          </div>
          <div className="price-content">
            <p className="total-price">￥{data.totalPrice}</p>
            <p className="other-price">另需配送 ￥{shipping_fee}</p>
          </div>
          <div className="submit-btn">去结算</div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  listData: state.menuReducer.listData,
  showChooseContent: state.menuReducer.showChooseContent,
}))(ShopBar);
