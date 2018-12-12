## 什么是ZeroNet？

ZeroNet是使用比特币加密技术和BitTorrent构建的**抗审查分布式网络**.

用户可以在ZeroNet发布静态或动态的网站，访客也可以选择去成为网站的服务器。只要有一个节点在，网站就会保持在线。

站长更新网站后，所有服务于这个网站（作为服务器）的节点（以前的访客）只会接收网站更新后增加的内容。

ZeroNet内置SQL数据库，便于开发规模大的网站。数据库会以增量更新的方式同步到有这个网站的节点。


## 为什么要开发零网（ZeroNet）？

* 我们信仰开放、自由、无审查的通讯。
* 无审查：一旦内容发布，便不可删除。
* 没有单点故障：即便只有一个节点，内容仍会保持在线。
* 不可能被关闭：零网在何处无人知道，因为它无处不在。网站的内容都是由愿意为数据作服务器的用户来提供的。
* 高速：零网使用BitTorrent技术传输数据，比中心化服务器还要快。
* 离线可用：网络不可用时也可以访问网站。
* 安全: 网站内容的所有权由Bitcoin钱包的同种加密技术所保护。 

[comment]: <> (I'm unsure about the following bit. Thoughts?)
[comment]: <> (# What problem is ZeroNet solving?)

[comment]: <> (When Tim Berners-Lee created the internet, he meant for it to be free. Not surveilled nor censored. And [he is still fighting for that](http://edition.cnn.com/2014/03/12/tech/web/tim-berners-lee-web-freedom/).)

[comment]: <> (The internet is centralized mainly in two places: Content and Domain Names (URLs) are hosted and controlled by central servers. If you control the central servers (and if you are powerful enough you do) you control the network.)

[comment]: <> (**Decentralized content storage**)

[comment]: <> (ZeroNet tackles the content storage problem by giving everyone the ability to store content. Site visitors can choose to store a website on their computers, and when they do this they also help to serve the site to other users. The site is online even if only one user is hosting it.)

[comment]: <> (**Shared DNS cache**)

[comment]: <> (Site addresses on ZeroNet are cached by all network members. When you type a ZeroNet site URL on your browser this will query other peers connected to you about the site. If one of these peers happen to have the site they will send it to you, if not, they will forward your query along.)

[comment]: <> (This architecture means that when a site URL is created, as long as one peer is serving it, there is no way to take the URL down.)


## 特性
 * 简单，零配置安装。
 * 无需密码，基于[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)的授权: 账号的所有权由Bitcoin钱包的同种加密技术所保护。 
 * 站点实时更新，不需要刷新。
 * Namecoin .bit 域名支持。
 * SQL 数据库支持: 简化了站点开发，减少了页面加载时间。
 * 匿名性: 完整的Tor网络支持，使用.onion而非ipv4地址。
 * TLS加密连接。
 * 自动使用uPnP打开端口。
 * 多用户插件（openproxy）。
 * 可以在任何操作系统和浏览器上使用。


## 零网是如何工作的？

* 安装并启动零网后，访问类似于如下所示的地址打开网站。
  `http://127.0.0.1:43110/{零网站点地址}`
  (例如  `http://127.0.0.1:43110/1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D`).
* 零网用BitTorrent网络寻找为这个网站做种的节点并向节点索要网站数据(HTML, CSS, JS...)。
* 客户端会为每个访问过的网站服务，站点也可以手动添加黑名单或移除。
* 每个网站都有一个网站文件列表，包含站长用私钥生成的SHA512哈希和一个签名。
* 站长修改网站后，签名新文件列表，并发布到其他节点。
  节点验证完列表完整性后（用签名），下载已修改的文件再传送给其他节点。

##### [关于零网加密技术、内容更新和多用户站点的幻灯片 &raquo;](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub?start=false&loop=false&delayms=3000)


## 截图

![截图](./img/zerohello.png)

![ZeroTalk](./img/zerotalk.png)

##### [更多截图 &raquo;](/using_zeronet/sample_sites/)

## 当前局限

* <strike>没有类似于torrent的文件分割、大文件的支持</strike> (BigFile插件已实现)
* 文件传输未压缩 <strike>或加密</strike> (TLS 加密已添加)
* 无法创建私有站点。

## 帮助这个项目存活

Bitcoin: 1QDhxQ6PraUZa21ET5fYUCPgdrwBomnFgX

[Full donation page](help_zeronet/donate/)

### 谢谢!

* 更多信息、帮助、零网站点： [http://www.reddit.com/r/zeronet/](http://www.reddit.com/r/zeronet/)
* 交谈： [#zeronet @ FreeNode](https://kiwiirc.com/client/irc.freenode.net/zeronet) 或在 [gitter](https://gitter.im/HelloZeroNet/ZeroNet)
