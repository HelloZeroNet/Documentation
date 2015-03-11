# ZeroNet Debug mode

All examples here are written in [CoffeeScript](http://coffeescript.org/).

To automate coffeescript -> javascript conversion its easiest to start zeronet in debug mode using the `python zeronet.py --debug` command

# Extra features in debug mode

 - On `all.css` request on own sites: Merge all css file in directory, auto vendor prefix browser specific features
 - On `all.js` request on own sites: Merge all js file in directory, convert `.coffee` to `.js` if compiler is present (bundled for Windows)

#### Other useful features if modifying ZeroNet source code

 - Debug messages appears in console
 - Auto reload some source files (UiRequest, UiWebsocket, FileRequest) on modification to prevent restarting (Not working in Linux, requires https://code.google.com/p/pyfilesystem/)
 - http://127.0.01:43110/Debug: Traceback and interactive python console at last error position using the wonderful werkzeug debugger. (Requires http://werkzeug.pocoo.org/)
 - http://127.0.01:43110/Console: Spawns an interactive python console (Requires http://werkzeug.pocoo.org/)
