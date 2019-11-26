# Creare un nuovo sito ZeroNet

## Modo semplice: utilizzare l'interfaccia web

 * Fare clic su **⋮** > voce di menu **"Creare un nuovo sito vuoto"** sul sito [ZeroHello](http://127.0.0.1:43110/1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D).
 * Si verrà **rediretti** in un sito completamente nuovo modificabile solo da voi!
 * Si può accedere e modificare il contenuto del proprio sito nella cartella **data/[indirizzodeltuosito]**
 * Dopo le modifiche aprire il sito, trascinare a sinistra l'icona "0" in alto a destra, quindi fare clic sui bottoni **firma** e **pubblica** nella parte bassa

## Modo manuale: utilizzando la riga di comando

### 1. Creare la struttura del sito

* Spegnere ZeroNet se attivo
* Navicare nella cartella dove è installato ZeroNet ed eseguire:

```bash
$ zeronet.py siteCreate
...
- Chiave privata del sito: 23DKQpzxhbVBrAtvLEc2uvk7DZweh4qL3fn3jpM3LgHDczMK2TtYUq
- Indirizzo del sito: 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2
...
- Sito creato!
$ zeronet.py
...
```

- Questo creerà i file iniziali dentro ```data/13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2```.

> __Nota:__
> Gli utenti Windows che utilizzano la versione pachettizata devono navigare nella cartella ZeroBundle/ZeroNet ed eseguire `"../Python/python.exe" zeronet.py siteCreate`

### 2. Costruire/modificare un sito

* Aggiornare i file del sito posizionati in ```data/[chiave dell'indirizzo del sito]``` (es.: 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2).
* Quando il sito è pronto eseguire:

```bash
$ zeronet.py siteSign 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2
- Sito in firma: 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2...
Chiave privata (inserimento nascosto):
```

* Inserire la chiave privata ottenuta quando si è creato il sito. Questo applicherà la firma a tutti i file così i peer potranno verificare che chi effettua le modifiche è il proprietario del sito.

### 3. Pubblicare le modifiche del sito

* Per informare i peer delle modifiche effettuate bisogna eseguire:

```bash
$ zeronet.py sitePublish 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2
...
SiSitote:13DNDk..bhC2 Publishing to 3/10 peers...
Sito:13DNDk..bhC2 Pubblicato con successo da 3 peer
- File distribuiti....
```

* Questo è tutto! Le modifiche sono state firmate e pubblicate con successo.
* Il sito sarà accessibile da: ```http://localhost:43110/13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2```


**Passi successivi:** [Documentazione sviluppatori ZeroNet](../../site_development/getting_started/)
