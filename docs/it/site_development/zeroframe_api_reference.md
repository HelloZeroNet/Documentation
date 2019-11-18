# Referenza API ZeroFrame

## La API ZeroFrame

ZeroFrame è una API che consente ai siti ZeroNet di interagire con il deamon ZeroNet. Consente si siti di salvare/recuperare file, pubbicare modifiche e molte altre cose. Una copia della libreria è inclusa in `js/ZeroFrame.js` ogni volta che un nuovo sito viene creato.

La libreria puà essere importata come ogni altro file JavaScript, o gli sviluppatori hanno l'opzione di [importarla tramite NPM](Pagina API ZeroFrame, ##Import?). Vedere la  [Referenza API ZeroFrame]() per i dettagli della API.

## Wrapper

Comandi che interagiscono con il codice all'esterno dell'iframe.

### wrapperConfirm
Visualizza una notifica con una conferma.

??? "Esempio"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    message = 'Sei sicuro di volerlo cancellare?'
    buttonTitle = 'Cancella'

    zeroframe.cmd 'wrapperConfirm', [message, buttonTitle], (confirmed) =>
      if confirmed
        console.log 'Cancellazione post...'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    let message = 'Sei sicuro di volerlo cancellare?';
    let buttonTitle = 'Cancella';

    zeroframe.cmd('wrapperConfirm', [message, buttonTitle], (confirmed) => {
      if (confirmed) {
        console.log('Cancellazione post...');
      }
    };
    ```

    **Risultato:**

    L'utente sa clic sulla conferma:

    ```javascript
    "Cancellazione post..."
    ```

    !!! info "Nota"

        La funzione di callback non viene eseguita se l'utente ignora la notifica.
---


### wrapperInnerLoaded
Poiché `#anchors` nell'URL si applica solo alla pagina web esterna e non all'interno dell'iframe dove è attivo il sito ZeroNet, bisogna usare il comando seguente. Quando il sito è completamente caricato, richiamare questo metodo per applicare l'anchor corrente al parametro `src` dell'URL dell'iframe interno.

??? "Esempio"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperInnerLoaded', []
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperInnerLoaded', []);
    ```

    **Risultato:**

    Se l'utente è su `http://127.0.0.1:43110/mysite.bit#my-title`:

    ```
    Chiave aggiunta dal [Wrapper] alla locazione http://127.0.0.1:43110/mysite.bit/?wrapper_nonce=some_nonce#my-title
    ```


---

### innerLoaded
Alias per [wrapperInnerLoaded](#wrapperinnerloaded).

---


### wrapperGetLocalStorage
Recupera il contenuto Local Storage del sito ZeroNet.

!!! info "Nota"

    Poiché tutti i siti ZeroNet funzionano sullo stesso dominio, lo stesso Local Storage è
    tecnicamente condiviso da tutti i siti, che è un rischio per la sicurezza. Pertanto, il
    UiWrapper compartimenta ogni sito perché sia in grado di accedere solo alla propria
    porzione.

**Restituisce**: Il Local Storage per il sito in formato JSON.

??? "Esempio"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd "wrapperGetLocalStorage", [], (res) =>
      res ?= {}
      console.log "Valore Local storage:", res
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd("wrapperGetLocalStorage", [], (res) => {
      res = res || {};
      console.log("Contenuto Local Storage:", res);
    });
    ```

    **Risultato:**

    Se il Local Storage è vuoto:

    ```javascript
    Local Storage contents: {}
    ```

    Se il Local Storage è stato modificato con [wrapperSetLocalStorage](#wrappersetlocalstorage):

    ```javascript
    Local Storage contents: {"score": 500}
    ```

---

### wrapperGetState
Restituisce lo storico della linguetta del browser corrente.

**Restituisce**: oggetto corrente dello storico del browser.

??? "Esempio"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperGetState', {}, (state) ->
      console.log state
    ```

    ```javascript tab="JavaScript"
    zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperGetState', {}, (state) => {
      console.log(state);
    });
    ```

    **Risultato:**

    ```
    null
    ```

---

### wrapperGetAjaxKey
**Restituisce**: recupera una chiave che può essere utilizzata per realizzare una richiesta ajax (XMLHTTPRequest, fetch).

??? "Esempio"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperGetAjaxKey', {}, (ajax_key) ->
      req = new window.XMLHttpRequest()
      req.open 'GET', "content.json?ajax_key=#{ajax_key}"
      # Opzionale: solo se si vuole una parte di file
      # req.setRequestHeader 'Range', 'bytes=10-200'
      req.onload = ->
        console.log req.response
      req.send()
    ```

    ```javascript tab="JavaScript"
    zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperGetAjaxKey', {}, (ajax_key) => {
      const req = new window.XMLHttpRequest();
      req.open('GET', `content.json?ajax_key=${ajax_key}`);
      // Opzionale: solo se si vuole una parte di file
      // req.setRequestHeader('Range', 'bytes=10-200');
      req.onload = () => {
        console.log(req.response);
      };
      req.send();
    });
    ```

    **Risultato:**

    Il file richiesto. In questo caso, il file `content.json` del sito corrente:

    ```javascript
    {
      "address": "1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D",
      "address_index": 66669697,
      "background-color": "#FFF",
      "description": "",
      "files": {
        "index.html": {
        "sha512": "542f7724432a22ceb8821b4241af4d36cfd81e101b72d425c6c59e148856537e",
        "size": 1114
        },
        "js/ZeroFrame.js": {
        "sha512": "42125c7aa72496455e044e3fd940e0f05db86824c781381edb7a70f71a5f0882",
        "size": 3370
        }
      },
      "ignore": "",
      "inner_path": "content.json",
      "modified": 1541199581,
      "postmessage_nonce_security": true,
      "signers_sign": "G6Aq7MXMzCjvEdqCToGTDZ7mrsCfaQzZdoBqHg4Cle2NHGno1Pgx2dvgeTFpsWkFP/oAA4CHKt2Zu+KueJM+7Mg=",
      "signs": {
        "1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D": "COr0M7+egjY29ZhW7mQp4MPHYuwrgOKVk6kl1CnRPef2QPbUQARYigo0cId8nIs7Y6Fnaj+uHR2HPvh09XVGb1Q="
      },
      "signs_required": 1,
      "title": "my site",
      "translate": ["js/all.js"],
      "zeronet_version": "0.6.4"
    }
    ```

    !!! info "Nota"

        Il caso d'uso raccomandato è per la comunicazione con risorse non ZeroNet.
        Non è raccomandato per recuperare i contenuti di un file per un sito.
        Per questo, utilizzare il comando [fileGet](#fileget).

        Il recupero di file da altri siti ZeroNet può essere fatto con il [plugin CORS](#plugin-cors).

        Si può anche utilizzare la sunzione `monkeyPatchAjax` di `ZeroFrame.js` per aggiustare la
        XMLHTTPRequest predefinita e attuare implementazioni.

---

### wrapperNotification
Visualizza una notifica.

Parametro               | Descrizione
                   ---  | ---
**type**                | Style della notifica. Possibili valori: `info`, `error`, `done`
**message**             | Il messaggio che si vuole visualizzare
**timeout** (opzionale) | Nasconde il messaggio dopo questo intervallo (millisecondi)

**Restituisce**: Niente.

??? "Esempio"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperNotification', ['done', 'La tua registrazione è stata inviata!', 10000]
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperNotification', ['done', 'La tua registrazione è stata inviata!', 10000]);
    ```


