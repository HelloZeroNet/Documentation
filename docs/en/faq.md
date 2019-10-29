# Frequently asked questions


#### Do I need to have a port opened?

This is __optional__, you can browse and use ZeroNet sites without an open port.
If you want to create a new site it's highly recommended to have an open port.

At startup ZeroNet tries to open a port for you on your router using
[UPnP](https://wikipedia.org/wiki/Universal_Plug_and_Play), if this fails you have to do it manually:

- Try to access your router's web interface using [http://192.168.1.1](http://192.168.1.1)
or [http://192.168.0.1](http://192.168.0.1)
- Look for an "Enable UPnP support" or similar option then restart ZeroNet.

If it still doesn't work then try to find a 'port forwarding' section of your router page. This is different for every router. [Here is a tutorial on YouTube.](https://www.youtube.com/watch?v=aQXJ7sLSz14) The port to forward is 15441.


---


#### Is ZeroNet anonymous?

It's no more anonymous than BitTorrent, but privacy (the possibility to find out who is the owner of the comment/site) will increase as the network and the sites gains more peers.

ZeroNet is made to work with anonymity networks: you can easily hide your IP using the Tor network.


---


#### How to use ZeroNet with the Tor browser?

In Tor mode it is recommended to use ZeroNet from within the Tor Browser:

- Start the Tor Browser
- Go to address `about:config` & accept risk warning
- Search `no_proxies_on`
- Double click the preference entry
- Enter `127.0.0.1` & press OK
- Open [http://127.0.0.1:43110](http://127.0.0.1:43110) in the browser

If you still see a blank page:

 - Click on NoScript's button (first on the toolbar)
 - Choose "Temporary allow all this page"
 - Reload the page

---


#### How to use ZeroNet with Tor?

If you want to hide your IP address, install the latest version of ZeroNet then click Tor > Enable Tor for every connection on ZeroHello.

On Windows, Tor is bundled with ZeroNet. ZeroNet will attempt to download and unpack Tor on its first run. If this fails for any reason, you can install it manually following the instruction in `core\tools\tor\manual_install.txt`.

For other OS's, follow the instructions in the "How to make ZeroNet work with Tor under Linux/MacOS" section.

> __Tip:__ You can verify your IP address using ZeroNet's [Stats](http://127.0.0.1:43110/Stats) page.

> __Tip:__ If you get connection errors, make sure you have the latest version of Tor installed. (0.2.7.5+ required)


---


#### How to make ZeroNet work with Tor under Linux/MacOS?

 - Install Tor for your OS following Tor's official guidelines: [Linux](https://www.torproject.org/docs/tor-doc-unix.html.en) [Mac](https://www.torproject.org/docs/tor-doc-osx.html.en).
 - `sudo nano /etc/tor/torrc`
 - Remove the `#` character from lines `ControlPort 9051` and `CookieAuthentication 1` (line ~57)
 - Restart tor
 - Add permission for yourself to read the auth cookie. With Debian Linux, the command is `sudo usermod -a -G debian-tor [yourlinuxuser]`<br>(if you are not on Debian check the file's user group by `ls -al /var/run/tor/control.authcookie`)
 - Logout/Login with your user to apply group changes

> __Tip:__ Use the `ls -ld /var/run/tor` command to make sure it has the correct `drwxr-sr-x` permission bits. (fix it with `chmod g+sx /var/run/tor/` if necessary)

> __Tip:__ You can verify if your Tor setup is running correctly using `echo 'PROTOCOLINFO' | nc 127.0.0.1 9051`

> __Tip:__ It's also possible to use Tor without modifying torrc (or to use older versions of Tor clients), by running `zeronet.py --tor disable --proxy 127.0.0.1:9050 --disable_udp`, but then you will lose ability to talk with other .onion addresses.


---

#### Is it possible to use a configuration file?

Any command line configuration flag can also be used as a configuration option. Place these options line-by-line into a file called `zeronet.conf` in your top-level zeronet directory (the one with zeronet.py). Example:

```
[global]
data_dir = my-data-dir
log_dir = my-log-dir
ui_restrict =
 1.2.3.4
 2.3.4.5
```

To list possible options, use the `zeronet.py --help` command

---


#### How to make Tor work if my ISP or goverment blocks it?

ZeroNet does not include [Tor pluggable transports](https://www.torproject.org/docs/pluggable-transports.html.en) yet. The easiest way to make Tor work in a censored network is to start the Tor browser, configure it to connect to the Tor network with working pluggable transports, and modify ZeroNet's config to use Tor browser's proxy and control port by starting ZeroNet with `--tor_controller 127.0.0.1:9151 --tor_proxy 127.0.0.1:9150` or by adding these parameters to `zeronet.conf`.

```
[global]
tor_controller = 127.0.0.1:9151
tor_proxy = 127.0.0.1:9150
```


---


#### Can I use the same username on multiple machines?

Yes, simply copy the `data/users.json` file to your new machine.


---


#### How to create a "fancy" (non .bit) site address?

Use [vanitygen](https://bitcointalk.org/index.php?topic=25804.0) to generate one. Once you get your keys, create `data/1YourPublicKey...tCkBzAXTKvJk4uj8` directory. Put some files there.

Then navigate to [http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/](http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/). Drag the `0` button to the left and use the sidebar to sign your site.


---


#### How can I register a .bit domain?

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

> __Tip:__ You can specify the password in the config file by creating a `zeronet.conf` file and adding `[global]` and `ui_password = anypassword` lines to it.


---


#### Is there any way to track the bandwidth ZeroNet is using?

The sent/received bytes are displayed at ZeroNet's sidebar.<br>(open it by dragging the topright `0` button to left)

> __Tip:__ Per connection statistics page: [http://127.0.0.1:43110/Stats](http://127.0.0.1:43110/Stats)


---


#### What happens if two people use the same keys to modify a site?

Every content.json file is timestamped, the clients always accept the newest one with a valid signature.


---


#### Does ZeroNet use Bitcoin's blockchain?

No, ZeroNet only uses the cryptography of Bitcoin for site addresses and content signing/verification.
User identification is based on Bitcoin's [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) format.

Namecoin's blockchain is being used for domain registrations, however clients do not download the blockchain. Blockchain metadata is instead passed over the ZeroNet network.


---


#### Does ZeroNet only support HTML, CSS websites?

ZeroNet is built for dynamic, real-time updated websites, but you can serve any kind of files using it, such as (VCS repositories, your own thin-client, database, etc.


---


#### How can I create a new ZeroNet site?

[Follow these instructions.](../using_zeronet/create_new_site/)

---


#### What happens when I access a site?

- When you want to open a new site it asks for visitor's IP addresses from BitTorrent trackers.
- Initially, a file named __content.json__ is downloaded, which holds all other filenames,
  __hashes__ and the site owner's cryptographic signature.
- The downloaded content.json file is __verified__ using the site's __address__ and the site owner's __signature__ from the file.
- Other files (html, css, js...) are then __downloaded__ and verified using their size and SHA512 hash from content.json.
- Each visited site then becomes __also served by you__.
- If the site owner (who has the private key for the site address) __modifies__ the site, then he/she signs
  the new content.json and __publishes it to peers__. After the peers have verified the file's
  integrity (using the signature), they __download the modified files__ and serve the new content to other peers.

More info:
 [ZeroNet sample sites](../using_zeronet/sample_sites/),
 [Slideshow about how ZeroNet works](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub)
