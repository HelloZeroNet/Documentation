function applyBitcoinbarData(elem, data) {
	var balance_btc = data.balance/100000000
	var percent = balance_btc / parseFloat(elem.data("goal")) * 100

	// Set the text and create html elements
	elem.html("<div class='bar'></div><div class='text'>"+balance_btc.toFixed(3)+" BTC <span class='goal'>of "+elem.data("goal")+" BTC</span><br><span class='heart'>&#x2665;</span> <u>Donate bitcoin</u><br>Thank you! :)</div>")

	// Set anim later to get anim
	setTimeout(function() {
		$(".bar", elem).css("width", Math.round(percent)+"%")
	}, 10)

	elem.on("click", function() {
		$(".bitcoinbar-addressbar").remove() // Remove previous addressbars

		// Create addressbar after bitcoinbar
		var addressbar = $("<div class='bitcoinbar-addressbar'><input type='text' readonly/><br><a href='"+elem.attr("href")+"'><img src='https://blockchain.info/qr?data="+elem.data("address")+"&size=125' width=125 height=125/></a></div>")
		elem.after(addressbar)

		// Set address to input
		$("input", addressbar).val(elem.data("address"))

		// Init QRcode anim
		$("img", addressbar).css("transform", "rotateX(-90deg)")

		// Focus the input
		setTimeout(function() {
			addressbar.addClass("visible")
			$("input", addressbar).focus()
		},1)

		$("input", addressbar).on("focus", function() { // Select all and show QRcode on focus
			elem.addClass("focus")
			setTimeout(function() {
				$("input", addressbar).select()
				$("img", addressbar).css("transform", "rotateX(0deg)").css("opacity", 1)
			}, 100)
		})
		$("*").on("click", function(e) { // Hide QRcode on outside click
			if ($(e.target).parents(".bitcoinbar-addressbar").length) return // Has .bitcoinbar-addressbar in clicked elem parents, do nothing
			elem.removeClass("focus")
			$("img", addressbar).css("transform", "rotateX(-90deg)").css("opacity", 0)
		})
		return false;
	})
}

function updateBitcoinbars() {
	var addresses = []
	$(".bitcoinbar").each(function() {
		addresses.push("addresses="+$(this).data("address"))
	})
	// Query all address balance in one query
	$.get("https://mainnet.helloblock.io/v1/addresses?"+addresses.join("&"), function(res) { 
		for (var i=0;i<res.data.addresses.length;i++) {
			var address_data = res.data.addresses[i]
			elem = $(".bitcoinbar[data-address="+address_data.address+"]")

			// Apply the data to element
			applyBitcoinbarData(elem, address_data)
		}
	})
	
}

updateBitcoinbars()