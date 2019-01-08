# Structure du fichier content.json

Tout les sites ZeroNet ont un fichier `content.json`. ([Exemple de fichier content.json](https://github.com/HelloZeroNet/ZeroTalk/blob/master/content.json))

Ce fichier aura, entre autre, une liste de tout les fichiers sur votre site et une signature crée avec votre clée privée. C'est utilisé pour assurer l'authenticité des fichiers du site et éviter des modifications non souhaités. (NB: seulement vous, ou des personnes que vous avez choissit, peuvent mettre à jour le contenu du site).

Voici une liste des champs supporté dans le fichier `content.json` :

---

## Champs générés automatiquement

_Ces chaps sint ajoutés automatiquement lorsque le site est créé ou cloné._

### address

L'adresse de votre site

**Example**: 1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ


---


### address_index

L'index de la sous-clé BIP 32 correspondant à l'adresse de votre site. Ajouté automatiquement lorsque que vous clonez un site. Cela permet de regénéré votre clé privé à partir de votre BIP32 source (ou 'seed').

**Example**: 30926910

---


### cloned_from

Seulement pour les sites clonés. L'adresse du site depuis lequel il a été cloné.

**Example**: 1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8

---


### clone_root

Seulement pour les sites clonés. Le sous-répertoire du site qui a été cloné.

**Example**: template-new


---


### files

Taille et sha512 des fichiers automatiquement téléchargés appartenant au site. Automatiquement ajouté avec la commande  `zeronet.py siteSign siteaddress privatekey`.

**Example**:
```python
    "css/all.css": {
      "sha512": "869b09328f07bac538c313c4702baa5276544346418378199fa5cef644c139e8",
      "size": 148208
    }
```


---


### files_optional

Taille et sha512 des fichiers optionnels appartenant au site. Automatiquement ajouté avec la commande `zeronet.py siteSign siteaddress privatekey`.

**Example**:
```python
    "data/myvideo.mp4": {
      "sha512": "538c09328aa52765443464135cef644c144346418378199fa5cef61837819538",
      "size": 832103
    }
```



---


### modified

Temps (timestamps) lorsque le content.json est généré.

**Example**: 1425857522.076


---


### sign (deprecated)

Signature ECDSA du contenu du fichier content.json. (champs dans l'ordre, sans espace et les noeuds `sign` et `signers_sign`). Pour compatibilité avec les version antérieur, sera retiré bientôt.

**Example**:
```python
  "sign": [
    43117356513690007125104018825100786623580298637039067305407092800990252156956,
    94139380599940414070721501960181245022427741524702752954181461080408625270000
  ],
```


---


### signers_sign

Les adresses authorisés à signer le principale content.json signé utilisant la clé privée de l'adresse du site. Plusieurs entrées sont possible ici, permettant d'activer la fonctionalité multisig.

**Format de la chaine de caractère signé**: [number_of_signers_required]:[signer address],[signer address]

*Example*:
```
signs_required: 1:1PcxwuHYxuJEmM4ydtB1vbiAY6WkNgsz9G,1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE
signers_sign: MEUCIQDuz+CzOVvFkv1P2ra9i5E1p1G0/1cOGecm7GpLpMLhuwIgBIbCL0YHXD1S2+x48QS5VO/rISrkdLiUR+o+x1X0y1A=
```

Le messagne signé ci-dessus a été signé avec l'adresse  "1PcxwuHYxuJEmM4ydtB1vbiAY6WkNgsz9G".

---


### signs

Signature ECDSA pour le contenu du content.json :

 - `sign`, `signs` champs JSON sont retirés
 - JSON reformatté avec ses champs dans l'ordre alphabétique et sans espace  
 - Signature généré sur les données formatées avec Electrum Bitcoin format de signature de message :
    * [Message encodé](https://github.com/vbuterin/pybitcointools/blob/87806f3c984e258a5f30814a089b5c29cbcf0952/bitcoin/main.py#L405): `sha256("\x18" || "Bitcoin Signed Message:\n" || num_to_var_int(len(message)) || message)`
    * [Format](https://github.com/MuxZeroNet/zerolib/blob/f13126e04bf99b1b416a7ea5b5cad7924cdc15a4/zerolib/integrity/bitcoin.py#L82-L93): `recovery_id || r || s`, où 27 ≤ recovery_id ≤ 30; taille de la signature = 1 + 32 + 32 = 65 bytes.
    * La double barre verticale `||` représente la concatenation des bytes.

**Exemple**:
```python
  "signs": {
    "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ": "G6/QXFKvACPQ7LhoZG4fgqmeOSK99vGM2arVWkm9pV/WPCfc2ulv6iuQnuzw4v5z82qWswcRq907VPdBsdb9VRo="
  },
```


----


### zeronet_version

La version de Zeronet utilisé pour générer le fichier `content.json`.

**Exemple**: 0.2.5

---

## Champs optionels

_Les champs suivants peuvent être ajouté si besoin._


### background-color

Couleur de fond du wrapper.

**Exemple**: #F5F5F5


---


### cloneable

Authorise n'importe qui à cloner le site si **true**.

To make your site properly cloneable you have to have a separate folder of data
files for a clean start (e.g. without any blog posts).  To do this you have to
add the **-default** postfix to your data files and directories.  During the
cloning process, only directories with the **-default** postfix are
copied. The postfix is removed from the new site.



---


### description

Description de votre site, il sera affiché sous son titre dans ZeroHello.

**Example**: Démo de forum décentralizé


---


### domain

Namecoin domain name of your site. ZeroHello will link to this if the user has Zeroname plugin enabled.

**Example**: Blog.ZeroNetwork.bit




---


### ignore

Do not sign files matching this pattern.

**Example**: `((js|css)/(?!all.(js|css))|data/users/.*)` (ignore all js and css files except all.js and all.css and don't add anything from the `data/users/` directory)

Note: [Some restrictions](#regular-expression-limitations) apply to regular expressions.

---


### includes

Include another content.json in the site. This is typically used for subsequent content.json files that are used to govern user data.

**Example**:

```python
"includes": {
  "data/users/content.json": {
    "signers": [  # Possible signers address for the file
      "1LSxsKfC9S9TVXGGNSM3vPHjyW82jgCX5f"
    ],
    "signers_required": 1 # The *number* of Valid signs required to accept the file (Multisig possibility),
    "files_allowed": "data.json", # Preg pattern for the allowed files in the include file
    "includes_allowed": false, # Whether nested includes are allowed
    "max_size": 10000, # Max allowed size of included content.json and files it signs (in bytes)
  }
}
```


---


### merged_type

The type of merger this site is a part of.

**Example**: `ZeroMe`


---


### optional

Preg pattern of optional files.

**Example**: `(data/mp4/.*|updater/.*)` (everything in data/mp4 and updater directory is optional)

Note: [Some restrictions](#regular-expression-limitations) apply to regular expressions.

---


### signs_required

The **number** of valid signs required to accept the file. Allows for Multisig functionality.


**Example**: 1


---


### title

The site's title, visible in the browser title and on ZeroHello.

**Example**: ZeroTalk


----


### translate

Files need be translated. (use language json files in the `languages` directory)

**Example**: ["index.html", "js/all.js"]


----


### favicon

The site's favicon. Replaces the default ZeroNet logo with a site-specific icon. Can be a .ico, .png, .svg, etc.

**Example**: favicon.ico


----


### user_contents

Rules of allowed user content within the current directory.

Node                   | Description
                  ---  | ---
**cert_signers**       | Accepted domains and valid signer addresses
**permission_rules**   | Allowed file names and total directory size based on cert domain or authorization method
**permissions**        | Per-user permissions. (false = banned user)

**Example**:
```python
  "user_contents": {
    "cert_signers": {
      "zeroid.bit": [ "1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz" ]
    },
    "permission_rules": {
      ".*": {
        "files_allowed": "data.json",
        "max_size": 10000
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

Note: [Some restrictions](#regular-expression-limitations) apply to regular expressions.

----


### viewport

Content for the viewport meta tag. (Used for mobile-friendly pages)

**Example**: width=device-width, initial-scale=1.0


----

## Regular expression limitations

To avoid the [ReDoS](https://en.wikipedia.org/wiki/ReDoS) algorithmic complexity attack, the following restrictions are applied to each pattern:

 - `.` character is mandatory before repetition characters of `*,+,{`
 - Maximum 9 repetitions are allowed in a single pattern
 - The maximum length of a pattern is 255 characters

### Examples:

 - `((?!json).)*$` not allowed, because of `)` before the `*` character. Possible fix: `.*(?!json)$`
 - `(.*.epub|.*.jpg|.*.jpeg|.*.png|data/.*.gif|.*.avi|.*.ogg|.*.webm|.*.mp4|.*.mp3|.*.mkv|.*.eot)` not allowed, because it has 12 `.*` repetition patterns. Possible fix: `.*(epub|jpg|jpeg|png|data/gif|avi|ogg|webm|mp4|mp3|mkv|eot)`
