# Standard di programmazione per collaborare a ZeroNet
 - Seguire [PEP8](https://www.python.org/dev/peps/pep-0008/)
 - Semplice è meglio che complesso
 - L'ottimizzazione prematura è la strada verso la perdizione

### Nomenclatura
 - NomiDelleClassi: iniziali delle parole maiuscole (CamelCased)
 - nomiDelleFunzioni: iniziale minuscola, le altre parole con inziale maiuscola (camelCased)
 - nomi_delle_variabili: minuscolo con parole separate da underscore (under_scored o snaked_name)

### Variabili
 - percorso_file: percorso dei file relativo alla cartella di lavoro (data/17ib6teRqdVgjB698T4cD1zDXKgPqpkrMg/css/all.css)
 - percorsi_interni: percorsi relativi alle cartelle del sito (css/all.css)
 - nomi_file: all.css
 - file: oggetti Python
 - privatekey: chiave privata per il sito (senza _)

### Cartelle file sorgenti e nomenclatura
 - É preferibile un file per classe
 - I nomi dei file sorgenti e delle cartelle derivano dal NomeClasse: WorkerManager class = Worker/WorkerManager.py
