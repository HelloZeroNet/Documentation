# Installing ZeroNet

## Windows

### Bundle package (all included)
* [Download ZeroBundle package](https://github.com/HelloZeroNet/ZeroBundle/releases/download/0.1.0/ZeroBundle-v0.1.0.zip) (Python 2.7.9 and all other requirements included)
* Unpack to any directory
* Run `zeronet.cmd`

It will download the latest version of ZeroNet and start it automatically.


### Alternative method for Windows (separated python install)

* [Install Python 2.7](https://www.python.org/ftp/python/2.7.9/python-2.7.9.msi)
* [Install Python Greenlet](http://zeronet.io/files/windows/greenlet-0.4.5.win32-py2.7.exe)
* [Install Python Gevent](http://zeronet.io/files/windows/gevent-1.0.1.win32-py2.7.exe)
* [Install Python MsgPack](http://zeronet.io/files/windows/msgpack-python-0.4.2.win32-py2.7.exe)
* [Download and extract ZeroNet](https://codeload.github.com/HelloZeroNet/ZeroNet/zip/master) to any directory
* Run `start.py`

## Linux

### Debian

* `sudo apt-get update`
* `sudo apt-get install msgpack-python python-gevent python-dnspython` 
* `wget https://github.com/HelloZeroNet/ZeroNet/archive/master.tar.gz`
* `tar xvpfz master.tar.gz`
* `cd ZeroNet-master`
* Start with `python zeronet.py`
* Open http://127.0.0.1:43110/ in your browser and enjoy! :)

### Other Distro or without root access

* Check your python version using `python --version` if the returned version is not `Python 2.7.X` then try `python2` or `python2.7` command and use it from now
* `wget https://bootstrap.pypa.io/get-pip.py`
* `python get-pip.py --user gevent msgpack-python dnspython`
* `wget https://codeload.github.com/HelloZeroNet/ZeroNet/tar.gz/master`
* `tar xvpfz master`
* Start with `python zeronet.py`

## Mac

 * Install [brew](http://brew.sh/)
 * `brew install python`
 * `pip install gevent msgpack-python dnspython`
 * [Download](https://github.com/HelloZeroNet/ZeroNet/archive/master.zip), Unpack, run `python zeronet.py`
 
## Vagrant

* `vagrant up`
* Access VM with `vagrant ssh`
* `cd /vagrant`
* Run `python zeronet.py --ui_ip 0.0.0.0`
* Open http://127.0.0.1:43110/ in your browser

## Docker
* `docker run -p 15441:15441 -p 43110:43110 nofish/zeronet​`
* Open http://127.0.0.1:43110/ in your browser

 
