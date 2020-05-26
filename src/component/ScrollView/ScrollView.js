import React from "react"
import Loading from "component/Loading/Loading"
import "./ScrollView.scss"
/**
 * @param loadCallback:function,isend:boolean
 * @description 滚动加载逻辑
 */
class ScrollView extends React.Component {
  /**
   * @description 滚动加载
   */
  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight
    //scrollHeight是元素高度,在懒加载之前是固定的
    let scrollHeight = document.body.scrollHeight
    let scrollTop = document.documentElement.scrollTop //scrollTop为顶部距离

    let proLoadDis = 30
    //当滚动的距离+设备高度 = 元素整体高度时，说明触底了
    if (scrollTop + clientHeight >= scrollHeight - proLoadDis) {
      //为false执行滚动加载
      if (!this.props.isend) {
        //如果用户传了回调就调用该回调
        this.props.loadCallback && this.props.loadCallback()
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

  render() {
    return (
      <div className="scrollview">
        {/* 这玩意儿就类似vue里的slot */}
        {this.props.children}
        <Loading isend={this.props.isend}></Loading>
      </div>
    )
  }
}

export default ScrollView
