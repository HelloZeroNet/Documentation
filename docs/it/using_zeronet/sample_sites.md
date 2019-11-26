# Siti ZeroNet di esempio

## ZeroHello

La pagina principale di ZeroNet

 - Elenca tutti i siti seguiti: titolo, numero peer, data modifica, etc.
 - Azioni sui siti: aggiorna, pausa, riavvia, cancella, controlla file e salva come .zip
 - Duplicare siti per avere il proprio blog / forum
 - Statistiche ZeroNet
 - Se è disponibile un aggiornamento, ZeroNet può essere aggiornato con un clic

![ZeroHello](../img/zerohello.png)

Indirizzo: [1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D](http://127.0.0.1:43110/1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D)

[Codice sorgente](https://github.com/HelloZeroNet/ZeroHello)

---

## ZeroBlog

Demo di un blog con pubblicazione automatica

 - Modifica dei contenuti in linea
 - Sintassi Markdown
 - Evidenza sintassi del codice
 - Firma e pubblicazione del sito attraverso l'interfaccia web

Come funziona?

 - `data.json` all'interno dei file del sito contiene i messaggi e i commenti del blog. Ogni utente ha i propri.
 - Con l'elaborazione `Firma & Pubblica nuovi contenuti`, viene richiesta al bloggher la chiave privata del sito (visualizzata [creando un nuovo sito utilizzando il comando zeronet.py siteCreate](create_new_site/))
 - Il vostro client ZeroNet firma i file nuovo/modificati e li pubblica direttamente agli altri peer
 - Il sito sarà quindi accessibile finché altri peer lo pubblicano

![ZeroBlog](../img/zeroblog.png)

Indirizzo: [1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8](http://127.0.0.1:43110/1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8) o [blog.zeronetwork.bit](http://127.0.0.1:43110/blog.zeronetwork.bit)

[Codice sorgente](https://github.com/HelloZeroNet/ZeroBlog)


---

## ZeroTalk

Demo di forum P2P decentralizzato

 - Creazione di messaggi e commenti, modifica, cancellazione e votazioni
 - Commenti e contenuti pubblicati direttamente agli altri peer
 - Solo l'autore può firmare e modificare i prorpi file
 - Visualizzazione in tempo reale di nuovi commenti

Come funziona?

 - Per inserire e commentare messaggi serve richiedere un certificato di registrazione (una firma criprografica) da un provider ZeroID
 - Ottenuto il certificato si può pubblicare il contenuto (messaggi, argomenti, voti) direttamente ad altri peer

![ZeroTalk](../img/zerotalk.png)

Indirizzo: [1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT](http://127.0.0.1:43110/1TaLkFrMwvbNsooF4ioKAY9EuxTBTjipT) o [talk.zeronetwork.bit](http://127.0.0.1:43110/talk.zeronetwork.bit)

[Codice sorgente](https://github.com/HelloZeroNet/ZeroTalk)

---

## ZeroMail

Sito di messaggistica end-to-end criptato, distribuito, P2P. Per aumentare la riservatezza uilizza una soluzione simile a BitMessage e non espone il contenitore del messaggio.

 - Utilizza ECIES per scambi segreti, AES256 per la codifica dei messaggi
 - Quando si visita il sito per la prima volta, viene aggiunta la chiave pubblica dell'utente ai suoi file dati. Da questo momento chiunque può inviare messaggi all'utente
 - Ognuno tenta di decifrare ogni messaggio, questo migliora la riservatezza rendendo impossibile trovare il contenitore del messaggio
 - Per ridurre il sovraccarico del messaggio e aumentare la velocità di decodifica, si riutilizza la chiave AES, ma viene generato un nuovo IV ogni volta

![ZeroTalk](../img/zeromail.png)

Indirizzo: [1MaiL5gfBM1cyb4a8e3iiL8L5gXmoAJu27](http://127.0.0.1:43110/1MaiL5gfBM1cyb4a8e3iiL8L5gXmoAJu27) o [mail.zeronetwork.bit](http://127.0.0.1:43110/mail.zeronetwork.bit)

[Codice sorgente](https://github.com/HelloZeroNet/ZeroMail)

---

## ZeroMe

Social network decentralizzata, simil-Twitter, P2P.

 - Archivia le informazioni utente nel registro utente ZeroMe
 - Archivia messaggi e commenti in SitiUnione chiamati Hub
 - Carica le immagini come file opzionali
 - Visualizza in tempo reale le attività dei collegamenti
 
![ZeroMe](../img/zerome.png)

Indirizzo: [1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH](http://127.0.0.1:43110/1MeFqFfFFGQfa1J3gJyYYUvb5Lksczq7nH)

[SoCodice sorgente](https://github.com/HelloZeroNet/ZeroMe)

---

## ReactionGIFs

Demo per i file opzionali, file che vengono scaricati dagli altri peer solo se il browser li richiede.

![ReactionGIFs](../img/reactiongifs.jpg)

Indirizzo: [1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h](http://127.0.0.1:43110/1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h)

[SouCodice sorgente](https://github.com/HelloZeroNet/ReactionGIFs)

---

## ZeroChat

Il sito tutorial completo per la creazione di una applicazione di chat P2P, server-less, abilitata da SQL, aggiornata in tempo reale utilizzando ZeroNet in meno di 100 righe di codice.

 - Utilizza i certificati ZeroID per l'autenticazione
 - Salva i messaggi in un database SQLite
 - Invia messaggi e li distribuisce direttamente agli altri utenti in tempo reale
 - Aggiorna i messaggi in tempo reale al loro arrivo

![ZeroChat](../img/zerochat.png)

Indirizzo del sito completato: [1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg](http://127.0.0.1:43110/1AvF5TpcaamRNtqvN1cnDEWzNmUtD47Npg)

Tutorial su ZeroBlog:
 [Parte 1](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:43:ZeroNet+site+development+tutorial+1),
 [Parte 2](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:46:ZeroNet+site+development+tutorial+2)
