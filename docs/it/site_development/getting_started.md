# Per iniziare

ZeroNet consente di pubblicare siti web statici e dinamici in una piattaforma web distribuita.

In ZeroNet non c'è il concetto di server. Pertanto, linguaggi lato server come PHP o Ruby non servono. Invece, si possono creare contenuti dinamici utilizzando le API ZeroNet (chiamate ZeroFrame), JavaScript (o CoffeeScript) e il database SQL database fornito a tutti i siti web.

## Tutorial

### Tutorial ZeroChat

In questo tutorial si svilupperà un sito di chat P2P, decentralizzato, senza-server in meno di 100 righe di codice.

* [Leggi su ZeroBlog](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:99:ZeroChat+tutorial)
* [Leggi su Medium.com](https://decentralize.today/decentralized-p2p-chat-in-100-lines-of-code-d6e496034cd4)

## Informazioni utili

### Modalità debug ZeroNet

ZeroNet presenta una opzione `--debug` che consente di sviluppare siti facilmente.

Per avviare ZeroNet in modalità debug usare: `python zeronet.py --debug`

Se si sta usando una versione compilata/bundled di ZeroNet:

* Su Windows: `lib\ZeroNet.cmd --debug`
* Su Linux: `./ZeroNet.sh --debug`
* Su Mac: `./ZeroNet.app/Contents/MacOS/ZeroNet --debug`

#### Funzionalità modalità debug:

- Conversione automatica [CoffeeScript](http://coffeescript.org/) -> JavaScript (se è installato un compilatore coffeescript)
- I messaggi di debug compaiono nella console
- Auto ricarica di alcuni file sorgenti (UiRequest, UiWebsocket, FileRequest) su modifica per prevenire il riavvio (Richiede [PyFilesystem](http://pyfilesystem.org/) su GNU/Linux)
- `http://127.0.0.1:43110/Debug` Tracciamento e console Python interattiva all'ultima posizione di errore (utilizzando il meraviglioso debugger Werkzeug - Richiede [Werkzeug](http://werkzeug.pocoo.org/))
- `http://127.0.0.1:43110/Console` Visualizza una cponsole interattiva Python (Richiede [Werkzeug](http://werkzeug.pocoo.org/))

### Scrivere in CoffeeScript

Per aiutare nella scrittura di siti ZeroNet basati su CoffeeScript-based e per utilizzare il convertitore ZeroNet
incluso CoffeeScript -> JavaScript, abilitare per prima cosa la modalità debug come descritto
in [Debug](#modalità-debug-zeronet). Inoltre, assicurarsi che il sito su cui si vuole lavorare
sia marcato come di proprietà abilitando "Questo è il mio sito" attraverso
la barra laterale.

<!-- Questo è corretto? -->
ZeroNet compilerà tutti i file CoffeeScript che troverà all'interno del file `all.js`, e li depositerà in una cartella `js/` al livello principale del sito. Questo file incliderà anche tutto il codice JavaScript. Quindi è possibile importare tutto il codice dinamico nell'HTML con la seguente riga prima del tag `</body>`:

```html
<script type="text/javascript" src="js/all.js?lang={lang}"></script>
```

<!-- Perché? -->
!!! info "Nota"

    `{lang}` è una *variabile segnaposto* e verrà sostituita automaticamente dal valore opportuno da ZeroNet quando il sito viene caricato.


### Disabilitare la chache HTTP del browser

In aggiunta alla modalità debug, disabilitare la cache HTTP nel browser è una parte essenziale nello sviluppo di siti ZeroNet. I moderni browser tentano di memorizzare in cache i conentuti web quando possono. Siccome tutti i siti ZeroNet funzionano all'interno di un iframe, i web browser non si accorgono quando il contenuto di un sito ZeroNet cambia e pertanto le modifiche dei siti non vengono visualizzate se è attiva la cache HTTP.

Per disabilitarla, aprire gli strumenti sviluppatori del browser, spostarsi sulle impostazioni è settare l'opzione vicino alla riga di 'Disabilitare cache HTTP (quando gli strumenti sviluppatore sono aperti)'. Come suggeriscono le impostazioni, assicurarsi di mantenere aperti gli strumenti sviluppatori quando si testano nuove modifiche del sito!

### Funzionalità aggiuntive (funzionano folo sui siti di proprietà)

 - File CSS uniti: tutti i file CSS all'interno della cartella del sito vengono uniti in uno chiamato `all.css`. Si può scegliere di includere solo questo file nel sito. Se si vogliono mantenere gli altri file CSS per sviluppare con facilità, si possono aggiungere alla chiave ignore del relativo file `content.json`. In questo modo, non verranno pubblicati con il sito. (es.: aggiungere a `content.json` `"ignore": "(js|css)/(?!all.(js|css))"` per ignorare tutti i file CSS e JS eccetto `all.js` e `all.css`)
 - File JS uniti: tutti i file JS all'interno della cartella del sito vegono uniti in uno chiamato `all.js`. Se è presente un compilatore CoffeeScript (fornito per Windows) convertirà `.coffee` in `.js`.
 - L'ordine in cui i file vengono uniti in all.css/all.js: i file all'interno delle sotto cartelle delle cartelle css/js sono i primi; i file nella cartella css/js verranno uniti seguendo l'ordinamento per nome (01_a.css, 02_a.css, etc)

## Serve aiuto?

ZeroNet ha una comunità in crescita di sviluppatori con diverse specializzazioni. Se serve aiuto, notizie o semplicemente restare in contatto, connettetevi liberamente ai seguenti servizi:

### Forum

* [ZeroExchange](http://127.0.0.1:43110/zeroexchange.bit/), un clone p2p StackOverflow
* [ZeroTalk](http://127.0.0.1:43110/Talk.ZeroNetwork.bit/), un forum p2p Reddit-like

### Chat

* [#zeronet-dev:matrix.org](https://riot.im/app/#/room/#zeronet-dev:matrix.org) su Matrix
* IRC a #zeronet su Freenode
