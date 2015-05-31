# Create new ZeroNet site


### 1. Create site structure

* Shut down ZeroNet if it is running
* Browse to the folder where ZeroNet is installed and run:

```bash
$ zeronet.py siteCreate
...
- Site private key: 23DKQpzxhbVBrAtvLEc2uvk7DZweh4qL3fn3jpM3LgHDczMK2TtYUq
- Site address: 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2
...
- Site created!
$ zeronet.py
...
```

- This will create the initial files for your site inside ```data/13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2```.

> __Note:__
> Windows users using the bundle version must browse into the ZeroBundle/ZeroNet folder and run `"../Python/python.exe" zeronet.py siteCreate`

### 2. Build/Modify site

* Update the site files located in ```data/[your site address key]``` (eg: 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2).
* When your site is ready run:

```bash
$ zeronet.py siteSign 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2
- Signing site: 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2...
Private key (input hidden):
```

* Enter the private key you got when you created the site. This will sign all files so peers can verify that the site owner is who made the changes.

### 3. Publish site changes

* In order to inform peers about the changes you made you need to run:

```bash
$ zeronet.py sitePublish 13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2
...
Site:13DNDk..bhC2 Publishing to 3/10 peers...
Site:13DNDk..bhC2 Successfuly published to 3 peers
- Serving files....
```

* That's it! You've successfully signed and published your modifications.
* Your site will be accessible from: ```http://localhost:43110/13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2```

### 4. Add domain name resolving

This step is optional. It's hard to use alway a full site ID `13DNDkMUExRf9Xa9ogwPKqp7zyHFEqbhC2`. For this reason it's possible to use a name resolving service. It's possible to use the normal Domain Name System (DNS) or to use the Namecoin system.

To make the homepage (ZeroHello) link to your site domain you have to add a "domain" key to your site's content.json file, for example:

```
 {
  "address": "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ", 
  "background-color": "#F5F5F5", 
  "description": "Decentralized forum demo", 
  "domain": "Talk.ZeroNetwork.bit", 
  "files": {
  ...
```

#### Domain Name System (DNS)

Simply add a new TXT record to your DNS zonefile on your nameservers.

##### Example TXT record: Subdomain

```
subdomain        IN      TXT    "zero=1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ"
```

##### Example TXT record: Top level domain (TLD) 

```
@        IN      TXT    "zero=1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ"
```

#### Namecoin

To register the site ID just add 'zeronet' key to your namecoin domain.
The "" key means the primary domain, any other than that is a subdomain. 

Example:

```
 {
    "name": {
        "formatted": "ZeroNet project"
    },
    "bitcoin": {
        "address": "1QDhxQ6PraUZa21ET5fYUCPgdrwBomnFgX"
    },
    "zeronet": {
        "": "1EU1tbG9oC1A8jz2ouVwGZyQ5asrNsE4Vr", 
        "blog": "1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8", 
        "talk": "1TaLk3zM7ZRskJvrh3ZNCDVGXvkJusPKQ"
    },
    "ns": [
       "ns1.domaincoin.net"
       "ns2.domaincoin.net"
    ]
 }
 ```


**Next steps:** [ZeroNet Developer Documentation](/site_development/getting_started/)
