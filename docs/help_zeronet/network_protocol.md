# ZeroNet network protocol

 - Every message is encoded using [MessagePack](http://msgpack.org/)
 - Every request has 3 parameter:
    * `cmd`: The request command
    * `req_id`: The request's unique id (simple, incremented nonce), the client has to include this when reply to the command
    * `params`: Parameters for the request
 - Example request: `{"cmd": "getFile", "req_id": 1, "params:" {"site": "1EU...", "inner_path": "content.json", "location": 0}}`
 - Example response: `{"cmd": "response", "to": 1, "body": "content.json content", "location": 1132, "size": 1132}`
 - Example error response: `{"cmd": "response", "to": 1, "error": "Unknown site"}`

# Peer requests

#### getFile _site_, _inner_path_, _location_
Request a file from the client

Parameter            | Description
                 --- | ---
**site**             | Site address (example: 1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**       | File path relative to site directory
**location**         | Request file from this byte (max 512 bytes got sent in a request, so you need multiple requests for larger files)

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
