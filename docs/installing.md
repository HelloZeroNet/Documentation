# Installing ZeroNet

### Windows

* [Install Python 2.7](https://www.python.org/ftp/python/2.7.9/python-2.7.9.msi)
* [Install Python ZeroMQ](http://zeronet.io/files/windows/pyzmq-14.4.1.win32-py2.7.exe)
* [Install Python Greenlet](http://zeronet.io/files/windows/greenlet-0.4.5.win32-py2.7.exe)
* [Install Python Gevent](http://zeronet.io/files/windows/gevent-1.0.1.win32-py2.7.exe)
* [Install Python MsgPack](http://zeronet.io/files/windows/msgpack-python-0.4.2.win32-py2.7.exe)
* Start `start.py`

### Linux

#### Debian

* `apt-get install python-dev python-pip` 
* `pip install pyzmq gevent msgpack-python`
* Start with `python zeronet.py`

#### Without root access

* `wget https://bootstrap.pypa.io/get-pip.py` 
* `python get-pip.py --user pyzmq gevent msgpack-python`
* Start with `python zeronet.py`