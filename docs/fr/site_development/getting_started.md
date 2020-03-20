# Commencer

ZeroNet permet de publier des sites statiques mais aussi dynamique.

Avec ZeroNet, il n'y a aucun concept de serveur. Nous n'avons donc pas besoin de language comme PHP ou Ruby. Il est par contre possible de créer du contenus dynamique en utilisant l'API ZeroNet (appellé ZeroFrame), JavaScript (ou CoffeeScript) et la base de donée SQL fournit à chaque site.

## Tutoriels

### ZeroChat tutoriel

Dans ce tutoriel, nous allons créer un site de chat en P2P, décentralizé, sans serveur en moins de 100 lignes de codes.

* [Lire l'article sur ZeroBlog (en)](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:99:ZeroChat+tutorial)
* [Lire l'article sur Medium.com (en)](https://decentralize.today/decentralized-p2p-chat-in-100-lines-of-code-d6e496034cd4)

## Information utile

### ZeroNet Debug mode

ZeroNet vient avec un flag `--debug` qui rend le développement de site plus facile.

Pour lancer ZeroNet en mode debug, utilisé : `python zeronet.py --debug`

Si vous utilisez une version compilé/bundle de ZeroNet :

* On Windows: `lib\ZeroNet.cmd --debug`
* On Linux: `./ZeroNet.sh --debug`
* On Mac: `./ZeroNet.app/Contents/MacOS/ZeroNet --debug`

#### Les fonctions en debug mode :

- Automatique [CoffeeScript](http://coffeescript.org/) -> JavaScript conversion (si un compiler coffeescript est disponible)
- Les messages de debug apparaîtront dans la console
- Reload automatique des fichiers sources (UiRequest, UiWebsocket, FileRequest) si modifiés pour ne pas avoir à redémarrer (Nécessite [PyFilesystem](http://pyfilesystem.org/) sur GNU/Linux)
- `http://127.0.0.1:43110/Debug` Python debugger (utilise le debugger Werkzeug - Nécessite [Werkzeug](http://werkzeug.pocoo.org/))
- `http://127.0.0.1:43110/Console` Console Python interactive (Nécessite [Werkzeug](http://werkzeug.pocoo.org/))

### CoffeeScript sites

Pour faciliter le développement de site en CoffeeScript, assurez vous d'avoir lancer ZeroNet en debug mode. Ce mode activera la conversion automatique de CoffeeScript -> JavaScript comme décrit dans [Debug](#zeronet-debug-mode). Il est important aussi que votre site soit marqué comme le votre. Pour cela, assurez vous que dans la bar de menu vertical du site "This is my site" soit coché.

<!-- Is this right? -->
ZeroNet va compiler tous les fichiers CoffeeScript qu'il va trouver en un seul fichier nommé `all.js`, et le placer dans le répertoire `js/` au plus haut niveau de votre site. Ce fichier va aussi inclure tout le code JavaScript. Vous pouvez ensuite l'importer dans votre HTML à l'intérieur du tag `<body></body>`:

```html
<script type="text/javascript" src="js/all.js?lang={lang}"></script>
```

<!-- Why? -->
!!! info "Note"

    `{lang}` est une *variable*, et il sera automatiquement remplacé par la valeur approprié par ZeroNet lorsque le site charge.

### Désactiver le cache HTTP

Additionnellement, lorsque l'on est en Debug Mode, le cache de votre navigateur doit être désactivé, ce qui est un indispensable lorsque vous souhaitez développer un site ZeroNet. Les navigateurs modernes tentent de cacher le contenus du site web lorsqu'ils le peuvent. Comme tout les sites ZeroNet sont chargés dans un iframe, le navigateur bien souvent ne peut détecter que le contenus a été modifié et ne va donc pas chercher les nouveaux changements si le caching est activé.

Pour désactiver le caching, ouvrez votre navigateur "devtool", dans le menu de configuration de celui-ci veillez coché 'Disable HTTP Cache (when toolbox is open)'. Comme suggérer par l'option veuillez à garder le "devtool" ouvert pour que la désactivation du cache fonctionne lorsque le vous tester votre site.

### Extra fonctionalités (fonctionne seulement si le site vous appartient)

 - Fichiers CSS mergés: Tous les fichiers CSS à l'intérieur du répertoire du site seront mergés en un seul fichier nommé `all.css`. Vous pouvez choisir d'inclure seulement ce fichier dans votre site. Si vous souhaitez garder les fichiers CSS sans les publiier, il est possible de les ajouter dans la section `ignore` dans votre `content.json`. Cela facilite le développement. (example : `"ignore": "(js|css)/(?!all.(js|css))"` cela va ignorer tous les fichiers CSS et JS sauf `all.js` et `all.css`)
 - Fichiers JS mergés : Tous les fichiers JS contenu dans un répertoire pour un site sera mergé en un seul fichier appelé `all.js`. Si un compilateur CoffeeScript est présent (c'est le cas avec windows) il convertira les fichier `.coffee` to `.js`.
 - Ordre dans lequel les fichiers sont mergés dans all.css/all.js: Fichiers à l'intérieur des sous-répertoires du répertoire css/js sont mergés en premier; puis osnt ajoutés les fichiers du répertoire css/js par ordre alphanumérique (01_a.css, 02_a.css, etc)


## Besoin d'aide

ZeroNet a une communauté grandissante de dévelopeurs qui sont présents dans différents espaces. Si vous avez besoin d'aide, de conseils ou souhaiter juste discuter, venez nous rejoindre sur l'un de ces services :

### Forums

* [ZeroExchange](http://127.0.0.1:43110/zeroexchange.bit/), un clone p2p de StackOverflow
* [ZeroTalk](http://127.0.0.1:43110/Talk.ZeroNetwork.bit/), un p2p forum similaire à Reddit

### Chat

* [#zeronet-dev:matrix.org](https://riot.im/app/#/room/#zeronet-dev:matrix.org) sur Matrix
* via IRC #zeronet sur freenode
