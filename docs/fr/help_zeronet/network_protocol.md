# Le protocole réseau ZeroNet

 - Tous les messages sont encodés avec [MessagePack](http://msgpack.org/)
 - Toute requête possède 3 paramètres:
    * `cmd`: La requête commande
    * `req_id`: L'unique id de la requête (simple, nonce incrémenté à chaque connection)
    * `params`: Paramètre de la requête
 - Exemple de requête : `{"cmd": "getFile", "req_id": 1, "params:" {"site": "1EU...", "inner_path": "content.json", "location": 0}}`
 - Exemple de réponse : `{"cmd": "response", "to": 1, "body": "content.json content", "location": 1132, "size": 1132}`
 - Exemple de réponse signalant une erreur: `{"cmd": "response", "to": 1, "error": "Unknown site"}`


# Poignée de main (Handshake)

Chaque connection commence avec une poignée de main en envoyant une requête à l'adresse du réseau spécifiée :

Paramètre            | Description
                 --- | ---
**crypt**            | Null/None, seulement utilisé dans les réponses
**crypt_supported**  | Une collection de méthode de chiffrement supportée par le client
**fileserver_port**  | Le port de distribution des fichiers du client
**onion**            | (Seulement avec Tor) L'adresse onion du client
**protocol**         | La version du protocole utilisé (v1 ou v2)
**port_opened**      | Le status du port client du client
**peer_id**          | (Pas utilisé avec Tor) L'id du client
**rev**              | La version de révision du client
**version**          | La version du client
**target_ip**        | L'adresse du serveur sur le réseau

La cible initialise la connection chiffrée via socket en se basant sur le paramètre `crypt_supported`, puis retourne :

Résultat             | Description
                 --- | ---
**crypt**            | La méthode de chrifremment utilisée
**crypt_supported**  |  Une collection de méthode de chiffrement supportée par le serveur
**fileserver_port**  | Le port de distribution des fichiers du serveur
**onion**            | (Seulement avec Tor) L'adresse onion du serveur
**protocol**         | La version du protocole utilisé (v1 ou v2)
**port_opened**      | Le status du port client du serveur
**peer_id**          | (Pas utilisé avec Tor) L'id du serveur
**rev**              | La version de révision du serveur
**version**          | La version du serveur
**target_ip**        | L'adresse du client sur le réseau

> **Note:** Pas de chiffrement sur utilisé pour les connections en .onion car le réseau Tor a déjà une couche de chiffrement activé par défaut.
> **Note:** Vous pouvez aussi explicitement initialisé SSL avant le "handshake" si vous pensez que le client le supporte.

**Example**:

Envoi "Handshake":

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

Résultat:

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

# Requêtes de pair

#### getFile _site_, _inner_path_, _location_, _[file_size]_
Requête d'un fichier depuis le client

Paramètre            | Déscription
                 --- | ---
**site**             | Adresse du site (exemple: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**       | Chemin relative du fichier dans le répertoire du site
**location**         | Demander ce fichier en commençant par ce byte (max 512 bytes sont envoyés dans la requête, donc il faut plusieurs requêtes pour un large fichier)
**file_size**        | Taille totale du fichier demandé (optionel)

**Return**:

Résultat             | Déscription
                 --- | ---
**body**             | Le contenu du fichier demandé
**location**         | La place du dernier byte envoyé dans le fichier
**size**             | La taille totale du fichier


---

#### streamFile _site_, _inner_path_, _location_, _[file_size]_
Stream un fichier depuis le client

**Return**:

Résultat             | Déscription
                 --- | ---
**stream_bytes**    | La taille des données du fichier après MessagePack payload

Afin d'éviter d'avoir python-msgpack sérialiser de chaîne de cractère trop conséquent, le corps du fichier est directement ajouté après le MessagePack payload. Par exemple,

```
> {"cmd": "streamFile", "id": 1, "inner_path": "content.json", "size": 1234}
< {"cmd": "response", "to": 1, "stream_bytes": 1234}
< content of the file
```

> Détail sur l'implémentation dans ZeroNet : Pour les ségments de fichier plus gros que 256kb, le streaming est activé par défaut.

---


#### ping
Vérifie si le client est toujours en vie

**Return**:

Résultat             | Déscription
                 --- | ---
**body**             | Pong


---


#### pex _site_, _peers_, _need_
Echange de paris avec le client.
Pairs packagé en 6 bytes (4 bytes IP avec inet_ntoa + 2 bytes pour le port)

Pramètres            | Déscription
                 --- | ---
**site**             | Adresse du site (exemple: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**peers**            | Liste des pairs que la personne envoyant la requête connait (packagé)
**peers_onion**      | Liste des pairs Tor Onion que la personne envoyant connait (packagé)
**need**             | Nombre de pairs demandé

**Return**:

Résultat             | Déscription
                 --- | ---
**peers**           | Liste des pairs IPV4 connu pour ce site (packagé)
**peers_onion**     | Liste des pairs Tor Onion pour ce site (packagé)

Chaque élèment dans la liste `peers` est sous la forme d'adresse IPv4 packagé.

Adresse IP | Port
---------- | ----
`4 bytes` | `2 bytes`

Chaque élèment de la liste `peers_onion` est sous la forme d'adresse Tor Onion Service.

B32-decoded onion address | Port
------------------------- | ----
`binary_str[0:-2]`        | `binary_str[-2:]`

Pour retrouver la l'adresse onion, passe la première partie dans `base64.b32encode` puis ajoute `.onion` à  la valeur retournée.
---

#### update _site_, _inner_path_, _body_, _[diffs]_
Met à jour le fichier d'un site.

Paramètre            | Déscription
                 --- | ---
**site**             | Adresse du site (exemple: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**       | Chemin relative du fichier dans le répertoire du site
**body**             | Contenu du fichier content.json mis à jour
**diffs** (optionel) | [Code modifié (diff)](#possible-diff-opcodes) des fichiers modifiés dans le content.json

**Return**:

Résultat             | Déscription
                 --- | ---
**ok**               | Message de remerciement lors d'une mise à jour réussite :)

##### Format Diffs

A "dict" qui contient les modifications

 - Key: chemin du fichier modifié relative au content.json (eg.: `data.json`)
 - Value: La liste des diff opcodes pour le fichier (eg.: `[['=', 5], ['+', '\nhello new line'], ['-', 6]]`)

##### Diff opcodes possibles:

Opcode                                   | Déscription
                                     --- | ---
**['=', nombre de même caractère]**      | Partie du fichier sans modification (eg.: `['=', 5]`)
**['+', nouveau texte]**                 | Caractères ajoutés (eg.: `['+', '\nhello new line']`)
**['-', nombre de caractère supprimés]** | Caractères suprimés (eg.: `['-', 6]`)

Après avoir reçu la mise à jour, le client essaye de patcher les fichiers en utilisant les diffs.
Si le résultat ne correspond pas au hash SHA256 fourni par le fichier content.json (différente version du fichier), le client re-télécharge le fichier dans son intégralité depuis le pair qui a émit le message de mis à jour.

> __Note:__ Les patches sont limités à 30KB par fichier et seulement utilisé pour les fichiers en .json.

---

#### listModified _site_, _since_
Listes les fichiers répertoriés dans le content.json et modifié depuis le paramètre `since` envoyé. Il était utilisé pour récupérer le contenu soumit par un utilisateur du site.


Paramètre            | Déscription
                 --- | ---
**site**             | Adresse du site (exemple: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**since**            | Liste des fichiers modifiés depuis ce timestamp.

**Return**:

Résultat             | Déscription
                 --- | ---
**modified_files**   | Key: content.json inner_path<br>Value: Date de la dernière modification

**Exemple**:

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
Récupérer [les identifiants uniques des fichiers optionels](#optional-file-id).

Paramètre            | Déscription
                 --- | ---
**site**             | Adresse du site (exemple: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)

**Return**:

Résultat             | Déscription
                 --- | ---
**hashfield_raw**    | Identifiants des fichiers optionels encodés avec `array.array("H", [1000, 1001..]).tostring()`

**Exemple**:
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
Ajoute la liste des [identifiants des fichiers optionels](#optional-file-id) que le client requêteur possède.

Paramètre            | Déscription
                 --- | ---
**site**             | Adresse du site (exemple: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**hashfield_raw**    | Identifiants des fichiers optionels encodés avec `array.array("H", [1000, 1001..]).tostring()`

**Return**:

Résultat             | Déscription
                 --- | ---
**ok**               | Mis à jour :)


---


#### findHashIds _site_, _hash_ids_
Demande si le client connait un pair possèdant ces hash_ids

Paramètre            | Déscription
                 --- | ---
**site**             | Adresse du site (exemple: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**hash_ids**         | Liste des identifiants des fichiers optionels que le client recherche

**Return**:

Résultat             | Déscription
                 --- | ---
**peers**            | Key: identifiant du fichier optionel <br>Value: Liste des pairs ipv4 encodés avec `socket.inet_aton(ip) + struct.pack("H", port)`
**peers_onion**      | Key: identifiant du fichier optionel<br>Value: Liste des pairs onion encodés avec `base64.b32decode(onion.replace(".onion", "").upper()) + struct.pack("H", port)`

**Exemple**:
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

##### Identifiant pour fichier optionel
Nombre entier représentant les 4 premiers cractères du hash :
```
>>> int("ea2c2acb30bd5e1249021976536574dd3f0fd83340e023bb4e78d0d818adf30a"[0:4], 16)
59948
```

---

#### checkport _port_
Vérifie le port spécifié de l'autre pair.

Paramètre            | Déscription
                 --- | ---
**port**             | Port à vérifier.

**Return**:

Résultat             | Déscription
                 --- | ---
**status**           | Statut du port spécifié ("open"/ouvert ou "closed"/fermé)
**ip_external**      | IP externe du demandeur

---

# Le plugin BigFile

#### getPieceFields _site_

Renvoie tous les [morceaux de fichiers](#bigfile-piecefield) de tout les larges fichiers du client dans une liste.

Paramètre            | Déscription
                 --- | ---
**site**             | Adresse du site


**Return**:

Résultat               | Déscription
                   --- | ---
**piecefields_packed** | Key: Hash Sha512/256 [de la racine de merkle](#bigfile-merkle-root) du large fichier<br>Value: [piecefield](#bigfile-piecefield) packagé.

---

#### setPieceFields _site_, _piecefields_packed_

Ajoute au client les [piecefields](#picefield) pour ce site.

Paramètre              | Déscription
                   --- | ---
**site**               | Adresse du site
**piecefields_packed** | Key: Hash Sha512/256 [de la racine de merkle](#bigfile-merkle-root) du large fichier<br>Value: [piecefield](#bigfile-piecefield) packagé.


**Return**:

Return key           | Description
                 --- | ---
**ok**               | Updated


##### Bigfile piecefield

Détient les informations sur les pièces d'un large fichier, l'information est représenté par les valeurs 1/0 (1 = téléchargé, 0 = pas téléchargé).

> __Example__: `1110000001` signifie que le fichier est de taille 9-10MB et le client a téléchargé le 3MB du debut du fichier et le dernier 1MB (chaque pièce fait 1MB).s

**Format packagé**:

Transforme la chaîne de cractère en une liste d'entier en comptant le nombre de répititions en commençant avec `1`.

> __Example__: `1110000001` devient `[3, 6, 1]`, `0000000001` devient `[0, 9, 1]`, `1111111111` devient `[10]`

Après la conversion il est ensuite transformé en un [`array`](https://docs.python.org/2/library/array.html) avec `array.array('H', piecefield)`

##### Bigfile merkle root

Pendant la procédure qui consiste à hasher un large fichier, en plus de collelecter les sha512/256 dans le fichier [piecemap](#bigfile-piecemap), l'algorithme calcule aussi le SHA-512/256 l'arbre de merkle avec [l'outil `merkle-tools`](https://github.com/tierion/merkle-tools).
L'arbre de merkle est seulement utilisé comme un identifiant unique pour le large fichier, pas (encore) pour vérifier les morceaux du fichier.

> __Note__: L'arbre de merkle est choisi pour identifier le fichier, au lieu de l'actuel hash SHA-512/256 du fichier. De toute évidence, utilisant ce dernier résultat pour le hasher deux fois. (une fois pour piecemap et une autre pour le fichier en entier)

> __Note__: L'arbre de merkle n'est pas utilisé pour vérifier l'intégrité des pièces ou du large fichier, parce que cela nécessiterait beaucoup de bande passante et d'espace pour transférer et collecter les preuves partiels de vérification, alors que le fichier `piecemap` est suffisant et prend moins de place.

##### Bigfile piecemap

Il contient les hashs SHA-512/256 de chaque morceau. La taille du morceau et le nom du ficher piecemap sont défini dans le `content.json`, exemple :

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

Avec la structure définit, le fichier piecemap est packagé au format [msgpack](https://msgpack.org/) :

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
