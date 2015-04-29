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

Note: Windows users using the bundle version must browse into the ZeroBundle/ZeroNet folder and run ```"../Python/python.exe" zeronet.py siteCreate```

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


**Next steps:** [ZeroNet Developer Documentation](/site_development/getting_started/)
