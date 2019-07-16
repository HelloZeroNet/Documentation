# 经常问的问题


#### 我需要打开一个端口吗？

这是 __可选的__, 您可以在没有开放端口的情况下浏览和使用ZeroNet站点。
如果要创建新站点，强烈建议使用开放端口。

在启动时，ZeroNet尝试使用[UPnP](https://wikipedia.org/wiki/Universal_Plug_and_Play)在您的路由器上为您打开一个端口
，如果失败，您必须手动执行：

 - 尝试使用[http://192.168.1.1](http://192.168.1.1) 或 [http://192.168.0.1](http://192.168.0.1) 访问路由器的Web界面
 - 查找“启用UPnP支持”或类似选项，然后重新启动ZeroNet。

如果它仍然不起作用，那么尝试找到路由器页面的“端口转发”部分。 这对每个路由器都不同。 [这是YouTube上的教程。](https://www.youtube.com/watch?v=aQXJ7sLSz14) 要转发的端口是15441。


---


#### ZeroNet是匿名的吗？

它不比BitTorrent更匿名，但随着网络和网站获得更多节点，隐私（找出谁是评论/网站的所有者的可能性）将会增加。

ZeroNet可与匿名网络配合使用：您可以使用Tor网络轻松隐藏IP。

---


#### 如何在Tor浏览器中使用ZeroNet？

在Tor模式下，建议在Tor浏览器中使用ZeroNet：

- 启动Tor浏览器
- 去地址 `about:preferences#advanced`
- 点击 `Settings...`
- Enter `127.0.0.1` to field **No proxy for**
- Open http://127.0.0.1:43110 in the browser

如果您仍然看到空白页：
 - 单击NoScript的按钮（工具栏上的第一个）
 - 选择“临时允许所有此页面”
 - 重新加载页面
---


#### 如何在Tor上使用ZeroNet？

If you want to hide your IP address, install the latest version of ZeroNet then click Tor > Enable Tor for every connection on ZeroHello.

On Windows, Tor is bundled with ZeroNet. ZeroNet will attempt to download and unpack Tor on its first run. If this fails for any reason, you can install it manually following the instruction in `core\tools\tor\manual_install.txt`.

For other OS's, follow the instructions in the "How to make ZeroNet work with Tor under Linux/MacOS" section.

> __Tip:__ You can verify your IP address using ZeroNet's [Stats](http://127.0.0.1:43110/Stats) page.

> __Tip:__ If you get connection errors, make sure you have the latest version of Tor installed. (0.2.7.5+ required)


---


#### 如何在Linux/MacOS下使ZeroNet与Tor一起使用？

 - Install Tor for your OS following Tor's official guidelines: [Linux](https://www.torproject.org/download/download-unix.html.en) [Mac](https://www.torproject.org/docs/tor-doc-osx.html.en).
 - `sudo nano /etc/tor/torrc`
 - Remove the `#` character from lines `ControlPort 9051` and `CookieAuthentication 1` (line ~57)
 - Restart tor
 - Add permission for yourself to read the auth cookie. With Debian Linux, the command is `sudo usermod -a -G debian-tor [yourlinuxuser]`<br>(if you are not on Debian check the file's user group by `ls -al /var/run/tor/control.authcookie`)
 - Logout/Login with your user to apply group changes

> __Tip:__ You can verify if your Tor setup is running correctly using `echo 'PROTOCOLINFO' | nc 127.0.0.1 9051`

> __Tip:__ It's also possible to use Tor without modifying torrc (or to use older versions of Tor clients), by running `zeronet.py --tor disable --proxy 127.0.0.1:9050 --disable_udp`, but then you will lose ability to talk with other .onion addresses.


---

#### 是否可以使用配置文件？

任何命令行配置标志也可以用作配置选项。 将这些选项逐行放入顶级zeronet目录（zeronet.py）中名为`zeronet.conf`的文件中。 例：

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


#### 我可以在多台机器上使用相同的用户名吗？

是的，只需将`data / users.json`文件复制到新机器即可。


---


#### 如何创建“花哨的”（非.bit）网站地址？

Use [vanitygen](https://bitcointalk.org/index.php?topic=25804.0) to generate one. Once you get your keys, create `data/1YourPublicKey...tCkBzAXTKvJk4uj8` directory. Put some files there.

Then navigate to [http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/](http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/). Drag the `0` button to the left and use the sidebar to sign your site.


---


#### 如何注册.bit域名？

You can register .bit domains using [Namecoin](https://namecoin.info/).
Manage your domains using the client's GUI or by the [command line interface](https://github.com/namecoin/wiki/blob/master/How-to-register-and-configure-.bit-domains.md).

After the registration is done you have to edit your domain's record by adding a zeronet section to it, e.g.:

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

> __Tip:__ Other possibilities to register .bit domains: [domaincoin.net](https://domaincoin.net/), [peername.com](https://peername.com/), [dotbit.me](https://dotbit.me/)

> __Tip:__ You can verify your domain on [namecha.in](http://namecha.in/), for example: [zeroid.bit](http://namecha.in/name/d/zeroid)

> __Tip:__ You should use only [lower-cased letters, numbers and - in your domains](http://wiki.namecoin.info/?title=Domain_Name_Specification_2.0#Valid_Domains).

> __Tip:__ To make ZeroHello display your domain name instead of your site's Bitcoin address, add a domain key to your content.json. ([Example](https://github.com/HelloZeroNet/ZeroBlog/blob/master/content.json#L6))


---


#### 我可以使用生成的网站地址/私钥接受比特币付款吗？

是的，这是一个标准的比特币地址。 私钥是WIF格式的，因此您可以在大多数客户端中导入它。

> __Tip:__ 我们不建议您在网站的地址上保留大量资金，因为每次修改网站时都必须输入私钥。


---


#### 有人托管恶意内容会发生什么？

ZeroNet站点是沙盒，它们具有与您通过Internet访问的任何其他网站相同的权限。
您可以完全控制您所托管的内容。 如果您发现可疑内容，您可以随时停止托管该网站。

---


#### 是否可以将ZeroNet安装到远程机器上？

是的，你必须通过将 __plugins/disabled -UiPassword__ 目录重命名为 __plugins/UiPassword__ 来启用UiPassword插件，
然后使用<br>`zeronet.py --ui_ip "*" --ui_password anypassword`在远程计算机上启动ZeroNet。
这会将ZeroNet UI Web服务器绑定到所有接口，但为了保证其安全，您只能通过输入给定的密码来访问它。

> __Tip:__ 您还可以使用`--ui_restrict ip1 ip2`来限制基于IP地址的接口。

> __Tip:__ 您可以通过创建一个`zeronet.conf`文件并在其中添加`[global]`和`ui_password = anypassword`行来在配置文件中指定密码。


---


#### 有没有办法跟踪ZeroNet正在使用的带宽？

The sent/received bytes are displayed at ZeroNet's sidebar.<br>(open it by dragging the topright `0` button to left)

> __Tip:__ Per connection statistics page: [http://127.0.0.1:43110/Stats](http://127.0.0.1:43110/Stats)


---


#### 如果两个人使用相同的密钥修改网站会发生什么？

每个content.json文件都带有时间戳，客户端始终接受具有有效签名的最新文件。


---


#### ZeroNet是否使用比特币的区块链？

不，ZeroNet仅使用比特币加密技术进行站点地址和内容签名/验证。
用户识别基于比特币的[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)格式。

Namecoin的区块链用于域名注册，但客户不会下载区块链。 相反，区块链元数据通过ZeroNet网络传递。


---


#### ZeroNet是否仅支持HTML，CSS网站？

ZeroNet是为动态，实时更新的网站而构建的，但您可以使用它来提供任何类型的文件，例如（VCS存储库，您自己的瘦客户端，数据库等）。


---


#### 如何创建新的ZeroNet站点？

[请遵循这些说明.](../using_zeronet/create_new_site/)

---


#### 访问网站时会发生什么？

- 当您想要打开一个新站点时，它会向BitTorrent跟踪器询问访问者的IP地址。
- 最初，下载了一个名为 __content.json__ 的文件，该文件包含所有其他文件名，
  __hashes__ 和网站所有者的加密签名。
- 使用站点的 __address__ 和文件中站点所有者的 __signature__， __验证__ 下载的content.json文件。
- Other files (html, css, js...) are then __downloaded__ and verified using their size and SHA512 hash from content.json.
- Each visited site then becomes __also served by you__.
- If the site owner (who has the private key for the site address) __modifies__ the site, then he/she signs
  the new content.json and __publishes it to peers__. After the peers have verified the file's 
  integrity (using the signature), they __download the modified files__ and serve the new content to other peers.

更多信息:
 [ZeroNet sample sites](../using_zeronet/sample_sites/),
 [Slideshow about how ZeroNet works](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub)
