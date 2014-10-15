chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var url = tab.url;
	if (url.match(new RegExp("https:\/\/github.com\/.+\/.+\/issues\/.+"))
			|| url.match(new RegExp("https:\/\/github.com\/.+\/.+\/pulls\/.+"))) {
		chrome.pageAction.setIcon({
			'tabId' : tabId,
			'path' : "icon.png"
		});
		chrome.pageAction.show(tabId);
	}
});
