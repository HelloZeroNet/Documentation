# Installing ZeroNet

* Download ZeroBundle package: [Microsoft Windows](https://github.com/HelloZeroNet/ZeroBundle/releases/download/0.1.1/ZeroBundle-v0.1.1.zip), [Apple OS X](https://github.com/HelloZeroNet/ZeroBundle/releases/download/0.1.1/ZeroBundle-mac-v0.1.1.zip), [Linux 64bit](https://github.com/HelloZeroNet/ZeroBundle/releases/download/0.1.1/ZeroBundle-linux64-v0.1.1.tar.gz), [Linux 32bit](https://github.com/HelloZeroNet/ZeroBundle/releases/download/0.1.1/ZeroBundle-linux32-v0.1.1.tar.gz)
* Unpack anywhere
* Run `ZeroNet.cmd` (win), `ZeroNet(.app)` (osx), `ZeroNet.sh` (linux)

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
* `docker run -d -v <local_data_folder>:/root/data -p 15441:15441 -p 43110:43110 nofish/zeronet`
* Open http://127.0.0.1:43110/ in your browser

### [Virtualenv](https://virtualenv.readthedocs.org/en/latest/)

* `virtualenv env`
* `source env/bin/activate`
* `pip install msgpack-python gevent`
* `python zeronet.py`
* Open http://127.0.0.1:43110/ in your browser

 
