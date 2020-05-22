const path = require("path")
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const srcRoot = path.resolve(__dirname, "src")
const devPath = path.resolve(__dirname, "dev")
const pageDir = path.resolve(srcRoot, "pages")
const mainFile = "index.js"

//手动配置文件入口
function getEntry() {
  let entryMap = {}

  fs.readdirSync(pageDir).forEach((pathname) => {
    let fullPathName = path.resolve(pageDir, pathname)
    let stat = fs.statSync(fullPathName)
    let fileName = path.resolve(fullPathName, mainFile)

    if (stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName
    }
  })

  return entryMap
}
function getHtmlArray(entryMap) {
  let htmlArray = []
  Object.keys(entryMap).forEach((key) => {
    let fullPathName = path.resolve(pageDir, key)
    let fileName = path.resolve(fullPathName, key + ".html")

    if (fs.existsSync(fileName)) {
      htmlArray.push(
        new HtmlWebpackPlugin({
          filename: key + ".html",
          template: fileName,
          chunks: ["common", key],
        })
      )
    }
  })
  return htmlArray
}

module.exports = {
  mode: "development",
  devServer: {
    contentBase: devPath,
  },
  entry: {
    index: "./src/pages/index/index.js",
    category: "./src/pages/category/index.js",
    detail: "./src/pages/detail/index.js",
  },

  output: {
    path: devPath,
    filename: "[name].[contentHash:8].js",
  },
  devtool: "source-map", //配置sourceMap
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ["style-loader", "css-loader"],
        include: srcRoot,
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"],
        include: srcRoot,
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: ["url-loader?limit=8192"], //小于8k的转base64
        include: srcRoot,
      },
      {
        test: /\.(js|jsx)$/,
        loader: ["babel-loader"], //小于8k的转base64
        include: srcRoot,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index/index.html",
      filename: "index.html",
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ["index"], // 只引用 index.js
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/category/category.html",
      filename: "category.html",
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ["category"], // 只引用 index.js
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/detail/detail.html",
      filename: "detail.html",
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ["detail"], // 只引用 index.js
    }),
  ],
}