---

### wrapperOpenWindow
Sposta in una nuova finestra popup o la apre.

Parametro              | Descrizione
                  ---  | ---
**url**                | URL della pagina aperta
**target** (opzionale) | Nome della finestra obiettivo
**specs** (opzionale)  | Proprietà speciali della finestra (vedere: [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open))

??? "Esempio"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperOpenWindow', ['https://zeronet.io', '_blank', 'width=550,height=600,location=no,menubar=no']
    ```

    ```javascript tab="JavaScript"
    zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperOpenWindow', ['https://zeronet.io', '_blank', 'width=550,height=600,location=no,menubar=no']);
    ```

---


### wrapperPermissionAdd
Richiede un nuovo permesso per il sito.

Parametro        | Descrizione
             --- | ---
**permission**   | Nome del permesso (es. Merger:ZeroMe)

??? "Esempio"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperPermissionAdd', ['Merger:ZeroMe'], (res) ->
      if res == 'ok'
        console.log 'Permesso concesso.'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperPermissionAdd', ['Merger:ZeroMe'], (res) => {
      if (res === 'ok') {
        console.log('Permesso concesso.');
      }
    });
    ```

    **Risultato:**

    Se l'utente accetta la richiesta di permesso:

    ```
    Permesso concesso.
    ```

    Se l'utente nega o non risponde alla richiesta, il metodo on viene eseguito.


---

### wrapperPrompt
Richiesta di inserimento testo dall'utente.

Parametro            | Descrizione
               ---   | ---
**message**          | Il messaggio da visualizzare
**type** (opzionale) | Il tupo di campo (es. `text`, `password`)

**Restituisce**: il resto inserito.

??? "Esempio"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    # Richista della chiave privata per un sito
    zeroframe.cmd 'wrapperPrompt', ['Inserire la chiave privata:', 'password'], (privatekey) ->
      # Firma e pubblica content.json
      zeroframe.cmd 'sitePublish', [privatekey], (res) ->
        console.log 'Risultato pubblicazione:', res
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe = new ZeroFrame();

    // Richista della chiave privata per un sito
    zeroframe.cmd('wrapperPrompt', ['Inserire la chiave privata:', 'password'], function(privatekey) {
      // Firma e pubblica content.json
      zeroframe.cmd('sitePublish', [privatekey], function(res) {
        console.log('Risultato pubblicazione:', res);
      });
    });
    ```

    **Risultato:**

    ```
    Risultato pubblicazione: ok
    ```


---

### wrapperPushState
Modifica l'url attuale e aggiunge un nuovo valore nello storico del browser. Vedere [JavaScript pushState](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method). E vedere [wrapperReplaceState](#wrapperreplacestate) per non aggiungere un valore nello storico.

Parametro           | Descrizione
               ---  | ---
**state**           | Oggetto stato JavaScript
**title**           | Titolo della pagina
**url**             | Percorso URL della pagina

**Restituisce**: Niente.

??? "Esempio"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperPushState', [{'scrollY': 100}, 'Profile page', 'Profile']
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperPushState', [{'scrollY': 100}, 'Profile page', 'Profile']);
    ```


---

### wrapperReplaceState
Modifica l'url della finestra senza aggiungere il valore allo storico del browser. Vedere [JavaScript replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method).

Parametro           | Descrizione
               ---  | ---
**state**           | Oggetto stato JavaScript
**title**           | Titolo della pagina
**url**             | Percorso URL della pagina

**Restituisce**: Niente.

??? "Esempio"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperReplaceState', [{'scrollY': 100}, 'Profile page', 'Profile']
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperReplaceState', [{'scrollY': 100}, 'Profile page', 'Profile']);
    ```


---

### wrapperRequestFullscreen

!!! warning "Deprecated"

    Starting from ZeroNet Rev3136 you can use the fullscreen javascript API directly, without needing to ask the wrapper first.

Set the current page to fullscreen.

??? "Esempio"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd('wrapperRequestFullscreen')
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperRequestFullscreen')
    ```


---

### wrapperSetLocalStorage
Set browser's local store data stored for the site

Parametro              | Descrizione
                  ---  | ---
**data**               | Any data structure you want to store for the site

**Restituisce**: Niente.

