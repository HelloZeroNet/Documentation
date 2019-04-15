# dbschema.json的结构

[dbschema.json示例文件](https://github.com/HelloZeroNet/ZeroTalk/blob/master/dbschema.json)

以下代码将执行以下操作:

 - 如果收到一个更新的 data/users/*/data.json 文件 (例如.: 一个用户发布了某些内容):
   - `data["topics"]` 中的每行都会被存储到 `topic` 表中
   - `data["comment_votes"]` 中的每个键都会被存储到 `comment_vote` 表的 `comment_hash` 列中，同时每个键值都会被存储到相同行的 `vote` 中
 - 如果收到一个更新的 data/users/content.json 文件 (例如.: 新用户创建):
   -  `content["include"]` 中的 `"user_id", "user_name", "max_size", "added"` 键都会被存储到 `user` 表中，同时相应的键被存储为 `path`

> 注意: [一些限制](content_json/#regular-expression-limitations) 应用于正则表达式中以避免可能的ReDoS脆弱性.

```json

{
  "db_name": "ZeroTalk", # 数据库名字 (仅仅用于调试)
  "db_file": "data/users/zerotalk.db", # 相对于站点目录的数据库文件
  "version": 2, # 1 = Json table has path column that includes directory and filename
                # 2 = Json table has separate directory and file_name column
                # 3 = Same as version 2, but also has site column (for merger sites)
  "maps": { # Json到数据库的映射
    ".*/data.json": { # 相对于数据库的文件正则表达式
      "to_table": [ # 加载值到表中
        {
          "node": "topics", # 读取data.json[topics]的键和值
          "table": "topic" # 将数据写到topic表中
        },
        {
          "node": "comment_votes", # 读取data.json[comment_votes]的键和值
          "table": "comment_vote", # 将数据写到comment_vote表中
          "key_col": "comment_hash",
            # data.json[comment_votes]是个简单词典, 词典的键
            # 存储到comment_vote表的comment_hash列

          "val_col": "vote"
            # data.json[comment_votes]词典的值存储到comment_vote表的vote列

        }
      ],
      "to_keyvalue": ["next_message_id", "next_topic_id"]
        # 将data.json[next_topic_id]存储到keyvalue表中
        # (键: next_message_id, 值: data.json[next_message_id] value)

    },
    "content.json": {
      "to_table": [
        {
          "node": "includes",
          "table": "user",
          "key_col": "path",
          "import_cols": ["user_id", "user_name", "max_size", "added"],
            # 仅仅导入这些列到user表
          "replaces": {
            "path": {"content.json": "data.json"}
              # Replace content.json to data.json in the
              # value of path column (required for joining)
          }
        }
      ],
      "to_json_table": [ "cert_auth_type", "cert_user_id" ]  # 直接保存cert_auth_type和cert_user_id到json表(更容易、更快的数据查询)
    }
  },
  "tables": { # 表定义
    "topic": { # 定义topic表
      "cols": [ # 此表的列
        ["topic_id", "INTEGER"],
        ["title", "TEXT"],
        ["body", "TEXT"],
        ["type", "TEXT"],
        ["parent_topic_hash", "TEXT"],
        ["added", "DATETIME"],
        ["json_id", "INTEGER REFERENCES json (json_id)"]
      ],
      "indexes": ["CREATE UNIQUE INDEX topic_key ON topic(topic_id, json_id)"],
        # 自动创建的索引

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

## data.json文件的示例
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

## content.json文件的示例

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
