chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.match(issueUrlRegularExpression)) {
		chrome.pageAction.setIcon({
			'tabId' : tabId,
			'path' : "icon.png"
		});
		chrome.pageAction.show(tabId);
	}
});
