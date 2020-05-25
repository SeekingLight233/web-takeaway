import React from "react"
import Header from "./Header/Header"
import Category from "./Category/Category"
import ContentList from "./ContentList/ContentList"
/**
 * @description 首页tab
 */
class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Header></Header>
        <Category></Category>
        <ContentList></ContentList>
      </div>
    )
  }
}

export default Home
