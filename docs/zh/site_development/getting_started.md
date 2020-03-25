# 入门

零网允许您在分布式网络平台上发布静态和动态网站。

在零网中，没有服务器的概念。 因此，不需要像PHP或Ruby这样的服务器语言。 相反，可以使用零网的API（称为ZeroFrame），JavaScript（或CoffeeScript）以及提供给所有网站的SQL数据库来创建动态内容。

## 教程

### ZeroChat教程

在本教程中，我们将在不到100行代码中构建一个P2P，分布式，无服务器的聊天站点。

* [Read on ZeroBlog](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:99:ZeroChat+tutorial)
* [Read on Medium.com](https://decentralize.today/decentralized-p2p-chat-in-100-lines-of-code-d6e496034cd4)

## 有用的信息

### 零网调试模式

零网可以使用`--debug`标签来让网站开发变得更容易。

运行零网的调试模式: `python zeronet.py --debug`

如果你正在使用编译版的零网:

* 在Windows平台上: `lib\ZeroNet.cmd --debug`
* 在Linux平台上: `./ZeroNet.sh --debug`
* 在Mac平台上: `./ZeroNet.app/Contents/MacOS/ZeroNet --debug`

#### 调试模式特点：

- 自动的[CoffeeScript](http://coffeescript.org/) -> JavaScript转换 (如果安装了coffeescript编译器)
- 调试消息将显示在控制台上
- 当一些源文件被修改后自动重新加载(UiRequest, UiWebsocket, FileRequest)，进而避免了重启(需要 [PyFilesystem](http://pyfilesystem.org/) on GNU/Linux)
- `http://127.0.0.1:43110/Debug` 在最新的错误发生处的可回溯和交互式Python控制台 (用到很酷的Werkzeug调试器 - 需要 [Werkzeug](http://werkzeug.pocoo.org/))
- `http://127.0.0.1:43110/Console` 生成一个交换式Python控制台 (需要 [Werkzeug](http://werkzeug.pocoo.org/))

### 编写CoffeeScript

为帮助编写基于CoffeeScript脚本的零网站点并充分利用零网的内部的CoffeeScript -> JavaScript转换器, 首先开启调试模式[Debug](#zeronet-debug-mode)。 另外，确保你希望工作的站点被标记为你自己的站点，只需在站点侧边栏中开启"这是我的站点"。

<!-- 这是正确的吗? -->
零网会把全部的CoffeeScript文件编译成一个叫`all.js`的文件, 同时将它部署在你站点顶级目录下的一个叫`js/`文件夹中。 这个文件同时会包括你所有的JavaScript代码。 然后你可以仅仅导入你所有的动态代码到你HTML文件中，仅需在`</body>`标签前添加:

```html
<script type="text/javascript" src="js/all.js?lang={lang}"></script>
```

<!-- 为什么? -->
!!! info "Note"

    `{lang}`是一个 *预置变量*, 当加载站点时，会自动被零网替换为合适的值。
	
	
### 禁用HTTP浏览器缓存

除了调试模式之外，在浏览器中禁用HTTP缓存是零网站点开发的必要部分。 现代网页浏览器尝试尽其可能地缓存网页内容。 由于所有零网站点都在iframe中运行，因此网页浏览器无法检测到零网站点内容何时发生更改，因此如果启用了HTTP缓存，则通常不会反映站点的更改。

要禁用，请打开浏览器的开发者工具，导航到开发者工具设置，然后选中“禁用HTTP缓存（勾选框选中时）”选项。 根据设置建议，确保在测试站点更新时，保持开发者工具打开！

### 额外功能（仅适用于您拥有的网站）

 - 合并的CSS文件: 站点文件夹的全部CSS文件将会被合并成一个叫`all.css`的文件。 你可以选择在你的站点中只包含这个文件就够了。 如果你想让开发变得容易，进而想包括其他CSS文件， 你可以将它们添加到站点 `content.json`的忽视项中。 这样做，它们不会随着你站点的发布而被发布出去。 (例如: 在站点的`content.json`中添加 `"ignore": "(js|css)/(?!all.(js|css))"` 这将会忽略除`all.js`和`all.css`的所有CSS和JS文件)
 - 合并的JS文件: 站点文件夹的全部JS文件将会被合并成一个叫`all.js`的文件。 如果CoffeeScript编译器存在，它将会转换`.coffee`为`.js`.
 - 合并到all.css/all.js中的文件顺序: 首先，在css/js文件夹中文件排到最前面； 在css/js文件夹中的文件将根据文件名顺序被依次合并(01_a.css, 02_a.css, 等)

## 需要帮助？

零网拥有一个逐渐成长的开发者社区，开发者们四处闲逛。 如果您想寻求帮助，建议或只是想要闲逛，请随时联系以下服务：

### 论坛

* [ZeroExchange](http://127.0.0.1:43110/zeroexchange.bit/), 一个P2P版的StackOverflow
* [ZeroTalk](http://127.0.0.1:43110/Talk.ZeroNetwork.bit/), 一个P2P类似Reddit的论坛

### 聊天室

* [#zeronet-dev:matrix.org](https://riot.im/app/#/room/#zeronet-dev:matrix.org) on Matrix
* IRC at #zeronet on Freenode
