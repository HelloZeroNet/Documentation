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

Parameter            | Description
                 --- | ---
**crypt**            | Null/None, only used in respones
**crypt_supported**  | An array of connection encryption methods supported by the client
**fileserver_port**  | The client's fileserver port
**onion**            | (Only used on tor) The client's onion address
**protocol**         | The protocol version the client uses (v1 or v2)
**port_opened**      | The client's client port open status
**peer_id**          | (Not used on tor) The client's peer_id
**rev**              | The client's revision number
**version**          | The client's version
**target_ip**        | The server's network address

The target initialize the encryption on the socket based on `crypt_supported`, then return:

Return key           | Description
                 --- | ---
**crypt**            | The encryption to use
**crypt_supported**  | An array of connection encryption methods supported by the server
**fileserver_port**  | The server's fileserver port
**onion**            | (Only used on tor) The server's onion address
**protocol**         | The protocol version the server uses (v1 or v2)
**port_opened**      | The server's client port open status
**peer_id**          | (Not used on tor) The server's peer_id
**rev**              | The server's revision number
**version**          | The server's version
**target_ip**        | The client's network address

> **Note:** No encryption used on .onion connections, as the Tor network provides the transport security by default.
> **Note:** You can also implicitly initialize SSL before the handshake if you can assume it supported by remote client.

**Example**:

Sent handshake:

```json
{
  "cmd": "handshake",
  "req_id": 0,
  "params": {
    "crypt": None,
    "crypt_supported": ["tls-rsa"],
    "fileserver_port": 15441,
    "onion": "zp2ynpztyxj2kw7x",
    "protocol": "v2",
    "port_opened": True,
    "peer_id": "-ZN0056-DMK3XX30mOrw",
    "rev": 2122,
    "target_ip": "192.168.1.13",
    "version": "0.5.6"
  }
}
```

Return:

