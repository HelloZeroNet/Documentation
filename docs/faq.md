# Frequently asked questions


#### Do I need to have a port opened?

This is __optional__, you can browse and use ZeroNet sites without an open port.
If you want to create a new site it's highly recommended to have an open port.

At startup ZeroNet tries to open a port for you on your router using
[UPnP](https://wikipedia.org/wiki/Universal_Plug_and_Play), if this fails you have to do it manually:

- Try access your router's web interface using [http://192.168.1.1](http://192.168.1.1)
or [http://192.168.0.1](http://192.168.0.1)
- Look for an "Enable UPnP support" or similar option then restart ZeroNet.

If it still doesn't work then try to find a 'port forwarding' section. This is different in every router. [Here is a tutorial on YouTube.](https://www.youtube.com/watch?v=aQXJ7sLSz14) The port to forward is 15441.


---


#### Is ZeroNet anonymous?

It's no more anonymous than BitTorrent, but privacy (the possibility to find out who is the owner of the comment/site) will increase as the network and the sites gains more peers.

ZeroNet is made to work with anonymity networks: you can easily hide your IP using the Tor network.


---


#### How to use ZeroNet in Tor browser?

In Tor mode it's recommended to use ZeroNet in Tor Browser:

- Start the Tor Browser
- Go to address `about:preferences#advanced`
- Click `Settings...`
- Enter `127.0.0.1` to field **No proxy for**


---


#### How to use ZeroNet with Tor?

If you want to hide your IP install the latest version of ZeroNet then click Tor > Enable Tor for every connection on ZeroHello.

On Windows Tor is bundled with ZeroNet for other OS [follow Tor install instructions](https://www.torproject.org/docs/installguide.html),
edit your torrc configuration file by removing `#` from line `# ControlPort 9051` then restart your Tor service and ZeroNet.

> __Tip:__ You can verify your IP address using ZeroNet's [Stats](http://127.0.0.1:43110/Stats) page.

> __Tip:__ If you get connection errors make sure you have the latest version of Tor installed. (0.2.7.5+ required)


---


#### How to make ZeroNet work with Tor under Linux?

Upgrade to latest version of Tor (we need 0.2.7.5+), follow [these](https://www.torproject.org/docs/debian.html.en) instructions eg. for Debian:

 - `echo 'deb http://deb.torproject.org/torproject.org jessie main'>> /etc/apt/sources.list.d/tor.list`
 - `gpg --keyserver keys.gnupg.net --recv 886DDD89`
 - `gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -`
 - `apt-get update`
 - `apt-get install tor`

Edit config to enable control protocol:

 - `mcedit /etc/tor/torrc`
 - Remove the `#` character from lines `ControlPort 9051` and `CookieAuthentication 1` (line ~57)
 - `/etc/init.d/tor restart`
 - Add permission yourself to read the auth cookie by `usermod -a -G debian-tor [yourlinuxuser]`<br>(if you are not on Debian check the file's user group by `ls -al /var/run/tor/control.authcookie`)
 - Logout/Login with your user to apply group changes

> __Tip:__ You can verify if your Tor running correctly using `echo 'PROTOCOLINFO' | nc 127.0.0.1 9051`

> __Tip:__ It's also possible to use without modifying torrc (or using older version of Tor clients) by running `zeronet.py --tor disable --proxy 127.0.0.1:9050 --disable_udp`, but then you will lose ability to talk with other .onion addresses.



---

#### Can I use the same username on multiple machine?

Yes, you have to copy the `data/users.json` file to your new machine.


---


#### How can I register a .bit domain?

You can register .bit domains using [Namecoin](https://namecoin.info/).
Manage your domains using the client's GUI or by the [command line interface](http://www.christopherpoole.net/registering-a-bit-domain-with-namecoin.html).

After the registration is done you have to edit your domain's record by adding a zeronet section to it, eg.:

```
{
...
    "zeronet": {
        "": "1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr",
        "blog": "1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8",
        "talk": "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ"
    },
...
}
```
"" means the top domain, any other that is a sub-domain.

> __Tip:__ You can buy Namecoin for Bitcoin or other cryptocurrencies using [shapeshift.io](https://shapeshift.io/).

> __Tip:__ Other possibilities to register .bit domains: [domaincoin.net](https://domaincoin.net/), [peername.com](https://peername.com/), [dotbit.me](https://dotbit.me/)

> __Tip:__ You can verify your domain on [namecha.in](http://namecha.in/), for example: [zeroid.bit](http://namecha.in/name/d/zeroid)

> __Tip:__ You should use only [lower-cased letters, numbers and - in your domains](http://wiki.namecoin.info/?title=Domain_Name_Specification_2.0#Valid_Domains).

> __Tip:__ To make ZeroHello display your domain name instead of your site's Bitcoin address, add a domain key to your content.json. ([Example](https://github.com/HelloZeroNet/ZeroBlog/blob/master/content.json#L6))


---


#### Can I use the generated site address/private key to accept Bitcoin payments?

Yes, it's a standard Bitcoin address. The private key is WIF formatted, so you can import it in most clients.

> __Tip:__ It's not recommended to keep a high amount of money on your site's address, because you have to enter your private key every time you modify your site.


---


#### What happens when someone hosts malicious content?

The ZeroNet sites are sandboxed, they have the same privileges as any other website you visit over the Internet.
You are in full control of what you are hosting. If you find suspicious content you can stop hosting the site at any time.


---


#### Is it possible to install ZeroNet to a remote machine?
Yes, you have to enable the UiPassword plugin by renaming the __plugins/disabled-UiPassword__ directory to __plugins/UiPassword__,
then start ZeroNet on the remote machine using <br>`zeronet.py --ui_ip "*" --ui_password anypassword`.
This will bind the ZeroNet UI webserver to all interfaces, but to keep it secure you can only access it by entering the given password.

> __Tip:__ You can also restrict the interface based on ip address by using `--ui_restrict ip1 ip2`.

> __Tip:__ You can specify the password in config file by creating a `zeronet.conf` file and add `[global]`, `ui_password = anypassword` lines to it.


---


#### Is there anyway to track the bandwidth ZeroNet is using?

The sent/received bytes are displayed at ZeroNet's sidebar.<br>(open it by dragging the topright `0` button to left)

> __Tip:__ Per connection statistics page: [http://127.0.0.1:43110/Stats](http://127.0.0.1:43110/Stats)


---


#### What happens if two people use the same keys to modify a site?

Every content.json file is timestamped, the clients always accepts the newest one.


---


#### Does ZeroNet use Bitcoin's blockchain?

No, ZeroNet only uses the cryptography of Bitcoin for site addresses and content signing/verification.
The users identification is also based on Bitcoin's [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) format.

Namecoin's blockchain is being used for domain registrations.


---


#### Does ZeroNet only support HTML, CSS websites?

ZeroNet is built for dynamic, real-time updated websites, but you can serve any kind of files using it.
(VCS repositories, your own thin-client, database, etc.)


---


#### How can I create a new ZeroNet site?

[Follow those instructions.](/using_zeronet/create_new_site/)

---


#### How does it work?

- When you want to open a new site it asks visitors IP addresses from BitTorrent network
- First downloads a file named __content.json__, which holds all other filenames,
  __hashes__ and the site owner's cryptographic signature
- __Verifies__ the downloaded content.json file using the site's __address__ and the site owner's __signature__ from the file
- __Downloads other file__ (html, css, js...) and verifies them using the SHA512 hash for content.json file
- Each visited site becomes __also served by you__.
- If the site owner (who has the private key for the site address) __modifies__ the site, then he/she signs
  the new content.json and __publishes it to the peers__. After the peers have verified the content.json
  integrity (using the signature), they __download the modified files__ and publish the new content to other peers.

More info:
 [Description of ZeroNet sample sites](/using_zeronet/sample_sites/),
 [Slides about how does ZeroNet work](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub)
