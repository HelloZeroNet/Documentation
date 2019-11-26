# Installazione ZeroNet

* Scaricare il pacchetto ZeroBundle: [Microsoft Windows](https://github.com/HelloZeroNet/ZeroNet-win/archive/dist/ZeroNet-win.zip), [Apple macOS](https://github.com/HelloZeroNet/ZeroNet-mac/archive/dist/ZeroNet-mac.zip), [Linux 64bit](https://github.com/HelloZeroNet/ZeroBundle/raw/master/dist/ZeroBundle-linux64.tar.gz), [Linux 32bit](https://github.com/HelloZeroNet/ZeroBundle/raw/master/dist/ZeroBundle-linux32.tar.gz)
* Estrarre in una qualsiasi cartella
* Eseguire `ZeroNet.exe` (win), `ZeroNet(.app)` (macOS), `ZeroNet.sh` (linux)

### Installazione manuale per Linux Debian

* `sudo apt-get update`
* `sudo apt-get install msgpack-python python-gevent`
* `wget https://github.com/HelloZeroNet/ZeroNet/archive/master.tar.gz`
* `tar xvpfz master.tar.gz`
* `cd ZeroNet-master`
* Avviare con `python zeronet.py`
* Aprire http://127.0.0.1:43110/ nel browser

### [Vagrant](https://www.vagrantup.com/)

* `vagrant up`
* Accedere alla VM con `vagrant ssh`
* `cd /vagrant`
* Eseguire `python zeronet.py --ui_ip 0.0.0.0`
* Aprire http://127.0.0.1:43110/ nel browser

### [Docker](https://www.docker.com/)
* `docker run -d -v <local_data_folder>:/root/data -p 15441:15441 -p 127.0.0.1:43110:43110 nofish/zeronet`
* Questa immagine Docker include il proxy Tor, che è disabilitato di default. Fare attenzione che alcuni provider di hosting non consentono di eseguire Tor nei loro server. Se lo si vuole abilitare, impostare la variabile d'ambiente `ENABLE_TOR` a `true` (Predefinito: `false`). Es.:

 `docker run -d -e "ENABLE_TOR=true" -v <local_data_folder>:/root/data -p 15441:15441 -p 127.0.0.1:43110:43110 nofish/zeronet`
* Aprire http://127.0.0.1:43110/ nel browser

### [Virtualenv](https://virtualenv.readthedocs.org/en/latest/)

* `virtualenv env`
* `source env/bin/activate`
* `pip install msgpack-python gevent`
* `python zeronet.py`
* Aprire http://127.0.0.1:43110/ nel browser
