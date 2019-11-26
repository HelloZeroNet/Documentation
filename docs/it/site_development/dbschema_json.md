# Struttuda di dbschema.json

[Esempio file dbschema.json](https://github.com/HelloZeroNet/ZeroTalk/blob/master/dbschema.json)

Il codice sottostante fa quanto segue:

 - Se viene ricevuto un file data/users/*/data.json aggiornato (es.: un utente ha inviato qualcosa):
   - Ogni riga in `data["topics"]` viene caricata nella tabella `topic`
   - Ogni chiave in `data["comment_votes"]` viene caricata nella tabella `comment_vote` come colonna `comment_hash` e il valore salvato nella stessa riga come `vote`
 - Se viene ricevuto un file data/users/content.json aggiornato (es.: è stato creato un nuovo utente):
   - Le chiavi `"user_id", "user_name", "max_size", "added"` per valore di `content["include"]` vengono salvate nella tabella `user` e la chiave è salvata come `path`

> Nota: [Alcune restrizioni](content_json/#limitazioni-espressioni-regolari) si applicano alle espressioni regolari per evitare la vulnerabilità ReDoS.

```json

{
  "db_name": "ZeroTalk", # nome del database (utilizzato solo per ricerca errori)
  "db_file": "data/users/zerotalk.db", # file database relativo alla cartella del sito
  "version": 2, # 1 = la tabella json ha una colonna path che include cartella e nome del file
                # 2 = la tabella json ha colonne separate per la cartella e il nome del file
                # 3 = Come la versione 2 ma ha anche una colonna per il sito (per unione di siti)
  "maps": { # mappa da json a database
    ".*/data.json": { # modello regex dei file relativi al file del database
      "to_table": [ # carica i valori nella tabella
        {
          "node": "topics", # lettura del valore della chiave data.json[argomenti]
          "table": "topic" # alimentazione dati alla tabella degli argomenti
        },
        {
          "node": "comment_votes", # lettura del valore della chiave data.json[comment_votes]
          "table": "comment_vote", # alimentazione dei dati nella tabella comment_vote
          "key_col": "comment_hash",
            # data.json[comment_votes] è un semplice dizionario, le chiavi del dizionario
            # sono caricate nella tabella comment_vote, colonna comment_hash

          "val_col": "vote"
            # dizionario dei valori data.json[comment_votes] caricato nella colonna vote della tabella comment_vote

        }
      ],
      "to_keyvalue": ["next_message_id", "next_topic_id"]
        # Carica data.json[next_topic_id] nella tabella keyvalue
        # (key: next_message_id, value: data.json[next_message_id])

    },
    "content.json": {
      "to_table": [
        {
          "node": "includes",
          "table": "user",
          "key_col": "path",
          "import_cols": ["user_id", "user_name", "max_size", "added"],
            # importa solo queste colonne nella tabella user
          "replaces": {
            "path": {"content.json": "data.json"}
              # sostituisce content.json con data.json nel valore
              # della colonna del path (richiesta per le unioni)
          }
        }
      ],
      "to_json_table": [ "cert_auth_type", "cert_user_id" ]  # Salva cert_auth_type e cert_user_id direttamente nella tabella json (quey semplici e veloci)
    }
  },
  "tables": { # definizione tabella
    "topic": { # definisce la tabella topic
      "cols": [ # colonne della tabella
        ["topic_id", "INTEGER"],
        ["title", "TEXT"],
        ["body", "TEXT"],
        ["type", "TEXT"],
        ["parent_topic_hash", "TEXT"],
        ["added", "DATETIME"],
        ["json_id", "INTEGER REFERENCES json (json_id)"]
      ],
      "indexes": ["CREATE UNIQUE INDEX topic_key ON topic(topic_id, json_id)"],
        # indice creato automaticamente

      "schema_changed": 1426195822
        # ultima modifica dello schema, se la versione del client è diversa allora la
        # vecchia viene distrutta atomaticamente, crea la nuova tabella e ricarica in essa i dati

    },
    "comment_vote": {
      "cols": [
        ["comment_hash", "TEXT"],
        ["vote", "INTEGER"],
        ["json_id", "INTEGER REFERENCES json (json_id)"]
      ],
      "indexes": ["CREATE UNIQUE INDEX comment_vote_key ON comment_vote(comment_hash, json_id)", "CREATE INDEX comment_vote_hash ON comment_vote(comment_hash)"],
      "schema_changed": 1426195826
    },
    "user": {
      "cols": [
        ["user_id", "INTEGER"],
        ["user_name", "TEXT"],
        ["max_size", "INTEGER"],
        ["path", "TEXT"],
        ["added", "INTEGER"],
        ["json_id", "INTEGER REFERENCES json (json_id)"]
      ],
      "indexes": ["CREATE UNIQUE INDEX user_id ON user(user_id)", "CREATE UNIQUE INDEX user_path ON user(path)"],
      "schema_changed": 1426195825
    },
    "json": {  # formato tabella json richiesto solo se è stato specificato il modello to_json_table
        "cols": [
            ["json_id", "INTEGER PRIMARY KEY AUTOINCREMENT"],
            ["directory", "TEXT"],
            ["file_name", "TEXT"],
            ["cert_auth_type", "TEXT"],
            ["cert_user_id", "TEXT"]
        ],
        "indexes": ["CREATE UNIQUE INDEX path ON json(directory, site, file_name)"],
        "schema_changed": 4
    }
  }
}
```

## Esempio di data.json file
```json
{
  "next_topic_id": 2,
  "topics": [
    {
      "topic_id": 1,
      "title": "Newtopic",
      "body": "Topic!",
      "added": 1426628540,
      "parent_topic_hash": "5@2"
    }
  ],
  "next_message_id": 19,
  "comments": {
    "1@2": [
      {
        "comment_id": 1,
        "body": "New user test!",
        "added": 1423442049
      }
    ],
    "1@13": [
      {
        "comment_id": 2,
        "body": "hello",
        "added": 1424653288
      },
      {
        "comment_id": 13,
        "body": "test 123",
        "added": 1426463715
      }
    ]
  },
  "topic_votes": {
    "1@2": 1,
    "4@2": 1,
    "2@2": 1,
    "1@5": 1,
    "1@6": 1,
    "3@2": 1,
    "1@13": 1,
    "4@5": 1
  },
  "comment_votes": {
    "5@5": 1,
    "2@12": 1,
    "1@12": 1,
    "33@2": 1,
    "45@2": 1,
    "12@5": 1,
    "34@2": 1,
    "46@2": 1
  }
}
```

## Esempio di content.json file

```json
{
  "files": {},
  "ignore": ".*/.*",
  "includes": {
    "13v1FwKcq7dx2UPruFcRcqd8s7VBjvoWJW/content.json": {
      "added": 1426683897,
      "files_allowed": "data.json",
      "includes_allowed": false,
      "max_size": 10000,
      "signers": [
        "13v1FwKcq7dx2UPruFcRcqd8s7VBjvoWJW"
      ],
      "signers_required": 1,
      "user_id": 15,
      "user_name": "meginthelloka"
    },
    "15WGMVViswrF13sAKb7je6oX3UhXavBxxQ/content.json": {
      "added": 1426687209,
      "files_allowed": "data.json",
      "includes_allowed": false,
      "max_size": 10000,
      "signers": [
        "15WGMVViswrF13sAKb7je6oX3UhXavBxxQ"
      ],
      "signers_required": 1,
      "user_id": 18,
      "user_name": "habla"
    }
  }
}
```
