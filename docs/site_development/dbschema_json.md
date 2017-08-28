# Structure of dbschema.json

[Example dbschema.json file](https://github.com/HelloZeroNet/ZeroTalk/blob/master/dbschema.json)

The code below will do the following:

 - If an updated data/users/*/data.json file is received (eg.: a user posted something):
   - Every row in `data["topics"]` is loaded to the `topic` table
   - Every key in `data["comment_votes"]` is loaded to the `comment_vote` table as `comment_hash` col and the values stored in same line as `vote`
 - If an updated data/users/content.json file is received (eg.: new user created):
   - The `"user_id", "user_name", "max_size", "added"` key in value of `content["include"]` is loaded into the `user` table and the key is stored as `path`

> Note: [Some restriction](content_json/#regular-expressions-limitations) apply to regular expressions to avoid possible ReDoS vulnerability.

```json

{
  "db_name": "ZeroTalk", # Database name (only used for debugging)
  "db_file": "data/users/zerotalk.db", # Database file relative to site's directory
  "version": 2, # 1 = Json table has path column that includes directory and filename
                # 2 = Json table has separate directory and file_name column
                # 3 = Same as version 2, but also has site column (for merger sites)
  "maps": { # Json to database mappings
    ".*/data.json": { # Regex pattern of file relative to db_file
      "to_table": [ # Load values to table
        {
          "node": "topics", # Reading data.json[topics] key value
          "table": "topic" # Feeding data to topic table
        },
        {
          "node": "comment_votes", # Reading data.json[comment_votes] key value
          "table": "comment_vote", # Feeding data to comment_vote table
          "key_col": "comment_hash",
            # data.json[comment_votes] is a simple dict, the keys of the
            # dict are loaded to comment_vote table comment_hash column

          "val_col": "vote"
            # The data.json[comment_votes] dict values loaded to comment_vote table vote column

        }
      ],
      "to_keyvalue": ["next_message_id", "next_topic_id"]
        # Load data.json[next_topic_id] to keyvalue table
        # (key: next_message_id, value: data.json[next_message_id] value)

    },
    "content.json": {
      "to_table": [
        {
          "node": "includes",
          "table": "user",
          "key_col": "path",
          "import_cols": ["user_id", "user_name", "max_size", "added"],
            # Only import these columns to user table
          "replaces": {
            "path": {"content.json": "data.json"}
              # Replace content.json to data.json in the
              # value of path column (required for joining)
          }
        }
      ],
      "to_json_table": [ "cert_auth_type", "cert_user_id" ]  # Save cert_auth_type and cert_user_id directly to json table (easier and faster data queries)
    }
  },
  "tables": { # Table definitions
    "topic": { # Define topic table
      "cols": [ # Cols of the table
        ["topic_id", "INTEGER"],
        ["title", "TEXT"],
        ["body", "TEXT"],
        ["type", "TEXT"],
        ["parent_topic_hash", "TEXT"],
        ["added", "DATETIME"],
        ["json_id", "INTEGER REFERENCES json (json_id)"]
      ],
      "indexes": ["CREATE UNIQUE INDEX topic_key ON topic(topic_id, json_id)"],
        # Indexes automatically created

      "schema_changed": 1426195822
        # Last time of the schema changed, if the client's version is different then
        # automatically destroy the old, create the new table then reload the data into it

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

## Example for data.json file
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

## Example for content.json file

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
