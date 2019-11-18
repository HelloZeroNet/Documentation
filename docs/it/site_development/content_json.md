# Struttura di content.json

Ogni sito ZeroNet ha un file `content.json`. ([Esempio di file content.json](https://github.com/HelloZeroNet/ZeroTalk/blob/master/content.json))

Questo file contiene, oltre ad altre cose, un elenco di tutti i file del sito e una firma creata con la chiave privata dell'autore. Questo per assicurare l'autenticità dei file del sito ed evitare le manomissioni (i.e.: solo l'autore, o persone autorizzate, possono modificare il contenuto del sito).

Qui c'è una lista di chiavi `content.json` supportate:


---

## Generato automaticamente

_Queste chiavi sono aggiunte automaticamente quando il sito viene creato o clonato._

### address

L'indirizzo del sito

**Esempio**: 1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ


---


### address_index

L'indice della sottochiave BIP32 del sito del seed BIP32. Aggiunta automaticamente quando si clona un sito. Consente di recuperare la chiave privata del sito dal seed BIP32.

**Esempio**: 30926910

---


### cloned_from

Solo per siti clonati. L'indirizzo del sito da cui è stato clonato.

**Esempio**: 1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8

---


### clone_root

Solo per siti clonati. La sotto cartella sul sito da cui è stato clonato.

**Esempio**: template-new


---


### files

Dimensione e chiave sha512 dei file scaricati automaticamente nel sito. Aggiunto automaticamente dal comando `zeronet.py siteSign siteaddress privatekey`.

**Esempio**:
```python
    "css/all.css": {
      "sha512": "869b09328f07bac538c313c4702baa5276544346418378199fa5cef644c139e8",
      "size": 148208
    }
```


---


### files_optional

Dimensione e chiave sha512 per file opzionali contenuti nel sito. Aggiunto automaticamente dal comando `zeronet.py siteSign siteaddress privatekey`.

**Esempio**:
```python
    "data/myvideo.mp4": {
      "sha512": "538c09328aa52765443464135cef644c144346418378199fa5cef61837819538",
      "size": 832103
    }
```



---


### modified

Data in cui è stato generato il file content.json.

**Esempio**: 1425857522.076


---


### sign (deprecato)

Firma ECDSA del contenuto del file content.json (chiavi ordinate, senza spazi vuoti e senza i nodi `sign` e `signers_sign`). Per retrocompatibilità, verrà rimossa a breve.

**Esempio**:
```python
  "sign": [
    43117356513690007125104018825100786623580298637039067305407092800990252156956,
    94139380599940414070721501960181245022427741524702752954181461080408625270000
  ],
```


---


### signers_sign

Possibile indirizzo del firmatario della root content.json firmato utilizzando la chiave privata del sito. Sono consentiti più valori abilitando la funzionalità Multisig.

**Formato della stringa firmata**: [numero_dei_firmatari_richiesto]:[indirizzi firmatari],[indirizzi firmatari]

**Esempio**:
```
signs_required: 1:1PcxwuHYxuJEmM4ydtB1vbiAY6WkNgsz9G,1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE
signers_sign: MEUCIQDuz+CzOVvFkv1P2ra9i5E1p1G0/1cOGecm7GpLpMLhuwIgBIbCL0YHXD1S2+x48QS5VO/rISrkdLiUR+o+x1X0y1A=
```

Il precedente messaggio è firmato utilizzando l'indirizzo "1PcxwuHYxuJEmM4ydtB1vbiAY6WkNgsz9G".

---


### signs

Firma ECDSA per il contenuto del file content.json:

 - `sign`, `signs` nodi JSON rimossi
 - JSON scaricati con le chiavi ordinate alfabeticamente, senza spazi
 - Firma generata sui dati scaricati, usando il formato di firma dei messaggi Electrum Bitcoin:
    * [Codifica messaggio](https://github.com/vbuterin/pybitcointools/blob/87806f3c984e258a5f30814a089b5c29cbcf0952/bitcoin/main.py#L405): `sha256("\x18" || "Bitcoin Signed Message:\n" || num_to_var_int(len(message)) || message)`
    * [Formato seriale](https://github.com/MuxZeroNet/zerolib/blob/f13126e04bf99b1b416a7ea5b5cad7924cdc15a4/zerolib/integrity/bitcoin.py#L82-L93): `recovery_id || r || s`, dove 27 ≤ recovery_id ≤ 30; lunghezza firma = 1 + 32 + 32 = 65 byte.
    * La doppia barra verticale `||` indica la concatenazione di byte.

**Esempio**:
```python
  "signs": {
    "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ": "G6/QXFKvACPQ7LhoZG4fgqmeOSK99vGM2arVWkm9pV/WPCfc2ulv6iuQnuzw4v5z82qWswcRq907VPdBsdb9VRo="
  },
```
**Esempio di codice**
```python
import json
import btctools

privatekey = "super_secret_private_key"
privatekey_address = "private_key_address"

with open('content.json') as f:
    new_content = json.load(f)

del(new_content["signs"])  # Delete old signs
sign_content = json.dumps(new_content, sort_keys=True)
sign = btctools.ecdsa_sign(sign_content, privatekey)
new_content["signs"] = {}
new_content["signs"][privatekey_address] = sign
```

----


### zeronet_version

La versione ZeroNet utilizzata per creare il file content.json.

**Esempio**: 0.2.5

---

## Impostazioni opzionali

_Queste opzioni possono essere aggiunte se sono richieste le funzionalità._


### background-color

Colore di sfondo del contenitore

**Esempio**: #F5F5F5


---


### cloneable

Consente di clonare il sito se impostato a  **true**.

Per rendere un sito correttamente clonabile serve avere una cartella separata per i file dati
per una inizializzazione pulita (es. senza messaggi del blog). Per far questo serve aggiungere
il suffisso **-default** ai file dati e cartelle.  Durante il processo di copia, solo le 
cartelle con il suffisso **-default** vengono copiate. Il suffisso viene rimosso nel nuovo sito.



---


### description

Descrizione del sito, visualizzata sotto il titolo del sito in ZeroHello.

**Esempio**: Demo formum decentralizzato


---


### domain

Nome del dominio Namecoin del sito. ZeroHello si collegherà a questo se l'utente ha il plugin Zeroname abilitato.

**Esempio**: Blog.ZeroNetwork.bit




---


### ignore

Non firmare i file con quesa modello.

**Esempio**: `((js|css)/(?!all.(js|css))|data/users/.*)` (ignora tutti i file js e css eccetto all.js e all.css e non aggiunge niente dalla cartella `data/users/`)

Nota: [Alcune restrizioni](#limitazioni-espressioni-regolari) si applicano alle espressioni regolari.

---


### includes

Include un altro content.json nel sito. Questo viene usato tipicamente per file content.json successivi utilizzati per gestire i dati utente.

**Esempio**:

```python
"includes": {
  "data/users/content.json": {
    "signers": [  # Possibili indirizzi dei firmatari del file
      "1LSxsKfC9S9TVXGGNSM3vPHjyW82jgCX5f"
    ],
    "signers_required": 1 # Il  *numero* di firme valide per accettare il file (possibilità Multisig),
    "files_allowed": "data.json", # Modello dei file consentiti nel file include
    "includes_allowed": false, # Abilitazione all'inclusione ricorsiva
    "max_size": 10000, # Massima dimensione consentita per i file content.json inclusi e i file che firmano (in byte)
  }
}
```


---


### merged_type

Parte dell'unione di cui il file fa parte.

**Esempio**: `ZeroMe`


---


### optional

Modello file opzionali.

**Esempio**: `(data/mp4/.*|updater/.*)` (qualsiasi cosa nelle cartella `data/mp4` e `updater` è opzionale)

Nota: [Alcune restrizioni](#limitazioni-espressioni-regolari) si applicano alle espressioni regolari.

---


### signs_required

Il **numero** di firme valide richieste per accettare il file. Consente la funzionalità Multisig.


**Esempio**: 1


---


### title

Il titolo del sito, visibile nel titolo del browser e su ZeroHello.

**Esempio**: ZeroTalk


----


### translate

I file che devono essere tradotti. (utilizzare il file linguaggio json nella cartella `languages`)

**Esempio**: ["index.html", "js/all.js"]


----


### favicon

La favicon del sito. Sostituisce il logo di default ZeroNet con una icona specifica del sito. Può essere una .ico, .png, .svg, etc.

**Esempio**: favicon.ico


----


### user_contents

Regole dei contenuti utente consentiti all'interno della cartella corrente.

Nodo                     | Descrizione
                    ---  | ---
**archived**             | Cancella la cartella del contenuto utente specificata che è firmata prima della data specificata (key: nome cartella, value: timestamp)
**archived_before**      | Cancella tutte le cartelle dei contenuti utente firmate prima della data specifica
**cert_signers**         | Domini accettati e indirizzi dei firmatari validi
**cert_signers_pattern** | Modello regexp dei firmatari certificati accettati
**permission_rules**     | Nomi file consentiti e dimensione totale delle cartelle in base a domini certificati o metodi di autorizzazione
**permissions**          | Autorizzazioni per utente. (false = utente bloccato)

**Esempio**:
```python
  "user_contents": {
    "archived": {
      "1165u6pt5mQNFjyhMVwy6azB7bZuQGLA9b": 1523088096
    },
    "archived_before": 1523088096,
    "cert_signers": {
      "zeroid.bit": [ "1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz" ]
    },
    "cert_signers_pattern": "1Zero[0-9].*",
    "permission_rules": {
      ".*": {
        "files_allowed": "data.json",
        "files_allowed_optional" : "\\.(png|jpeg|jpg|gif|webm|mp4|ogg|mp3|pdf|epub|zip|tar\\.gz)(\\.piecemap\\.msgpack)",
        "max_size": 10000,
        "max_size_optional": 10000000
      },
      "bitid/.*@zeroid.bit": { "max_size": 40000 },
      "bitmsg/.*@zeroid.bit": { "max_size": 15000 }
    },
    "permissions": {
      "bad@zeroid.bit": false,
      "nofish@zeroid.bit": { "max_size": 100000 }
    }
  }
```

Nota: [Alcune restrizioni](#limitazioni-espressioni-regolari) si applicano alle espressioni regolari.

----


### viewport

Contenuto del meta tag viewport. (utilizzato per le pagine mobile-friendly)

**Esempio**: width=device-width, initial-scale=1.0


----

## Limitazioni espressioni regolari

Per evitare il complesso attacco algoritmico [ReDoS](https://en.wikipedia.org/wiki/ReDoS), le seguenti restrizioni si applicano ad ogni modello:

 - il carattere `.` è obbligatorio prima della ripetizione dei caratteri `*,+,{`
 - In un singolo modello sono consentite al massimo 9 ripetizioni
 - La massima lunghezza di un modello è 255 caratteri

### Esempi:

 - non è consentito `((?!json).)*$`, per la `)` prima del carattere `*`. Correzione possibile: `.*(?!json)$`
 - non è consentito `(.*.epub|.*.jpg|.*.jpeg|.*.png|data/.*.gif|.*.avi|.*.ogg|.*.webm|.*.mp4|.*.mp3|.*.mkv|.*.eot)`, perché ci sono 12 `.*`. Possibile soluzione: `.*(epub|jpg|jpeg|png|data/gif|avi|ogg|webm|mp4|mp3|mkv|eot)`
