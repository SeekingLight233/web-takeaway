import React from "react"
import "./Header.scss"
import { connect } from "react-redux"
import { TABKEY } from "../config"
import { changeTab, getFilterData } from "../actions/headerAction"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.fetchData()
  }

  fetchData() {
    this.props.dispatch(
      getFilterData()
    )
  }
  /**
   * @description 点击切换tab
   * @param {} key 
   */
  changeTab(key) {
    this.props.dispatch(
      changeTab({
        activeKey: key,
      })
    )
  }
  /**
   * 渲染顶部tab栏
   */
  renderTabs() {
    let tabs = this.props.tabs
    let array = []
    for (let key in tabs) {
      let item = tabs[key]
      let cls = item.key + " item"
      if (item.key === this.props.activeKey) {
        cls += " current"
      }
      array.push(
        <div
          className={cls}
          key={item.key}
          onClick={() => {
            this.changeTab(item.key)
          }}
        >
          {item.text}
        </div>
      )
    }
    return array
  }

  renderCateInnerContent(items, cateList) {
    return items.sub_category_list.map((item, index) => {
      let cls = item.active ? 'cate-box-inner active' : 'cate-box-inner'
      return <div className="cate-box" key={index}>
        <div className={cls}>{item.name}({item.quantity})</div>
      </div>
    })
  }

  renderCateContent() {
    let cateList = this.props.filterData.category_filter_list || [];
    return cateList.map((item, index) => {
      return <li key={"key" + index} className="cate-item">
        <p className="item-title">{item.name}<span className="item-count">{item.quantity}</span></p>
        <div className="item-content">{this.renderCateInnerContent(item, cateList)}</div>
      </li>
    })
  }
  /**
   * 渲染过滤面板
   */
  renderContent() {
    let { tabs, activeKey } = this.props;
    let array = [];
    for (let key in tabs) {
      let item = tabs[key];
      let cls = item.key + '-panel';
      if (item.key === activeKey) {
        cls += ' current';
      }
      if (item.key === TABKEY.cate) {
        array.push(<ul key={item.key} className={cls}>
          {this.renderCateContent()}
        </ul>)
      } else if (item.key === TABKEY.type) {
        // array.push(<ul key={item.key} className={cls}>
        //   {this.renderTypeContent()}
        // </ul>)
      } else {
        // array.push(<ul key={item.key} className={cls}>
        //   {this.renderFilterContent()}
        // </ul>)
      }
    }
    return array;
  }
  render() {
    return (
      <div className="header">
        <div className="header-top">{this.renderTabs()}</div>
        <div className="panel">
          <div className="panel-inner">{this.renderContent()}</div>
        </div>
      </div>
    )
  }
}
//通过connect将store绑定到当前组件的属性上
//这样 就不用手动订阅了
export default connect((state) => ({
  //注入属性
  tabs: state.headerReducer.tabs,
  activeKey: state.headerReducer.activeKey,
  filterData: state.headerReducer.filterData
}))(Header)
