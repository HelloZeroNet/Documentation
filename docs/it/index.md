## Cos'è ZeroNet?

ZeroNet utilizza la crittografia Bitcoin e la tecnologia BitTorrent per realizzare una **rete decentralizzata resistente alla censura**.

Gli utenti possono pubblicare siti web statici o dinamici su ZeroNet e i visitatori possono scelglere a loro volta di ospitare i siti. I siti rimarranno online finché almeno un peer (distributore, un server ospitante) è online.

Quando un sito viene aggiornato dal proprietario, tutti i nodi che offrono il sito (precedenti visitatori) ricevono solo gli aggiornamenti aggiuntivi fatti al contenuto del sito.

ZeroNet ha un proprio database SQL. Questo rende semplice lo sviluppo di siti con contenuti rilevanti. Il DB è sincronizzato per ospitare i nodi con aggiornamenti incrementali.


## Perché?

* Crediamo nella comunicazione aperta, libera e non censurata.
* Nessuna censura: quando qualcosa è pubblicato non c'è modo per rimuoverlo.
* Non c'è un unico punto debole: il contenuto rimane online finché c'è almeno un peer che lo ospita.
* Impossiblile da chiudere: non è da nessuna parte perché è ovunque. Il contenuto è offerto da ogni utente che lo desidera.
* Veloce: ZeroNet utilizza la tecnologia BitTorrent per distribuire i contenuti più velocemente di un server centralizzato.
* Funziona offline: è possibile accedere al sito anche se la connessione ad Internet è assente.
* Sicura: la proprietà dei contenuti è garantita utilizzando la stessa crittografia che garantisce i portafogli Bitcoin.

[commento]: <> (Non sono sicuro di quello che segue. Idee?)

[commento]: <> (# What problem is ZeroNet solving?)

[commento]: <> (Quando Tim Berners-Lee creò internet, la intendeva libera. Non sorvegliata e non censurata. E [sta ancora lottando per questo](http://edition.cnn.com/2014/03/12/tech/web/tim-berners-lee-web-freedom/).)

[commento]: <> (Internet è centralizzata principalmente in due modi: contenuti e nomi di dominio (URL) sono ospitati e controllati da server centrali. Se controlli i server centrali (e se sei abbastanza potente lo fai) controlli la rete.)

[commento]: <> (**Archivio contenuti decentralizzato**)

[commento]: <> (ZeroNet affronta il problema della conservazione dei contenuti dando ad ognuno l'abilità di conservare contenuti. I visitatori dei siti possono scegliere di ospitare un sito sui loro computer, e quando lo fanno aiutano ad offrire il sito ad altri utenti. Il sito è online finché un utente lo ospita.)

[commento]: <> (**Cache DNS condivisa**)

[commento]: <> (Gli indirizzi dei siti su ZeroNet sono memorizzati da tutti i membri della rete. Quando si richiama l'URL di un sito ZeroNet sul browser questo chiede ad altri peer  connessi informazioni. Se uno dei peer ha il sito a disposizione invierà i contenuti, altrimenti inoltrerà la richiesta ad altri peer.)

[commento]: <> (Questa architettura comporta che quando viene creato l'URL di un sito finché un peer lo mantiene non c'è modo di chiudere l'URL.)


## Caratteristiche
 * Setup semplice senza configurazione.
 * Autorizzazione senza password basata su [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki): l'account è protetto dalla stessa crittografia dei portafogli Bitcoin.
 * I siti sono aggiornati in tempo reale, non serve aggiornarli.
 * Supporto domini Namecoin .bit.
 * Supporto database SQL: consente un facile sviluppo dei siti e tempi rapidi di caricamento delle pagine.
 * Anonimo: completo supporto della rete Tor con servizio nascosto .onion al posto di indirizzi IPv4.
 * Connessioni criptate TLS.
 * Apertura automatica porte uPnP.
 * Plugin per il supporto multi utente (openproxy).
 * Funziona con qualsiasi browser/SO.


## Come funziona?

* Dopo l'installazione e l'avvio di ZeroNet, aprire un sito accedendo a:
  `http://127.0.0.1:43110/{zeronet_site_address}`
  (es.  `http://127.0.0.1:43110/1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D`).
* ZeroNet utilizzerà la rete BitTorrent per trovare peer che ospitano il sito e scaricarne il contenuto (HTML, CSS, JS...).
* Ogni sito visitato viene ospitato dal tuo client. I siti possono essere rimossi o esclusi (blacklist) se necessario.
* Ogni sito contiene un elenco di tutti i suoi file, ogni elemento contiene una chiave SHA512 e una firma generata utilizzando la chiave privata del proprietario del sito.
* Se il proprietario del sito modifica il sito, allora firma una nuovo elenco e lo pubblica ai peer.
  Dopo che i peer hanno verificato l'integrità della lista (utilizzando la firma), scaricano i file modificati e pubblicano il contenuto ad altri peer.

##### [Presentazione sulla crittografia ZeroNet, aggiornamenti contenuti, siti multi utente &raquo;](https://docs.google.com/presentation/d/1_2qK1IuOKJ51pgBvllZ9Yu7Au2l551t3XBgyTSvilew/pub?start=false&loop=false&delayms=3000)


## Screenshots

![Screenshot](./img/zerohello.png)

![ZeroTalk](./img/zerotalk.png)

##### [Altri screenshots &raquo;](/using_zeronet/sample_sites/)

## Limitazioni attuali

* <strike>Mancanza divisione grandi file come Torrent</strike> (Abilitato con il plugin BigFile)
* Le transizioni dei file non sono compresse <strike>o criptate ancora</strike> (Aggiunta criptazione TLS)
* Mancanza siti privati

## Aiutare a mantenere il progetto attivo

Bitcoin: 1QDhxQ6PraUZa21ET5fYUCPgdrwBomnFgX

[Pagina completa donazioni](help_zeronet/donate/)

### Grazie!

* Ulteriori informazioni, aiuto, modifiche, siti zeronet: [http://www.reddit.com/r/zeronet/](http://www.reddit.com/r/zeronet/)
* Vieni, parla con noi: [#zeronet @ FreeNode](https://kiwiirc.com/client/irc.freenode.net/zeronet) o su [gitter](https://gitter.im/HelloZeroNet/ZeroNet)
