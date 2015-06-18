# -*- coding: utf-8 -*-
import re
import sys
import webbrowser

from mkdocs.cli import cli
sys.argv.append("serve")

webbrowser.open("http://127.0.0.1:8000")
cli()