const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// 复制文件到指定目录
const copyFiles = [
 {
     from: path.resolve("src/plugin/manifest.json"),
     to: `${path.resolve("dist")}/manifest.json`
   },
   {
     from: path.resolve("src/assets"),
     to: path.resolve("dist/assets")
   },
   {
     from: path.resolve("src/tab/style.css"),
     to: path.resolve("dist/css/style.css")
   }
];

// 复制插件
const plugins = [
   new CopyWebpackPlugin({
     patterns: copyFiles
   })
];

// 页面文件
const pages = {};
// 配置 popup.html 页面
const chromeName = ["tab"];

chromeName.forEach(name => {
   pages[name] = {
     entry: `src/${name}/main.js`,
     template: `src/${name}/index.html`,
     filename: `${name}.html`
   };
});

module.exports = {
 pages,
 productionSourceMap: false,
 lintOnSave:false,
 configureWebpack: {
  entry: {
   app: "./src/tab/main.js"
  },
  output: {
   filename: "js/[name].js"
  },
  plugins
 },
 
 css: {
  extract: {
   filename: "css/[name].css"
  }
 }
}