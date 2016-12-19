# Overview

ZeroNet allows you to publish static and dynamic sites.

Although ZeroNet can't run scripting languages like PHP or Ruby, you can create dynamic sites using ZeroNet's API (called ZeroFrame), JavaScript (or CoffeeScript) and the built-in SQL database.

## ZeroChat tutorial

In this tutorial we going to build a P2P, decentralized, server and backend-less chat site in less then 100 lines of code.

* [Read on ZeroBlog](http://127.0.0.1:43110/Blog.ZeroNetwork.bit/?Post:99:ZeroChat+tutorial)
* [Read on Medium.com](https://decentralize.today/decentralized-p2p-chat-in-100-lines-of-code-d6e496034cd4)

## ZeroNet Debug mode

ZeroNet comes with a `--debug` flag that will make site development easier.

To run ZeroNet in debug mode use: `python zeronet.py --debug`

### Debug mode features:

- Automatic CoffeeScript -> JavaScript conversion (All examples used in this documentation and sample sites are written in [CoffeeScript](http://coffeescript.org/))
- Debug messages will appear in the console
- Auto reload of some source files (UiRequest, UiWebsocket, FileRequest) on modification to prevent restarting (Requires [PyFilesystem](http://pyfilesystem.org/) on GNU/Linux)
- `http://127.0.0.1:43110/Debug` Traceback and interactive Python console at the last error position (using the wonderful Werkzeug debugger - Requires [Werkzeug](http://werkzeug.pocoo.org/))
- `http://127.0.0.1:43110/Console` Spawns an interactive Python console (Requires [Werkzeug](http://werkzeug.pocoo.org/))

### Extra features (works only for sites that you own)

 - Merged CSS files: All CSS files inside the site folder will be merged into one file called `all.css`. You can choose to include only this file to your site. If you want to keep the other CSS files to make the development easier, you can add them to the ignore key of your `content.json`. This way, they won't be published with your site. (eg: add to your `content.json` `"ignore": "(js|css)/(?!all.(js|css))"` this will ignore all CSS and JS files except `all.js` and `all.css`)
 - Merged JS files: All JS files inside the site folder will be merged into one file called `all.js`. If a CoffeeScript compiler is present (bundled for Windows) it will convert `.coffee` to `.js`.
 - Order in which files are merged into all.css/all.js: Files inside subdirectories of the css/js folder comes first; Files in the css/js folder will be merged according to file name ordering (01_a.css, 02_a.css, etc)