??? "Esempio"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    setTimeout(->
      zeroframe.cmd 'wrapperSetLocalStorage', {'score': 500}, (res) =>
        console.log 'Punteggio salvato.'
    , 100)
    ```

    ```javascript tab="JavaScript"
    import 'js/ZeroFrame.js'

    setTimeout(() => {
      zeroframe.cmd('wrapperSetLocalStorage', {'score': 500}, (res) => {
        console.log('Punteggio salvato.');
      });
    }, 100);

    const zeroframe = new ZeroFrame();
    ```

    !!! info "Nota"

        `wrapperSetLocalStorage` si basa su `site_info`, un oggetto che contiene
        informazioni sul sito recuparato dal deamon ZeroNet sul carico ZeroFrame.
        Perché questo avvenga, serve ritardare l'esecuzione di `wrapperSetLocalStorage`
        per 100ms.

    **Risultato:**

    Se il local storage è vuoto:

    ```javascript
    Punteggio salvato.
    ```


---

### wrapperSetTitle
Imposta il titolo del sito.

Parametro              | Descrizione
                  ---  | ---
**title**              | Titolo della nuova linguetta del browser

**Restituisce**: Niente.

??? "Esempio"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperSetTitle', 'Il mio nuovo titolo'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperSetTitle', 'Il mio nuovo titolo');
    ```

    Il titolo del sito sarà `Il mio nuovo titolo`.


---


### wrapperSetViewport
Imposta il contenuto del meta tag per il viewport del sito (richiesto per siti mobile).

Parametro           | Descrizione
               ---  | ---
**viewport**        | Contenuto del meta tag viewport

**Restituisce**: Niente.

??? "Esempio"

    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'wrapperSetViewport', 'width=device-width, initial-scale=1.0'
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('wrapperSetViewport', 'width=device-width, initial-scale=1.0');
    ```


---


## UiServer

L'UiServer fa tutto il lavoro nel 'backend' (es: interrogare il DB, accedere ai file, ecc.).
Queste sono le chiamate API necessarie per realizzare un sito dinamico.

### announcerInfo
Registratore delle statistiche per il sito

**Restituisce**:
```json
{
	"stats": {
		"zero://45.77.23.92:15555": {
			"status": "announced",
			"num_success": 1,
			"time_last_error": 0,
			"time_status": 1541776998.782,
			"num_request": 1,
			"time_request": 1541776996.884,
			"num_error": 0
		},
		...
	}
}
```


### certAdd
Aggiunge un nuovo certificato al l'utente corrente.

Parametro            | Descrizione
                 --- | ---
**domain**           | Certificato del dominio emeittente
**auth_type**        | Tiopo autorizzazione utilizzata in registrazione
**auth_user_name**   | Nome utente utilizzato in registrazione
**cert**             | Il certificato stesso: stringa `auth_address#auth_type/auth_user_name` firmata dal certificato del titolare del sito

**Restituisce**: `"ok"`, `"Not changed"` or `{"error": error_message}`.

**Esempio:**
```coffeescript
@cmd "certAdd", ["zeroid.bit", auth_type, user_name, cert_sign], (res) =>
	$(".ui").removeClass("flipped")
	if res.error
		@cmd "wrapperNotification", ["error", "#{res.error}"]
```


---


### certSelect
Visualizza il selettore del certificato.

Parametro                        | Descrizione
                             --- | ---
**accepted_domains** (opzionale) | Elenco dei domini accettati dal sito come fornitori di autorizzazioni (predefinito: [])
**accept_any** (opzionale)       | Non limita i fornitori di certificati accettati (predefinito: False)
**accepted_pattern** (opzionale) | Regexp pattern for accepted certificate providers address (predefinto.: Niente)

**Restituisce**: Niente.

**Esempio:**
```coffeescript
@cmd "certSelect", {"accepted_domains": ["zeroid.bit"], "accepted_pattern": "1ZeroiD[0-9]"}
```


---


### channelJoin

Richiesta notifiche sugli eventi del sito.

Parametro   | Descrizione
        --- | ---
**channel** | Canale da connettere

**Restituisce**: Niente.

**Channels**:

 - **siteChanged** (joined by default)<br>Events: peers_added, file_started, file_done, file_failed

**Esempio**:
```coffeescript
# Connessione wrapper websocket pronta
onOpenWebsocket: (e) =>
	@cmd "channelJoinAllsite", {"channel": "siteChanged"}

# Percorso richiesta in arrivo e messaggi
route: (cmd, data) ->
	if cmd == "setSiteInfo"
		@log "Site changed", data
	else
		@log "Unknown command", cmd, data
```

**Example event data**
```json
{
	"tasks":0,
	"size_limit":10,
	"address":"1RivERqttrjFqwp9YH1FviduBosQPtdBN",
	"next_size_limit":10,
	"event":[ "file_done", "index.html" ],
	[...] # Come il dizionaro di risposta siteInfo
}

```


---


### dbQuery
Esegue una query nella chache sql

Parametro            | Descrizione
                 --- | ---
**query**            | Comando sql
**params**           | Sostituzione parametro nella query

**Restituisce**: Risultaro della quesry come matrice.


**Esempio:**
```javascript
Page.cmd("dbQuery", [
   "SELECT * FROM json WHERE file_name = :file_name",
   {file_name: "data.json"}
], (res) => { console.log(res.length) })
```

```javascript
Page.cmd("dbQuery", [
    "SELECT * FROM json WHERE file_name IN :file_names",
    {file_names: ["data.json", "content.json"]}
], (res) => { console.log(res.length) })
```

```javascript
Page.cmd("dbQuery", [
    "SELECT * FROM json ?",
    {file_name: ["data.json", "content.json"]}
], (res) => { console.log(res.length) })
```


```coffeescript
@log "Updating user info...", @my_address
Page.cmd "dbQuery", ["SELECT user.*, json.json_id AS data_json_id FROM user LEFT JOIN json USING(path) WHERE path='#{@my_address}/data.json'"], (res) =>
	if res.error or res.length == 0 # Db not ready yet or No user found
		$(".head-user.visitor").css("display", "")
		$(".user_name-my").text("Visitor")
		if cb then cb()
		return

	@my_row = res[0]
	@my_id = @my_row["user_id"]
	@my_name = @my_row["user_name"]
	@my_max_size = @my_row["max_size"]
```


---


### dirList
Elenca il contenuto di una cartella

Parametro        | Descrizione
             --- | ---
**inner_path**   | La cartella che si vuole analizzare

**Restituisce**: Elenco dei file e delle cartelle


---


