import "./ContentList.scss"
import React from "react"
import { connect } from "react-redux"
import { getListData } from "../../actions/contentListAction"
import Loading from "component/Loading/Loading"

import ListItem from "./ListItem/ListItem"
/**
 * @description  附近商家
 */
class ContentList extends React.Component {
  constructor(props) {
    super(props)
    ///请求第一屏数据
    this.page = 0
    this.fetchData(this.page)
    this.state = {
      isend: false, //页面是否允许滚动
    }
  }
  fetchData(page) {
    this.props.dispatch(getListData(page))
  }

  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight
    //scrollHeight是元素高度,在懒加载之前是固定的
    let scrollHeight = document.body.scrollHeight
    let scrollTop = document.documentElement.scrollTop //scrollTop为顶部距离

    let proLoadDis = 30
    //当滚动的距离+设备高度 = 元素整体高度时，说明触底了
    if (scrollTop + clientHeight >= scrollHeight - proLoadDis) {
      this.page++
      if (this.page > 3) {
        //加载超过三页不请求数据
        this.setState({ isend: true, loadingText: "加载完成" })
      } else {
        this.fetchData(this.page)
      }
    }
  }

  //列表渲染前对滚动进行监听
  componentWillMount() {
    //添加事件监听时千万不要忘了绑定this指向
    window.addEventListener("scroll", this.onLoadPage.bind(this))
  }
  //手动销毁自定义事件
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onLoadPage.bind(this))
  }
  renderItems() {
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
        <Loading isend={this.state.isend}></Loading>
      </div>
    )
  }
}
export default connect((state) => ({
  list: state.contentListReducer.items,
}))(ContentList)
