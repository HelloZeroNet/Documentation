# ZeroNet network protocol

 - Every message is encoded using [MessagePack](http://msgpack.org/)
 - Every request has 3 parameters:
    * `cmd`: The request command
    * `req_id`: The request's unique id (simple, incremented nonce per-connection), the client has to include this when reply to the command.
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

#### streamFile _site_, _inner_path_, _location_, _[file_size]_
Stream a file from the client

**Return**:

Return key           | Description
                 --- | ---
**stream_bytes**    | The length of file data after the MessagePack payload

To avoid having python-msgpack serialize large binary strings, the file body is appended directly after the MessagePack payload. For example,

```
> {"cmd": "streamFile", "id": 1, "inner_path": "content.json", "size": 1234}
< {"cmd": "response", "to": 1, "stream_bytes": 1234}
< content of the file
```

> ZeroNet implementation detail: For file segments larger than 256 kb, streaming is enabled by default.

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
**peers_onion**      | List of Tor Onion peers that the requester has (packed)
**need**             | Number of peers the requester want

**Return**:

Return key           | Description
                 --- | ---
**peers**           | List of IPv4 peers he has for the site (packed)
**peers_onion**     | List of Tor Onion peers for this site (packed)

Each element in the `peers` list is a packed IPv4 address.

IP address | Port
---------- | ----
`4 bytes` | `2 bytes`

Each element in the `peers_onion` list is a packed Tor Onion Service address.

B32-decoded onion address | Port
------------------------- | ----
`binary_str[0:-2]`        | `binary_str[-2:]`

To restore the onion address, pass the first part through `base64.b32encode` and append `.onion` to the return value.

---

#### update _site_, _inner_path_, _body_, _[diffs]_
Update a site file.


Parameter            | Description
                 --- | ---
**site**             | Site address (example: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**       | File path relative to site directory
**body**             | Full content of the updated content.json
**diffs** (optional) | [Diff opcodes](#possible-diff-opcodes) for the modified files in the content.json

**Return**:

Return key           | Description
                 --- | ---
**ok**               | Thanks message on successful update :)

##### Diffs format

A dict that contains the modifications

 - Key: changed file's relative path to content.json (eg.: `data.json`)
 - Value: The list of diff opcodes for the file (eg.: `[['=', 5], ['+', '\nhello new line'], ['-', 6]]`)

##### Possible diff opcodes:

Opcode                                   | Description
                                     --- | ---
**['=', number of same characters]**     | Have not changed part of the file (eg.: `['=', 5]`)
**['+', new text]**                      | Added characters (eg.: `['+', '\nhello new line']`)
**['-', number of removed characters]**  | Full content of the updated file (eg.: `['-', 6]`)

After the update received, the client tries to patch the files using the diffs.
If it failes to match the sha hash provided by the content.json (had different version of the file) it automatically re-downloads the whole file from the sender of the update.

> __Note:__ The patches are limited to 30KB per file and only used for .json files

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

##### Optional file id
Integer representation of the first 4 character of the hash:
```
>>> int("ea2c2acb30bd5e1249021976536574dd3f0fd83340e023bb4e78d0d818adf30a"[0:4], 16)
59948
```

---

#### checkport _port_
Check requested port of the other peer.


Parameter            | Description
                 --- | ---
**port**             | Port which will be checked.

**Return**:

Return key           | Description
                 --- | ---
**status**           | Status of the port ("open" or "closed")
**ip_external**      | External IP of the requestor

---

# Bigfile Plugin

#### getPieceFields _site_

Returns all big file [piecefield](#bigfile-piecefield) that client has for that site in a dict.

Parameter            | Description
                 --- | ---
**site**             | Requested site


**Return**:

Return key             | Description
                   --- | ---
**piecefields_packed** | Key: Bigfile's sha512/256 [merkle root hash](#bigfile-merkle-root)<br>Value: Packed [piecefield](#bigfile-piecefield)

---

#### setPieceFields _site_, _piecefields_packed_

Set the client's [piecefields](#picefield) for that site.

Parameter              | Description
                   --- | ---
**site**               | Requested site
**piecefields_packed** | Key: Bigfile's sha512/256 [merkle root hash](#bigfile-merkle-root)<br>Value: Packed [piecefield](#bigfile-piecefield)


**Return**:

Return key           | Description
                 --- | ---
**ok**               | Updated


##### Bigfile piecefield

Holds the big files downloaded pieces information in a simple string with 1/0 values. (1 = Downloaded, 0 = Not downloaded)

> __Example__: `1110000001` means the file is sized 9-10MB and the client downloaded the first 3MB and the last 1MB at 1MB piecesize.

**Packed format**:

Turns the string to an list of int by counting the repeating characters starting with `1`.

> __Example__: `1110000001` to `[3, 6, 1]`, `0000000001` to `[0, 9, 1]`, `1111111111` to `[10]`

After the conversion it turns it to more efficient [typed array](https://docs.python.org/2/library/array.html) using `array.array('H', piecefield)`

##### Bigfile merkle root

During the big file hashing procedure, in addition to storing the per-piece sha512/256 hash digests in the [piecemap](#bigfile-piecemap) file, the algorithm also calculates the SHA-512/256 merkle root of the file using the [merkle-tools](https://github.com/tierion/merkle-tools) implementation.
The merkle root is only used as an ID to identify the big file, not (yet) for verifying the pieces.

> __Note__: The merkle root is chosen to identify the file, instead of the file's actual SHA-512/256 hash. Obviously, using the latter results in hashing the same file twice. (once for piecemap once for the whole file)

> __Note__: The merkle root is not used to verify the integrity of the pieces or the big file, because doing so would take more bandwidth and space to transfer and store the merkle-proofs for partial verification, than the per-piece hash map file itself.

##### Bigfile piecemap

It holds the per-piece SHA-512/256 hashes. The piece size and the picemap filename is defined in `content.json`, eg.:

```
...
 "files_optional": {
  "bigfile.mp4": {
   "piece_size": 1048576,
   "piecemap": "bigfile.mp4.piecemap.msgpack",
   "sha512": "d1f0d150e1e73bb1e684d370224315d7ba21e656189eb646ef7cc394d033bc2b",
   "size": 42958831
  },
...
```

Having the following data structure, the piecemap file is packed into the [msgpack](https://msgpack.org/) format:

```
{
  b'bigfile.mp4': {b'sha512_pieces': [
    b"e\xde\x0fx\xec\xc5LZ9\x0e\xe7\x85E\x1b\xd5\xe4C'\xe7req\xe3<\xff\\\xbb\xc8b\xc2\xc1\x8e",
    b'\xef\xe8\xed\xfe\x16/\x96\xdb;;\x06n[8_\x06\x9ak|\xe1\x9f\xe1\xaf\x87\x96\xdd\xfd\x9bEf\xd9!',
    b'\x1c\xd6-\x1f\xce\xde{\xcd\x01\x93un =D\x0brmB-\xd1\x8c\xbf\xfe\xca\x8a\x1c\xf60\xbb\xedD',
    b'\x1aQdF\xd2\xbc\xdff{\xb7\x89\xf2\xd3\r\xa9\xe1\xefA-V\x18\xa4\xc8e\x13\x88v\x13\\&\xfbW',
    ...
  ]}
}
```
