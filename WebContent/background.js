var githubUrl = "";
var issueUrlRegularExpression = new RegExp("https:\/\/github.com\/(.+)\/(.+)\/(issues|pulls)\/(.+)");

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var url = tab.url;
	console.log("tab.url:" + url);
	if (url.match(issueUrlRegularExpression)) {
		this.url = url;
		chrome.pageAction.setIcon({
			'tabId' : tabId,
			'path' : "icon.png"
		});
		chrome.pageAction.show(tabId);
	}
});

function getGithubUrl() {
	return this.url;
}

function getGithubOwner() {
	return this.url.match(issueUrlRegularExpression)[1];
}

function getGithubRepo() {
	return this.url.match(issueUrlRegularExpression)[2];
}

function getGithubIssuesNumber() {
	return this.url.match(issueUrlRegularExpression)[4];
}