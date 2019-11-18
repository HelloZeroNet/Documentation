# Domande frequenti


#### Deve esserci una porta aperta?

Questo è __opzionale__, è possibile navigare e usare i siti ZeroNet senza una pora aperta.
Se si vuole creare un nuovo sito è raccomandato avere una porta aperta.

All'avvio ZeroNet tenta di aprire una porta sul vostro router utilizzando
[UPnP](https://wikipedia.org/wiki/Universal_Plug_and_Play), se fallisce deve essere eseguito manualmente:

- tentare di accedere all'interfaccia web del router utilizzando [http://192.168.1.1](http://192.168.1.1) o [http://192.168.0.1](http://192.168.0.1)
- cercare l'opzione "Abilitare supporto UPnP" o opzioni simili e riavviare ZeroNet.

Se ancora non funziona allora cercare la sezione 'inoltro porte' (port forwarding) nelle pagine del router.
Questo è diverso per ogni router. [Qui si trova un tutorial su YouTube.](https://www.youtube.com/watch?v=aQXJ7sLSz14). La porta da inoltrare è la 15441.


---


#### ZeroNet è anonimo?

Non è più anonimo di BitTorrent, ma la riservatezza (la possibilità di individuare chi è il proprietario del commento/sito) diminuirà man mano che la rete e i siti otterranno altri collegamenti.

ZeroNet è realizzato per funzionare con reti anonime: è facile nascondere il proprio IP utilizzando le reti Tor.


---


#### Come si utilizza ZeroNet con il browser Tor?

In modalità Tor è consigliato utilizzare ZeroNet con un browser Tor:

- avviare il browser Tor
- accedere all'indirizzo `about:preferences#advanced`
- fare clic su `Impostazioni...` (`Settings...`)
- inserire `127.0.0.1` nel campo **Non usare proxy per**
- accedere a http://127.0.0.1:43110 nel browser

Se si vede ancora una pagina bianca:
 - fare clic sul bottone SenzaScript (NoScript) (primo nella barra strumenti)
 - scegliere "Abilita temporaneamente tutto per questa pagina"
 - ricaricare la pagina

---


#### Come si utilizza ZeroNet con Tor?

Se si vuole nascondere il proprio indirizzo IP, installare l'ultima versione di ZeroNet e fare clic su Tor > Abilita Tor per ogni connessione su ZeroHello.

In Windows, Tor è fornito con ZeroNet. ZeroNet tenterà di scaricare e aprire Tor al primo avvio. Se fallisce per qualsiasi ragione, può essere installato manualmente seguendo le istruzioni in `core\tools\tor\manual_install.txt`.

Per altri sistemi operativi, seguire le istruzioni nella sezione "Come far funzionare ZeroNet con Tor in Linux/MacOS".

> __Suggerimento:__ Si può verificare il proprio indirizzo IP utilizzando la pagina ZeroNet [Statistiche](http://127.0.0.1:43110/Stats).

> __Suggerimento:__ Se si hanno errori di connessione, assicurarsi di avere l'ultima versione di Tor installata. (richiesta 0.2.7.5+)


---


#### Come si utilizza ZeroNet con Tor in Linux/MacOS?

 - Installare Tor per il sistema operativo usato seguendo la guda ufficiale Tor: [Linux](https://www.torproject.org/docs/tor-doc-unix.html.en) [Mac](https://www.torproject.org/docs/tor-doc-osx.html.en).
 - `sudo nano /etc/tor/torrc`
 - Eliminare il carattere `#` dalle linee `ControlPort 9051` e `CookieAuthentication 1` (linea ~57)
 - Riavviare Tor
 - Aggiungere il permesso a se stessi alla lettura del cookie di autorizzazione. Con Linux Debian, il comando è `sudo usermod -a -G debian-tor [vostroUtenteLinux]`<br>(se non siete in una Debian controllare il file dei gruppi utente in `ls -al /var/run/tor/control.authcookie`)
 - Eseguire logout/login con il vostro utente per applicare le modifiche

> __Suggerimento:__ Usare il comando `ls -ld /var/run/tor` per essere sicuri di avere i permessi `drwxr-sr-x` corretti. (sistemare con `chmod g+sx /var/run/tor/` se necessario)

> __Suggerimento:__ Si può verificare se Tor sta funzionando correttamente utilizzando `echo 'PROTOCOLINFO' | nc 127.0.0.1 9051`

> __Suggerimento:__ É anche possibile utilizzare Tor senza modificare torrc (o usare vecchie versioni dei client Tor), eseguendo `zeronet.py --tor disable --proxy 127.0.0.1:9050 --disable_udp`, ma questo impedirà la possibilità di dialogare con altri indirizzi .onion.


---

#### É possibile usare un file di configurazione?

Ogni parametro di configurazione della riga di comando può essere utilizzato come una opzione di configurazione. Inserire queste opzioni una per riga in un file nominato `zeronet.conf` nella cartella principale di zeronet (quella in cui è presente zeronet.py). Esempio:

```
[global]
data_dir = my-data-dir
log_dir = my-log-dir
ui_restrict =
 1.2.3.4
 2.3.4.5
```

Per visualizzare le possibili opzioni, tilizzare il comando `zeronet.py --help`

---


#### Come far funzionare Tor se l'ISP o il governo lo bloccano?

ZeroNet non include ancora i [trasporti Tor collegabili ](https://www.torproject.org/docs/pluggable-transports.html.en). Il modo più semplice per far funzionare Tor in una rete censurata è di avviare il browser Tor, configurarlo per connettersi con la rete Tor attraverso i trasporti collegabili attivi, e modificare la configurazione di ZeroNet per usare il proxy del browser Tor e la porta di controllo avviando ZeroNet con `--tor_controller 127.0.0.1:9151 --tor_proxy 127.0.0.1:9150` o aggiungendo questi parametri al file `zeronet.conf`.

```
[global]
tor_controller = 127.0.0.1:9151
tor_proxy = 127.0.0.1:9150
```


---


#### É possibile usare lo stesso nome utente su macchine diverse?

Sì, basta copiare il file `data/users.json` nella nuova macchina.


---


#### Come si crea un indirizzo di "fantasia" (non .bit) di un sito?

Utilizzare [vanitygen](https://bitcointalk.org/index.php?topic=25804.0) per generarne uno. Ua volta ottenute le chiavi, creare la cartella `data/1YourPublicKey...tCkBzAXTKvJk4uj8`. Inserire i file desiderati.

Navigare a [http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/](http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/). Trascinare il bottone `0` a sinistra e usare la barra scorrevole per registrare il sito.


---


#### Come si registra un dominio .bit?

Si può registrare un dominio .bit utilizzando [Namecoin](https://namecoin.info/).
Gestire i propri domini con l'interfaccia grafica del client o attraverso l'[interfaccia a riga comando](https://github.com/namecoin/wiki/blob/master/How-to-register-and-configure-.bit-domains.md).

Completata la registrazione deve essere modificato il registro del dominio aggiungendo la sezione `zeronet`, es.:

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

> __Suggerimento:__ Altre possibilità per registrare un dominio .bit: [domaincoin.net](https://domaincoin.net/), [peername.com](https://peername.com/), [dotbit.me](https://dotbit.me/)

> __Suggerimento:__ Il dominio può essere verificato in [namecha.in](http://namecha.in/), per esempio: [zeroid.bit](http://namecha.in/name/d/zeroid)

> __Suggerimento:__ Devono essere utilizzate solo [lettere minuscole, numeri e - nel dominio](http://wiki.namecoin.info/?title=Domain_Name_Specification_2.0#Valid_Domains).

> __Suggerimento:__ Perché ZeroHello visualizzi il nome del dominio invece del dell'indirizzo Bitcoin del sito, aggiungere una chiave di dominio al file content.json. ([Esempio](https://github.com/HelloZeroNet/ZeroBlog/blob/master/content.json#L6))


---


#### É possibile utilizzare l'indirizzo del sito/chiave privata per accettare pagamenti Bitcoin?

Sì, è un indirizzo Bitcoin standard. La chiave privata ha un formato WIF, che è possibile importare in molti client.

> __Suggerimento:__ Non è raccomandato mantenere un valore rilevante sull'indirizzo del sito, perché è necessario inserire la chiave privata ad ogni modifica del sito.


---


#### Cosa succede se si ospita contenuti maligni?

I siti ZeroNet sono isolati (sandbox), hanno gli stessi privilegi degli altri siti web che si visitano in Internet.
Si ha il pieno controllo di ciò che si ospita. Se si trovano dei contenuti sospetti è possibile smettere di ospitare il sito in qualsiasi momento.


---


#### É possibile installare ZeroNet su una macchina remota?

Sì, serve abilitare il plugin UiPassword rinominando la cartella __plugins/disabled-UiPassword__ in __plugins/UiPassword__,
quindi avviare ZeroNet nella macchina remota utilizzando <br>`zeronet.py --ui_ip "*" --ui_password qualsiasipassword`.
Questo collegherà l'interfaccia utente del webserver ZeroNet UI con tutte le interfaccie, ma per mantenerla sicura si potrà accedere solamente inserendo la password impostata.

> __Suggerimento:__ É possibile limitare l'interfaccia in base all'IP utilizzando `--ui_restrict ip1 ip2`.

> __Suggerimento:__ É possibile indicare la password nella configurazione creando un file `zeronet.conf` e aggiungendo le righe `[global]` e `ui_password = qualsiasipassword`.


---


#### É possibile monitorare la banda che ZeroNet sta utilizzando?

I byte spediti/ricevuto sono visualizzati nella barra laterale ZeroNet.<br>(per aprirla trascinare verso sinistra il bottone  `0` in alto a destra)

> __Suggerimento:__ Pagina delle statistiche per connessione: [http://127.0.0.1:43110/Stats](http://127.0.0.1:43110/Stats)


---


#### Cosa succede se due persone utilizzano la stessa kiave per modificare un sito?

Ogni file content.json ha un riferimento data-ora, il client accetta sempre il più recente con una firma valida.


---


#### ZeroNet utilizza la blockchain Bitcoin?

No, ZeroNet utilizza soltanto la critografia Bitcoin per l'indirizzamento del sito e la fimra/verifica del contenuto.
L'identificazione dell'utente si basa sul formato Bitcoin [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).

La blockchain Namecoin è utilizzata per la registrazione del dominio, comunque il client non scarica la blockchain. I metadati della blockchain sono invece trasmessi attraverso la rete ZeroNet.


---


#### ZeroNet supporta solo siti HTML, CSS?

ZeroNet è sviluppata per siti dinamici aggiornati in tempo reale, ma posso essere distribuiti file di qualsiasi tipo, come depositi VCS, il proprio thin-client, database, ecc.


---


#### Come si crea un nuovo sito ZeroNet?

[Seguire queste istruzioni.](../using_zeronet/create_new_site/)

---


#### Cosa succede quando si accede ad un sito?

- Quando si richiede di aprire un nuovo sito viene richiesto l'IP del visitatore dal registro BitTorrent.
- Inizialmente, viene scaricato il file __content.json__, che contiene tutti i nomi degli altri file,
  __chiavi__ (hashe) e la firma criptografica del proprietario del sito.
- Il file content.json scaricato viene __verificato__ utilizzando l'__indirizzo__ del sito e la __firma__ del proprietario del sito presente nel file.
- Quindi vengono __scaricati__ gli altri file (html, css, js...) e verificati utilizzando la loro dimensione e la chiave SHA512 dal file content.json.
- Ogni sito visitato diventa __distribuito dal visitatore__.
- Se il proprietario del sito (che ha la chiave privata dell'indirizzo dle sito) __modifica__ il sito, allora viene firmato il nuovo
  content.json e __pubbicato ai peer (distributori)__. Dopo che i peer hanno verificato l'integrità del file
  (utilizzando la firma), __scaricano i file modificati__ e forniscono i nuovi contenuti ad altri peer.

Ulteriori informazioni:
 [Siti esempio ZeroNet](../using_zeronet/sample_sites/),
 [Presentazione di come lavora ZeroNet](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub)
