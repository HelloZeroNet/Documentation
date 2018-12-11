# Contribuer à ZeroNet

Merci à vous d'utiliser ZeroNet. ZeroNet est un effort collaborative de 67+ enthousiastes juste comme vous. Nous avons besoin d'utilisateurs qui reportent des bugs, améliorent la documentation et partagent leurs idées/expériences en dévelopement de protocole. Voici quelques informations sur comment vous pouvez contribuer au projet.


### Vous n'avez pas besoin d'écrire du code

En réalité, la majorité des contributeurs ne soumettent pas de code source. Même si vous pouvez écrire en language de programmations, tout autre forme de contribution est la bienvenue.

### Est-ce que vous aimez écrire ?

- Ecrivez sur ZeroNet.
- Ecrivez des tutoriels pour aider les gens à commencer.
- Aidez à traduire ZeroNet.
- Améliorez cette documentation. Cette page a été rédigé par de nombreux membres de la communauté partout dans le monde.

### Est-ce que vous aimez aider les gens ?

- Abonnez-vous à notre [issue tracker sur Github](https://github.com/HelloZeroNet/ZeroNet/issues) et aider à résoudre les problèmes.
- Rejoignez-nous sur [Gitter](https://gitter.im/HelloZeroNet/ZeroNet) et notre IRC [#zeronet @ freenode](https://kiwiirc.com/client/irc.freenode.net/zeronet) et aidez à répondre aux questions.
- Mettez en place une seed box et aider à rendre le réseau plus performant.

### Est-ce que vous aimez créer des sites ?

- Créez un nouveau site. Essayez et créez votre propre blog sur ZeroNet. [C'est facile et ça coûte presque rien.](../using_zeronet/create_new_site.md)
- “Le contenu est roi !” comme le dit NoFish. Le réseau ne sert à rien sans contenu, c'est maintenant à vous d'en faire un super réseau.

### Est-ce que vous aimez faire des recherches ?

- Aidez nous à résoudre [les problèmes les plus difficiles](https://github.com/HelloZeroNet/ZeroNet/labels/help%20wanted).
- Rejoignez les discussions sur comment apporter de nouvelles fonctionalitées comme [I2P](https://github.com/HelloZeroNet/ZeroNet/issues/45) et [l'ajout de DHT](https://github.com/HelloZeroNet/ZeroNet/issues/57).
- Est-ce que vous détenez un [Raspberry Pi](https://github.com/HelloZeroNet/ZeroNet#linux-terminal), un [C.H.I.P.](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:94:Running+ZeroNet+on+a+$9%C2%A0computer) ou un [un router](https://github.com/HelloZeroNet/ZeroNet/issues/783)?
Essayez de faire tourner ZeroNet dessus et partagez votre expérience avec les autres.

### Vous aimez programmer ?

- Si vous connaissez Python, vous pouvez choisir une tâche sur [le Github du projet](https://github.com/HelloZeroNet/ZeroNet/issues).
- Vous êtes aussi inviter à déveloper votre propre idée. Avant de commencer, [ouvrez une nouvelle discussion](https://github.com/HelloZeroNet/ZeroNet/issues/new) pour partager votre idée, être sure d'aller dans la bonne direction et collaborer avec d'autres membres.
- Gardez votre style consistant. Pour faciliter la collaboration veillez à suivre les conventions décritent ci-dessous.

### Est-ce que vous souhaiter offrir votre soutien financier ?

- Vous pouvez [donner des bitcoins](donate.md) pour supporter ZeroNet.


## Les standards de programmation

 - Suivre [PEP8](https://www.python.org/dev/peps/pep-0008/)
 - Simple est mieux que complexe
 - L'optimisation prématurée est la racine du mal

### Nommage
 - NomDeClasse: Capital, CamelCased
 - nomDeFonction: commence avec une minuscule, camelCased
 - nom_de_variable: en minuscule, avec un under_score

### Variables
 - file_path: chemin relative au répertoire de travail (data/17ib6teRqdVgjB698T4cD1zDXKgPqpkrMg/css/all.css)
 - inner_path: fichier relative au répertoire du site (css/all.css)
 - file_name: all.css
 - file: Objet fichier en python
 - privatekey: Clef privée du site (sans _)

### Fichiers sources, répertoires et nommage
 - Une classe par fichier de préférénce
 - Nom du fichier et du répertoire vient du NomDeClasse :
  WorkerManager class = Worker/WorkerManager.py
