# Protocollo di rete ZeroNet

 - Ogni messaggio è codificato utilizzando [MessagePack](http://msgpack.org/)
 - Ogni richiesta ha tre parametri:
    * `cmd`: il comando richiesto
    * `req_id`: un ID univoco della richiesta (semplice parola univoca incrementata per connessione), il client deve includerla nella risposta al comando
    * `params`: parametri della richiesta
 - Esempio di richiesta: `{"cmd": "getFile", "req_id": 1, "params:" {"site": "1EU...", "inner_path": "content.json", "location": 0}}`
 - Esempio di risposta: `{"cmd": "response", "to": 1, "body": "content.json content", "location": 1132, "size": 1132}`
 - Esmpio risposta con errore: `{"cmd": "response", "to": 1, "error": "Unknown site"}`


# Handshake
Ogni connessione inizia con un riconoscimento (handshake) inviando una richiesta all'indirizzo richiesto della rete:

Parametro            | Descrizione
                 --- | ---
**crypt**            | Null/None, utilizzato solo nelle risposte
**crypt_supported**  | Un elenco di metodi di crittografia supportati dal client
**fileserver_port**  | porta del file server del client
**onion**            | (utilizzato solo su Tor) indirizzo onion del client
**protocol**         | versione del protocollo utilizzata dal client (v1 o v2)
**port_opened**      | stato aperto della porta client del client
**peer_id**          | (non utilizzato in Tor) il peer_id del client
**rev**              | il numero revisione del client
**version**          | versione del client
**target_ip**        | indirizzo di rete del server

La destinazione inizializza la crittografia sul socket in base a `crypt_supported`, quindi restituisce:

Chiave resa          | Descrizione
                 --- | ---
**crypt**            | la crittografia da utilizzare
**crypt_supported**  | un elenco di metodi di crittografia supportati dal server
**fileserver_port**  | porta del file server del server
**onion**            | (utilizzato solo su Tor) indirizzo onion del server
**protocol**         | versione del protocollo utilizzata dal server (v1 o v2)
**port_opened**      | stato aperto della porta client del server
**peer_id**          | (non utilizzato in Tor) il peer_id del server
**rev**              | numero revisione del server
**version**          | versione del server
**target_ip**        | indirizzo di rete del client

> **Nota:** non si utilizza la crittografia nelle connessioni .onion, perché la rete Tor fornisce la sicurezza di trasporto di default.
> **Nota:** si può anche inizializzare l'SSL prima dell'handshake se si suppone che è supportato dal client remoto.

**Esempio**:

Invio handshake:

```json
{
  "cmd": "handshake",
  "req_id": 0,
  "params": {
    "crypt": None,
    "crypt_supported": ["tls-rsa"],
    "fileserver_port": 15441,
    "onion": "zp2ynpztyxj2kw7x",
    "protocol": "v2",
    "port_opened": True,
    "peer_id": "-ZN0056-DMK3XX30mOrw",
    "rev": 2122,
    "target_ip": "192.168.1.13",
    "version": "0.5.6"
  }
}
```

Risposta:

```
{
 "protocol": "v2",
 "onion": "boot3rdez4rzn36x",
 "to": 0,
 "crypt": None,
 "cmd": "response",
 "rev": 2092,
 "crypt_supported": [],
 "target_ip": "zp2ynpztyxj2kw7x.onion",
 "version": "0.5.5",
 "fileserver_port": 15441,
 "port_opened": False,
 "peer_id": ""
}
```

# Richiesta peer

#### getFile _site_, _inner_path_, _location_, _[file_size]_
Richiesta di un file dal client

Parametro            | Descrizione
                 --- | ---
**site**             | Indirizzo del sito (esempio: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**       | Percorso del file relativo alla cartella del sito
**location**         | Richede il file da questo byte (vengono inviati al massimo 512 byte per richiesta, quindi servono richieste multiple per file grandi)
**file_size**        | Dimensione del file richiesto (opzionale)

**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**body**             | Contenuto del file richiesto
**location**         | Posizione dell'ultimo byte inviato
**size**             | Dimensione del file


---

#### streamFile _site_, _inner_path_, _location_, _[file_size]_
Stream di un file dal client

**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**stream_bytes**     | Lunghezza dei dati del file dopo il contenuto di MessagePack

Per evitare che python-msgpack serializzi grandi stringhe binarie, il corpo del file è aggiunto direttamente dopo il contenuto di MessagePack. Per esempio,

```
> {"cmd": "streamFile", "id": 1, "inner_path": "content.json", "size": 1234}
< {"cmd": "response", "to": 1, "stream_bytes": 1234}
< content of the file
```

> Dettaglio implementazione ZeroNet: per segmenti di file maggiori di 256 kb, lo streaming è abilitato di default.

---


#### ping
Controlla se il client è ancora attivo

**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**body**             | Pong


---


#### pex _site_, _peers_, _need_
Scambio di peer con il client.
I peer sono compressi in 6 bytes (4 byte per l'IP utilizzando inet_ntoa + 2 byte per la porta)

Parametro            | Descrizione
                 --- | ---
**site**             | Indirizzo del sito (esempio: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**peers**            | Elenco dei peer che ha il richiedente (compressi)
**peers_onion**      | Elenco dei peer di Tor Onion che ha il richiedente (compressi)
**need**             | Numero dei peer che vuole il richiedente

**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**peers**            | Elenco dei peer IPv4 disponibili per il sito (compressi)
**peers_onion**      | Elenco dei peer di Tor onion per il sito (compressi)

Ogni elemento nell'elenco `peers` è un indirizzo compresso IPv4 .

Indirizzo IP | Porta
------------ | -----
`4 byte`     | `2 byte`

Ogni elemento nell'elenco `peers_onion` è un indirizzo compresso del servizio Tor onion.

Indirizzo onion B32-decoded | Porta
--------------------------- | -----
`binary_str[0:-2]`          | `binary_str[-2:]`

Per ripristinare l'indirizzo onion, passare la prima parte attraverso `base64.b32encode` e appendere `.onion` al valore restituito.

---

#### update _site_, _inner_path_, _body_, _[diffs]_
Aggiornare il file di un sito.


Parametro             | Descrizione
                  --- | ---
**site**              | Indirizzo del sito (esempio: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**        | Percorso del file relativo alla cartella del sito
**body**              | Contenuto completo del file content.json aggiornato
**diffs** (opzionale) | [Codici variazioni](#possibili-codici-variazione) per i file modificati in content.json

**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**ok**               | Messaggio di ringraziamento per aggiornamento riuscito :)

##### Formato variazioni

Un dizionario che contiene le modifiche

 - Chiave: percorso relativo del file modificato rispetto a content.json (es.: `data.json`)
 - Valore: Elenco dei codici variazione per il file (es.: `[['=', 5], ['+', '\nCiao nuova riga'], ['-', 6]]`)

##### Possibili codici variazione

Codice                                   | Descrizione
                                     --- | ---
**['=', numero di caratteri uguali]**    | Non ha modificato parte del file (es.: `['=', 5]`)
**['+', nuovo testo]**                   | Caratteri inseriti (es.: `['+', '\nCiao nuova riga']`)
**['-', numero di caratteri rimossi]**   | Contenuto completo del file modificiato (es.: `['-', 6]`)

Dopo la ricezione delle modifiche, il client tenta di allineare il file utilizzando le differenze.
Se fallisce il controllo della chiave SHA fornita dal file content.json (aveva una versione diversa del file) riscarica automaticamente l'intero file da chi ha inviato l'aggiornamento.

> __Nota:__ Le correzioni sono limitate a 30KB per file e utilizzate solo per i file .json

---

#### listModified _site_, _since_
Elenco dei file content.json modificati da un certo parametro. Viene utilizzato per recuperare il contenuto inviato dall'utente del sito.


Parametro            | Descrizione
                 --- | ---
**site**             | Indirizzo del sito (esempio: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**since**            | Elenco dei file content.json da questa data.

**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**modified_files**   | Chiave: content.json inner_path<br>Valore: data ultima modifica

**Esempio**:

```json
> zeronet.py --silent peerCmd 127.0.0.1 15441 listModified "{'site': '1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8', 'since': 1497507030}"
{
  "to": 1,
  "cmd": "response",
  "modified_files": {
    "data/users/1NM9k7VJfrb1UWw5agAvyRfSn3ws1wTJ5U/content.json": 1497579272,
    "data/users/1QEfmMwKVxgR4rkREbdJYjgUmF3Zy8pwHt/content.json": 1497565986,
    "data/users/16NS3rBdW9zpLmLSQoD8nLTtNVsRFtVBhd/content.json": 1497575039,
    "data/users/1CjXarXgvcNeCJ2nMQxUi4DRFWp3GEur2W/content.json": 1497513808,
    "data/users/1L5rGDgTs4W2V7gekSvJNhKa7XaHkVwotD/content.json": 1497615798,
    "data/users/1LWuc6JBhUGrKEAh1aPrPU85dEMcKmg3pS/content.json": 1497594716,
    "data/users/1KdnTJVBGzEZrJppFZtzfG9chukuMv8xSb/content.json": 1497584640,
    "data/users/1GMNmr2bDPbT4c8yVnyCoDHke52CNCdqAa/content.json": 1497614188,
    "data/users/1GRm9rED83Tkfi3iWS9m3LWHiRpPZehWLd/content.json": 1497827772,
    "data/users/12Ugp53jiMdvj1Kxa1w7c2LcXUBdGPs1oK/content.json": 1497692901,
    "data/users/1F6BMqittjWUStzUbRXm2kG2GQ3RdBLqFQ/content.json": 1497571485,
    "data/users/1GgNo3CmxPd7n2pMSF3uyqf1XHvgtTUqCe/content.json": 1497560829,
    "data/users/16nArdxrSaNThNp83kL8E6NLL9WD98iUne/content.json": 1497627929,
    "data/users/16CAJkbfNRxNJq4aKdrZ2MSYFfFGvQ8JPi/content.json": 1497664899,
    "data/users/1DrBS2sTD3BX5BBxG8eqYsxXSvGt9kc5HE/content.json": 1497632000,
    "data/users/19sggoAZ4hcorrrfWoFWP9rwfpVsL29cnZ/content.json": 1497928134,
    "data/users/1NYpJupegoTXL4cFpkNdLNJ4XaAhTNhPe1/content.json": 1497535771,
    "data/users/1R67TfYzNkCnh89EFfGmXn5LMb4hXaMRQ/content.json": 1497691787,
    "data/users/1C9HXUYFSVafLxanwkaFPZRcRgCEGsj2Cn/content.json": 1497572833,
    "data/users/1LgoHzNGWeijeZbJ8a1YgGjMCnjaM4BWG/content.json": 1497620232,
    "content.json": 1497623639
  }
}
```

---


#### getHashfield _site_
Ottiene gli [id dei file opzionali](#file-id-opzionale) scaricati.

Parametro            | Descrizione
                 --- | ---
**site**             | Indirizzo sito (esempio: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)

**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**hashfield_raw**    | Id opzionali del file codificati utilizzando `array.array("H", [1000, 1001..]).tostring()`

**Esempio**:
```json
> zeronet.py --silent peerCmd 192.168.1.13 15441 getHashfield "{'site': '1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h'}
{
  'to': 1,
  'hashfield_raw': 'iG\xde\x02\xc6o\r;...',
  'cmd': 'response'
}
```

---


#### setHashfield _site_, _hashfield_raw_
Imposta l'elenco degli [id dei file opzionali](#file-id-opzionale) che possiede il client richiedente.

Parametro            | Descrizione
                 --- | ---
**site**             | Indirizzo sito (esempio: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**hashfield_raw**    | Id file opzionali codificato utilizzando `array.array("H", [1000, 1001..]).tostring()`

**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**ok**               | Aggiornato


---


#### findHashIds _site_, _hash_ids_
Richiede se il client conosce un peer che ha la chiave hash_ids richiesta

Parametro            | Descrizione
                 --- | ---
**site**             | Indirizzo sito (esempio: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**hash_ids**         | Elenco degli id dei file opzionali che il client sta cercando

**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**peers**            | Chiave: id del file opzionale<br>Valore: elenco dei peer ipv4 codificati utilizzando `socket.inet_aton(ip) + struct.pack("H", port)`
**peers_onion**      | Chiave: id del file opzionale<br>Valore: elenco dei peer onion codificati utilizzando `base64.b32decode(onion.replace(".onion", "").upper()) + struct.pack("H", port)`

**Esempio**:
```json
> zeronet.py --silent peerCmd 192.168.1.13 15441 findHashIds "{'site': '1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h', 'hash_ids': [59948, 29811]}"
{
  'to': 1,
  'peers': {
    29811: [
      'S&9\xd3Q<',
      '>f\x94\x98N\xa4',
      'gIB\x90Q<',
      '\xb4\xady\xf7Q<'
    ],
    59948: [
      'x\xcc>\xf6Q<',
      'S\xa1\xddkQ<',
      '\x05\xac\xe8\x8dQ<',
      '\x05\xc4\xe1\x93Q<',
      'Q\x02\xed\nQ<'
    ]
  },
  'cmd': 'response',
  'peers_onion': {
    29811: ['\xc7;A\xce\xbc\xd9O\xe2w<Q<'],
    59948: ['\xc7;A\xce\xbc\xd9O\xe2w<Q<']
  }
}
```

##### File id opzionale
Rappresentazione intera dei primi 4 caratteri della chiave (hash):
```
>>> int("ea2c2acb30bd5e1249021976536574dd3f0fd83340e023bb4e78d0d818adf30a"[0:4], 16)
59948
```

---

#### checkport _port_
Controlla la porta richiesta dell'altro peer.


Parametro            | Descrizione
                 --- | ---
**port**             | Porta che verrà controllata.

**Return**:

Chiave resa          | Descrizione
                 --- | ---
**status**           | Stato della porta ("open" o "closed")
**ip_external**      | IP esterno del richiedente

---

# Plugin file grandi

#### getPieceFields _site_

Restituisce tutte le [sezioni](#sezioni-di-file-grandi) del file che il cliente ha per questo sito in un dizionario.

Parametro            | Descrizione
                 --- | ---
**site**             | Sito richiesto


**Risposta**:

Chiave resa            | Descrizione
                   --- | ---
**piecefields_packed** | Chiave: [chiave merkle root](#merkle-root-per-file-grandi) sha512/256 di Bigfile<br>Valore: [sezioni](#sezioni-di-file-grandi) compresse

---

#### setPieceFields _site_, _piecefields_packed_

Imposta le [sezioni](#sezioni-di-file-grandi) del client per quel sito.

Parametro              | Descrizione
                   --- | ---
**site**               | Sito richiesto
**piecefields_packed** | Chiave: [chiave merkle root](#merkle-root-per-file-grandi) sha512/256 del file grande<br>Valore: [sezione](#sezioni-di-file-grandi) compressa


**Risposta**:

Chiave resa          | Descrizione
                 --- | ---
**ok**               | Aggiornato


##### Sezioni di file grandi

Contiene le informazioni dei pezzi dei file grandi scaricati in una semplice stringa di valori 1/0. (1 = scaricato, 0 = non scaricato)

> __Esempio__: `1110000001` significa che il file ha una dimensione di 9-10MB e il client ha scaricato i primi 3MB e l'ultimo MB a pezzi da 1MB.

**Formato compressione**:

Converte una stringa in una lista di interi contando i caratteri che si ripetono iniziando con `1`.

> __Esempio__: `1110000001` in `[3, 6, 1]`, `0000000001` in `[0, 9, 1]`, `1111111111` in `[10]`

Dopo la conversione viene convertito in un più efficente [array specializzato](https://docs.python.org/2/library/array.html) utilizzando `array.array('H', piecefield)`

##### Merkle root per file grandi

Nella procedura di codifica dei file grandi, oltre a salvare l'elenco delle chiavi sha512/256 per peer nel file [piecemap](#mappa-sezioni-di file-grandi), l'algoritmo calcola anche la merkle root SHA-512/256 del file utilizzando l'implementazione [merkle-tools](https://github.com/tierion/merkle-tools).
La merkle root è utilizzata solo come un ID per identificare i grandi file, non (ancora) per verificare i pezzi.

> __Nota__: La merkle root è scelta per identificare il file al posto dell'attuale chiave SHA-512/256 del file. Ovviamente, utilizzando la seconda risulterebbe nel calcolare due volte la chiave del file (una per la piecemap e una per l'intero file).

> __Nota__: La merkle root non è utilizzata per verificare l'integrità dei pezzi o dei file grandi, perché ciò utilizzerebbe più banda e spazio per trasferire e salvare la merkle-proofs per verifiche parziali, rispetto alla mappa delle chiavi per pezzo del file stesso.

##### Mappa sezioni di file grandi

Contiene le chiavi SHA-512/256 per peer. La dimensione del pezzo e il nome del file della picemap è definita in `content.json`, es.:

```
...
 "files_optional": {
  "bigfile.mp4": {
   "piece_size": 1048576,
   "piecemap": "bigfile.mp4.piecemap.msgpack",
   "sha512": "d1f0d150e1e73bb1e684d370224315d7ba21e656189eb646ef7cc394d033bc2b",
   "size": 42958831
  },
...
```

Avendo la seguente struttura dati, il file piecemap è compresso nel formato [msgpack](https://msgpack.org/):

```
{
  b'bigfile.mp4': {b'sha512_pieces': [
    b"e\xde\x0fx\xec\xc5LZ9\x0e\xe7\x85E\x1b\xd5\xe4C'\xe7req\xe3<\xff\\\xbb\xc8b\xc2\xc1\x8e",
    b'\xef\xe8\xed\xfe\x16/\x96\xdb;;\x06n[8_\x06\x9ak|\xe1\x9f\xe1\xaf\x87\x96\xdd\xfd\x9bEf\xd9!',
    b'\x1c\xd6-\x1f\xce\xde{\xcd\x01\x93un =D\x0brmB-\xd1\x8c\xbf\xfe\xca\x8a\x1c\xf60\xbb\xedD',
    b'\x1aQdF\xd2\xbc\xdff{\xb7\x89\xf2\xd3\r\xa9\xe1\xefA-V\x18\xa4\xc8e\x13\x88v\x13\\&\xfbW',
    ...
  ]}
}
```
