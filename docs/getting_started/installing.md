# Installing ZeroNet

### Windows

* [Install Python 2.7](https://www.python.org/ftp/python/2.7.9/python-2.7.9.msi)
* [Install Python ZeroMQ](http://zeronet.io/files/windows/pyzmq-14.4.1.win32-py2.7.exe)
* [Install Python Greenlet](http://zeronet.io/files/windows/greenlet-0.4.5.win32-py2.7.exe)
* [Install Python Gevent](http://zeronet.io/files/windows/gevent-1.0.1.win32-py2.7.exe)
* [Install Python MsgPack](http://zeronet.io/files/windows/msgpack-python-0.4.2.win32-py2.7.exe)
* [Download and extract ZeroNet](https://codeload.github.com/HelloZeroNet/ZeroNet/zip/master) to any directory
* Start `start.py`

### Linux

#### Debian

* `sudo apt-get update`
* `sudo apt-get install build-essential python-dev python-pip git` 
* `sudo pip install pyzmq gevent msgpack-python`
* `git clone https://github.com/HelloZeroNet/ZeroNet.git`
* `cd ZeroNet`
* Start with `python zeronet.py`
* Open http://127.0.0.1:43110/ in your browser and enjoy! :)

#### Other Linux or without root access

* Check your python version using `python --version` if the returned version is not `Python 2.7.X` then try `python2` or `python2.7` command and use it from now
* `wget https://bootstrap.pypa.io/get-pip.py` 
* `python get-pip.py --user pyzmq gevent msgpack-python`
* `wget https://codeload.github.com/HelloZeroNet/ZeroNet/tar.gz/master`
* `tar xvpfz master`
* Start with `python zeronet.py`