### fileDelete
Cancella un file.

Parametro        | Descrizione
             --- | ---
**inner_path**   | Il file che si vuole cancellare

**Restituisce**: `"ok"` al successo, altrimenti il messaggio di errore.


---


### fileGet
Ottiene il contenuto di un file.

Parametro                | Descrizione
                     --- | ---
**inner_path**           | Il file che si vuole estrarre
**required** (opzionale) | Prova e aspetta il file se non esiste (predefinito: True)
**format** (opzionale)   | Codifica dei dati restituiti (text or Base64) (predefinito: text)
**timeout** (opzionale)  | Tempo massimo di attesa per arrivo dei dati (predefinito: 300)

**Restituisce**: <string> Il contenuto del file.


**Esempio:**
```coffeescript
# Voto di un argomento su ZeroTalk
submitTopicVote: (e) =>
	if not Users.my_name # Not registered
		Page.cmd "wrapperNotification", ["info", "Effettuare l'accesso prima di votare."]
		return false

	elem = $(e.currentTarget)
	elem.toggleClass("active").addClass("loading")
	inner_path = "data/users/#{Users.my_address}/data.json"

	Page.cmd "fileGet", [inner_path], (data) =>
		data = JSON.parse(data)
		data.topic_votes ?= {} # Create if not exits
		topic_address = elem.parents(".topic").data("topic_address")

		if elem.hasClass("active") # Add upvote to topic
			data.topic_votes[topic_address] = 1
		else # Remove upvote from topic
			delete data.topic_votes[topic_address]

		# Write file and publish to other peers
		Page.writePublish inner_path, Page.jsonEncode(data), (res) =>
			elem.removeClass("loading")
			if res == true
				@log "File written"
			else # Failed
				elem.toggleClass("active") # Change back

	return false
```


---


### fileList
Elenco ricorsivo dei file di una cartella

Parametro        | Descrizione
             --- | ---
**inner_path**   | Cartella da analizzare

**Restituisce**: Elenco dei file nella cartella (ricorsivo).


---


### fileNeed
Inizializza il download di un file (opzionale).

Parametro               | Descrizione
                    --- | ---
**inner_path**          | Il file che si vuole ottenere
**timeout** (opzionale) | Tempo massimo di arrivo dei dati (predefinito: 300)

**Restituisce**: `"ok"` al successo del download.


---

### fileQuery
Semplice comando di richiesta di file json

Parametro            | Descrizione
                 --- | ---
**dir_inner_path**   | Modello del file interrogato
**query**            | Comando di richiesta (opzionale)

**Restituisce**: Contenuti ottenuti in formato matrice.

**Esempi di query:**

 - `["data/users/*/data.json", "topics"]`: Restituisce tutti gli argomenti per tutti i file utente
 - `["data/users/*/data.json", "comments.1@2"]`: Restituisce i valori `user_data["comments"]["1@2"]` da tutti i file utente
 - `["data/users/*/data.json", ""]`: Restituisce tutti i dati dai file utenti
 - `["data/users/*/data.json"]`: Restituisce tutti i dati dai file utenti (come il precedente)

**Esempio:**
```coffeescript
@cmd "fileQuery", ["data/users/*/data.json", "topics"], (topics) =>
	topics.sort (a, b) -> # Ordinato per data
		return a.added - b.added
	for topic in topics
		@log topic.topic_id, topic.inner_path, topic.title
```


---


### fileRules
Restituisce le regole per il file

Parametro            | Descrizione
                 --- | ---
**inner_path**       | Percorso interno del file

**Restituisce**: il contenuto corrispondente come matrice

**Esempio risultato:**

```json
{
	"current_size": 2485,
	"cert_signers": {"zeroid.bit": ["1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz"]},
	"files_allowed": "data.json",
	"signers": ["1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj"],
	"user_address": "1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj",
	"max_size": 100000
}
```

**Esempio:**
```coffeescript
@cmd "fileRules", "data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json", (rules) =>
	@log rules
```


---


### fileWrite

Scrive il contenuto del file


Parametro          | Descrizione
               --- | ---
**inner_path**     | Percorso interno del file che si vuole scrivere
**content_base64** | Contenuto che si vuole scrivere nel file (codificato in Base6)

**Restituisce**: `"ok"` al successo, altrimenti il messaggio di errore.

**Esempio:**
```coffeescript
writeData: (cb=null) ->
	# Codifica in json, utf8
	json_raw = unescape(encodeURIComponent(JSON.stringify({"hello": "ZeroNet"}, undefined, '\t')))
	# Converte in Base64 e spedisce
	@cmd "fileWrite", ["data.json", btoa(json_raw)], (res) =>
		if res == "ok"
			if cb then cb(true)
		else
			@cmd "wrapperNotification", ["error", "File write error: #{res}"]
			if cb then cb(false)
```

_Nota:_ per scrivere file che non sono ancora nel content.json, serve avere `"own": true` in `data/sites.json` nel sito che si vuole scrivere


---


### ping
Testa la connessione websocket UiServer

**Restituisce:** pong


---


### serverInfo

**Restituisce:** Tutte le informazioni sul server come oggetto JavaScript.

**Esempio:**
```coffeescript
@cmd "serverInfo", {}, (server_info) =>
	@log "Server info:", server_info
```

**Esempio valore restituito:**
```json
{
	"debug": true, # Funzionamento in modalità debug
	"fileserver_ip": "*", # Fileserver collegato a
	"fileserver_port": 15441, # Porta FileServer
	"ip_external": true, # Modalità attiva o passiva
	"platform": "win32", # Sistema operativo
	"ui_ip": "127.0.0.1", # UiServer collegato a
	"ui_port": 43110, # Porta UiServer (Web)
	"version": "0.2.5" # Versione
}
```




---


### siteInfo

**Restituisce**: Tutte le informazioni sul sito come oggetto JavaScript.

**Esempio:**
```coffeescript
@cmd "siteInfo", {}, (site_info) =>
	@log "Site info:", site_info
```

