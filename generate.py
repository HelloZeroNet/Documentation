#!/usr/bin/python

import sys
import shutil
from mkdocs.commands import build
from mkdocs import config
from mkdocs import exceptions

languages = ['fr', 'en']

def build_doc(lang):
    config_loaded = None
    if lang == 'en':
        config_loaded = config.load_config()
    else:
        config_loaded = config.load_config(
            config_file='mkdocs-'+lang+'.yml',
            site_dir='site-'+lang
        )
    try:
        build.build(config_loaded, dirty=not True)
    except exceptions.ConfigurationError as e:  # pragma: no cover
        # Avoid ugly, unhelpful traceback
        raise SystemExit('\n' + str(e))


for lang in languages:
    print lang
    # Shallow list copy
    tmp_languages = languages[:]
    tmp_languages.remove(lang)
    for l in tmp_languages:
        # We have to do this way because there is no ignore option
        shutil.move('./docs/' + l, './' + l)
    build_doc(lang)
    for l in tmp_languages:
        # We have to do this way because there is no ignore option
        shutil.move('./' + l, './docs/' + l)

# Move search/ to en/
shutil.move('./site/search', './site/en/search')


# Move everything needed in /site
tmp_languages = languages[:]
tmp_languages.remove('en')

for lang in tmp_languages:
    shutil.move('./site-' + lang + '/' + lang, './site/' + lang)
    shutil.move('./site-' + lang + '/search', './site/' + lang + '/search')
    shutil.rmtree('./site-'+ lang, ignore_errors=True)
