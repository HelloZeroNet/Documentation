# Overview

ZeroNet allows you to publish static and dynamic sites.

Although ZeroNet can't run scripting languages like PHP or Ruby, you can create dynamic sites using ZeroNet's API (called ZeroFrame), JavaScript (or CoffeeScript) and the built-in SQL database.

A basic site structure would look like this ([Example at github](https://github.com/HelloZeroNet/Documentation/tree/master/example/ZeroFrame)):

```ini
data/[your site address]
├─ js/
│  ├─ lib/
│  │  └─ ZeroFrame.coffee
│  ├─ MySite.coffee
│  └─ all.js
├── index.html
└── content.json
```

The .coffee files will allow your site to use the ZeroFrame API.

The `content.json` is the file that will guarantee that the content of your site was really created by you. It will carry a list of each file contained in your site and a signature created with your private key.


## ZeroNet Debug mode

ZeroNet comes with a `--debug` flag that will make site development easier.

To run ZeroNet in debug mode use: `python zeronet.py --debug`

### Debug mode features:

- Automatic CoffeeScript -> JavaScript conversion (All examples used in this documentation and sample sites are written in [CoffeeScript](http://coffeescript.org/))
- Debug messages will appear in the console
- Auto reload of some source files (UiRequest, UiWebsocket, FileRequest) on modification to prevent restarting (Requires [PyFilesystem](http://pyfilesystem.org/) on GNU/Linux)
- `http://127.0.01:43110/Debug` Traceback and interactive Python console at the last error position (using the wonderful Werkzeug debugger - Requires [Werkzeug](http://werkzeug.pocoo.org/))
- `http://127.0.01:43110/Console` Spawns an interactive Python console (Requires [Werkzeug](http://werkzeug.pocoo.org/))

### Extra features (works only for sites that you own)

 - Merged CSS files: All CSS files inside the site folder will be merged into one file called `all.css`. You can choose to include only this file to your site. If you want to keep the other CSS files to make the development easier, you can add them to the ignore key of your `content.json`. This way, they won't be published with your site. (eg: add to your `content.json` `"ignore": "(js|css)/(?!all.(js|css))"` this will ignore all CSS and JS files except `all.js` and `all.css`)
 - Merged JS files: All JS files inside the site folder will be merged into one file called `all.js`. If a CoffeeScript compiler is present (bundled for Windows) it will convert `.coffee` to `.js`.
 - Order in which files are merged into all.css/all.js: Files inside subdirectories of the css/js folder comes first; Files in the css/js folder will be merged according to file name ordering (01_a.css, 02_a.css, etc) 



## Using the ZeroFrame API

- Copy [ZeroFrame.coffee](https://github.com/HelloZeroNet/ZeroHello/blob/master/js/lib/ZeroFrame.coffee) to your site's `js/lib/` directory
- Create the file `js/MySite.coffee` :

```coffee
class MySite extends ZeroFrame
	init: ->
		@log "inited!"

	# Wrapper websocket connection ready
	onOpenWebsocket: (e) =>
		@cmd "serverInfo", {}, (serverInfo) =>
			@log "mysite serverInfo response", serverInfo
		@cmd "siteInfo", {}, (siteInfo) =>
			@log "mysite siteInfo response", siteInfo
		@cmd "wrapperNotification", ["done", "Hello World!", 10000]


window.my_site = new MySite()
```

- Add `<script type='text/javascript' src='js/all.js' async></script>` to your index.html
- Load your site on the browser, the CoffeeScript will be auto compiled to JS and merged to all.js
- A 'Hello World!' message should appear
- Check your JavaScript console for debug messages