**Example return value:**
```json
{
	"tasks": 0, # Numero di file attualmente in download
	"size_limit": 10, # Limite dimensione del sito attuale in MB
	"address": "1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr", # Indirizzo del sito
	"next_size_limit": 10, # Limite dimensione richiesta dalla somma dei file del sito
	"auth_address": "2D6xXUmCVAXGrbVUGRRJdS4j1hif1EMfae", # Indirizzo Bitcoin dell'utente corrente
	"auth_key_sha512": "269a0f4c1e0c697b9d56ccffd9a9748098e51acc5d2807adc15a587779be13cf", # Deprecato, non utilizzare
	"peers": 14, # Peer del sito
	"auth_key": "pOBdl00EJ29Ad8OmVIc763k4", # Deprecato, non usare
	"settings":  {
		"peers": 13, # Numero salvato di peer per l'ordinamento
		"serving": true, # Sito abilitato
		"modified": 1425344149.365, # Ultimo aggiornamento di tutti i file del sito
		"own": true, # Sito proprio
		"permissions": ["ADMIN"], # Permessi del sito
		"size": 342165 # Dimensione totale del sito in byte
	},
	"bad_files": 0, # File che devono essere scaricati
	"workers": 0, # Numero di download concorrenti attuali
	"content": { # Radice di content.json
		"files": 12, # Numero di file, rimosse le informazioni dettagliate dei file per ridurre il trasferimento di dati e il tempo di elaborazione
		"description": "This site",
		"title": "ZeroHello",
		"signs_required": 1,
		"modified": 1425344149.365,
		"ignore": "(js|css)/(?!all.(js|css))",
		"signers_sign": null,
		"address": "1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr",
		"zeronet_version": "0.2.5",
		"includes": 0
	},
	"cert_user_id": "zeronetuser@zeroid.bit", # Certificato attualmente slezionato per il sito
	"started_task_num": 1, # Ultimo numero di file scaricati
	"content_updated": 1426008289.71 # Data aggiornamento Content.json
}
```


---


### sitePublish
Pubblica un content.json del sito

Parametro                  | Descrizione
                       --- | ---
