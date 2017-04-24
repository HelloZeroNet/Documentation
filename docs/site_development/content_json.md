# Structure of content.json

Every ZeroNet site will have a `content.json` file. ([Example content.json file](https://github.com/HelloZeroNet/ZeroTalk/blob/master/content.json))

This file will carry, among other things, a list of all files on your site and a signature created with your private key. This is done to avoid file tampering (ie: only you, or people you trust, can update the site content).

Here is a list of supported keys:


# Generated automatically


---

### address

Your site address

**Example**: 1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ


---


### address_index

The site's address BIP32 sub-key index of your BIP32 seed. Auto-added when you clone a site. It allows to recover the site privatekey from your BIP32 seed.

**Example**: 30926910

---


### cloned_from

The site address where the site is cloned from.

**Example**: 1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8

---


### clone_root

The sub-directory on source site where this site was cloned from.

**Example**: template-new


---


### files

Size and sha512 hash of automatically downloaded files contained in your site. Automatically added by the command `zeronet.py siteSign siteaddress privatekey`.

**Example**:
```json
    "css/all.css": {
      "sha512": "869b09328f07bac538c313c4702baa5276544346418378199fa5cef644c139e8",
      "size": 148208
```


---


### files_optional

Size and sha512 hash of optional files contained in your site. Automatically added by the command `zeronet.py siteSign siteaddress privatekey`.

**Example**:
```json
    "data/myvideo.mp4": {
      "sha512": "538c09328aa52765443464135cef644c144346418378199fa5cef61837819538",
      "size": 832103
```



---


### modified

Time when the content.json was generated.

**Example**: 1425857522.076


---


### sign (deprecated)

ECDSA sign of the content.json file content. (keys sorted, without whitespace and the `sign` and `signers_sign` nodes). For backward compatibility, will be removed soon.

**Example**:
```json
  "sign": [
    43117356513690007125104018825100786623580298637039067305407092800990252156956,
    94139380599940414070721501960181245022427741524702752954181461080408625270000
  ],
```


---


### signers_sign

Possible signers address for the root content.json signed using the site address private key. (Multisig possibility)

**Format of the signed string**: [number_of_signers_required]:[signer address],[signer address]

**Example**: <small>HKNDz9IUHcBc/l2Jm2Bl70XQDL9HYHhJ2hUdg8AMyunACLgxyXBr7EW1/ME4hGkaFZSFmIxlInmxH+BrMVXbnLw=</small>

*Another Example*:
```
signs_required: 1:1PcxwuHYxuJEmM4ydtB1vbiAY6WkNgsz9G,1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE
signed message: MEUCIQDuz+CzOVvFkv1P2ra9i5E1p1G0/1cOGecm7GpLpMLhuwIgBIbCL0YHXD1S2+x48QS5VO/rISrkdLiUR+o+x1X0y1A=
```
The above signed message is signed using the address, "1PcxwuHYxuJEmM4ydtB1vbiAY6WkNgsz9G"

---


### signs

ECDSA signs for the the content.json file content. (keys sorted, without whitespace and the `sign` and `signers_sign` nodes).

**Example**:
```json
  "signs": {
    "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ": "G6/QXFKvACPQ7LhoZG4fgqmeOSK99vGM2arVWkm9pV/WPCfc2ulv6iuQnuzw4v5z82qWswcRq907VPdBsdb9VRo="
  },
```


----


### zeronet_version

ZeroNet version used to generate content.json file.

**Example**: 0.2.5


---


# Settings


### background-color

Background color of the wrapper

**Example**: #F5F5F5


---


### cloneable

Allow to clone the site if **true**.

To make your site properly cloneable you have to add data files for clean start (eg. without any blog posts).
To do this you have to add **-default** postfix to your data files and directories.
On the cloning process every file and directory is skipped if it has **-default** postfixed alternative and then the **-default** postfix will be removed from the affected files and directories.



---


### description

Description of your site, displayed under site title on ZeroHello.

**Example**: Decentralized forum demo


---


### domain

Namecoin domain name of your site. ZeroHello will link to this if the user has Zeroname plugin enabled.

**Example**: Blog.ZeroNetwork.bit




---


### ignore

Ignore files from signing matching this preg pattern

**Example**: `((js|css)/(?!all.(js|css))|data/users/.*)` (ignore all js and css files except all.js and all.css and don't add anything from data/users/ directory)


---


### includes

Include an another content.json

**Example**:

```json
{
  "data/users/content.json": {
    "signers": [ # Possible signers address for the file
      "1LSxsKfC9S9TVXGGNSM3vPHjyW82jgCX5f"
    ],
    "signers_required": 1 # The *number* of Valid signs required to accept the file (Multisig possibility),
    "files_allowed": "data.json", # Preg pattern for the allowed files in the include file
    "includes_allowed": false, # Nested includes allowed or not
    "max_size": 10000, # Max sum filesize allowed in the include (in bytes)
  }
}
```


---


### merged_type

Data source for specified merger site type

**Example**: `ZeroMe`


---


### optional

Preg pattern of optional files

**Example**: `(data/mp4/.*|updater/.*)` (everything in data/mp4 and updater directory is optional)


---


### signs_required

The **number** of valid signs required to accept the file (Multisig possibility)


**Example**: 1


---


### title

Site's title, visible in browser title and on ZeroHello.

**Example**: ZeroTalk


----


### translate

Files need be translated. (use language json files in `languages` dictionary)

**Example**: ["index.html", "js/all.js"]


----


### favicon

Site's favicon. Replace default ZeroNet favicon with a site-specific favicon.

**Example**: favicon.ico


----


### user_contents

Rules of allowed user content of current directory.

Node                   | Description
                  ---  | ---
**cert_signers**       | Accepted domains and it's valid signer's addresses
**permission_rules**   | Allowed file names and total directory size based on cert domain or authorization method
**permissions**        | Per-user permissions. (false = banned user)

**Example**:
```json
  "user_contents": {
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

----


### viewport

Content for the viewport meta tag. (Used for mobile-friendly pages)

**Example**: width=device-width, initial-scale=1.0
