# Extra features in --debug mode
 - Debug messages appears in console
 - Auto reload the most some source files (UiRequest, UiWebsocket, FileRequest) on modification to prevent restarting (Not works in linux, requires https://code.google.com/p/pyfilesystem/)
 - On `all.css` request in a `own: true` site: Merge all css file in directory, auto vendor prefix browser specific features
 - On `all.js` request in a `own: true` site: Merge all js file in directory, convert .coffee to .js if compiler is present (bundled for windows)
 - http://127.0.01:43110/Debug: Traceback and interactive python console at last error position using the wonderful werkzeug debugger. (Requires http://werkzeug.pocoo.org/)
 - http://127.0.01:43110/Console: Spawns an interactive python console (Requires http://werkzeug.pocoo.org/)

---

## Example usage of [[ZeroFrame API|ZeroFrame-API-reference-documentation]]
 - Start ZeroNet using `zeronet.py --debug` to use automatic js and css merge/compile
 - Copy [ZeroFrame.coffee](https://github.com/HelloZeroNet/ZeroHello/blob/master/js/lib/ZeroFrame.coffee) to your site's js directory
 - Create a js/MySite.coffee:
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
 - Add `<script type="text/javascript" src="js/all.js" asyc></script>` to your index.html
 - Load your site, the coffee script will be auto compiled to js and merged to all.js


# Coding standards if you want to modify the source code
 - Use tabs instead of spaces (tab size: 4)
 - Comments starts with # Capitalized word 
 - Simple is better than complex
 - Premature optimization is the root of all evil

### Naming
 - ClassNames: Capitalized, CamelCased
 - functionNames: starts with lowercase, camelCased
 - variable_names: lowercased, under_scored

### Variables
 - file_path: File path realtive to working dir (data/17ib6teRqdVgjB698T4cD1zDXKgPqpkrMg/css/all.css)
 - inner_path: File relative to site dir (css/all.css)
 - file_name: all.css
 - file: Python file object
 - privatekey: Private key for the site (without _)

### Source files directories and naming
 - One class per file is preferred
 - Source file name and directory comes from ClassName: WorkerManager class = Worker/WorkerManager.py 
