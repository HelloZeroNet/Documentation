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