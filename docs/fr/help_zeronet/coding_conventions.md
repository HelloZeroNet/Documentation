# Les standards de programmation pour contribuer à ZeroNet
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
