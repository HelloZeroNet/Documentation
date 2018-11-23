#!/usr/bin/python

import sys
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
    build_doc(lang)
