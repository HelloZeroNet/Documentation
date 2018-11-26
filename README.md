Available at
https://zeronet.io/docs

## Building

First install the following:

* mkdocs
* mkdocs-material - python package

Then simply run `mkdocs serve` to host a local version of the docs.

## French doc

Serve:

`mkdocs serve -f mkdocs-fr.yml`

Build:
`mkdocs build -f mkdocs-fr.yml -d site-fr`

## Create a new translation

You will need to duplicate the `mkdocs.yml` file and rename it to add the language code according to ISO 639-1 (https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) it is used for.
Example : `mkdocs-fr.yml`

Modify the default lang for lunr search :
```
plugins:
  - search:
      lang: ['fr']
```

Modify the language theme to fit the one you translate it for.
Example :
```
theme:
  language: 'de'
```

Translate the nav is willing language.

Now in `docs` duplicate the folder `en/` and rename it with appropriate language code.
Example : `fr/`

Now you can translate the documentation. Thank you.

## Generate all the doc files

```
python generate.py
```

## Docker

```
docker build -t nginx-zeronet-doc .
docker run --name zeronet-doc -p 8000:8000 -v $PWD/site:/usr/src/app -d nginx-zeronet-doc
```
