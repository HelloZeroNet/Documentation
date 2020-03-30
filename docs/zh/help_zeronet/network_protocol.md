# ZeroNet网络协议

 - 每条消息均使用[MessagePack](http://msgpack.org/)编码
 - 每个请求具有3个参数:
    * `cmd`: 请求命令
    * `req_id`: 请求的唯一id (simple, incremented nonce per-connection), the client has to include this when reply to the command.
    * `params`: 请求的参数
 - 请求示例: `{"cmd": "getFile", "req_id": 1, "params:" {"site": "1EU...", "inner_path": "content.json", "location": 0}}`
 - 响应示例: `{"cmd": "response", "to": 1, "body": "content.json content", "location": 1132, "size": 1132}`
 - 错误响应示例: `{"cmd": "response", "to": 1, "error": "Unknown site"}`


# 握手
通过向目标网络地址发送请求,每个连接都以握手开始:

参数                 | 描述
                 --- | ---
**crypt**            | Null/None, 仅用于响应
**crypt_supported**  | 客户端支持的一系列连接加密方法
**fileserver_port**  | 客户端的文件服务器端口
**onion**            | (仅用于tor)客户的洋葱地址
**protocol**         | 客户端使用的协议版本(v1或v2)
**port_opened**      | 客户端的客户端端口打开状态
**peer_id**          | (未在tor上使用)客户端的peer_id
**rev**              | 客户的修订号
**version**          | 客户端版本
**target_ip**        | 服务器的网络地址

目标基于“crypt_supported”在套接字上初始化加密,然后return:

返回值               | 描述
                 --- | ---
**crypt**            | 要使用的加密
**crypt_supported**  | 服务器支持的连接加密方法数组
**fileserver_port**  | 服务器的文件服务器端口
**onion**            | (仅用于tor)服务器的洋葱地址
**protocol**         | 服务器使用的协议版本(v1或v2)
**port_opened**      | 服务器的客户端端口打开状态
**peer_id**          | (未在tor上使用)服务器的peer_id
**rev**              | 服务器的修订号
**version**          | 服务器的版本
**target_ip**        | 客户端的网络地址

> **注意:** .onion连接上不使用加密,因为Tor网络默认提供传输安全性.
> **注意:** 如果可以假设远程客户端支持SSL,则还可以在握手之前隐式初始化SSL.

**示例**:

发送握手:

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

返回:

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

# 节点请求

#### getFile _site_, _inner_path_, _location_, _[file_size]_
向客户端请求文件

参数                 | 描述
                 --- | ---
**site**             | 站点地址(例如:1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**       | 相对于站点目录的文件路径
**location**         | 此字节中的请求文件(一个请求中最多发送了512个字节,因此您需要多个请求以获取更大的文件)
**file_size**        | 所需文件的总大小(可选)

**返回**:

返回值               | 描述
                 --- | ---
**body**             | 请求的文件内容
**location**         | 发送的最后一个字节的位置
**size**             | 文件总大小


---

#### streamFile _site_, _inner_path_, _location_, _[file_size]_
从客户端流式传输文件

**返回**:

返回值               | 描述
                 --- | ---
**stream_bytes**     | 消息包有效负载之后的文件数据长度

为了避免python-msgpack序列化大型二进制字符串,文件正文直接附加在MessagePack有效负载之后. 例如,

```
> {"cmd": "streamFile", "id": 1, "inner_path": "content.json", "size": 1234}
< {"cmd": "response", "to": 1, "stream_bytes": 1234}
< content of the file
```

> ZeroNet实施细节:对于大于256 kb的文件段,默认情况下启用流.

---


#### ping
检查客户端是否还活着

**返回**:

返回值               | 描述
                 --- | ---
**body**             | Pong


---


#### pex _site_, _peers_, _need_
与客户端交换对等体.
同行打包到 6 bytes (4byte IP使用 inet_ntoa + 2byte 用于端口)

参数                 | 描述
                 --- | ---
**site**             | 站点地址(例如:1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**peers**            | 请求者已打包的对等方列表
**peers_onion**      | 请求者已打包的Tor Onion对等方列表
**need**             | 请求者想要的对等体数

**返回**:

返回值               | 描述
                 --- | ---
**peers**            | 他为该站点拥有的IPv4对等方列表(打包)
**peers_onion**      | 此网站的Tor Torion同行列表(打包)

“peer”列表中的每个元素都是一个打包的IPv4地址.

IP地址     | 端口
---------- | ----
`4 bytes`  | `2 bytes`

`peers_onion` 列表中的每个元素都是一个打包的Tor Onion服务地址.

B32解码的Tor地址           | 端口
------------------------- | ----
`binary_str[0:-2]`        | `binary_str[-2:]`

要恢复洋葱地址,请将第一部分通过`base64.b32encode`传递,并将`.onion`附加到返回值.

---

#### update _site_, _inner_path_, _body_, _[diffs]_
更新一个站点文件.


参数                 | 描述
                 --- | ---
**site**             | 站点地址(例如:1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**inner_path**       | 相对于站点目录的文件路径
**body**             | 更新后的content.json的完整内容
**diffs** (optional) | [Diff opcodes](#possible-diff-opcodes) 用于content.json中的修改文件

**返回**:

返回值               | 描述
                 --- | ---
**ok**               | 更新成功提示消息:)

##### 格式差异

包含修改的字典

 - Key: 更改了文件到content.json的相对路径(例如:`data.json`)
 - Value: 文件的不同操作码的列表(例如:'[['=',5],['+','\ nello new line'],['-',6]]`)

##### 可能的不同操作码:

操作码                                   | 描述
                                     --- | ---
**['=', 相同的字符]**     | 尚未更改文件的一部分(例如:`['=',5]`)
**['+', 新字符]**                      | 添加的字符(例如:“ ['+”,` \ nhello新行”]`)
**['-', 删除字符数]**  | 更新文件的完整内容(例如:`['-', 6]`)

收到更新后,客户端将尝试使用差异修补文件.
如果它与content.json(具有不同版本的文件)提供的sha哈希不匹配,它将自动从更新的发件人重新下载整个文件.

> __提示:__ 补丁程序每个文件限制为30KB,仅用于.json文件

---

#### listModified _site_, _since_
列出自给定参数以来修改的content.json文件. 它曾经用于获取站点的用户提交的内容.


参数                 | 描述
                 --- | ---
**site**             | 站点地址(例如:1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**since**            | 自此时间戳以来,列出content.json文件.

**返回**:

返回值               | 描述
                 --- | ---
**modified_files**   | Key: content.json inner_path <br>值:上次修改日期

**示例**:

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
获取客户端下载的 [可选文件ID] (#optional-file-id).

参数                 | 描述
                 --- | ---
**site**             | 站点地址(例如:1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)

**返回**:

返回值               | 描述
                 --- | ---
**hashfield_raw**    | 使用`array.array(“ H”,[1000,1001 ..]).tostring()`编码的可选文件ID.

**示例**:
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
设置请求者客户端具有的 [可选文件ID] (#optional-file-id)列表.

参数                 | 描述
                 --- | ---
**site**             | 站点地址(例如:1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**hashfield_raw**    | 使用`array.array(“ H”,[1000,1001 ..]).tostring()`编码的可选文件ID.
**返回**:

返回值               | 描述
                 --- | ---
**ok**               | 更新


---


#### findHashIds _site_, _hash_ids_
查询客户端是否知道具有请求的hash_ids的任何对等方

参数                 | 描述
                 --- | ---
**site**             | 站点地址(例如:1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr)
**hash_ids**         | 客户端当前正在寻找的可选文件ID的列表

**返回**:

返回值               | 描述
                 --- | ---
**peers**            | Key: 可选文件ID <br>值:使用`socket.inet_aton(ip)+ struct.pack(“ H”,port)编码的ipv4对等点列表
**peers_onion**      | 可选文件id <br>值:使用`base64.b32decode(onion.replace(“.onion”,“”).upper())+ struct.pack(“ H”,port)编码的Tor同级列表.

**示例**:
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

##### 可选文件ID
哈希的前4个字符的整数表示:
```
>>> int("ea2c2acb30bd5e1249021976536574dd3f0fd83340e023bb4e78d0d818adf30a"[0:4], 16)
59948
```

---

#### checkport _port_
检查其他对等体的请求端口.


参数                 | 描述
                 --- | ---
**port**             | 将检查的端口.

**返回**:

返回值               | 描述
                 --- | ---
**status**           | 端口状态(“打开”或“关闭”)
**ip_external**      | 请求者的外部IP

---

# 大文件插件

#### getPieceFields _site_

返回字典中客户端对该站点具有的所有大文件[piecefield](#bigfile-piecefield).

参数                 | 描述
                 --- | ---
**site**             | 要求的地点


**返回**:

返回值                 | 描述
                   --- | ---
**piecefields_packed** | Key: Bigfile的sha512/256 [merkle根哈希](#bigfile-merkle-root)<br>值:打包[piecefield](#bigfile-piecefield)

---

#### setPieceFields _site_, _piecefields_packed_

为该站点设置客户的[piecefields](#picefield).

参数                   | 描述
                   --- | ---
**site**               | 请求的页面地址
**piecefields_packed** | Key: Bigfile的sha512/256 [merkle根哈希](#bigfile-merkle-root)<br>值:打包[piecefield](#bigfile-piecefield)


**返回**:

返回值               | 描述
                 --- | ---
**ok**               | 更新


##### Bigfile piecefield

将大文件下载件信息保存在一个具有1/0值的简单字符串中. (1 =已下载,0 =未下载)

> __示例__: `1110000001` 表示文件大小为9-10MB,客户端以1MB的大小下载了前3MB和后1MB.

**Packed format**:

通过计算以“ 1”开头的重复字符,将字符串转换为int列表.

> __示例__: `1110000001` to `[3, 6, 1]`, `0000000001` to `[0, 9, 1]`, `1111111111` to `[10]`

转换后,使用array.array('H',piecefield)将其转换为更有效的[typed array](https://docs.python.org/2/library/array.html).

##### 大文件Merkle根

在大文件哈希过程中,除了将逐段的sha512/256哈希摘要存储在[piecemap](#bigfile-piecemap)文件中之外,该算法还使用 [merkle-tools](https://github.com/tierion/merkle-tools)实现.
merkle根仅用作标识大文件的ID,尚未用作验证文件的ID.

> __提示__: 选择merkle根来标识文件,而不是文件的实际SHA-512 / 256哈希. 显然,使用后者会导致对同一文件进行两次哈希处理. (对于整个文件一次一次计件图)

> __提示__: merkle根不用于验证碎片或大文件的完整性,因为与逐个哈希映射文件本身相比,这样做会占用更多的带宽和空间来传输和存储merkle证明以进行部分验证.

##### 大文件片段图

它包含每个SHA-512/256 哈希. 片段大小和picemap文件名在`content.json`中定义, 例如:

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

具有以下数据结构,片断图文件打包为[msgpack](https://msgpack.org/)格式:

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
