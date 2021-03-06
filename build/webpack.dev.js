const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const srcRoot = path.resolve(__dirname, "..", "src");
const devPath = path.resolve(__dirname, "..", "dev");
const pageDir = path.resolve(srcRoot, "pages");
const mainFile = "index.js";
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: devPath,
    hot: true,
  },
  entry: {
    index: path.join(srcRoot, "pages", "index", "index.js"),
    // category: "../src/pages/category/index.js",
    // detail: "../src/pages/detail/index.js",
    // evaluation: "../src/pages/evaluation/index.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      component: path.resolve(srcRoot, "component"),
    },
  },

  output: {
    path: devPath,
    filename: "[name].min.js",
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
        loader: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: srcRoot + "/component/common.scss",
            },
          },
        ],
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all", //对node_modules中所有模块进行抽离
          name: "common",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcRoot, "pages", "index", "index.html"),
      filename: "index.html",
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ["common", "index"], // 只引用 index.js
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/pages/category/category.html",
    //   filename: "category.html",
    //   // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
    //   chunks: ["common", "category"], // 只引用 index.js
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/pages/detail/detail.html",
    //   filename: "detail.html",
    //   // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
    //   chunks: ["common", "detail"], // 只引用 index.js
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/pages/evaluation/evaluation.html",
    //   filename: "evaluation.html",
    //   // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
    //   chunks: ["common", "evaluation"], // 只引用 index.js
    // }),
    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: "css/main.[contentHash:8].css",
      chunkFilename: "[id].css",
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