```
{
 "protocol": "v2",
 "onion": "boot3rdez4rzn36x",
 "to": 0,
 "crypt": None,
 "cmd": "response",
 "rev": 2092,
 "crypt_supported": [],
 "target_ip": "zp2ynpztyxj2kw7x.onion",
 "version": "0.5.5",
 "fileserver_port": 15441,
 "port_opened": False,
 "peer_id": ""
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

---

#### listModified _site_, _since_
Lists the content.json files modified since the given parameter. It used to fetch the site's user submitted content.


Parameter            | Description
                 --- | ---
**site**             | Site address (example: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**since**            | List content.json files since this timestamp.

**Return**:

Return key           | Description
                 --- | ---
**modified_files**   | Key: content.json inner_path<br>Value: last modification date

**Example**:

```json
> zeronet.py --silent peerCmd 127.0.0.1 15441 listModified "{'site': '1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8', 'since': 1497507030}"
{
  "to": 1,
  "cmd": "response",
  "modified_files": {
    "data/users/1NM9k7VJfrb1UWw5agAvyRfSn3ws1wTJ5U/content.json": 1497579272,
    "data/users/1QEfmMwKVxgR4rkREbdJYjgUmF3Zy8pwHt/content.json": 1497565986,
    "data/users/16NS3rBdW9zpLmLSQoD8nLTtNVsRFtVBhd/content.json": 1497575039,
    "data/users/1CjXarXgvcNeCJ2nMQxUi4DRFWp3GEur2W/content.json": 1497513808,
    "data/users/1L5rGDgTs4W2V7gekSvJNhKa7XaHkVwotD/content.json": 1497615798,
    "data/users/1LWuc6JBhUGrKEAh1aPrPU85dEMcKmg3pS/content.json": 1497594716,
    "data/users/1KdnTJVBGzEZrJppFZtzfG9chukuMv8xSb/content.json": 1497584640,
    "data/users/1GMNmr2bDPbT4c8yVnyCoDHke52CNCdqAa/content.json": 1497614188,
    "data/users/1GRm9rED83Tkfi3iWS9m3LWHiRpPZehWLd/content.json": 1497827772,
    "data/users/12Ugp53jiMdvj1Kxa1w7c2LcXUBdGPs1oK/content.json": 1497692901,
    "data/users/1F6BMqittjWUStzUbRXm2kG2GQ3RdBLqFQ/content.json": 1497571485,
    "data/users/1GgNo3CmxPd7n2pMSF3uyqf1XHvgtTUqCe/content.json": 1497560829,
    "data/users/16nArdxrSaNThNp83kL8E6NLL9WD98iUne/content.json": 1497627929,
    "data/users/16CAJkbfNRxNJq4aKdrZ2MSYFfFGvQ8JPi/content.json": 1497664899,
    "data/users/1DrBS2sTD3BX5BBxG8eqYsxXSvGt9kc5HE/content.json": 1497632000,
    "data/users/19sggoAZ4hcorrrfWoFWP9rwfpVsL29cnZ/content.json": 1497928134,
    "data/users/1NYpJupegoTXL4cFpkNdLNJ4XaAhTNhPe1/content.json": 1497535771,
    "data/users/1R67TfYzNkCnh89EFfGmXn5LMb4hXaMRQ/content.json": 1497691787,
    "data/users/1C9HXUYFSVafLxanwkaFPZRcRgCEGsj2Cn/content.json": 1497572833,
    "data/users/1LgoHzNGWeijeZbJ8a1YgGjMCnjaM4BWG/content.json": 1497620232,
    "content.json": 1497623639
  }
}
```

---


#### getHashfield _site_
Get the client's downloaded [optional file ids](#optional-file-id).

Parameter            | Description
                 --- | ---
**site**             | Site address (example: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)

**Return**:

Return key           | Description
                 --- | ---
**hashfield_raw**    | Optional file ids encoded using `array.array("H", [1000, 1001..]).tostring()`

**Example**:
```json
> zeronet.py --silent peerCmd 192.168.1.13 15441 getHashfield "{'site': '1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h'}
{
  'to': 1,
  'hashfield_raw': 'iG\xde\x02\xc6o\r;...',
  'cmd': 'response'
}
```

---


#### setHashfield _site_, _hashfield_raw_
Set the list of [optional file ids](#optional-file-id) that the requester client has.

Parameter            | Description
                 --- | ---
**site**             | Site address (example: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**hashfield_raw**    | Optional file ids encoded using `array.array("H", [1000, 1001..]).tostring()`

**Return**:

Return key           | Description
                 --- | ---
**ok**               | Updated


---


#### findHashIds _site_, _hash_ids_
Queries if the client know any peer that has the requested hash_ids

Parameter            | Description
                 --- | ---
**site**             | Site address (example: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**hash_ids**         | List of optional file ids the client currently looking for

**Return**:

Return key           | Description
                 --- | ---
**peers**            | Key: Optional file id<br>Value: List of ipv4 peers encoded using `socket.inet_aton(ip) + struct.pack("H", port)`
**peers_onion**      | Key: Optional file id<br>Value: List of onion peers encoded using `base64.b32decode(onion.replace(".onion", "").upper()) + struct.pack("H", port)`

**Example**:
```json
> zeronet.py --silent peerCmd 192.168.1.13 15441 findHashIds "{'site': '1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h', 'hash_ids': [59948, 29811]}"
{
  'to': 1,
  'peers': {
    29811: [
      'S&9\xd3Q<',
      '>f\x94\x98N\xa4',
      'gIB\x90Q<',
      '\xb4\xady\xf7Q<'
    ],
    59948: [
      'x\xcc>\xf6Q<',
      'S\xa1\xddkQ<',
      '\x05\xac\xe8\x8dQ<',
      '\x05\xc4\xe1\x93Q<',
      'Q\x02\xed\nQ<'
    ]
  },
  'cmd': 'response',
  'peers_onion': {
    29811: ['\xc7;A\xce\xbc\xd9O\xe2w<Q<'],
    59948: ['\xc7;A\xce\xbc\xd9O\xe2w<Q<']
  }
}
```

---


# Optional file id
Integer representation of the first 4 character of the hash:
```
>>> int("ea2c2acb30bd5e1249021976536574dd3f0fd83340e023bb4e78d0d818adf30a"[0:4], 16)
59948
```
