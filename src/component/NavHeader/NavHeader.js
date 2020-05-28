import React from "react"
import "./NavHeader.scss"

/**
 * @constructor <NavHeader title={string}/>
 */
class NavHeader extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="back-icon"></div>
        <h4 className="title">{this.props.title}</h4>
      </div>
    )
  }
}

export default NavHeader
