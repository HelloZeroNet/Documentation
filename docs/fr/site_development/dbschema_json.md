# Structure du fichier dbschema.json

[Exemple de fichier dbschema.json](https://github.com/HelloZeroNet/ZeroTalk/blob/master/dbschema.json)

Le code ci-dessous éxécutera les actions suivantes :

 - Si un fichier data/users/*/data.json est reçu (eg.: un utilisateur a posté quelque chose):
   - Toute les lignes dans `data["topics"]` seront ajoutées dans la table `topic`
   - Tous les noeuds in `data["comment_votes"]` seront ajoutés dans la table `comment_vote` comme la colonne `comment_hash` et les valeurs stockés dans la même ligne que `vote`
 - Si une mise à jour du fichier data/users/content.json est reçu (eg.: un nouvel utilisateur):
   - Les valeurs `"user_id", "user_name", "max_size", "added"` dans le noeud `content["include"]` seront ajoutées dans la table `user` et la clé est ajouté à `path`

> Note: [Quelques restrictions](content_json/#regular-expressions-limitations) s'appliquent pour éviter de potentiel vulnérabilité ReDoS.

```json

{
  "db_name": "ZeroTalk", # Nom de la base de donnée (utiliser seulement pour debugger)
  "db_file": "data/users/zerotalk.db", # Le chemin relative du fichier de la base de donnée dans le répertoire du site
  "version": 2, # 1 = la table possède des colonnes qui inclut des répertoires et nom de fichier
                # 2 = la table a des répertoires séparés et des colonnes file_name
                # 3 = Pareil que version 2, mais possède aussi des colones sites (pour la fonction MergerSite)
  "maps": { # Relation json à base de donnée
    ".*/data.json": { # Regex (expression réguilière) du fichier
      "to_table": [ # Enregistré les valeurs à la table
        {
          "node": "topics", # Lecture de data.json[topics] key value
          "table": "topic" # Enregistre dans la table topic
        },
        {
          "node": "comment_votes", # Lecture data.json[comment_votes] key value
          "table": "comment_vote", # Enregistre data dans la table comment_vote
          "key_col": "comment_hash",
            # data.json[comment_votes] est une 'dict' dont les clés de la
            # 'dict' seront enregistrés dans la table comment_vote dans la colonne comment_hash

          "val_col": "vote"
            # Les valeurs de la 'dict' data.json[comment_votes] seront enregistrés dans la colonne vote de la table comment_vote

        }
      ],
      "to_keyvalue": ["next_message_id", "next_topic_id"]
        # Enregistre data.json[next_topic_id] dans la table keyvalue
        # (key: next_message_id, value: data.json[next_message_id] value)

    },
    "content.json": {
      "to_table": [
        {
          "node": "includes",
          "table": "user",
          "key_col": "path",
          "import_cols": ["user_id", "user_name", "max_size", "added"],
            # Importe seulement ces colonnes
          "replaces": {
            "path": {"content.json": "data.json"}
              # remplace content.json par data.json dans la valeur de la colonne 'path' (nécessaire pour les jointures)
          }
        }
      ],
      "to_json_table": [ "cert_auth_type", "cert_user_id" ]  # Sauvegarde cert_auth_type et cert_user_id directement dans la table json (plus facile et rapide pour le query des données)
    }
  },
  "tables": { # Definition des tables
    "topic": { # Définit la structure de la table topic
      "cols": [ # Colonnes de la table
        ["topic_id", "INTEGER"],
        ["title", "TEXT"],
        ["body", "TEXT"],
        ["type", "TEXT"],
        ["parent_topic_hash", "TEXT"],
        ["added", "DATETIME"],
        ["json_id", "INTEGER REFERENCES json (json_id)"]
      ],
      "indexes": ["CREATE UNIQUE INDEX topic_key ON topic(topic_id, json_id)"],
        # Indexes créés automatiquement

      "schema_changed": 1426195822
        # Timestamp de la dernière modification, si le client a une version différente,
        # détruit automatiquement la version actuelle, créé une nouvelle et re-engistre des données

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
    "json": {  # Json table format only required if you have specified to_json_table pattern anywhere
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

## Exemple de fichier data.json
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

## Exemple de fichier content.json

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
