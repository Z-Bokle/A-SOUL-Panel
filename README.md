# A-SOUL-Panel

## 如何自己构建代码？
需要自行构建代码请参照下文教程，非专业用户亦可以下载构建好的插件或直接从商店安装
### 初始化
1. Clone本仓库
2. 选择一种方式安装依赖项
- 根据[package文件](package.json)中的内容用npm安装依赖的包
```
npm install [packageName]
```
- 也可以一步到位执行完成所有包的安装
```
npm install
```
  
### 编译项目
使用npm run build构建项目，build的过程可以参考[vue配置文件](vue.config.js)
```
npm run build
```
  
### 加载到浏览器
使用浏览器“加载解压缩的扩展”功能，进入编译出的dist目录加载插件即可
  
  
## 技术栈（可能）
css + html + js + vue3 + webpack4(vue/cli3默认)
  
## 有关Manifest V3
- Manifest V3 相对于 V2 在机制上有很大改变，各种限制变得更加严格，比如取消background机制改用serviceWorker(相比background无法直接操作DOM —— 因此jquery也一起无了，空闲时浏览器将收回运行资源，禁用ajax仅能使用fetch API等)，但Manifest V2 的插件生命周期确实不长了(本地加载都得先报个错提醒你更新版本)，干脆直接从3开始设计。由于V3的相关中文资料确实是太少，我只能润去谷歌看官方文档(英语没白学)，慢慢啃总算是看明白了七七八八，要不是平时时间少我也挺想写点相关文章的😥
- 此外，由于旧版本浏览器不兼容，测试或使用插件请使用Chrome 88或更新的Chrome浏览器，最好使用当下能安装的最新版本，同内核的浏览器(如Edge)同理；
- 传言Mozilla会让Firefox支持运行Manifest V3的Chrome插件，是否已经实现以及具体需要做哪些改动我不太清楚，欢迎移植插件到Firefox

## 后话
原本用的是偷懒的CDN加载vue.global.js，但是通不过浏览器的网络安全策略，原因是编译器用了类似eval()的不安全的方法，内联样式、脚本和外部脚本也无法运行，这个问题的说明在vue3的文档中是没有的，但可以在vue2的文档中找到。不做迁移最后只能写出网页却无法封装成插件。最终花了一整天把项目迁移到vue-cli构建的项目上😭纯纯浪费时间