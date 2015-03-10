# ZeroNet Debug mode

For site developing it's recommended to start zeronet in debug mode using `python zeronet.py --debug` command

# Extra features in debug mode

 - Debug messages appears in console
 - On `all.css` request on own sites: Merge all css file in directory, auto vendor prefix browser specific features
 - On `all.js` request on own sites: Merge all js file in directory, convert `.coffee` to `.js` if compiler is present (bundled for windows)
 - Auto reload the some source files (UiRequest, UiWebsocket, FileRequest) on modification to prevent restarting (Not works in linux, requires https://code.google.com/p/pyfilesystem/)
 - http://127.0.01:43110/Debug: Traceback and interactive python console at last error position using the wonderful werkzeug debugger. (Requires http://werkzeug.pocoo.org/)
 - http://127.0.01:43110/Console: Spawns an interactive python console (Requires http://werkzeug.pocoo.org/)