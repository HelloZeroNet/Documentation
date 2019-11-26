# Contribuire a ZeroNet

Grazie di utilizzare ZeroNet. ZeroNet è un impegno collaborativo di più di 67 entusiasti decentralizzati come te. Apprezziamo tutti gli utenti che trovano errori, migliorano la documentazione e hanno buone idee per progettare nuovi protocolli. Qui ci sono alcune linee guida che chiediamo di seguire per iniziare a contribuire.

### Non serve contribuire con il codice sorgente

In fatti, la maggior parte dei contributori non invia codice. Anche se ti piace scrivere codice sono apprezzati altri tipi di contribuzione.

### Ti piace scrivere?

- Racconta ZeroNet.
- Scrivi tutorial per aiutare le persone ad impostare le cose.
- Aiuta a tradurre ZeroNet.
- Migliora la documentazione. Questa documentazione è composta da diversi membri della comunità provenienti da tutto il mondo.

### Ti piace aiutare le persone?

- Iscriviti sul nostro [gestore di argomenti su GitHub](https://github.com/HelloZeroNet/ZeroNet/issues) e aiuta le persone a risolvere i problemi.
- Unisciti a noi su [Gitter](https://gitter.im/HelloZeroNet/ZeroNet) e canale IRC [#zeronet @ freenode](https://kiwiirc.com/client/irc.freenode.net/zeronet) e aiuta a risposndere ai quesiti.
- Attiva una condivisione e aiuta a mantenere veloce la rete.

### Ti piace realizzare siti Web?

- Crea nuovi siti ZeroNet. Crea il tuo blog su ZeroNet. [É semplice e costa poco.](../using_zeronet/create_new_site.md)
- “Il contenuto è re!” come dice NoFish. La rete non vale nulla senza contnuti, quindi ci servi TU per avere successo.

### Ti piace la ricerca?

- Aiutaci ad investigare i nostri [problemi difficili](https://github.com/HelloZeroNet/ZeroNet/labels/help%20wanted).
- Unisciti alle nostre discussioni sul progeto di nuove funzionalità e protocolli, come il [supporto a I2P](https://github.com/HelloZeroNet/ZeroNet/issues/45) e [il supporto a DHT](https://github.com/HelloZeroNet/ZeroNet/issues/57).
- Possiedi un [Raspberry Pi](https://github.com/HelloZeroNet/ZeroNet#linux-terminal), un [C.H.I.P.](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:94:Running+ZeroNet+on+a+$9%C2%A0computer) o un [open router](https://github.com/HelloZeroNet/ZeroNet/issues/783)? Prova a farlo funzionare con ZeroNet e raccontaci come lavora ZeroNet sul tuo dispositivo.

### Ti piace scrivere codice?

- Se conosci Python, puoi sceglere un lavoro dal nostro [gestore di argomenti su GitHub](https://github.com/HelloZeroNet/ZeroNet/issues).
- Sono apprezzate anche le tue idee di sviluppo. Prima di iniziare, perfavore [apri una nuova discussione](https://github.com/HelloZeroNet/ZeroNet/issues/new) per farlo sapere alla comunità, così sarai sicuro che condivideremo le tue idee per farle rendere al meglio.
- Mantieni il tuo stile coerente. Ti chiediamo di seguire le convenzioni riportare più avanti.

### Vorresti offrire supporto finanziario?

- Puoi [donare Bitcoins](donate.md) per supportare ZeroNet.


## Convenzioni di sviluppo codice

- Seguire [PEP8](https://www.python.org/dev/peps/pep-0008/)
- Semplice è meglio che complesso
- L'ottimizzazione prematura è la strada per la perdizione

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
