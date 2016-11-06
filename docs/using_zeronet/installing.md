# Installing ZeroNet

* Download ZeroBundle package: [Microsoft Windows](https://github.com/HelloZeroNet/ZeroBundle/raw/master/dist/ZeroBundle-win.zip), [Apple OS X](https://github.com/HelloZeroNet/ZeroBundle/raw/master/dist/ZeroBundle-mac-osx.zip), [Linux 64bit](https://github.com/HelloZeroNet/ZeroBundle/raw/master/dist/ZeroBundle-linux64.tar.gz), [Linux 32bit](https://github.com/HelloZeroNet/ZeroBundle/raw/master/dist/ZeroBundle-linux32.tar.gz)
* Unpack anywhere
* Run `ZeroNet.cmd` (win), `ZeroNet(.app)` (osx), `ZeroNet.sh` (linux)

If you get "classic environment no longer supported" error on OS X: Open a Terminal window and drop ZeroNet.app on it

It downloads the latest version of ZeroNet then starts it automatically.

#### Manual install for Debian Linux

* `sudo apt-get update`
* `sudo apt-get install msgpack-python python-gevent`
* `wget https://github.com/HelloZeroNet/ZeroNet/archive/master.tar.gz`
* `tar xvpfz master.tar.gz`
* `cd ZeroNet-master`
* Start with `python zeronet.py`
* Open http://127.0.0.1:43110/ in your browser

### [Vagrant](https://www.vagrantup.com/)

* `vagrant up`
* Access VM with `vagrant ssh`
* `cd /vagrant`
* Run `python zeronet.py --ui_ip 0.0.0.0`
* Open http://127.0.0.1:43110/ in your browser

### [Docker](https://www.docker.com/)
* `docker run -d -v <local_data_folder>:/root/data -p 15441:15441 -p 127.0.0.1:43110:43110 nofish/zeronet`
* This Docker image includes the Tor proxy, which is disabled by default. Beware that some
hosting providers may not allow you running Tor in their servers. If you want to enable it,
set `ENABLE_TOR` environment variable to `true` (Default: `false`). E.g.:

 `docker run -d -e "ENABLE_TOR=true" -v <local_data_folder>:/root/data -p 15441:15441 -p 127.0.0.1:43110:43110 nofish/zeronet`
* Open http://127.0.0.1:43110/ in your browser

### [Virtualenv](https://virtualenv.readthedocs.org/en/latest/)

* `virtualenv env`
* `source env/bin/activate`
* `pip install msgpack-python gevent`
* `python zeronet.py`
* Open http://127.0.0.1:43110/ in your browser

 
