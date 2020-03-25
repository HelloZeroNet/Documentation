# 经常问的问题


#### 我需要打开一个端口吗？

这是 __可选的__, 您可以在没有开放端口的情况下浏览和使用零网站点。
如果你想要创建自己的新站点，强烈建议你把端口打开。

在启动时，零网尝试使用[UPnP](https://wikipedia.org/wiki/Universal_Plug_and_Play)在您的路由器上为您打开一个端口
，如果失败了，您必须手动操作：

 - 尝试使用[http://192.168.1.1](http://192.168.1.1) 或 [http://192.168.0.1](http://192.168.0.1) 访问路由器的网站界面
 - 查找“启用UPnP支持”或类似选项，然后重新启动零网。

如果它仍然不起作用，那么尝试找到路由器网页页面的“端口转发”部分。 不同的路由器有不同的显示。 [这是YouTube上的教程。](https://www.youtube.com/watch?v=aQXJ7sLSz14) 要转发端口默认是15441。


---


#### 零网是匿名的吗？

它具有和BitTorrent相同的匿名性，随着网络和站点获得更多的节点，隐私性（找出谁是评论/站点所有者的可能性）将会增加。

零网可与匿名网络配合使用：您可以使用Tor网络轻松隐藏你的IP地址。

---


#### 如何在Tor浏览器中使用零网？

在Tor模式下，建议在Tor浏览器中使用零网：

- 启动Tor浏览器
- 进入地址 `about:config` 并接受风险警告
- 点击 `Settings...`
- 搜索 `no_proxies_on`
- 双击首选项条目
- 进入地址 `127.0.0.1` 并按 OK
- 在浏览器中打开[http://127.0.0.1:43110](http://127.0.0.1:43110)

如果您仍然看到空白页：

 - 单击NoScript按钮（工具栏上第一个）
 - 选择 “临时允许所有页面”
 - 重新加载页面
 
---


#### 如何在Tor上使用零网？

如果你想隐藏你的IP, 安装最新版的零网然后点击 Tor > 对ZeroHello上的每个连接开启Tor。

在Windows平台上, Tor已经打包在零网中。 零网将在第一次运行时会尝试下载并解压Tor。 If this fails for any reason, you can install it manually following the instruction in `core\tools\tor\manual_install.txt`.

对其他操作系统, 遵循这"如何在Linux/MacOS中使零网工作在Tor网络上？"这部分建议。

> __小提示:__ 你可以使用零网[统计](http://127.0.0.1:43110/Stats)页面验证你的IP地址。

> __小提示:__ 如果你连接错误，确保你使用的是最新版本的Tor。 (0.2.7.5+ required)


---


#### 如何在Linux/MacOS中使零网工作在Tor网络上？

 - 遵循Tor官方指南安装对应系统下的Tor: [Linux](https://www.torproject.org/docs/tor-doc-unix.html.en) [Mac](https://www.torproject.org/docs/tor-doc-osx.html.en)。
 - `sudo nano /etc/tor/torrc`
 - Remove the `#` character from lines `ControlPort 9051` and `CookieAuthentication 1` (line ~57)
 - 重启 tor
 - Add permission for yourself to read the auth cookie. With Debian Linux, the command is `sudo usermod -a -G debian-tor [yourlinuxuser]`<br>(if you are not on Debian check the file's user group by `ls -al /var/run/tor/control.authcookie`)
 - Logout/Login with your user to apply group changes

> __小提示:__ Use the `ls -ld /var/run/tor` command to make sure it has the correct `drwxr-sr-x` permission bits. (fix it with `chmod g+sx /var/run/tor/` if necessary)

> __小提示:__ You can verify if your Tor setup is running correctly using `echo 'PROTOCOLINFO' | nc 127.0.0.1 9051`

> __小提示:__ It's also possible to use Tor without modifying torrc (or to use older versions of Tor clients), by running `zeronet.py --tor disable --proxy 127.0.0.1:9050 --disable_udp`, but then you will lose ability to talk with other .onion addresses.



---

#### 是否可以使用配置文件？

任何命令行配置标志也可以用作配置选项。 将这些选项逐行放入零网的顶级目录（具有zeronet.py的那一层目录）中`zeronet.conf`的文件中。 例如：

```
[global]
data_dir = my-data-dir
log_dir = my-log-dir
ui_restrict =
 1.2.3.4
 2.3.4.5
```

要列出可能的选项，请使用`zeronet.py --help`命令

---


#### 如果我的ISP或政府阻止它，如何使Tor工作？

ZeroNet does not include [Tor pluggable transports](https://www.torproject.org/docs/pluggable-transports.html.en) yet. The easiest way to make Tor work in a censored network is to start the Tor browser, configure it to connect to the Tor network with working pluggable transports, and modify ZeroNet's config to use Tor browser's proxy and control port by starting ZeroNet with `--tor_controller 127.0.0.1:9151 --tor_proxy 127.0.0.1:9150` or by adding these parameters to `zeronet.conf`.

```
[global]
tor_controller = 127.0.0.1:9151
tor_proxy = 127.0.0.1:9150
```


---


#### 我可以在多台机器上使用相同的账号吗？

是的，你可以。只需将`data/users.json`文件复制到新机器上即可。


---


#### 如何创建“很酷的”（非.bit）网站地址？

用[vanitygen](https://bitcointalk.org/index.php?topic=25804.0) 生成一个. 一旦得到你的公钥, 创建 `data/1YourPublicKey...tCkBzAXTKvJk4uj8` 目录. 放些文件在那儿.

然后访问 [http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/](http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/). 拖`0` 按钮到左边并在侧边栏中签名你的站点。


---


#### 如何注册.bit域名？

你可以使用[Namecoin](https://namecoin.info/)注册.bit域名。
使用客户端的界面或[命令行界面](https://github.com/namecoin/wiki/blob/master/How-to-register-and-configure-.bit-domains.md)管理你的域名。

当注册完成后，你必须通过添加一个zeronet项编辑你的域名记录， 例如：

```
{
...
    "zeronet": "1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr",
    "map": {
        "blog": { "zeronet": "1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8" },
        "talk": { "zeronet": "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ" }
    },
...
}
```

> __小提示:__ 其他注册.bit域名的方法: [domaincoin.net](https://domaincoin.net/), [peername.com](https://peername.com/), [dotbit.me](https://dotbit.me/)

> __小提示:__ 你可以在[namecha.in](http://namecha.in/)验证你的域名, 例如: [zeroid.bit](http://namecha.in/name/d/zeroid)

> __小提示:__ 你应该只使用 [小写字母, 数字 在你的域名中](http://wiki.namecoin.info/?title=Domain_Name_Specification_2.0#Valid_Domains)。

> __小提示:__ 要让ZeroHello显示你的域名而不是你的站点比特币地址，添加一个域名项到你的content.json中。 ([示例](https://github.com/HelloZeroNet/ZeroBlog/blob/master/content.json#L6))


---


#### 我可以使用生成的网站地址/私钥接受比特币付款吗？

是的，这是一个标准的比特币地址。 私钥是WIF格式的，因此您可以在大多数客户端中导入它。

> __小提示:__ 我们不建议您在网站的地址上保留大量资金，因为每次修改网站时都必须输入私钥。


---


#### 有人托管恶意内容会发生什么？

零网站点是在沙盒中的，它们具有与您通过网络访问的任何常见网站相同的权限。
您可以完全控制您所托管的内容。 如果您发现可疑内容，您可以随时停止托管该站点。

---


#### 是否可以将零网安装到远端机器上？

是的，但你必须启用UiPassword插件。只需将__plugins/disabled-UiPassword__目录重命名为 __plugins/UiPassword__就可以了。然后使用<br>`zeronet.py --ui_ip "*" --ui_password anypassword`在远端机器上启动零网。
这会将零网网页服务器绑定到所有接口，但为保证安全，您只能通过输入给定的密码来访问它。

> __小提示:__ 您还可以使用`--ui_restrict ip1 ip2`来限制基于IP地址的接口。

> __小提示:__ 您可以通过创建一个`zeronet.conf`文件并在其中添加`[global]`和`ui_password = anypassword`行来在配置文件中指定密码。


---


#### 有没有办法跟踪零网正在使用的带宽？

可以，零网侧边栏中的 已发送/已接受 字节。<br>(通过拖动右上方的`0`按钮到左侧可以打开侧边栏)

> __小提示:__ 每个连接的流量统计: [http://127.0.0.1:43110/Stats](http://127.0.0.1:43110/Stats)


---


#### 如果两个人使用相同的私钥修改网站会发生什么？

每个content.json文件都带有时间戳，客户端始终接受具有有效签名的最新那个文件。


---


#### 零网是否用到比特币中的区块链技术？

不，零网仅使用到比特币加密技术来对站点地址和内容进行签名/验证。
用户识别也用到比特币的[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)格式。

域名币的区块链用在域名注册中，但客户不会下载区块链。 但区块链元数据可通过零网网络传播。


---


#### 零网是否仅支持HTML，CSS网站？

零网是为动态，实时更新的网站而构建的，但您可以使用它来托管任何类型的文件，例如（VCS库，您自己的瘦客户端，数据库等）。


---


#### 如何创建新的零网站点？

[请遵循这些说明。](../using_zeronet/create_new_site/)

---


#### 当我访问站点时会发生什么？

- 当您想要打开一个新站点时，它会向BitTorrent跟踪器询问访问者的IP地址。
- 最初，一个名为 __content.json__ 的文件被下载下来，该文件包含所有其他文件的文件名，
  __哈希值__ 和站长的加密签名。
- 下载的content.json文件将通过使用站点的 __地址__ 和该文件中站长的 __签名__ 被进一步 __验证__ 。
- 然后其他文件(html, css, js...)被 __下载下来__ 并被通过它们的大小和来自content.json中的SHA512哈希值验证.
- 每个访问过的站点然后又 __被你托管着__ .
- 如果站长（拥有站点地址的私钥的人）修改了站点， 然后他签名了新的content.json文件并__将它发布给其他节点__。在节点验证了文件的完整性后（通过签名）， 节点们将__下载修改后的文件__ 并将新content文件发给其他节点。

更多信息:
 [零网 示例站点](../using_zeronet/sample_sites/),
 [零网如何工作的演示文档](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub)
