# Questions Fréquentes


#### Est-ce que j'ai besoin d'avoir un port d'ouvert ?

C'est __optionel__, vous pouvez naviguer et utiliser ZeroNet sans avoir le port ZeroNet d'ouvert. Si vous souhaitez créer un nouveau site il est par contre fortement recommandé d'avoir un port ouvert.

Pendant son lancement ZeroNet essaye d'ouvrir un port pour vous sur votre router en utilisant [UPnP](https://wikipedia.org/wiki/Universal_Plug_and_Play), si cela échoue vous devez le faire manuellement :

- Essayer d'accéder à votre router via son interface web [http://192.168.1.1](http://192.168.1.1) ou [http://192.168.0.1](http://192.168.0.1)
- Chercher un "Activer UPnP"/"Enable UPnP support" ou une option similaire puis relancer ZeroNet.

Si cela ne fonctionne pas encore alors essayer de trouver une section 'redirection de port' sur l'interface web de votre router. C'est différent pour tout les routers. [Voici un tutorial Youtube.](https://www.youtube.com/watch?v=aQXJ7sLSz14) Le port à rediriger est 15441.

---


#### Est-ce que ZeroNet est anonyme ?

Ce n'est pas plus anonyme que BitTorrent, mais la confidentialité (la possibilité de trouver qui est l'auteur d'un commentaire/site) augmentera avec avec le réseau et quand les sites gagneront plus de pairs.

ZeroNet a été crée pour fonctionner avec des réseaux anonymisant : vous pouvez facilment cacher votre adresse IP en utilisant Tor.

---


#### Comment utiliser ZeroNet avec le navigateur Tor ?

En mode Tor, il est recommandé d'utiliser ZeroNet avec le navigateur Tor:

- Lancer le navigateur Tor
- Aller sur `about:preferences#advanced`
- Cliquer sur `Settings...`
- Entrer `127.0.0.1` dans le champs **No proxy for**
- Ouvrer http://127.0.0.1:43110 dans votre navigateur

Si vous voyez une page blanche :
 - Cliquer sur le bouton 'NoScript' (premier icône sur la barre d'outil)
 - Choisisser "Temporary allow all this page"
 - Rafraîchisser la page

---


#### Comment utiliser ZeroNet avec Tor ?

Si vous souhaitez cacher votre adresse IP, installez la dernière version de ZeroNet ensuite cliquez Tor > Enable Tor pour chaque connection sur ZeroHello.

Sur Windows, Tor est packagé avec avec ZeroNet. ZeroNet essayera de télécharger and ouvrir Tor au premier lancement. Si cela échoue pour n'importe quel raison, vous pouvez l'installer manuellement en suivant les instructions (en anglais) dans `core\tools\tor\manual_install.txt`.

Pour les autres OS, suivez les instructions dans la section "Comment ZeroNet fonctionne avec Tor sous Linux/MacOS".

> __Tip:__ Vous pouvez vérifier quel adresse IP ZeroNet utilise sur la page [Stats](http://127.0.0.1:43110/Stats).

> __Tip:__ Si votre connection échoue, soyez sure que vous avez la dernière version de Tor installé. (0.2.7.5+ required)


---


#### Comment ZeroNet fonctionne avec Tor sous Linux/MacOS ?

 - Installer Tor pour votre OS en suivant le tutoriel officiel sur le Tor : [Linux](https://www.torproject.org/download/download-unix.html.en) [Mac](https://www.torproject.org/docs/tor-doc-osx.html.en).
 - `sudo nano /etc/tor/torrc`
 - Retirer le caractère `#` sur les lignes `ControlPort 9051` et `CookieAuthentication 1` (line ~57)
 - Relancer Tor
 - Ajouter la permission à votre utilisateur pour lire le cookie d'authentication. Sou Debian Linux, la commande est `sudo usermod -a -G debian-tor [yourlinuxuser]`<br>(Si vous n'êtes pas sous Debian vérifier le fichier avec `ls -al /var/run/tor/control.authcookie`)
 - Déconnecter/Re-connecter avec votre utilisateur pour appliquer les changements faites au groupe

> __Tip:__ Vous pouvez vérifier si votre configuration Tor est fonctionnel avec `echo 'PROTOCOLINFO' | nc 127.0.0.1 9051`

> __Tip:__ Il est aussi possible d'utiliser Tor sans modifier torrc (ou d'utiliser une version plus ancienne du client Tor), en tapant `zeronet.py --tor disable --proxy 127.0.0.1:9050 --disable_udp`, mais vous perdrez aussi la possibilité de communiquer avec les adresses en .onion.

---

#### Es ce qu'il est possible d'utiliser un fichier de configuration ?

Chaque argument de configuration utilisé en ligne de commande peut être aussi utilisé comme option de configuration. Ajouter ces options ligne par ligne dans un fichier appeler `zeronet.conf` dans votre répertoire zeronet (celui avec zeronet.py)

Exemple:

```
[global]
data_dir = my-data-dir
log_dir = my-log-dir
ui_restrict =
 1.2.3.4
 2.3.4.5
```

Ppour afficher toute les options, utilisé la commande `zeronet.py --help`.

---


#### Comment faire fonctionner Tor si mon FAI ou mon gouvernement bloque son utilisation ?

ZeroNet n'inclut pas encore [le plugin de transport Tor](https://www.torproject.org/docs/pluggable-transports.html.en). La façon la plus facile de faire fonctionner Tor sur un réseau censuré est de lancer le navigateur Tor, le configurer avec le plugin, et modifier ZeroNet pour qu'il utilise le navigateur Tor et son port en lançant ZeroNet avec `--tor_controller 127.0.0.1:9151 --tor_proxy 127.0.0.1:9150` ou en ajoutant les paramètres au fichier de configuration `zeronet.conf`.

```
[global]
tor_controller = 127.0.0.1:9151
tor_proxy = 127.0.0.1:9150
```


---


#### Est-ce que je peux utiliser le même nom d'utilisateur sur plusieurs machines ?

Oui, il suffit juste de copier le fichier `data/users.json` sur votre nouvelle machine.


---


#### Comment créer une adresse de site "sophistiqué" (pas un .bit) ?

Utiliser [vanitygen](https://bitcointalk.org/index.php?topic=25804.0) pour en générer une. Une fois votre clef générée, créer le répertoire `data/1YourPublicKey...tCkBzAXTKvJk4uj8`. Ajouter vos fichiers.

Ensuite visiter [http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/](http://127.0.0.1:43110/1YourPublicKey...tCkBzAXTKvJk4uj8/). Faites glisser le bouton `0` sur la gauche et utiliser le menu pour y signer votre site.


---


#### Comment puis-je enregistrer un nom de domaie en .bit ?

Vous pouvez enregistrer un nom de domaine en .bit en utilisant [Namecoin](https://namecoin.info/). Il est possible de manager vos noms de domaines via l'interface client ou par [l'interface en ligne de commande](https://github.com/namecoin/wiki/blob/master/How-to-register-and-configure-.bit-domains.md).

Après avoir enregistrer votre nom de domaine, il vous faut éditer le registre de celui-ci en y ajoutant la section zeronet.

Exemple :

```
{
...
    "zeronet": {
        "": "1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr",
        "blog": "1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8",
        "talk": "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ"
    },
...
}
```
Le champ vide (`""`) signifie que c'est le domaine supérieur, les autres champs sont des sous-domaines.

> __Tip:__ Vous pouvez acheter des Namecoins avec des bitcoins sur [shapeshift.io](https://shapeshift.io/).

> __Tip:__ Autres moyens pour enregistrer un nom de domaine en .bit : [domaincoin.net](https://domaincoin.net/), [peername.com](https://peername.com/), [dotbit.me](https://dotbit.me/)

> __Tip:__ Vous pouvez vérifier votre nom de domaine sur [namecha.in](http://namecha.in/), par exemple: [zeroid.bit](http://namecha.in/name/d/zeroid)

> __Tip:__ Vous devez seulement utiliser [des lettres en minuscules, nombres er - dans votre nom de domaine](http://wiki.namecoin.info/?title=Domain_Name_Specification_2.0#Valid_Domains).

> __Tip:__ Pour faire en sorte que ZeroHello montre votre nom de domaine au lieu de votre adresse Bitcoin, ajouter un champ "domaine" avec votre nom de domaine Namecoin à votre fichier content.json. ([Example](https://github.com/HelloZeroNet/ZeroBlog/blob/master/content.json#L6))


---


#### Est-ce que je peux utiliser l'adresse/clef privée générée d'un site pour accepter des paiments en Bitcoin ?

Oui, c'est une adresse Bitcoin standard. La clef privée est, elle, au format WIF, il est donc possible de l'importer dans la plupart des clients.

> __Tip:__ Il est malgré tout déconseillé de garder une somme d'argent conséquente sur ces adresses car à chaque fois que votre site est modifié il vous faut utiliser votre clef privée.


---


#### Que se passe-t-il si quelqu'un intègre du contenu malveillant ?

Les sites ZeroNets sont "sandboxés", ils ont les mêmes privilèges que n'importe quel site sur internet.
Vous êtes en plein contrôle de ce que vous hébergez. Si vous trouvez du contenu suspicieux, vous pouvez arréter de le l'héberger à tout moment.


---


#### Est-ce qu'il est possible d'installer ZeroNet sur une machine distante ?

Oui, vous devez activer le plugin UiPassword en rennomant le répertoire  __plugins/disabled-UiPassword__ en __plugins/UiPassword__, ensuite relancer ZeroNet sur la machine avec la commande <br>`zeronet.py --ui_ip "*" --ui_password anypassword`.
Cela reliera le serveur web ZeroNet UI à toutes les interfaces, mais pour le garde sécurisé vous pouvez seulement y accéder en y entrant le mot de passe.

> __Tip:__ Vous pouvez aussi restreindre l'accès par IP en utilisant l'option `--ui_restrict ip1 ip2`.

> __Tip:__ Vous pouvez spécifier le mot de passe dans le fichier de configuration `zeronet.conf` en ajoutant les lignes `[global]` et `ui_password = anypassword`.


---


#### Est-ce qu'il est possible de traquer la bande passante utilisé par ZeroNet ?

The ratio reçu/envoyé est affiché dans le menu ZeroNet. <br>(vous pouvez l'ouvrir en faisant glisser le bouton `0` en haut à gauche)

> __Tip:__ Page contenant les statistiques : [http://127.0.0.1:43110/Stats](http://127.0.0.1:43110/Stats)


---


#### Que se passe-t-il si deux personnes utilisent la même clef pour modifier un site ?

Chaque fichier `content.json` est horodaté, les clients choisissent toujours la verssion la plus récente et avec une signateure valide.


---


#### Est-ce que ZeroNet utilise la blockchain de Bitcoin ?

Non, ZeroNet utilise seulement la cryptographie de Bitcoin pour les adresses des sites et signer/vérifier le contenu.
L'identification des utilisateurs repose sur le standard [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).

La blockchain de Namecoin est néamoins utilisé pour l'enregistrement des noms de domaines, cependant les clients ne la télécharge pas. Les métadonnées sont passés via le réseau ZeroNet.

---


#### Est-ce que ZeroNet supporte seulement les pages HTML/CSS ?

ZeroNet a été construit pour héberger des sites dynamiques avec des mise à jour en temps réel, mais vous pouvez servir n'importe quel genre de fichiers, comme des répertoires VCS, votre propre client léger, base de donnée, etc.


---


#### Comment créer un nouveau site ?

[Suivez ces instructions.](../using_zeronet/create_new_site/)

---


#### Que se passe-t-il quand j'accède à un site ?

- Lorsque vous visitez un nouveau site, ZeroNet demande les adresses IP de visiteurs précédents aux traqueurs BitTorrent.
- En premier, un fichier nommé __content.json__ est téléchargé. Il contient tout les noms de fichiers, leurs __hashes__ et la signature cryptographique du propriétaire.
- Le fichier content.json téléchargé est ensuite __vérifié__ en utilisant la __clef publique__ du site et la __signature__ du propriétaire du site.
- Les autres fichiers (html, css, js...) sont ensuite __téléchargé__ et vérifié en les comparant à leur hash SHA256 inscrit dans le fichier content.json.
- Chaque site visité sera ensuite __distribué par vous__.
- Si le propriétaire du site (celui qui a la clef privée associée à l'adresse du site) __modifie__ le site, alors la personne signe le nouveau content.json et le __publie à ses pairs__. Après que ces derniers ont bien vérifié l'intégrité du fichier (via la signature), ils peuvent __téléchargé le contenu modifié__ et le distribué à leur tour à leurs pairs.

Plus d'info:
 [exemple de sites ZeroNet](../using_zeronet/sample_sites/),
 [Présentation sur le réseau ZeroNet](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub)
