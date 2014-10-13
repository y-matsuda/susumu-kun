// Page Action?
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//	if(tab.url.indexOf("github") != -1){
	chrome.pageAction.setIcon({
		'tabId': tabId,
		'path': "icon.png"
	});
	// Page action show
		chrome.pageAction.show(tabId);
//	}
});



