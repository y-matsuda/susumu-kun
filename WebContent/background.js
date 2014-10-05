// Page Action?
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//	if(tab.url.indexOf("github") != -1){
		// Page action show
		chrome.pageAction.show(tabId);
//	}
});



