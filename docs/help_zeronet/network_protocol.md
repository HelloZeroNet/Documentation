# ZeroNet network protocol

 - Every message is encoded using [MessagePack](http://msgpack.org/)
 - Every request has 3 parameter:
    * `cmd`: The request command
    * `req_id`: The request's unique id (simple, incremented nonce), the client has to include this when reply to the command
    * `params`: Parameters for the request
 - Example request: `{"cmd": "getFile", "req_id": 1, "params:" {"site": "1EU...", "inner_path": "content.json", "location": 0}}`
 - Example response: `{"cmd": "response", "to": 1, "body": "content.json content", "location": 1132, "size": 1132}`
 - Example error response: `{"cmd": "response", "to": 1, "error": "Unknown site"}`


# Handshake
Every connection begins with a handshake by sending a request to the target network address:

```json
{
  "cmd": "handshake",
  "req_id": 0,
  "params": {
    "crypt": None,  # Currently active connection encryption
    "crypt_supported": ["tls-rsa"],  # Supported connection encryption
    "fileserver_port": 15441,  # Requester client's port number
    "onion": "zp2ynpztyxj2kw7x",  # Requester client's onion address
    "protocol": "v2",  # Requester client's protocol version
    "port_opened": True,   # Requester client's client port open status
    "peer_id": "-ZN0056-DMK3XX30mOrw",  # Requester client's peer_id (random generated on startup) (optional, not sent over Tor)
    "rev": 2122,  # Requester client's revision number
    "target_ip": "192.168.1.13",  # Target client's network address
    "version": "0.5.6"  # Requester client's version number
  }
}
```

The target ip responses with the same informations:

```
{
 'protocol': 'v2',
 'onion': 'boot3rdez4rzn36x',
 'to': 0,
 'crypt': None,
 'cmd': 'response',
 'rev': 2092,
 'crypt_supported': [],
 'target_ip': 'zp2ynpztyxj2kw7x.onion',
 'version': '0.5.5',
 'fileserver_port': 15441,
 'port_opened': False,
 'peer_id': ''
}
```


# Peer requests

#### getFile _site_, _inner_path_, _location_, _[file_size]_
Request a file from the client

Parameter            | Description
                 --- | ---
**site**             | Site address (example: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**       | File path relative to site directory
**location**         | Request file from this byte (max 512 bytes got sent in a request, so you need multiple requests for larger files)
**file_size**        | Total size of the requested file (optional)

**Return**:

Return key           | Description
                 --- | ---
**body**             | The requested file content
**location**         | The location of the last byte sent
**size**             | Total size of the file


---


#### ping
Checks if the client is still alive

**Return**:

Return key           | Description
                 --- | ---
**body**             | Pong


---


#### pex _site_, _peers_, _need_
Exchange peers with the client.
Peers packed to 6 bytes (4byte IP using inet_ntoa + 2byte for port)

Parameter            | Description
                 --- | ---
**site**             | Site address (example: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**peers**            | List of peers that the requester has (packed)
**need**             | Number of peers the requester want

**Return**:

Return key           | Description
                 --- | ---
**peers**            | List of peer he has for the site (packed)


---

#### update _site_, _inner_path_, _body_
Update a site file.


Parameter            | Description
                 --- | ---
**site**             | Site address (example: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**       | File path relative to site directory
**body**             | Full content of the updated file

**Return**:

Return key           | Description
                 --- | ---
**ok**               | Thanks message on successful update :)
