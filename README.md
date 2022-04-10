# A-SOUL-Panel

## 初始化
- Clone本仓库
- 根据[package文件](package.json)中的内容用npm安装依赖的包
```
npm install [packageName]
```
  
## 编译项目
使用npm run build构建项目，build的过程可以参考[vue配置文件](vue.config.js)
```
npm run build
```
  
## 加载到浏览器
使用浏览器“加载解压缩的扩展”功能，进入编译出的dist目录加载插件即可
  
  
## 技术栈（可能）
css + html + js + vue3 + webpack4(vue/cli3默认)
  
## 有关Manifest 3
Manifest 3 相对于 2 在机制上有很大改变，各种限制变得更加严格，比如取消background机制改用serviceWorker(相比background无法直接操作DOM —— 因此jquery也一起无了，空闲时浏览器将收回运行资源，禁用ajax仅能使用fetch API等)，但Manifest 2 的插件生命周期确实不长了(本地加载都得先报个错提醒你更新版本)，干脆直接从3开始设计。由于3的相关中文资料确实是太少，我只能润去谷歌看官方文档(英语没白学)，慢慢啃总算是看明白了七七八八，要不是平时时间少我也挺想写点相关文章的😥
  
## 后话
原本用的是偷懒的CDN加载vue.global.js，但是通不过浏览器的网络安全策略，原因是编译器用了类似eval()的不安全的方法，内联样式、脚本和外部脚本也无法运行，这个问题的说明在vue3的文档中是没有的，但可以在vue2的文档中找到。不做迁移最后只能写出网页却无法封装成插件。最终花了一整天把项目迁移到vue-cli构建的项目上😭纯纯浪费时间