## Qu'est ce que ZeroNet ?

ZeroNet utilise Bitcoin cryptographie et BitTorrent technologie afin de créer un **réseau décentralisé résistant à la censure**.

Les utilisateurs peuvent publier des sites statiques ou dynamiques sur ZeroNet et les visiteurs peuvent choisir s'ils souhaitent ou pas distribuer le site eux-même. Les sites internet resteront en ligne tant qu'un pair sera toujours en ligne.

Quand un site est mis à jour par son propriétaire, tous les noeuds distribuant ce site (précédents visiteurs) receveront seulement les mises à jour faite au contenu du site.

ZeroNet est distribué avec une base de donnée SQL prête à l'utilisation. Cela rend les sites avec beaucoup de contenus facile à déveloper. La base de donnée est ensuite synchronisée avec les noeuds hôtes à chaque mise à jour incrémentale.

## Pourquoi ?

* Nous croyons dans la communication ouvert, libre et non censurée.
* Aucune censure: Après que quelque chose soit publié il n'y a aucun moyen de le supprimé.
* Aucun point unique de défaillance: Le contenu reste en ligne même si seulement un pair le distribue.
* Impossible à arréter: C'est nulle part parce que c'est partout. Le contenu est distribué par n'importe quel utilisateur qui souhaite contribuer.
* Rapide: ZeroNet utilise BitTorrent technologie pour délivrer le contenu rapidement sans serveur centrale.
* Fonctionne hors-ligne: Vous pourvez accéder aux sites même si votre internet n'est pas disponible.
* Secure: Le contenu posté est sécurisé avec la même cryptographie utilisé par votre porte-feuille Bitcoin.

[comment]: <> (I'm unsure about the following bit. Thoughts?)
[comment]: <> (# What problem is ZeroNet solving?)

[comment]: <> (When Tim Berners-Lee created the internet, he meant for it to be free. Not surveilled nor censored. And [he is still fighting for that](http://edition.cnn.com/2014/03/12/tech/web/tim-berners-lee-web-freedom/).)

[comment]: <> (The internet is centralized mainly in two places: Content and Domain Names (URLs) are hosted and controlled by central servers. If you control the central servers (and if you are powerful enough you do) you control the network.)

[comment]: <> (**Decentralized content storage**)

[comment]: <> (ZeroNet tackles the content storage problem by giving everyone the ability to store content. Site visitors can choose to store a website on their computers, and when they do this they also help to serve the site to other users. The site is online even if only one user is hosting it.)

[comment]: <> (**Shared DNS cache**)

[comment]: <> (Site addresses on ZeroNet are cached by all network members. When you type a ZeroNet site URL on your browser this will query other peers connected to you about the site. If one of these peers happen to have the site they will send it to you, if not, they will forward your query along.)

[comment]: <> (This architecture means that when a site URL is created, as long as one peer is serving it, there is no way to take the URL down.)

## Avantages

* Facile, zero configuration nécessaire pour commencer.
* Pas de mots de passe mais un système d'authorization base sur [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki). Votre compte est protégé avec la même cryptographie utilisé dans votre portefeuille Bitcoin.
* Site mis à jour en temps réel, pas besoin de refraîchir votre page.
* Supporte les noms de domaine en .bit de Namecoin.
* Base de donnée SQL supportée : Facilite de dévelopment de site et permet un chargement de page plus rapide.
* Anonymat : Supporte Tor réseau avec .onion service caché à la place des addresses ipv4.
* Connection chiffrées TLS.
* Ouverture des ports via uPnP automatiquement.
* Plugin pour multi-utilisateur service (openproxy).
* Fonctionne avec n'import quel navigateurs/OS.

## Comment ça fonctionne ?

* Après avoir installé et lancé ZeroNet, vous pouvez visiter un site en tapant l'url :
  `http://127.0.0.1:43110/{zeronet_site_address}`
  (exemple - `http://127.0.0.1:43110/1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D`)
* ZeroNet utilisera le réseau BitTorrent pour trouver des pairs qui partage le site et commencera à télécharger son contenu (HTML, CSS, JS...) depuis ces pairs.
* Chaque site visité sera ensuite distribué depuis votre ordinateur/serveur. Ces sites peuvent effacer ou blacklister si nécessaire.
* Tous les sites contiennent une liste de tous ses fichiers,  chaque entrée étant assigné un hash SHA512 et une signature générée à partir de la clé privée du propriétaire du site.
* Si le propriétaire du site modifie celui-ci, alors la personne signe la nouvelle liste et la publie aux pairs. Après avoir vérifié l'intégrité de la liste (utilisant la signature), ils peuvent télécharger les fichiers modifiés an publié le nouveau contenu à d'autres pairs.

##### [Slideshow about ZeroNet cryptography, content updates, multi-user sites &raquo;](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub?start=false&loop=false&delayms=3000)

## Capture d'écrans

![Screenshot](img/zerohello.png)

![ZeroTalk](img/zerotalk.png)

##### [Plus de capture d'écrans &raquo;](/using_zeronet/sample_sites/)

## Limites

* <strike>Pas de découpement des gros fichiers à la Torrent</strike> (BigFile plugin ajouté)
* Transfert de fichier non compressé <strike>ou chiffré</strike> (chiffrement TLS ajouté)
* Pas de sites privés

## Contribution financière

Bitcoin: 1QDhxQ6PraUZa21ET5fYUCPgdrwBomnFgX

[Page de donation](help_zeronet/donate/)

### Merci !

* Plus d'info, aide, changelog, sites zeronet : [http://www.reddit.com/r/zeronet/](http://www.reddit.com/r/zeronet/)
* Viens ! Regarde comme on est bien. Discuter avec nous : [#zeronet @ FreeNode](https://kiwiirc.com/client/irc.freenode.net/zeronet) or on [gitter](https://gitter.im/HelloZeroNet/ZeroNet)
