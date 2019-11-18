# Autorità di certificazione

Un account senza password? Serve avere un certificato? Si comprende che il sistema di ID di ZeroNet non segue le convenzioni. In questa sezione, si comprenderà come funzionano i certificati utente e le autorità di certificazione in ZeroNet.

## Cosa fa una autorità di certificazione?

In ZeroNet, tutto è firmato da una chiave Bitcoin. Un certificato fornisce un nome univoco e memorizzabile per un indirizzo Bitcoin. Una autorità di certificazione (o fornitore di ID) è responsabile di fornire la relazione tra un nome facile e un indirizzo Bitcoin.

## Formato del certificato

### Corpo

Il corpo di un certificato contiene un indirizzo Bitcoin, un tipo di portale, e un nome utente ricordabile.

```
[IndirizzoBitcoin]#[TipoPortale]/[NomeUtente]
```

**Esempio:**

```
1H28iygiKXe3GUMcD77HiifVqtf3858Aft#web/hellozeronet
```

- Indirizzo Bitcoin: `1H28iygiKXe3GUMcD77HiifVqtf3858Aft`
- Tipo portale: `web`
- Nome utente: `hellozeronet`

**Regole generali:**

L'indirizzo Bitcoin, il tipo di portale e il nome utente **non devono** contenere i caratteri `#`, `@` o `/`

Sono ammessi solo 0-9 e a-z nel nome utente. Tutte le lettere nel nome utente **devono** essere minuscole. I caratteri non consentiti **non devono** essere utilizzati nel nome utente. Un nome utente **non dovrebbe** essere troppo lungo. Un nome utente **dovrebbe** essere leggibile e **non dovrebbe** interferire il rendering dell'intercaccia utente.

Un nome utente **deve** essere univoco nell'insieme dei nomi registrati.

### Firma

Un algoritmo di firma dei certificati carica una chiave di firma segreta e crea una firma Bitcoin deterministica per il corpo.

**Dal codice sorgente:**

```python
sign = os.popen("python zeronet.py --debug cryptSign %s#bitmsg/%s %s 2>&1" % (auth_address, user_name, config.site_privatekey)).readlines()[-1].strip()
```

### Certificato

Guardando il codice sorgente di ZeroID, si comprende come un certificato è registrato nel suo database pubblico.

```python
data["users"][user_name] = "bitmsg,%s,%s" % (auth_address, sign)
```

**Esempio:**

```
"hellozeronet": "web,1H28iygiKXe3GUMcD77HiifVqtf3858Aft,HA2A+iKekECD3hasrsN8IrR86BnXQ63kPH+9A85JLO9hLUpRJTBn62UfnuuF92B9CIc6+EewAIqzIn9UoVq2LPA="
```

Un certificato può essere archiviato in diversi formati. Comunque tutti i formati devono includere:

- L'indirizzo Bitcoin: `1H28iygiKXe3GUMcD77HiifVqtf3858Aft`
- Il tipo portale: `web`
- Il nome utente: `hellozeronet`
- La firma dell'autorità: `HA2A+iKekECD3hasrsN8IrR86BnXQ63kPH+9A85JLO9hLUpRJTBn62UfnuuF92B9CIc6+EewAIqzIn9UoVq2LPA=`

## Utilizzo in `content.json`

Il proprietario del sito può scelgliere l'autorità di certificazione da usare.

Blue Hub, per esempio, accetta certificati firmati da ZeroID. Questa regola è definita nel suo `data/users/content.json`

- Il provider di ID ha come nome: `zeroid.bit`
- La chiave pubblica sintetica del provider ID è: `1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz`

```json
"user_contents": {
  "cert_signers": {
   "zeroid.bit": [
    "1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz"
   ]
  }
}
```

Ogni utente mostra il suo certificato nel file manifesto nella sua cartella Bitcoin. Per esempio, `data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json` contiene:

```json
{
 "address": "1BLueGvui1GdbtsjcKqCf4F67uKfritG49",
 "cert_auth_type": "web",
 "cert_sign": "HPiZsWEJ5eLnspUj8nQ75WXbSanLz0YhQf5KJDq+4bWe6wNW98Vv9PXNyPDNu2VX4bCEXhRC65pS3CM7cOrjjik=",
 "cert_user_id": "nofish@zeroid.bit",
 "files": {
  "data.json": {
   "sha512": "8e597412a2bc2726ac9a1ee85428fb3a94b09f4e7a3f5f589119973231417b15",
   "size": 21422
  }
 },
 "inner_path": "data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json",
 "modified": 1492458379,
 "signs": {
  "1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj": "G8kaZIGAstsiWLVY20e2ogJQi4OO+QuwqJ9GTj3gz7YleST/jst7RQH7hDn0uf8BJMBjFs35H3LPhNHHj4jueh8="
 }
}
```

Specifico del sito:

- URL atteso del sito: `"address": "1BLueGvui1GdbtsjcKqCf4F67uKfritG49"`
- percorso del file atteso: `"inner_path": "data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json"`

Informazioni del certificato:

- Provider ID: `zeroid.bit`
- Nome utente: `nofish`
- Indirizzo Bitcoin utente: `1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj`
- Tipo portale: `web`
- Firma del provider ID: `HPiZsWEJ5eLnspUj8nQ75WXbSanLz0YhQf5KJDq+4bWe6wNW98Vv9PXNyPDNu2VX4bCEXhRC65pS3CM7cOrjjik=`

### Il processo di verifica

1. L'algoritmo di verifica legge `data/users/content.json` per determinare qual'è il sito previsto per il contenuto dell'utente.

2. L'algoritmo di verifica legge `data/users/content.json` per estrarre la sintesi della chiave pubblica del provider ID.

3. Fornendo un indirizzo utente Bitcoin, un tipo di portale e un nome utente, l'algoritmo di verifica ricostruisce il corpo del certificato.

4. L'algoritmo di verifica controlla la firma dal provider ID, con la chiave pubblica definita in `data/users/content.json`, per verificare l'autenticità del corpo del certificato.

5. L'algoritmo di verifica carica la chiave pubblica dell'utente e verifica l'autenticità del contenuto dell'utente.

## Caratteristiche e limitazioni delle autorità di certificazione

- Una atuorità di certificazione fornisce nomi memorizzabili per sintesi di chiavi pubbiche degli utenti. Inoltre aiuta a limitare spam e contenuti non richiesti.

- L'utente non deve comunicare informazioni segrete come le password. In aggiunta l'utente si deve autenticare una sola volta.

- Un'autorità di certificazione non deve essere approvata da nessun sviluppatore ZeroNet. Il proprietario di un sito può scegliere quale autorità di certificazione usare per definire la qualità dei contenuti di un utente.

- Un'autorità di certificazione è responsabile del mantenimento dell'insieme dei suoi nomi utente.

- ZeroID non rimuove o rinnova certificati.

## Si può rimanere senza autorità di certificazione?

In generale, un certificato è necessario quando si aggiungono elementi al sito di qualcun'altro. Non è necessario avere un certificato per modificare i propri siti.
