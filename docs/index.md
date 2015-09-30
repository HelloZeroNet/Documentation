# What is ZeroNet?

ZeroNet uses Bitcoin cryptography and BitTorrent technology to build a **decentralized censorship-resistant network**.

Users can publish static or dynamic websites into ZeroNet and visitors can choose to also serve the website. Websites will remain online even if it is being served by only one peer.

When a site is updated by its owner, all nodes serving that site (previous visitors) will receive only the incremental updates done to the site content.

ZeroNet counts with a built-in SQL database. This makes content-heavy site development easy. The DB is also synced with hosting nodes with incremental updates.


# Why?

* We believe in open, free, and uncensored communication.
* No censorship: After something is published there is no way to remove it.
* No single point of failure: Content remains online even if only one peer is serving it.
* Impossible to shut down: It's nowhere because it's everywhere. Content is served by any user who wishes to.
* Fast: ZeroNet uses BitTorrent technology to deliver content faster than centralised servers.
* Works offline: You can access the site even if your internet is unavailable.
* Secure: Content ownership is secured using the same cryptography that secures your Bitcoin wallet.

[comment]: <> (I'm unsure about the following bit. Thoughts?)
[comment]: <> (# What problem is ZeroNet solving?)

[comment]: <> (When Tim Berners-Lee created the internet, he meant for it to be free. Not surveilled nor censored. And [he is still fighting for that](http://edition.cnn.com/2014/03/12/tech/web/tim-berners-lee-web-freedom/).)

[comment]: <> (The internet is centralized mainly in two places: Content and Domain Names (URLs) are hosted and controlled by central servers. If you control the central servers (and if you are powerful enough you do) you control the network.)

[comment]: <> (**Decentralized content storage**)

[comment]: <> (ZeroNet tackles the content storage problem by giving everyone the ability to store content. Site visitors can choose to store a website on their computers, and when they do this they also help to serve the site to other users. The site is online even if only one user is hosting it.)

[comment]: <> (**Shared DNS cache**)

[comment]: <> (Site addresses on ZeroNet are cached by all network members. When you type a ZeroNet site URL on your browser this will query other peers connected to you about the site. If one of these peers happen to have the site they will send it to you, if not, they will forward your query along.)

[comment]: <> (This architecture means that when a site URL is created, as long as one peer is serving it, there is no way to take the URL down.)


# Features
 * Easy, zero configuration setup.
 * Password-less [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
   based authorization: Your account is protected by the same cryptography as your Bitcoin wallet.
 * Real-time updated sites.
 * Namecoin .bit domains support.
 * SQL Database support: Allows for easier site development and faster page load times.
 * Tor network support.
 * TLS encrypted connections.
 * Automatic, uPnP port opening.
 * Plugin for multiuser (openproxy) support.
 * Works with any browser/OS.


# How does it work?

* After you install and run ZeroNet, you open a site by visiting:
  `http://127.0.0.1:43110/{zeronet_site_address}`
  (eg.  `http://127.0.0.1:43110/1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr`).
* ZeroNet will then use the BitTorrent network to find peers that are seeding the site and will download the site content (HTML, CSS, JS...) from these peers.
* Each visited site becomes also served by you.
* Every site contains a list of all files used in the site in a Sha512 hash and a signature generated using the site owner private key.
* If the site owner modifies the site, then he/she signs a new list and publishes it to the peers.
  After the peers have verified the files list integrity (using the
  signature), they download the modified files and publish the new content to
  other peers.

##### [Slideshow about ZeroNet cryptography, content updates, multi-user sites &raquo;](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub?start=false&loop=false&delayms=3000)


# Screenshots

![Screenshot](http://zeronet.readthedocs.org/en/latest/img/zerohello.png)

![ZeroTalk](http://zeronet.readthedocs.org/en/latest/img/zerotalk.png)

##### [More screenshots &raquo;](/using_zeronet/sample_sites/)

# Current limitations

* No torrent-like, file splitting for big file support
* No more anonymous than BitTorrent
* File transactions are not compressed ~~or encrypted yet~~
* No private sites
* <s>You must have an open port to publish new changes</s>
* <s>Timeout problems on slow connections</s>

# Help to keep this project alive

Bitcoin: 1QDhxQ6PraUZa21ET5fYUCPgdrwBomnFgX


### Thank you!

* More info, help, changelog, zeronet sites: [http://www.reddit.com/r/zeronet/](http://www.reddit.com/r/zeronet/)
* Come, chat with us: [#zeronet @ FreeNode](https://kiwiirc.com/client/irc.freenode.net/zeronet) or on [gitter](https://gitter.im/HelloZeroNet/ZeroNet)
