import "./ListItem.scss"
import React from "react"
import { connect } from "react-redux"
// import { getListData } from "../../actions/contentListAction"
/**
 * @description  列表单个组件
 */
class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  /**
   * @description 对品牌和新到标签进行条件渲染
   */
  renderBrand(data) {
    if (data.brand_type) {
      return <div className="brand brand-pin">品牌</div>
    } else {
      return <div className="brand brand-xin">新店</div>
    }
  }

  /**
   * @description 渲染评分的星星
   * @param {*} data
   */
  renderScore(data) {
    let wm_poi_score = data.wm_poi_score || ""
    //传进来的是number类型
    let score = wm_poi_score.toString()
    let scoreArray = score.split(".")
    let fullstar = parseInt(scoreArray[0]) //满星的个数
    //对半颗星进行四舍五入
    let halfstar = parseInt(scoreArray[1] >= 5 ? 1 : 0)
    let nullstar = 5 - fullstar - halfstar

    let starjsx = []
    for (let i = 0; i < fullstar; i++) {
      starjsx.push(<div key={i + "full"} className="star fullstar"></div>)
    }
    if (halfstar) {
      for (let j = 0; j < halfstar; j++) {
        starjsx.push(<div key={j + "half"} className="star halfstar"></div>)
      }
    }
    if (nullstar) {
      for (let k = 0; k < nullstar; k++) {
        starjsx.push(<div key={k + "null"} className="star nullstar"></div>)
      }
    }
    return starjsx
  }

  render() {
    let data = this.props.itemData
    return (
      <div className="item-content scale-1px">
        <img className="item-img" src={data.pic_url}></img>
        {this.renderBrand(data)}
        <div className="item-info-content">
          <p className="item-title">{data.name}</p>
          {/* 清除浮动，防止父元素坍塌 */}
          <div className="item-desc clearfix">
            <div className="item-score">{this.renderScore(data)}</div>
            <div className="item-count">
              {[<div key="0">元素1</div>, <div key="1">元素2</div>]}
            </div>
            <div className="item-distance">xx</div>
            <div className="item-time">xx</div>
          </div>
          <div className="item-price">
            <div className="item-pre-price">xx</div>
          </div>
          <div className="item-others">
            <div className="other-info">
              <img src="" className="other-tag"></img>
              <div src="" className="other-content"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect((state) => ({
  //   list: state.contentListReducer.items,
}))(ListItem)
