# Frequently asked questions


#### Do I need to have open port?
This is __optional__, you can browse and use ZeroNet sites without an open port.
If you want to create new site it's highly recommended to have an open port.

At startup ZeroNet tries to open a port for you on your router using 
[UPnP](https://wikipedia.org/wiki/Universal_Plug_and_Play), if this fail you have to do it manually:

- Try access your router's webui using [http://192.168.1.1](http://192.168.1.1) 
or [http://192.168.0.1](http://192.168.0.1)
- Look for "enable UPnP support" option then restart ZeroNet.

If it's still not works then try to find forward section. This is different in every router, here is a tutorial on youtube: 
[https://www.youtube.com/watch?v=aQXJ7sLSz14](https://www.youtube.com/watch?v=aQXJ7sLSz14) (you have to forward port 15441)


---


#### How to use ZeroNet with Tor?
You have to install [Tor](https://www.torproject.org/) then start ZeroNet using `zeronet.py --proxy 127.0.0.1:9050 --disable_udp` command.

> __Tip:__ You can verify your IP address using ZeroNet's [Stats](http://127.0.0.1:43110/Stats) page.

> __Tip:__ If you get connection errors make sure you have the latest version of Tor installed.



---


#### How can I register a .bit domain?
You can register .bit domains using [Namecoin](https://namecoin.info/). 
You can manage your domains using the client's GUI or by the [command line interface](http://christopherpoole.github.io/registering-a-.bit-domain-with-namecoin/).

After the registration done you have to edit your domain's record by adding a zeronet section to it, eg.:

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
"" means the top domain, any other that that is a sub-domain.


> __Tip:__ You can buy namecoins using bitcoin or other cryptocurrencies using [shapeshift.io](https://shapeshift.io/).

> __Tip:__ Other possibilities to register .bit domains: [domaincoin.net](https://domaincoin.net/), [peername.com](https://peername.com/), [dotbit.me](https://dotbit.me/)

> __Tip:__ You can verify you domain using [namecha.in](http://namecha.in/), for example: [zeroid.bit](http://namecha.in/name/d/zeroid)

> __Tip:__ You should use only [lower-cased letters, numbers and - in your domains](http://wiki.namecoin.info/?title=Domain_Name_Specification_2.0#Valid_Domains).

> __Tip:__ To make ZeroHello to your domain instead of your site's address add a domain key to your content.json. ([example](https://github.com/HelloZeroNet/ZeroBlog/blob/master/content.json#L6))

---


#### Can I use the generated site address/private key to accept Bitcoin payments?

Yes, it's a standard Bitcoin addresses, you can import the private key to your client, 
its using the standard WIF format.

> __Tip:__ It's not recommended to keep high amount of money on your site's address, because you have to enter your private key every time you modify your site.


---


#### What happens when someone hosting malicious content?
You are in full control what are you hosting, if you find a suspicious content you can stop hosting the site any time.


---


#### Is it possible to install ZeroNet to remote machine?
Yes, you have to start ZeroNet using `zeronet.py --ui_restrict 127.0.0.1 123.123.123.123 --ui_ip "*"` 
This will bind the ZeroNet ui webserver to all interfaces, but to keep it secure 
accepts connections only from ip 127.0.0.1 and 123.123.123.123. 

> __Info:__ Password based authentication is planned later


---


#### Is there anyway to track the bandwidth ZeroNet using?
The sent/received bytes displayed at ZeroNet's statistic page: [http://127.0.0.1:43110/Stats](http://127.0.0.1:43110/Stats)


---


#### What happens if two people use the same keys?
Every content.json file is timestamped, the clients always accepts the newest one.


---


#### Does ZeroNet only support HTML, CSS websites? 
ZeroNet is built for dynamic, real-time updated websites, but you can server any kind of files using it. 
(GIT repository, your own thin-client, database, etc.)


---


#### How does it work?

- When you want to open a new site it asks visitors IP addresses from BitTorrent network
- First downloads a file named __content.json__, which holds all other filenames, 
  __hashes__ and the site owner's cryptographic signature
- __Verifies__ the downloaded content.json file using the site's __address__ and the site owner's __signature__ from the file
- __Downloads other file__ (html, css, js...) and verifies them using the SHA512 hash fro content.json file
- Each visited site becomes __also served by you__.
- If the site owner (who has the private key for the site address) __modifies__ the site, then he/she signs 
  the new content.json and __publishes it to the peers__. After the peers have verified the content.json 
  integrity (using the signature), they __download the modified files__ and publish the new content to other peers.

More info: 
 [Description of ZeroNet sample sites](/using_zeronet/sample_sites/), 
 [Slides about how does ZeroNet work](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub)

