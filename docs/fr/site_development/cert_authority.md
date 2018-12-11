# Autorité de certification

Un compte sans mot de passe ? Un certificat pour moi ? On peut noter que le système d'identification de ZeroNet est éloigné des conventions. Dans cette section, nous allons parler de comment les comptes utilisateurs et les autorités de certification fonctionnent dans ZeroNet.

## Qu'est ce qu'une autorité de certification fait ?

Dans ZeroNet, tout est signé avec des clefs Bitcoin. Un certificat offre un nom lisible et unique pour une adresse Bitcoin. Une autorité de certification (ou un )

## Format du certificat

### Corps

Le corps d'un certificat contiens une adresse Bitcoin, un type de portail, et un nom d'utilisateur humainement lisible.

```
[BitcoinAddress]#[PortalType]/[UserName]
```

**Exemple:**

```
1H28iygiKXe3GUMcD77HiifVqtf3858Aft#web/hellozeronet
```

- Adresse Bitcoin: `1H28iygiKXe3GUMcD77HiifVqtf3858Aft`
- Type de portail: `web`
- Nom d'utilisateur: `hellozeronet`

**Règles générales:**

L'adresse Bitcoin, le type de portail et le nom d'utilisateur **ne doit pas** contenir les caractères `#`, `@` ou `/`.

Seul les chiffres de 0-9 et les lettres a-z sont autorisés dans le nom d'utilisateur. Toute les lettre anglaises dans le nom d'utilisateur **doivent** être en minuscule. Les caractères non autorisés **ne doivent pas** être utilisé dans le nom d'utilisateur. Un nom d'utilisateur **ne devrait pas** être trop long. Un nom d'utilisateur **devrait** être lisible et **ne devrait pas** intéreférer avec le rendu de l'interface.

Un nom d'utilisateur **doit** être unique.

### Signature

Un algorithm de signature de certificat utilise une clef secrète et génère une signature Bitcoin déterministique pour le corps.

**Code source :**

```python
sign = os.popen("python zeronet.py --debug cryptSign %s#bitmsg/%s %s 2>&1" % (auth_address, user_name, config.site_privatekey)).readlines()[-1].strip()
```

### Certificat

En regardant le code source de ZeroID, on note comment le certificat est stocké dans la base de donnée.

```python
data["users"][user_name] = "bitmsg,%s,%s" % (auth_address, sign)
```

**Exemple:**

```
"hellozeronet": "web,1H28iygiKXe3GUMcD77HiifVqtf3858Aft,HA2A+iKekECD3hasrsN8IrR86BnXQ63kPH+9A85JLO9hLUpRJTBn62UfnuuF92B9CIc6+EewAIqzIn9UoVq2LPA="
```

Un certficat peut être stocké sous de multiple formats. Cependant, tout les formats doivent inclure :

- L'adresse Bitcoin : `1H28iygiKXe3GUMcD77HiifVqtf3858Aft`
- Le type de portail : `web`
- Le nomo d'utilisateur : `hellozeronet`
- La signature de l'autorité: `HA2A+iKekECD3hasrsN8IrR86BnXQ63kPH+9A85JLO9hLUpRJTBn62UfnuuF92B9CIc6+EewAIqzIn9UoVq2LPA=`

## Utilisation dans `content.json`

Les propriétaires des sites peuvent choisir quel autorité de certificat utilisé.

Le Blue Hub, par exemple, accepte les certificats signés par ZeroId. La règle est définis dans son `data/users/content.json`

- L'émetteur d'ID a un nom lisible : `zeroid.bit`
- La clef publiaue de l'émetteur d'ID est : `1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz`

```json
"user_contents": {
  "cert_signers": {
   "zeroid.bit": [
    "1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz"
   ]
  }
}
```

Chaque utilisateur présente son certificat dans le fichier manifest de répertoire utilisateur (nommé après son adresse Bitcoin). Par exemple, `data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json` dit :

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

Site :

- Url du site requis: `"address": "1BLueGvui1GdbtsjcKqCf4F67uKfritG49"`
- Chemin du fichier requis: `"inner_path": "data/users/1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj/content.json"`

Information certificat :

- Fournisseur d'ID: `zeroid.bit`
- Nom d'utilisateur: `nofish`
- Adresse Bitcoin de l'utilisateur: `1J3rJ8ecnwH2EPYa6MrgZttBNc61ACFiCj`
- Type de portail: `web`
- Signature du fournisseur d'ID: `HPiZsWEJ5eLnspUj8nQ75WXbSanLz0YhQf5KJDq+4bWe6wNW98Vv9PXNyPDNu2VX4bCEXhRC65pS3CM7cOrjjik=`

### La procédure de vérification

1. L'algorithme qui vérifie la signature lit le contenu du fichier `data/users/content.json` pour déterminer les spécifités pour le contenus utilisateur.

2. L'algorithme lit ensuite `data/users/content.json` pour rechercher la clef publique du fournisseur de l'ID.

3. Avec une adresse Bitcoin d'utilisateur, un type de portail et un nom d'utilisateur, l'algorithme reconstruit le corps du certificat.

4. L'algorithme vérifie la signature du fournisseur d'ID, avec la clef publique définit dans `data/users/content.json`, pour s'assurer de l'authenticité du corps du certificat.

5. L'algorithme utilise la clef publique de l'utilisateur pour vérifier l'authencité du contenu de l'utilisateur.

## Avantages et limites des autorités de certifications

- Une autorité de certification fournit un nom humainement lisible pour la clef publique d'un utilisateur. Cela aide aussi à diminuer les spams et le contenu non-solicité.

- Un utilisateur ne doit pas divilguer des informations secrètes comme un mot de passe (système actuel). De plus, l'utilisateur doit seulement s'authentifier une fois.

- Une autorité de certificaion n'a pas à être approuvé par aucun développeur ZeroNet. Un propriétaire de site peut chosir quelle autorité il/elle souhaite utiliser pour son site afin d'améliorer la qualité de son service pour l'utilisateur.

- Une autorité de certification est responsable de la maintenance de son groupe d'utilisateur.

- ZeroID ne supprime pas et ne renouvelle pas les certifcats lui-même.

## Est-ce que je peux utiliser ZeroNet sans un certificat ?

Généralement, un certificat est demandé lorsque vous souhaitez poster du contenu sur le site de quelqu'un d'autre. Vous n'avez pas besoin de certificat lorsque vous mettez à jour le contenu de votre propre site.
