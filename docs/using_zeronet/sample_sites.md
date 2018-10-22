# Sample ZeroNet sites

## ZeroHello

The homepage of ZeroNet

 - Lists all added sites: Title, Peer number, Modification date, etc.
 - Site actions: Update, Pause, Resume, Delete, Check Files and Save as .zip
 - Clone sites to have your own blog / forum
 - ZeroNet Statistics
 - If an update is available, ZeroNet can be updated with one click

![ZeroHello](../img/zerohello.png)

Address: [1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D](http://127.0.0.1:43110/1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D)

[Source code](https://github.com/HelloZeroNet/ZeroHello)

---

## ZeroBlog

Self publishing blog demo

 - Inline content editor
 - Markdown syntax
 - Code syntax highlighting
 - Site signing & publishing through the web interface

How does it work?

 - `data.json` contained within site files contain blog posts and comments. Each user has their own.
 - Upon pressing `Sign & Publish new content`, the blogger is asked for the site private key (displayed when [creating a new site using zeronet.py siteCreate command](create_new_site/))
 - Your ZeroNet client signs the new/modified files and publishes directly to other peers
 - The site will then be accessible until to other peers to view

![ZeroBlog](../img/zeroblog.png)

Address: [1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8](http://127.0.0.1:43110/1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8) or [blog.zeronetwork.bit](http://127.0.0.1:43110/blog.zeronetwork.bit)

[Source code](https://github.com/HelloZeroNet/ZeroBlog)


---

## ZeroTalk

Decentralized, P2P forum demo

 - Post and comment creation, modification, deletion and upvoting
 - Commenting and content modifications pushed directly to other peers
 - Only you can sign and modify your own files
 - Real time display of new comments

How does it work?

 - To post and comment you have to request a certificate of registration (a cryptographic sign) from a ZeroID provider
 - After you have the certificate you can publish your content (messages, posts, upvotes) directly to other peers

![ZeroTalk](../img/zerotalk.png)

Address: [1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT](http://127.0.0.1:43110/1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT) or [talk.zeronetwork.bit](http://127.0.0.1:43110/talk.zeronetwork.bit)

[Source code](https://github.com/HelloZeroNet/ZeroTalk)

---

## ZeroMail

End-to-end encrypted, distributed, P2P messaging site. To improve privacy it uses a BitMessage-like solution and will not expose the message recipient.

 - Using ECIES for secret exchange, AES256 for message encoding
 - When you first visit the site, it adds your public key to your data file. At that point anyone is able to send a message to you
 - Everyone tries to decrypt every message, this improves privacy by making it impossible to find the message recipient
 - To reduce per message overhead and increase decryption speed, we re-use the AES key, but a new IV is generated every time

![ZeroTalk](../img/zeromail.png)

Address: [1MaiL5gfBM1cyb4a8e3iiL8L5gXmoAJu27](http://127.0.0.1:43110/1MaiL5gfBM1cyb4a8e3iiL8L5gXmoAJu27) or [mail.zeronetwork.bit](http://127.0.0.1:43110/mail.zeronetwork.bit)

[Source code](https://github.com/HelloZeroNet/ZeroMail)

---

## ZeroMe

Decentralized, Twitter-like P2P social network.

 - Stores user information in ZeroMe user registry
 - Stores posts and comments in MergerSites called Hubs
 - Upload images as optional files
 - Real time display of feed activity
 
![ZeroMe](../img/zerome.png)

Address: [1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH](http://127.0.0.1:43110/1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH)

[Source code](https://github.com/HelloZeroNet/ZeroMe)

---

## ReactionGIFs

Demo for optional files, files which only download from other peers if your browser requests them.

![ReactionGIFs](../img/reactiongifs.jpg)

Address: [1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h](http://127.0.0.1:43110/1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h)

[Source code](https://github.com/HelloZeroNet/ReactionGIFs)

---

## ZeroChat

The finished site for the tutorial of creating a server-less, SQL backed, real-time updated P2P chat application using ZeroNet in less than 100 lines of code.

 - Uses ZeroID certificate for authentication
 - Stores messages in a SQLite database
 - Posts messages and distribute directly to other users in real-time
 - Real-time update the messages as they arrive

![ZeroChat](../img/zerochat.png)

Address of finished site: [1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg](http://127.0.0.1:43110/1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg)

Tutorial on ZeroBlog:
 [Part1](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:43:ZeroNet+site+development+tutorial+1),
 [Part2](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:46:ZeroNet+site+development+tutorial+2)
