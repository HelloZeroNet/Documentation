# Example usage of ZeroFrame API

 - Start ZeroNet using `zeronet.py --debug` to use automatic js and css merge/compile
 - Copy [ZeroFrame.coffee](https://github.com/HelloZeroNet/ZeroHello/blob/master/js/lib/ZeroFrame.coffee) to your site's `js/` directory
 - Create a `js/MySite.coffee` :
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
 - Check your javascript console for debug messages
