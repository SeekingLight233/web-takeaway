import React from "react";
import "./Header.scss";
import { connect } from "react-redux";
import { TABKEY } from "../config";
import {
  changeTab,
  getFilterData,
  changeFilter,
} from "../actions/headerAction";
import { getListData } from "../actions/contentListAction";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  fetchData() {
    this.props.dispatch(getFilterData());
  }
  /**
   * 重置其他item的active状态,将每一个Item上的active都设置为false
   */
  revertActive(key, dataList) {
    if (key === TABKEY.cate) {
      for (let i = 0; i < dataList.length; i++) {
        for (let j = 0; j < dataList[i].sub_category_list.length; j++) {
          dataList[i].sub_category_list[j].active = false;
        }
      }
    } else if (key === TABKEY.type) {
      for (let x = 0; x < dataList.length; x++) {
        dataList[x].active = false;
      }
    } else {
      for (let k = 0; k < dataList.length; k++) {
        for (let o = 0; o < dataList[k].items.length; o++) {
          dataList[k].items[o].active = false;
        }
      }
    }
  }
  /**
   * 更改顶部Item的状态，同时对数据进行过滤
   * 由于顶部的这些“状态”是从store中渲染过来的，因此要重新定义一个action来修改store中的状态
   */
  changeDoFilter(item, key, dataList) {
    this.revertActive(key, dataList); //重置active状态
    item.active = true; //在这个地方为item添加一个active的状态
    this.props.dispatch(
      changeFilter({
        item,
        key,
      })
    );

    //更新ContentList中的数据
    this.props.dispatch(
      getListData({
        filterData: item,
        toFirstPage: true, //回到初始位置
      })
    );
  }

  /**
   * @description 点击切换tab
   * @param {} key
   */
  changeTab(key) {
    let closePanel = false;
    //控制panel面板的显示与隐藏
    if (this.props.activeKey === key && !this.props.closePanel) {
      closePanel = true;
    }
    this.props.dispatch(
      changeTab({
        activeKey: key,
        closePanel,
      })
    );
  }
  /**
   * 渲染顶部tab栏
   */
  renderTabs() {
    let tabs = this.props.tabs;
    let array = [];
    for (let key in tabs) {
      let item = tabs[key];
      let cls = item.key + " item";
      if (item.key === this.props.activeKey && !this.props.closePanel) {
        cls += " current";
      }
      array.push(
        <div
          className={cls}
          key={item.key}
          onClick={() => {
            this.changeTab(item.key);
          }}
        >
          {item.text}
        </div>
      );
    }
    return array;
  }
  // 渲染内层全部分类数据
  renderCateInnerContent(items, cateList) {
    return items.sub_category_list.map((item, index) => {
      let cls = item.active ? "cate-box-inner active" : "cate-box-inner";
      return (
        <div
          onClick={() => this.changeDoFilter(item, TABKEY.cate, cateList)}
          className="cate-box"
          key={index}
        >
          <div className={cls}>
            {item.name}({item.quantity})
          </div>
        </div>
      );
    });
  }
  //渲染外层全部分类数据
  renderCateContent() {
    let cateList = this.props.filterData.category_filter_list || [];
    return cateList.map((item, index) => {
      return (
        <li key={"key" + index} className="cate-item">
          <p className="item-title">
            {item.name}
            <span className="item-count">{item.quantity}</span>
          </p>
          <div className="item-content clearfix">
            {this.renderCateInnerContent(item, cateList)}
          </div>
        </li>
      );
    });
  }

  //筛选栏目 > 每一组中的每个元素
  renderFilterInnerContent(items, filterList) {
    return items.map((item, index) => {
      let cls = item.icon ? "cate-box-inner has-icon" : "cate-box-inner";
      if (item.active) {
        cls += " active";
      }
      return (
        <div
          onClick={() => this.changeDoFilter(item, TABKEY.filter, filterList)}
          key={index}
          className="cate-box"
        >
          <div className={cls}>
            {item.icon ? <img src={item.icon} /> : null}
            {item.name}
          </div>
        </div>
      );
    });
  }

  //渲染“筛选”栏目下的每一组
  renderFilterContent() {
    let filterList = this.props.filterData.activity_filter_list || [];
    return filterList.map((item, index) => {
      return (
        <li key={index} className="filter-item">
          <p className="filter-title">{item.group_title}</p>
          <div className="item-content clearfix">
            {this.renderFilterInnerContent(item.items, filterList)}
          </div>
        </li>
      );
    });
  }

  // 渲染 销量最高、综合排序... 列表
  renderTypeContent() {
    let typeList = this.props.filterData.sort_type_list || [];
    return typeList.map((item, index) => {
      let cls = item.active ? "type-item active" : "type-item";

      return (
        <li
          onClick={() => this.changeDoFilter(item, TABKEY.type, typeList)}
          key={index}
          className={cls}
        >
          {item.name}
        </li>
      );
    });
  }
  /**
   * 渲染过滤面板
   */
  renderContent() {
    let { tabs, activeKey } = this.props;
    let array = [];
    for (let key in tabs) {
      let item = tabs[key];
      let cls = item.key + "-panel";
      if (item.key === activeKey) {
        cls += " current";
      }
      if (item.key === TABKEY.cate) {
        array.push(
          <ul key={item.key} className={cls}>
            {this.renderCateContent()}
          </ul>
        );
      } else if (item.key === TABKEY.type) {
        array.push(
          <ul key={item.key} className={cls}>
            {this.renderTypeContent()}
          </ul>
        );
      } else {
        array.push(
          <ul key={item.key} className={cls}>
            {this.renderFilterContent()}
          </ul>
        );
      }
    }
    return array;
  }
  render() {
    let cls = "panel";
    if (!this.props.closePanel) {
      cls += " show";
    } else {
      cls = "panel";
    }
    return (
      <div className="header">
        <div className="header-top">{this.renderTabs()}</div>
        <div className={cls}>
          <div className="panel-inner">{this.renderContent()}</div>
        </div>
      </div>
    );
  }
}
//通过connect将store绑定到当前组件的属性上
//这样 就不用手动订阅了
export default connect((state) => ({
  //注入属性
  tabs: state.headerReducer.tabs,
  activeKey: state.headerReducer.activeKey,
  filterData: state.headerReducer.filterData,
  closePanel: state.headerReducer.closePanel,
}))(Header);
