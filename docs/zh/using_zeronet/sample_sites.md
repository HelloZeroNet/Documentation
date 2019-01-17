# ZeroNet示例网站

## ZeroHello

ZeroNet的主页

 - 列出所有添加的站点：标题，节点数，修改日期等。
 - 站点操作：更新，暂停，恢复，删除，检查文件和另存为.zip
 - 克隆网站以拥有自己的博客/论坛
 - ZeroNet统计
 - 如果有更新，只需点击一下即可更新ZeroNet

![ZeroHello](../img/zerohello.png)

地址: [1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D](http://127.0.0.1:43110/1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D)

[源代码](https://github.com/HelloZeroNet/ZeroHello)

---

## ZeroBlog

个人发布博客演示

 - 内联内容编辑器
 - Markdown语法
 - 代码语法高亮
 - 通过Web界面进行站点签名和发布

它是如何工作的？

 - 站点文件中`data.json`包含了博客文章和评论。 每个用户都有自己的。
 - Upon pressing `Sign & Publish new content`, the blogger is asked for the site private key (displayed when [creating a new site using zeronet.py siteCreate command](create_new_site/))
 - Your ZeroNet client signs the new/modified files and publishes directly to other peers
 - The site will then be accessible until to other peers to view

![ZeroBlog](../img/zeroblog.png)

地址: [1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8](http://127.0.0.1:43110/1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8) or [blog.zeronetwork.bit](http://127.0.0.1:43110/blog.zeronetwork.bit)

[源代码](https://github.com/HelloZeroNet/ZeroBlog)


---

## ZeroTalk

分散的P2P论坛演示

 - Post and comment creation, modification, deletion and upvoting
 - Commenting and content modifications pushed directly to other peers
 - Only you can sign and modify your own files
 - Real time display of new comments

它是如何工作的？

 - To post and comment you have to request a certificate of registration (a cryptographic sign) from a ZeroID provider
 - After you have the certificate you can publish your content (messages, posts, upvotes) directly to other peers

![ZeroTalk](../img/zerotalk.png)

地址: [1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT](http://127.0.0.1:43110/1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT) or [talk.zeronetwork.bit](http://127.0.0.1:43110/talk.zeronetwork.bit)

[源代码](https://github.com/HelloZeroNet/ZeroTalk)

---

## ZeroMail

端到端加密，分布式P2P消息站点。 为了提高隐私性，它使用类似BitMessage的解决方案，不会公开邮件收件人。

 - Using ECIES for secret exchange, AES256 for message encoding
 - When you first visit the site, it adds your public key to your data file. At that point anyone is able to send a message to you
 - Everyone tries to decrypt every message, this improves privacy by making it impossible to find the message recipient
 - To reduce per message overhead and increase decryption speed, we re-use the AES key, but a new IV is generated every time

![ZeroTalk](../img/zeromail.png)

地址: [1MaiL5gfBM1cyb4a8e3iiL8L5gXmoAJu27](http://127.0.0.1:43110/1MaiL5gfBM1cyb4a8e3iiL8L5gXmoAJu27) or [mail.zeronetwork.bit](http://127.0.0.1:43110/mail.zeronetwork.bit)

[源代码](https://github.com/HelloZeroNet/ZeroMail)

---

## ZeroMe

分散的，类似Twitter的P2P社交网络。

 - Stores user information in ZeroMe user registry
 - Stores posts and comments in MergerSites called Hubs
 - Upload images as optional files
 - Real time display of feed activity
 
![ZeroMe](../img/zerome.png)

地址: [1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH](http://127.0.0.1:43110/1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH)

[源代码](https://github.com/HelloZeroNet/ZeroMe)

---

## ReactionGIFs

可选文件的演示，它是只有在浏览器请求时才从其他节点下载的文件。

![ReactionGIFs](../img/reactiongifs.jpg)

地址: [1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h](http://127.0.0.1:43110/1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h)

[源代码](https://github.com/HelloZeroNet/ReactionGIFs)

---

## ZeroChat

在不到100行代码中使用ZeroNet创建无服务器，SQL支持，实时更新的P2P聊天应用程序的教程的完成站点。

 - Uses ZeroID certificate for authentication
 - Stores messages in a SQLite database
 - Posts messages and distribute directly to other users in real-time
 - Real-time update the messages as they arrive

![ZeroChat](../img/zerochat.png)

Address of finished site: [1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg](http://127.0.0.1:43110/1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg)

Tutorial on ZeroBlog:
 [Part1](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:43:ZeroNet+site+development+tutorial+1),
 [Part2](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:46:ZeroNet+site+development+tutorial+2)
