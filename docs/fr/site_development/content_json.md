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

**Example**: Forum décentralisé (démo)


---


### domain

Le nom de domaine Namecoin pour votre site. ZeroHello lien redirigera vers celui-ci le plugin Zeroname est activé.

**Example**: Blog.ZeroNetwork.bit




---


### ignore

Ne pas signer les fichiers associés à cette règle.

**Exemple**: `((js|css)/(?!all.(js|css))|data/users/.*)` (ignore tout les fichiers js et css sauf all.js et all.css et ignore le contenu du dossier `data/users/`)

Note: [Quelques restrictions](#regular-expression-limitations) sur les combinaisons possibles.

---


### includes

Ajoute un autre content.json au site. C'est souvent utilisé pour ajouter un sous content.json pour les données des utilisateurs.

**Exemple**:

```python
"includes": {
  "data/users/content.json": {
    "signers": [  # Signataire autorisé pour ce site
      "1LSxsKfC9S9TVXGGNSM3vPHjyW82jgCX5f"
    ],
    "signers_required": 1 # Nombre de signature valide nécessaire pour accepter le fichier
    "files_allowed": "data.json", # Fichiers autorisés (peut être une expression régulière)
    "includes_allowed": false, # Si des sous-includes sont autorisés
    "max_size": 10000, # Taille maximale du content.json inclus et fichiers signés (en bytes)
  }
}
```


---


### merged_type

Le type de groupe ('merger') ce site fait partie.

**Exemple**: `ZeroMe`


---


### optional

Expression régulière pour les fichiers optionnels.

**Exemple**: `(data/mp4/.*|updater/.*)` (tout dans le répertoire `data/mp4` et `updater/` est optionnel)

Note: [Quelques restrictions](#regular-expression-limitations) sur les combinaisons possibles.

---


### signs_required

Le **nombre** de signature valide nécessaire pour accepter le fichier. Permet d'obtenir des site Multisig.

**Exemple**: 1


---


### title

Le titre du site, visible depuis le navigateur et sur ZeroHello.

**Exemple**: ZeroTalk


----


### translate

Fichier à traduire. (utilise les fichiers de language json qui sont dans le répertoire `languages`)

**Exemple**: ["index.html", "js/all.js"]


----


### favicon

Le favicon du site. Va remplacer l'icône Zeronet qui est utilisé par défault avec l'icône spécifié. Il peut être .ico, .png, .svg, etc.

**Exemple**: favicon.ico


----


### user_contents

Règles autorisées pour le contenu de l'utilisateur dans ce répertoire.

Noeud                    | Déscription
                    ---  | ---
**archived**             | Efface le contenu du répertoire de l'utilisateur spécifié qui a été signé avant la date specifié (key: directory name, value: timestamp)
**archived_before**      | Efface tout le contenu des répertoires d'utilisateur qui ont été signé avant la date spécifié (unix timestamp)
**cert_signers**         | Nom de domaine acceptée et addresse de signataire valide
**cert_signers_pattern** | Expression régulière accepté pour les signataire de certificat
**permission_rules**     | Noms de fichiers autorisés et taille du répertoire autorisés par domaine
**permissions**          | Permission cas par cas

**Exemple**:
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

Note: [Quelques restrictions](#regular-expression-limitations) sur les combinaisons possibles.

----


### viewport

Contenu pour le meta tag "viewport". (A utiliser pour les pages mobile-friendly)

**Exemple**: width=device-width, initial-scale=1.0


----

## Regular expression limitations

Pour éviter des attaques [ReDoS](https://en.wikipedia.org/wiki/ReDoS), les restrictions suivantes sur chaque expression sont appliqués:

 - Le `.` caractère est obligatoire avant la répitions des caractères `*,+,{`
 - Une expression peut avoir au maximum 9 répétitions
 - La longueur maximale d'une expression est de 255 caractères

### Exemples:

 - `((?!json).)*$` pas autorisé à cause du `)` avant le caractère `*`. Alternative : `.*(?!json)$`
 - `(.*.epub|.*.jpg|.*.jpeg|.*.png|data/.*.gif|.*.avi|.*.ogg|.*.webm|.*.mp4|.*.mp3|.*.mkv|.*.eot)` pas autorisé car possède 12 répétitions `.*`. Alternative: `.*(epub|jpg|jpeg|png|data/gif|avi|ogg|webm|mp4|mp3|mkv|eot)`