**privatekey** (opzionale) | Chiave privata utilizzata per la firma (predefinita: chiave privata dell'utente corrente)
**inner_path** (opzionale) | Percorso interno del contenuto json che si vuole pubblicare (predefinito: content.json)
**sign** (opzionale)       | Se True firma il content.json prima di pubblicarlo (predefinito: True)

**Restituisce**: `"ok"` al successo, altrimenti il messaggio di errore.

**Esempio:**
```coffeescript
# Mostra la chiave privata
@cmd "wrapperPrompt", ["Enter your private key:", "password"], (privatekey) =>
	$(".publishbar .button").addClass("loading")
	# Invia il content.json firmato e pubblica la richiesta al server
	@cmd "sitePublish", [privatekey], (res) =>
		$(".publishbar .button").removeClass("loading")
		@log "Publish result:", res
```


---


### siteReload
Ricarica il contenuto del file content.json e controlla se ci sono nuovi file

**Restituisce**: "ok" al successo


---


### siteSign
Firma un content.json del sito

Parametro                               | Descrizione
                                    --- | ---
**privatekey** (opzionale)              | Chiave privata utilizzata per firmare (predefinita: chiave privata utente corrente)
**inner_path** (opzionale)              | Percorso interno dei contenuto json che si vuole firmare (predefinito: content.json)
**remove_missing_optional** (opzionale) | Rimuove da content.json i file opzionali non più presenti nella cartella (predefinito: False)

**Restituisce**: `"ok"` al successo, altrimenti il messaggio di errore.

> __Nota:__
> Utilizzare "stored" come chiave privata se è definita in users.json (es siti clonati)

**Esempio:**
```coffeescript
if @site_info["privatekey"] # Chiave privata salvata in users.json
	@cmd "siteSign", ["stored", "content.json"], (res) =>
		@log "Sign result", res
```


---



### siteUpdate

Forza il controllo e scarica il contenuto modificato dagli altri peer (necessario solo se l'utente è in modalità passiva e utilizzando una vcchia versione di Zeronet)

Parametro     | Descrizione
          --- | ---
**address**   | Indirizzo che il sito vuole aggiornare (consentito solo per il sito corrente senza autorizzazione ADMIN)

**Restituisce:** Niente.

**Esempio:**
```coffeescript
# Aggiornamento manuale del sito per connessioni passive
updateSite: =>
	$("#passive_error a").addClass("loading").removeClassLater("loading", 1000)
	@log "Updating site..."
	@cmd "siteUpdate", {"address": @site_info.address}
```


---


### userGetSettings

Ottiene le impostazioni salvate dell'utente

**Restituisce:** Le impostazioni utente specifiche del sito salvate utilizzando userSetSettings.


---


### userSetSettings

Setta le impostazioni utente specifiche del sito.

Parametro     | Descrizione
          --- | ---
**settings**  | Le impostazioni utente specifiche del sito che si vogliono salvare.

**Restituisce:** `"ok"` al successo.


---


## Plugin: Bigfile


### BigfileUploadInit

Inizializza un nuovo endpoint di trasferimento per un file grande.

Parametro            | Descrizione
                 --- | ---
**inner_path**       | Percorso del trasferimento
**size**             | Dimensione del file


**Restituisce**: Un dizionario con le informazioni sul trasferimento:

Parametro              | Descrizione
                   --- | ---
**url**                | Endpoint Http del trasferimento
**piece_size**         | Dimensione di ogni parte del file firmata separatamente
**inner_path**         | Percorso del file all'interno del sito
**file_relative_path** | Percorso del file relativo a content.json

> __Nota:__ I caratteri non ascii non supportati verranno automaticamente rimossi dai valori di `inner_path` e `file_relative_path`

**Esempio**

```javascript
var input = document.createElement('input')
document.body.appendChild(input)
input.type = "file"
input.style.visibility = "hidden"

input.onchange = () => {
    var file = input.files[0]
    page.cmd("bigfileUploadInit", ["optional/"+file.name, file.size], (init_res) => {
        var formdata = new FormData()
        formdata.append(file.name, file)

        var req = new XMLHttpRequest()
        req.upload.addEventListener("progress", console.log)
        req.upload.addEventListener("loadend", () =>
            page.cmd("wrapperConfirm", ["Upload finished!", "Open file"],
                () => { window.top.location = init_res.inner_path }
            )
        )
        req.withCredentials = true
        req.open("POST", init_res.url)
        req.send(formdata)
    })
}
input.click()
```


---

## Plugin: Chart

### chartDbQuery

Esegue la query sul database grafico

Argomenti e valore restituito: uguale a [dbQuery](#dbquery-query-param)
[_todo_] sistemare il link


### chartGetPeerLocations

Ottiene un elenco di peer univoco dal client.

**Restituisce**: Un elenco di peer univoci.

**Esempio**:
```javascript
Page.cmd("chartGetPeerLocations")
> [
>  {lat: 43.6655, city: "Toronto", ping: null, lon: -79.4204, country: "Canada"},
> ...
> ]
```

---

## Plugin: Cors

Consente l'accesso ai file tra siti attraverso la cartella virtuale **/cors-siteaddress/** e valida le query tra database tra siti utilizzando il comando API [as](#as-address-cmd-arguments).

### corsPermission

Richiede la risorsa tra origini diverse condividendo i permessi con il sito indicato.

Parametro            | Descrizione
                 --- | ---
**address**          | L'indirizzo del sito per il quale si viole ottenere l'accesso cors

**Restituisce**: `"ok"` al successo.

Dopo che il permesso è concesso i file dell'altro sito saranno disponibili nella cartella virtuale **/cors-siteaddress/** attraverso una richiesta http o dal comando API fileGet.

Il sito verrà aggiunto al client dell'utente se richiesto.


---

## Plugin: Multiuser

!!! info "Nota"
    Il seguente comando può essere eseguito solamente da un sito con il [permesso](#wrapperpermissionadd) "ADMIN".


### userLoginForm

Richiesta di accesso con chiave privata.

!!! info "Info"
    Il plugin Multiuser utilizzerà questa chiave privata, la convertirà in un seed master
    e imposterà un cookie nel browser (es. `master_address=1bc83cc...`); si può specificare
    quale utente utilizzare come per tutte le richieste seguenti.

    Questo cookie è spedito dal UiWrapper come parte della sua richiesta di connessione 
    WebSocket. Questo metodo è stato scelto perchè non richiede la modifica della richiesta
    esistente e inoltre lavora comunicando ai client ZeroNet che sono ospitati in una macchina
    separata (come i proxy ZeroNet).

??? "Esempio"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'userLoginForm', []
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('userShowMasterSeed', []);
    ```

    **Risultato:**

    Nessuno, il messaggio di login apparirà in una finestra non accessibile all'iframe.


### userShowMasterSeed

Richiesta di mostrare la chiave privata dell'utente.

??? "Esempio"
    ```coffeescript tab="CoffeeScript"
    zeroframe = new ZeroFrame()

    zeroframe.cmd 'userShowMasterSeed', []
    ```

    ```javascript tab="JavaScript"
    const zeroframe = new ZeroFrame();

    zeroframe.cmd('userShowMasterSeed', []);
    ```

    **Risultato:**

    Nessuno, la chiave privata apparirà in una finestra non accessibile all'iframe.


---


## Plugin: CryptMessage


### userPublickey

Ottiene la chiave pubblica specifica del sito dell'utente.

Parametro             | Descrizione
                  --- | ---
**index** (opzionale) | La chiave sub-pubblica all'interno del sito (predefinito: 0)


**Restituisce**: La chiave pubblica codificata in Base64.

---

### eciesEncrypt

Cripta un testo utilizzando una chiave pubblica.

Parametro                      | Descrizione
                           --- | ---
**text**                       | Il testo da criptare
**publickey** (opzionale)      | Indice (intero) della chiave pubblica dell'utente o chiave pubblica codificata in Base64 (predefinito: 0)
**return_aes_key** (opzionale) | Ottiene la chiave AES utilizzata per criptare (predefinito: False)


**Restituisce**: Testo criptato nel formato Base64 o [Testo criptato nel formato Base64, chiave AES in formato Base6].

---

### eciesDecrypt

Tenta di decodificare un elenco di testi

Parametro                      | Descrizione
                           --- | ---
**params**                     | Un testo o elenco di testi criptati
**privatekey** (opzionale)     | Indice (intero) della chiave privata dell'utente o chiave privata codificata in Base64 (predefinito: 0)


**Restituisce**: Testo decodificato o matrice di testi decodificati (null per decodifiche fallite).

---

### aesEncrypt

Cripta un testo utilizzando la chiave e l'iv

Parametro                      | Descrizione
                           --- | ---
**text**                       | Un testo criptato utilizzando AES
**key** (opzionale)            | Password codificata in Base64 (predefinita: genera una nuova)
**iv** (opzionale)             | IV codificato in Base64 (predefinito: genera uno nuovo)


**Restituisce**: [chiave codificata in Base64, IV codificato in Base64, testo criptato codificato in Base64].


---

### aesDecrypt

Decodifica il testo utilizzando IV e la chiave AES

Parametro                      | Descrizione
                           --- | ---
**iv**                         | IV in formato Base64
**encrypted_text**             | Testo criptato in formato Base64
**encrypted_texts**            | Matrice di coppie [IV codificato in Base64, testo criptato codificato in Base64]
**key**                        | Password per il testo codificata in Base64
**keys**                       | Chiavi per la decofica (tenta ogniuna per ogni coppia)


**Restituisce**: Testo decodificato o matrice di testi decodificati.


---


## Plugin: Newsfeed


### feedFollow

Imposta le query sql di sottoscrizione.

La query sql deve risultare come una serie di righe con colonne:

Campo          | Descrizione
           --- | ---
**type**       | Tipo: post, article, comment, mention
**date_added** | Data evento
**title**      | Prima riga visualizzata dell'evento
**body**       | Seconda e terza riga dell'evento
**url**        | Link alla pagina dell'evento

Parametro      | Descrizione
           --- | ---
**feeds**      | Formato: {"nome della query": [query SQL, [parametro1, parametro2, ...], ...}, i parametri verranno esclusi, uniti da `,` inseriti al posto di `:params` nella query sql.

**Restituisce**: `"ok"`.

**Esempio:**
```coffeescript
# Sottoscrive i post ZeroBlog
query = "
	SELECT
	 post_id AS event_uri,
	 'post' AS type,
	 date_published AS date_added,
	 title AS title,
	 body AS body,
	 '?Post:' || post_id AS url
	FROM post
"
params = [""]
Page.cmd feedFollow [{"Posts": [query, params]}]
```

---

### feedListFollow

Restituisce le tracce attualmente sottoscritte

**Restituisce**: Le tracce attualmente sottoscritte nello stesso formato del comendo feedFollow.


---

### feedQuery

Esegue tutte le query per i siti/pagine sottoscritti nella traccia di notifiche dell'utente.

**Restituisce**: Il risultato delle query sql sottoscritte.

Parametro            | Descrizione
                 --- | ---
**limit**            | Limite dei risultati per sito sottoscritto (predefinito: 10)
**day_limit**        | Eventi non più vecchi di questi giorni (predefinito: 3)


---

## Plugin: MergerSite


### mergerSiteAdd

Inizia a scaricare nuovo/i sito/i distribuito.

Parametro            | Descrizione
                 --- | ---
**addresses**        | Indirizzo del sito o elenco di indirizzi di siti


---

### mergerSiteDelete

Ferma la distribuzione e cancella un sito distribuito.

Parametro            | Descrizione
                 --- | ---
**address**          | Indirizzo del sito


---

### mergerSiteList

Restituisce i siti distribuiti.

Parametro            | Descrizione
                 --- | ---
**query_site_info**  | Se true, restituisce informazioni dettagliate per i siti distribuiti


---


## Plugin: Mute


### muteAdd

Aggiunge un utente alla lista degli esclusi. (Richiede la conferma per siti **non-admin**)

Parametro            | Descrizione
                 --- | ---
**auth_address**     | Nome della cartella dei dati utente
**cert_user_id**     | Nome certificato dell'utente
**reason**           | Motivo dell'esclusione

**Restituisce**: `"ok"` se confermato.

**Esempio:**
```coffeescript
Page.cmd("muteAdd", ['1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz','helloworld@kaffie.bit','Spammer'])
```

---

### muteRemove

Rimuove un utente dalla lista degli esclusi. (Richiede la conferma per siti **non-admin**).

Parametro            | Descrizione
                 --- | ---
**auth_address**     | Nome della cartella dei dati utente

**Restituisce**: `"ok"` se confermato.

**Esempio:**
```coffeescript
Page.cmd("muteRemove", '1GJUaZMjTfeETdYUhchSkDijv6LVhjekHz')
```

---

### muteList

Elenco utenti esclusi. (Richiede il permesso **admin** sul sito).

**Restituisce**: Matrice di utenti esclusi.


---


## Plugin: OptionalManager


### optionalFileList

Restituisce una matrice di informazioni sui file opzionali.

Parametro            | Descrizione
                 --- | ---
**address**          | L'indirizzo del sito di cui estrarre la lista dei file opzionali (predefinito: sito corrente)
**orderby**          | Ordine dei file opzionali restituiti (predefinito: time_downloaded decrescente)
**limit**            | Numero massimo di file opzionali restituiti (predefinito: 10)

**Restituisce**: Le righe del database con le seguenti colonne per ogni file opzionale restituito:

Column name         | Descrizione
                --- | ---
**file_id**         | L'ID del file
**site_id**         | L'ID del sito di origine del file
**inner_path**      | Il percorso del file partendo dalla radice del sito
**hash_id**         | La chiave del file
**size**            | La dimensione del file (in byte)
**peer**            | Quanti peer ha questo file
**uploaded**        | Quanti byte di questo file sono stati caricati su altri peer
**is_downloaded**   | Se questo file è stata scaricato completamente
**is_pinned**       | Se questo file è stato marcato
**time_added**      | Quando è stato aggiunto questo file
**time_downloaded** | Quando si è completato lo scaricamento di questo file
**time_accessed**   | Quando è stato eseguito l'ultimo accesso a questo file

---

### optionalFileInfo

Richiesta di informazioni di un file opziona dato il suo persorso.

Parametro            | Descrizione
                 --- | ---
**inner_path**       | Il percorso del file partendo dalla radice del sito

**Restituisce**: Riga del database con le seguenti colonne:

Nome colonna        | Descrizione
                --- | ---
**file_id**         | L'ID del file
**site_id**         | L'ID del sito cui appartiene il file
**inner_path**      | Il percorso del file partendo dalla radice del sito
**hash_id**         | La chiave del file
**size**            | La dimensione del file (in byte)
**peer**            | Quanti peer ha il file
**uploaded**        | Quanti byte del file sono stati caricati sui peer
**is_downloaded**   | Se il file è stato scaricato completamente
**is_pinned**       | Se questo file è stato marcato
**time_added**      | Quando è stato aggiunto il file
**time_downloaded** | Quando è terminato lo scaricamento del file
**time_accessed**   | L'ultimo accesso al file

---

### optionalFilePin

Marca un file opzionale scaricato. Ora il fiel è escluso dalla pulizia automatica dei file opzionali.

Parametro            | Descrizione
                 --- | ---
**inner_path**       | Il percorso del file
**address**          | Indirizzo del sito (predefinito: sito corrente)

---

### optionalFileUnpin

Rimuove la marcatura di un file opzionale scaricato. Ora il file è incluso nella pulizia automatica dei file opzionali.

Parametro            | Descrizione
                 --- | ---
**inner_path**       | Il percorso del file
**address**          | Indirizzo del sito (predefinito: sito corrente)

---

### optionalFileDelete

Delete a downloaded optional file.

Parametro            | Descrizione
                 --- | ---
**inner_path**       | Il percorso del file
**address**          | Indirizzo del sito (predefinito: sito corrente)

---

### optionalLimitStats

Restituisce lo spazio attualmente occupato dai file opzionali.

**Restituisce**: Statistiche di spazio limite, utilizzato e libero.

---


### optionalLimitSet

Imposta il limite dei file opzionali.

Parametro            | Descrizione
                 --- | ---
**limit**            | Massima dimensione in GB utilizzata dai file opzionali o percentuale di spazio utilizzato

---

### optionalHelpList

Elenca le cartelle di scaricamento automatico dei file opzionali.

Parametro            | Descrizione
                 --- | ---
**address**          | Indirizzo del sito di cui elencare le cartelle (predefinito: sito corrente)

**Restituisce**: Cartelle di scaricamento automatico e descrizioni come oggetto JavaScript.

---


### optionalHelp

Aggiunge una cartella alla lista degli scaricamenti automatici.

Parametro            | Descrizione
                 --- | ---
**directory**        | Cartella da aggiungere all'elenco di scaricamento automatico
**title**            | Titolo dei dati (visualizzata in ZeroHello)
**address**          | Indirizzo del sito che si vuole aggiungere alla cartella di scaricamento automatico (predefinto: sito corrente)
---

### optionalHelpRemove

Previene lo scaricamento automatico dei file opzionali in una cartella. Effettivo solo se [optionalHelp](#optionalhelp) è attivo sul sito.

Parametro            | Descrizione
                 --- | ---
**directory**        | Cartella da eliminare dall'elenco di auto scaricamento
**address**          | Indirizzo del sito (predefinito: sito corrente)

---

### optionalHelpAll

Aiuta a scaricare ogni nuovo file opzionale caricato sul sito

Parametro            | Descrizione
                 --- | ---
**value**            | Abilita o disabilita lo scaricamento automatico
**address**          | Indirizzo del sito interessato (predefinito: sito corrente)


---


## Plugin: UiPluginManager


### pluginAddRequest


Chiede all'utente di installare un nuovo plugin da una cartella del sito corrente.

Parametro            | Descrizione
                 --- | ---
**inner_path**       | Cartella del plugin

**Esempio:**
```coffeescript
Page.cmd("pluginAddRequest", "plugins/Example")
```

La cartella del plugin deve contenere un file **plugin_info.json** che contiene il nome del plugin, una descrizione breve e il numero di versione (rev).

**Esempio plugins/Esempio/plugin_info.json:**
```json
{
    "name": "Plugin esempio",
    "description": "Solo un esempio di un plugin di terze parti",
    "rev": 5
}
```

**Restituisce**: "ok" al successo

> __Nota__
> Si possono visualizzare le versioni dei plugin attualmente installati nel nodo [informazioni del server](#serverinfo) plugins_rev.


## Comandi amministratore
_(richiede l'autorizzazione ADMIN in data/sites.json)_


### as

Esegue il comando nel contesto di un altro sito


Parametro            | Descrizione
                 --- | ---
**address**          | L'indirizzo del contesto del sito
**cmd**              | Nome del comando API
**arguments**        | Argomenti del comando API

**Restituisce**: Valore restituito dal comando


**Esempio**

```javascript
Page.cmd("as", ["138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP", "siteSetLimit", 20], console.log )
```

```javascript
address = "138R53t3ZW7KDfSfxVpWUsMXgwUnsDNXLP"
query = "SELECT * FROM json WHERE file_name = :file_name"
params = {"file_name": "data.json"}
Page.cmd("as", [address, "dbQuery", [query, params]], function(res) { console.log(res.length) } )
```


### certList

Restituisce le informazioni relative ai certificati dei fornitori di identità conosciuti.

**Restituisce**: Un elenco di oggetti ognuno rappresentante un certificato da un fornitore di identità.

**Esempio**

```javascript
Page.cmd("certSelect")
```

```javascript
[
  ...
  {
    "auth_type": "web",
    "domain": "zeroid.bit",
    "selected": false,
    "auth_user_name": "username",
    "auth_address": "1GUDV..."
  },
  ...
]
```


### certSet

Imposta il certificato utilizzato per il sito corrente.

Parametro            | Descrizione
                 --- | ---
**domain**           | Dominio dell'emmittente del certificato

**Restituisce**: Niente


---


### channelJoinAllsite

Richiede la notifica di ogni evento del sito.

Parametro           | Descrizione
               ---  | ---
**channel**         | Canale da seguire (vedere channelJoin)

**Restituisce**: Niente


---

**Restituisce**: ok


### configSet

Crea o modifica una informazione nel file di configurazione di ZeroNet. (predefinito zeronet.conf)


Parametro            | Descrizione
                 --- | ---
**key**              | Nome dell'informazione della configurazione
**value**            | Nuovo valore dell'informazione della configurazione


**Restituisce**: ok

---


### serverPortcheck

Inizia il controllo se la porta è aperta

**Restituisce**: True (porta aperta) or False (porta chiusa)


---


### serverShutdown

Ferma l'esecuzione del client ZeroNet.

**Restituisce**: Niente



---


### serverUpdate

Riscarica ZeroNet da Github.

**Restituisce**: Niente


---


### siteClone
Copia i file di un sito in uno nuovo.

Ogni file e cartella vengono saltate se esiste la versione consuffisso `-default` e la versione con suffisso verrà utilizzata al suo posto.


Es. Se c'è una cartella `data` e una `data-default`: la cartella `data` non verrà copiata e la cartella `data-default` verrà rinominata in `data`.

Parametro           | Descrizione
               ---  | ---
**address**         | Indirizzo del sito da copiare
**root_inner_path** | La cartella sorgente del nuovo sito

**Restituisce**: Niente, reindirizza automaticamente al nuovo sito al completamento


---


### siteList

**Restituisce**: <list> Elenco siteInfo di tutti i siti scaricati


---


### sitePause
Mette in pausa la distribuzione del sito

Parametro           | Descrizione
               ---  | ---
**address**         | Indirizzo del sito da mettere in pausa

**Restituisce**: Niente


---


### siteResume
Riprendere a distribuire il sito

Parametro           | Descrizione
               ---  | ---
**address**         | Indirizzo del sito da riprendere a distribuire

**Restituisce**: Niente
