# 证书颁发机构

没有密码的帐户？ 我的证书？ 您意识到ZeroNet的ID系统不符合惯例。 在本节中，您将了解用户证书和证书颁发机构如何在ZeroNet中工作。

## 证书颁发机构做什么？

在ZeroNet中，所有内容都由比特币签名密钥签名。 证书为比特币地址提供唯一且可记忆的名称。 证书颁发机构（或ID提供者）负责证明唯一友好名称和比特币地址之间的关系。

## 证书格式

### Body

证书正文包含比特币地址，门户类型和可记忆的用户名。

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

### 签名

A certificate signing algorithm loads a secret signing key and generates a deterministic Bitcoin signature for the body.

**From the source code:**

```python
sign = os.popen("python zeronet.py --debug cryptSign %s#bitmsg/%s %s 2>&1" % (auth_address, user_name, config.site_privatekey)).readlines()[-1].strip()
```

### 证书

通过查看ZeroID的源代码，我们知道证书如何存储在其公共数据库中。

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

网站所有者可以选择要信任的证书颁发机构。

例如，Blue Hub接受由ZeroID签署的证书。 This rule is defined in its `data/users/content.json`

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

每个用户都在他的比特币文件夹中的清单文件中显示他的证书。 例如， `data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json` 说:

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

特定站点：

- Expected site URL: `"address": "1BLueGvui1GdbtsjcKqCf4F67uKfritG49"`
- Expected file path: `"inner_path": "data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json"`

证书信息：

- ID provider: `zeroid.bit`
- User name: `nofish`
- User Bitcoin address: `1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj`
- Portal type: `web`
- Signature from ID provider: `HPiZsWEJ5eLnspUj8nQ75WXbSanLz0YhQf5KJDq+4bWe6wNW98Vv9PXNyPDNu2VX4bCEXhRC65pS3CM7cOrjjik=`

### 验证过程

1. The verifying algorithm reads `data/users/content.json` to determine what is the expected site for the user content.

2. The verifying algorithm reads `data/users/content.json` to look up the public key digest of the ID provider.

3. Given a user Bitcoin address, a portal type and a user name, the verifying algorithm reconstructs the body of the certificate.

4. The verifying algorithm checks the signature from the ID provider, with the public key defined in `data/users/content.json`, to ensure the authenticity of the certificate body.

5. The verifying algorithm loads the user public key and checks the authenticity of the user content.

## 证书颁发机构的功能和限制

- 证书颁发机构为用户公钥摘要提供可记忆的名称。 它还有助于缓解垃圾邮件和未经请求的内容。

- 用户不必泄露密码等秘密信息。 此外，用户只需要进行一次身份验证。

- 任何ZeroNet开发人员都无需批准证书颁发机构。 站点所有者可以为了用户内容质量选择信任哪些证书颁发机构。

- 证书颁发机构负责维护其用户名池。

- ZeroID不会撤销或续订证书。

## 我可以没有证书颁发机构吗？

通常，当您将内容添加到其他人的站点时，需要证书。 在修改自己的站点时，您不需要证书。
