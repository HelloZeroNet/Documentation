# 入门

ZeroNet允许您在分布式Web平台上发布静态和动态网站。

在ZeroNet中，没有服务器的概念。 因此，不需要像PHP或Ruby这样的服务器端语言。 相反，可以使用ZeroNet的API（称为ZeroFrame），JavaScript（或CoffeeScript）以及提供给所有网站的SQL数据库来创建动态内容。

## 教程

### ZeroChat教程

在本教程中，我们将在不到100行代码中构建一个P2P，分布式，无服务器的聊天站点。

* [Read on ZeroBlog](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:99:ZeroChat+tutorial)
* [Read on Medium.com](https://decentralize.today/decentralized-p2p-chat-in-100-lines-of-code-d6e496034cd4)

## 有用的信息

### ZeroNet调试模式

ZeroNet comes with a `--debug` flag that will make site development easier.

To run ZeroNet in debug mode use: `python zeronet.py --debug`

If you are using compiled/bundled version of ZeroNet:

* On Windows: `lib\ZeroNet.cmd --debug`
* On Linux: `./ZeroNet.sh --debug`
* On Mac: `./ZeroNet.app/Contents/MacOS/ZeroNet --debug`

#### 调试模式功能：

- Automatic CoffeeScript -> JavaScript conversion (All examples used in this documentation and sample sites are written in [CoffeeScript](http://coffeescript.org/))
- Debug messages will appear in the console
- Auto reload of some source files (UiRequest, UiWebsocket, FileRequest) on modification to prevent restarting (Requires [PyFilesystem](http://pyfilesystem.org/) on GNU/Linux)
- `http://127.0.0.1:43110/Debug` Traceback and interactive Python console at the last error position (using the wonderful Werkzeug debugger - Requires [Werkzeug](http://werkzeug.pocoo.org/))
- `http://127.0.0.1:43110/Console` Spawns an interactive Python console (Requires [Werkzeug](http://werkzeug.pocoo.org/))

### 禁用HTTP浏览器缓存

除了调试模式之外，在浏览器中禁用HTTP缓存是ZeroNet站点开发的重要组成部分。 现代Web浏览器尝试尽可能地缓存Web内容。 由于所有ZeroNet站点都在iframe中运行，因此Web浏览器无法检测到ZeroNet站点的内容何时发生更改，因此如果启用了HTTP缓存，则通常不会反映站点更改。

要禁用，请打开浏览器的devtools，导航到devtools设置，然后选中“禁用HTTP缓存（工具箱打开时）”选项。 根据设置建议，确保在测试站点的新更改时保持devtools打开！

### 额外功能（仅适用于您拥有的网站）

 - Merged CSS files: All CSS files inside the site folder will be merged into one file called `all.css`. You can choose to include only this file to your site. If you want to keep the other CSS files to make the development easier, you can add them to the ignore key of your `content.json`. This way, they won't be published with your site. (eg: add to your `content.json` `"ignore": "(js|css)/(?!all.(js|css))"` this will ignore all CSS and JS files except `all.js` and `all.css`)
 - Merged JS files: All JS files inside the site folder will be merged into one file called `all.js`. If a CoffeeScript compiler is present (bundled for Windows) it will convert `.coffee` to `.js`.
 - Order in which files are merged into all.css/all.js: Files inside subdirectories of the css/js folder comes first; Files in the css/js folder will be merged according to file name ordering (01_a.css, 02_a.css, etc)

## 需要帮忙？

ZeroNet拥有越来越多的开发人员社区，他们在不同的空间中闲逛。 如果您想寻求帮助，建议或只是想要闲逛，请随时联系以下服务：

### 论坛

* [ZeroExchange](http://127.0.0.1:43110/zeroexchange.bit/), a p2p StackOverflow clone
* [ZeroTalk](http://127.0.0.1:43110/Talk.ZeroNetwork.bit/), a p2p Reddit-like forum

### 聊天室

* [#zeronet-dev:matrix.org](https://riot.im/app/#/room/#zeronet-dev:matrix.org) on Matrix
* IRC at #zeronet on Freenode
