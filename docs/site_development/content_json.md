# The structure of content.json files

[Example content.json file](https://github.com/HelloZeroNet/ZeroTalk/blob/master/content.json)

#### address
Your site's address

**Example**: 1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ


---


#### background-color

Background color of the wrapper

**Example**: #F5F5F5


---


#### description

Description of your site, displayed under site title on ZeroHello.

**Example**: Decentralized forum demo


---


#### files

Size and sha512 hash of signed files. Automatically generated using `zeronet.py siteSign siteaddress privatekey` command.

**Example**:
```json
    "css/all.css": {
      "sha1": "f2b14758210163f0cb38a865aa67797a4ed92837", # Only for backward compatibility, will be removed soon
      "sha512": "869b09328f07bac538c313c4702baa5276544346418378199fa5cef644c139e8", 
      "size": 148208
```


---


#### ignore

Ignore files from signing matching this preg pattern

**Example**: `((js|css)/(?!all.(js|css))|data/users/.*)` (ignore all js and css files except all.js and all.css and don't add anything from data/users/ directory)


---


#### includes

Include an another content.json

**Example**:

```json
{
  "data/users/content.json": {
    "signers": [ # Possible signers address for the file
      "1LSxsKfC9S9TVXGGNSM3vPHjyW82jgCX5f"
    ], 
    "signers_required": 1 # Valid signs required to accept the file (Multisig possibility),
    "files_allowed": "data.json", # Preg pattern for the allowed files in the include file
    "includes_allowed": false, # Nested includes allowed or not
    "max_size": 10000, # Max sum filesize allowed in the include (in bytes)
  }
}
```


---


#### modified

Content.json generate time.

**Example**: 1425857522.076


---


#### sign (deprecated)

ECDSA sign of the content.json file content. (keys sorted, without whitespace and the `sign` and `signers_sign` nodes). For backward compatibility, will be removed soon.

**Example**:
```json
  "sign": [
    43117356513690007125104018825100786623580298637039067305407092800990252156956, 
    94139380599940414070721501960181245022427741524702752954181461080408625270000
  ], 
```


---


#### signers_sign

Possible signers address for the root content.json signed using the site address private key. (Multisig possibility)

**Format of the signed string**: [signers_required]:[signer address],[signer address]

**Example**: <small>HKNDz9IUHcBc/l2Jm2Bl70XQDL9HYHhJ2hUdg8AMyunACLgxyXBr7EW1/ME4hGkaFZSFmIxlInmxH+BrMVXbnLw=</small>


---


#### signs

ECDSA signs for the the content.json file content. (keys sorted, without whitespace and the `sign` and `signers_sign` nodes). 

**Example**:
```json
  "signs": {
    "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ": "G6/QXFKvACPQ7LhoZG4fgqmeOSK99vGM2arVWkm9pV/WPCfc2ulv6iuQnuzw4v5z82qWswcRq907VPdBsdb9VRo="
  }, 
```


---


#### signs_required

Valid signs required to accept the file (Multisig possibility)


**Example**: 1


---


#### title

Site's title, displayed in browser title and on ZeroHello.

**Example**: ZeroTalk


----


#### viewport

Content for the viewport meta tag. (Used for mobile-friendly pages)

**Example**: width=device-width, initial-scale=1.0


----


#### zeronet_version

ZeroNet version used to generate content.json file.

**Example**: 0.2.5


