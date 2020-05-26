import React from "react"

class My extends React.Component {
  render() {
    return (
      <div className="my">
        <div className="header">
          <img
            className="avatar"
            src="http://p1.meituan.net/codeman/e32b47a07b818bf9a1d4086a882c18a62282.png"
          ></img>
          <p className="nickname">李先生 &gt;</p>
        </div>
        <div className="content">
          <ul className="items">
            <li className="address">收货地址</li>
            <li className="money">美团红包</li>
          </ul>
          <ul className="items">
            <li className="email">常见问题</li>
            <li className="question">意见反馈</li>
          </ul>
          <p className="tel">客服电话: &nbsp;101-097-77</p>
          <p className="tel">服务时间: &nbsp;9:00-23:00</p>
        </div>
      </div>
    )
  }
}

export default My
