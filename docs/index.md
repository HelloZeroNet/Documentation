# ZeroNet

Decentralized websites using Bitcoin crypto and the BitTorrent network


## Why?

* We believe in open, free, and uncensored network and communication.
* No single point of failure: Site remains online so long as at least 1 peer
  serving it.
* No hosting costs: Sites are served by visitors.
* Impossible to shut down: It's nowhere because it's everywhere.
* Fast and works offline: You can access the site even if your internet is
  unavailable.


## How does it work?

* After starting `zeronet.py` you will be able to visit zeronet sites using
  `http://127.0.0.1:43110/{zeronet_address}` (eg. 
  `http://127.0.0.1:43110/1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr`).
* When you visit a new zeronet site, it tries to find peers using the BitTorrent
  network so it can download the site files (html, css, js...) from them.
* Each visited site becomes also served by you.
* Every site contains a `site.json` which holds all other files in a sha512 hash
  and a signature generated using site's private key.
* If the site owner (who has the private key for the site address) modifies the
  site, then he/she signs the new `content.json` and publishes it to the peers.
  After the peers have verified the `content.json` integrity (using the
  signature), they download the modified files and publish the new content to
  other peers.


## Screenshot

![Screenshot](http://i.imgur.com/QaZhUCk.png)

### [More screenshots &raquo;](getting_started/sample_sites)

## Current limitations

* No torrent-like, file splitting for big file support
* No more anonymous than Bittorrent
* File transactions are not compressed or encrypted yet
* No private sites
* You must have an open port to publish new changes
* Timeout problems on slow connections


## If you want to help keep this project alive

Bitcoin: 1QDhxQ6PraUZa21ET5fYUCPgdrwBomnFgX


#### Thank you!

* More info, help, changelog, zeronet sites: [http://www.reddit.com/r/zeronet/](http://www.reddit.com/r/zeronet/)
* Come, chat with us: [#zeronet @ FreeNode](https://kiwiirc.com/client/irc.freenode.net/zeronet) or on [gitter](https://gitter.im/HelloZeroNet/ZeroNet)
