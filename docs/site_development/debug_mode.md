# ZeroNet Debug mode

To run ZeroNet in debug mode use: `python zeronet.py --debug`

### Debug mode features:

- Automatic coffeescript -> javascript conversion (All examples used in this documentation and sample sites are written in [CoffeeScript](http://coffeescript.org/))
- Debug messages will appear in the console
- Auto reload of some source files (UiRequest, UiWebsocket, FileRequest) on modification to prevent restarting (Not working in Linux, requires https://code.google.com/p/pyfilesystem/)
- `http://127.0.01:43110/Debug` Traceback and interactive python console at the last error position (using the wonderful werkzeug debugger - Requires http://werkzeug.pocoo.org/)
- `http://127.0.01:43110/Console` Spawns an interactive python console (Requires http://werkzeug.pocoo.org/)

### Extra features (works only for sites that you own)

 - Merged CSS files: All CSS files inside the site folder will be merged into one file called `all.css`. You can chose to include only this file to your site. If you want to keep the other CSS files the make the development easier you can add them to the ignore key of your `content.json`, this way they won't be published with your site. (eg: add to your `content.json` `"ignore": "(js|css)/(?!all.(js|css))"` this will ignore all css and js files except `all.js` and `all.css`)
 - Merged JS files: All JS files inside the site folder will be merged into one file called `all.js`. If a CoffeeScript compiler is present (bundled for Windows) it will convert `.coffee` to `.js`.
