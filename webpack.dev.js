const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const srcRoot = path.resolve(__dirname, "src");
const devPath = path.resolve(__dirname, "dev");
const pageDir = path.resolve(srcRoot, "pages");
const mainFile = "index.js";

//手动配置文件入口
function getEntry() {
  let entryMap = {};
  debugger;
  fs.readdirSync(pageDir).forEach((pathname) => {
    let fullPathName = path.resolve(pageDir, pathname);
    let stat = fs.statSync(fullPathName);
    let fileName = path.resolve(fullPathName, mainFile);
    if (stat.isDirectory && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName;
    }
  });
  console.log(entryMap);

  return entryMap;
}
/**
 * 根据entryMap生成HtmlArray,多页面配置
 * @param {Object} entryMap
 */
function getHtmlArray(entryMap) {
  let htmlArr = [];
  Object.keys(entryMap).forEach((key) => {
    //获取完整路径
    let fullPathName = path.resolve(pageDir, key);
    let fileName = path.resolve(fullPathName, `${key}.html`); //模版文件路径
    if (fs.existsSync(fileName)) {
      htmlArr.push(
        new HtmlWebpackPlugin({
          filename: `${key}.html`,
          template: fileName,
          chunks: [key], //配置引入的js文件
        })
      );
    }
  });
  return htmlArr;
}
const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
  mode: "development",
  entry: entryMap,
  output: {
    path: devPath,
    filename: "[name].min.js",
  },
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
  plugins: [].concat(htmlArray),
};
