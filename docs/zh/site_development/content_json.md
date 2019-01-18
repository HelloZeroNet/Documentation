# content.json的结构

每个ZeroNet站点都有一个`content.json`文件。 ([content.json示例文件](https://github.com/HelloZeroNet/ZeroTalk/blob/master/content.json))

除其他外，此文件将包含您网站上所有文件的列表以及使用您的私钥创建的签名。 这用于确保站点文件的真实性并避免篡改（即：只有您或您信任的人才能更新您站点的内容）。

以下是支持的`content.json`键列表：

---

## 自动生成

_创建或克隆站点时会自动添加这些键。_

### address

您的网站地址

**Example**: 1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ


---


### address_index

The site address's BIP32 sub-key index of your BIP32 seed. Auto-added when you clone a site. It allows recovery of the site's privatekey from your BIP32 seed.

**Example**: 30926910

---


### cloned_from

仅适用于克隆网站。 克隆站点的站点地址。

**Example**: 1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8

---


### clone_root

仅适用于克隆网站。 从中克隆的网站上的子目录。

**Example**: template-new


---


### files

Size and sha512 hashes of automatically downloaded files contained in your site. Automatically added by the command `zeronet.py siteSign siteaddress privatekey`.

**Example**:
```python
    "css/all.css": {
      "sha512": "869b09328f07bac538c313c4702baa5276544346418378199fa5cef644c139e8",
      "size": 148208
    }
```


---


### files_optional

Size and sha512 hashes of optional files contained in your site. Automatically added by the command `zeronet.py siteSign siteaddress privatekey`.

**Example**:
```python
    "data/myvideo.mp4": {
      "sha512": "538c09328aa52765443464135cef644c144346418378199fa5cef61837819538",
      "size": 832103
    }
```



---


### modified

生成content.json的时间。

**Example**: 1425857522.076


---


### sign (deprecated)

ECDSA sign of the content.json file content. (keys sorted, without whitespace and the `sign` and `signers_sign` nodes). For backward compatibility, will be removed soon.

**Example**:
```python
  "sign": [
    43117356513690007125104018825100786623580298637039067305407092800990252156956,
    94139380599940414070721501960181245022427741524702752954181461080408625270000
  ],
```


---


### signers_sign

Possible signer addresses for the root content.json signed using the site address private key. Multiple entries are allowed here, allowing for site Multisig functionality.

**Format of the signed string**: [number_of_signers_required]:[signer address],[signer address]

*Example*:
```
signs_required: 1:1PcxwuHYxuJEmM4ydtB1vbiAY6WkNgsz9G,1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE
signers_sign: MEUCIQDuz+CzOVvFkv1P2ra9i5E1p1G0/1cOGecm7GpLpMLhuwIgBIbCL0YHXD1S2+x48QS5VO/rISrkdLiUR+o+x1X0y1A=
```

The above signed message is signed using the address "1PcxwuHYxuJEmM4ydtB1vbiAY6WkNgsz9G".

---


### signs

ECDSA signature for the the content.json file content:

 - `sign`, `signs` JSON nodes removed
 - JSON dumped with keys sorted alphabetically, without whitespace
 - Signature generated on the dumped data, using Electrum Bitcoin message signature format:
    * [Message encoding](https://github.com/vbuterin/pybitcointools/blob/87806f3c984e258a5f30814a089b5c29cbcf0952/bitcoin/main.py#L405): `sha256("\x18" || "Bitcoin Signed Message:\n" || num_to_var_int(len(message)) || message)`
    * [Serialization format](https://github.com/MuxZeroNet/zerolib/blob/f13126e04bf99b1b416a7ea5b5cad7924cdc15a4/zerolib/integrity/bitcoin.py#L82-L93): `recovery_id || r || s`, where 27 ≤ recovery_id ≤ 30; signature length = 1 + 32 + 32 = 65 bytes.
    * Double vertical bar `||` denotes byte concatenation.

**Example**:
```python
  "signs": {
    "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ": "G6/QXFKvACPQ7LhoZG4fgqmeOSK99vGM2arVWkm9pV/WPCfc2ulv6iuQnuzw4v5z82qWswcRq907VPdBsdb9VRo="
  },
```


----


### zeronet_version

ZeroNet版本用于生成content.json文件。

**Example**: 0.2.5

---

## 可选设置

_如果需要功能，可以添加这些选项。_


### background-color

包装器的背景颜色

**Example**: #F5F5F5


---


### cloneable

如果为**true**，则允许克隆网站。

To make your site properly cloneable you have to have a separate folder of data
files for a clean start (e.g. without any blog posts).  To do this you have to
add the **-default** postfix to your data files and directories.  During the
cloning process, only directories with the **-default** postfix are
copied. The postfix is removed from the new site.



---


### description

您的网站描述，显示在ZeroHello的网站标题下。

**Example**: Decentralized forum demo


---


### domain

您网站的Namecoin域名。 如果用户启用了Zeroname插件，ZeroHello将链接到此。

**Example**: Blog.ZeroNetwork.bit




---


### ignore

不要签署与此模式匹配的文件。

**Example**: `((js|css)/(?!all.(js|css))|data/users/.*)` (ignore all js and css files except all.js and all.css and don't add anything from the `data/users/` directory)

Note: [Some restrictions](#regular-expression-limitations) apply to regular expressions.

---


### includes

在网站中包含另一个content.json。 这通常用于后续管理用户数据的content.json文件。

**Example**:

```python
"includes": {
  "data/users/content.json": {
    "signers": [  # Possible signers address for the file
      "1LSxsKfC9S9TVXGGNSM3vPHjyW82jgCX5f"
    ],
    "signers_required": 1 # The *number* of Valid signs required to accept the file (Multisig possibility),
    "files_allowed": "data.json", # Preg pattern for the allowed files in the include file
    "includes_allowed": false, # Whether nested includes are allowed
    "max_size": 10000, # Max allowed size of included content.json and files it signs (in bytes)
  }
}
```


---


### merged_type

该网站所属的合并类型。

**Example**: `ZeroMe`


---


### optional

Preg模式的可选文件。

**Example**: `(data/mp4/.*|updater/.*)` (everything in data/mp4 and updater directory is optional)

Note: [Some restrictions](#regular-expression-limitations) apply to regular expressions.

---


### signs_required

接受该文件所需的有效标志**数量**。 允许Multisig功能。


**Example**: 1


---


### title

该网站的标题，在浏览器标题和ZeroHello中可见。

**Example**: ZeroTalk


----


### translate

文件需要翻译。 （在`languages`目录中使用语言json文件）

**Example**: ["index.html", "js/all.js"]


----


### favicon

该网站的图标。 用站点特定的图标替换默认的ZeroNet徽标。 可以是.ico，.png，.svg等。

**Example**: favicon.ico


----


### user_contents

当前目录中允许的用户内容的规则。

Node                   | 描述
                  ---  | ---
**archived**           | Delete the specified user content directory that is signed earler than the specified timestamp (key: directory name, value: timestamp)
**archived_before**    | Delete all user content directory if that is signed earler than the specified timestamp
**cert_signers**       | Accepted domains and valid signer addresses
**permission_rules**   | Allowed file names and total directory size based on cert domain or authorization method
**permissions**        | Per-user permissions. (false = banned user)

**Example**:
```python
  "user_contents": {
    "archived": {
      "1165u6pt5mQNFjyhMVwy6azB7bZuQGLA9b": 1523088096
    },
    "archived_before": 1523088096,
    "cert_signers": {
      "zeroid.bit": [ "1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz" ]
    },
    "permission_rules": {
      ".*": {
        "files_allowed": "data.json",
        "max_size": 10000
      },
      "bitid/.*@zeroid.bit": { "max_size": 40000 },
      "bitmsg/.*@zeroid.bit": { "max_size": 15000 }
    },
    "permissions": {
      "bad@zeroid.bit": false,
      "nofish@zeroid.bit": { "max_size": 100000 }
    }
  }
```

Note: [Some restrictions](#regular-expression-limitations) apply to regular expressions.

----


### viewport

视区元标记的内容。 （用于适合移动设备的页面）

**Example**: width=device-width, initial-scale=1.0


----

## 正则表达式限制

为避免[ReDoS](https://en.wikipedia.org/wiki/ReDoS)算法复杂性攻击，以下限制适用于每种模式：

 - 在`*,+,{`的重复字符之前，`.`字符是必需的
 - 单个模式允许最多9次重复
 - 模式的最大长度为255个字符
 
### 范例:

 - `((?!json).)*$` not allowed, because of `)` before the `*` character. Possible fix: `.*(?!json)$`
 - `(.*.epub|.*.jpg|.*.jpeg|.*.png|data/.*.gif|.*.avi|.*.ogg|.*.webm|.*.mp4|.*.mp3|.*.mkv|.*.eot)` not allowed, because it has 12 `.*` repetition patterns. Possible fix: `.*(epub|jpg|jpeg|png|data/gif|avi|ogg|webm|mp4|mp3|mkv|eot)`
