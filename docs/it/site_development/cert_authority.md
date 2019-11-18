# Certificate Authority

An account without password? A certificate for me? You realize the ID system of ZeroNet does not conform to convention. In this section, you are going to learn about how user certificate and certificate authority work in ZeroNet.

## What does a certificate authority do?

In ZeroNet, everything is signed by Bitcoin signing keys. A certificate provides a unique and memorizable name for a Bitcoin address. A certificate authority (or an ID provider) is responsible for proving the relationship between a unique friendly name and a Bitcoin address.

## Certificate format

### Body

The body of a certificate contains a Bitcoin address, a portal type, and a memorizable user name.

```
[BitcoinAddress]#[PortalType]/[UserName]
```

**Example:**

```
1H28iygiKXe3GUMcD77HiifVqtf3858Aft#web/hellozeronet
```

- Bitcoin address: `1H28iygiKXe3GUMcD77HiifVqtf3858Aft`
- Portal type: `web`
- User name: `hellozeronet`

**General rules:**

The Bitcoin address, the portal type and the user name **must not** contain the character `#`, `@` or `/`

Only 0-9 and a-z are allowed in a user name. All English letters in a user name **must** be in lower case. Characters not in the allowed set **must not** be used as parts of a user name. A user name **should not** be too long. A user name **should** be legible and **should not** interfere with user interface rendering.

A user name **must** be unique in the pool of all registered user names.

### Signature

A certificate signing algorithm loads a secret signing key and generates a deterministic Bitcoin signature for the body.

**From the source code:**

```python
sign = os.popen("python zeronet.py --debug cryptSign %s#bitmsg/%s %s 2>&1" % (auth_address, user_name, config.site_privatekey)).readlines()[-1].strip()
```

### Certificate

By looking at the source code of ZeroID, we know how a certificate is stored in its public database.

```python
data["users"][user_name] = "bitmsg,%s,%s" % (auth_address, sign)
```

**Example:**

```
"hellozeronet": "web,1H28iygiKXe3GUMcD77HiifVqtf3858Aft,HA2A+iKekECD3hasrsN8IrR86BnXQ63kPH+9A85JLO9hLUpRJTBn62UfnuuF92B9CIc6+EewAIqzIn9UoVq2LPA="
```

A certificate can be stored in various formats. However, all formats must include:

- The Bitcoin address: `1H28iygiKXe3GUMcD77HiifVqtf3858Aft`
- The portal type: `web`
- The user name: `hellozeronet`
- The signature from authority: `HA2A+iKekECD3hasrsN8IrR86BnXQ63kPH+9A85JLO9hLUpRJTBn62UfnuuF92B9CIc6+EewAIqzIn9UoVq2LPA=`

## Usage in `content.json`

Site owners can choose which certificate authorities to trust.

The Blue Hub, for example, accepts certificates signed by ZeroID. This rule is defined in its `data/users/content.json`

- The ID provider has a friendly name: `zeroid.bit`
- The public key digest of the ID provider is: `1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz`

```json
"user_contents": {
  "cert_signers": {
   "zeroid.bit": [
    "1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz"
   ]
  }
}
```

Every user presents his certificate in the manifest file in his Bitcoin folder. For example, `data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json` says:

```json
{
 "address": "1BLueGvui1GdbtsjcKqCf4F67uKfritG49",
 "cert_auth_type": "web",
 "cert_sign": "HPiZsWEJ5eLnspUj8nQ75WXbSanLz0YhQf5KJDq+4bWe6wNW98Vv9PXNyPDNu2VX4bCEXhRC65pS3CM7cOrjjik=",
 "cert_user_id": "nofish@zeroid.bit",
 "files": {
  "data.json": {
   "sha512": "8e597412a2bc2726ac9a1ee85428fb3a94b09f4e7a3f5f589119973231417b15",
   "size": 21422
  }
 },
 "inner_path": "data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json",
 "modified": 1492458379,
 "signs": {
  "1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj": "G8kaZIGAstsiWLVY20e2ogJQi4OO+QuwqJ9GTj3gz7YleST/jst7RQH7hDn0uf8BJMBjFs35H3LPhNHHj4jueh8="
 }
}
```

Site specific:

- Expected site URL: `"address": "1BLueGvui1GdbtsjcKqCf4F67uKfritG49"`
- Expected file path: `"inner_path": "data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json"`

Certificate information:

- ID provider: `zeroid.bit`
- User name: `nofish`
- User Bitcoin address: `1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj`
- Portal type: `web`
- Signature from ID provider: `HPiZsWEJ5eLnspUj8nQ75WXbSanLz0YhQf5KJDq+4bWe6wNW98Vv9PXNyPDNu2VX4bCEXhRC65pS3CM7cOrjjik=`

### The verifying process

1. The verifying algorithm reads `data/users/content.json` to determine what is the expected site for the user content.

2. The verifying algorithm reads `data/users/content.json` to look up the public key digest of the ID provider.

3. Given a user Bitcoin address, a portal type and a user name, the verifying algorithm reconstructs the body of the certificate.

4. The verifying algorithm checks the signature from the ID provider, with the public key defined in `data/users/content.json`, to ensure the authenticity of the certificate body.

5. The verifying algorithm loads the user public key and checks the authenticity of the user content.

## Features and limitations of certificate authorities

- A certificate authority provides memorizable names for user public key digests. It also helps mitigate spam and unsolicited content.

- A user does not have to give away secret information such as passwords. In addition, a user only has to authenticate once.

- A certificate authority does not have to be approved by any ZeroNet developers. A site owner can choose which certificate authorities to trust for the sake of user content quality.

- A certificate authority is responsible for maintaining its user name pool.

- ZeroID does not revoke or renew certificates.

## Can I live without certificate authorities?

Generally, a certificate is required when you add things to someone else's site. You do not need a certificate when you are modifying your own site.
