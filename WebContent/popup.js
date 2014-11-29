var issueUrlRegularExpression = new RegExp(
		"https:\/\/github.com\/(.+)\/(.+)\/(issues|pull)\/(.+)");
var githubUrl = "";

function moveCard(val) {
	try {
		var listId = getListId(val);
		var moveCardUrl = "https://api.trello.com/1/cards/" + findCard()
				+ "/idList?key=" + getTrelloApplicationKey() + "&token="
				+ getTrelloApplicationAccessToken() + "&value=" + listId;
	} catch (e) {
		alert("カードの移動に失敗しました。\n\n" + e.toLocaleString());
		return;
	}
	$.ajax({
		type : "put",
		url : moveCardUrl,
		data : null,
		dataType : 'JSON',
		success : function(data) {
			alert("カードを移動しました。");
		},
		error : function(data) {
			alert("カードの移動に失敗しました。");
		}
	});
}

function findCard() {
	try {
		var findCardUrl = "https://api.trello.com/1/boards/"
				+ getTrelloBoardId() + "/cards?fields=desc&key="
				+ getTrelloApplicationKey() + "&token="
				+ getTrelloApplicationAccessToken();
	} catch (e) {
		throw e;
	}
	var descRegularExpression = new RegExp(".*https:\/\/github.com\/"
			+ getGithubOwner() + "\/" + getGithubRepo() + "\/(issues|pull)\/"
			+ getGithubIssuesNumber() + ".*");
	var cardId = null;
	$.ajaxSetup({
		async : false
	});
	$.getJSON(findCardUrl, null, function(data) {
		for (i in data) {
			if (data[i].desc.match(descRegularExpression)) {
				cardId = data[i].id;
				console.log("cardId:" + cardId);
				break;
			}
		}
	});
	$.ajaxSetup({
		async : true
	});
	return cardId;
}

function changeLabel(label) {
	console.log("label is " + label);
	try {
		var labelUrl = "https://api.github.com/repos/" + getGithubOwner() + "/"
				+ getGithubRepo() + "/issues/" + getGithubIssuesNumber()
				+ "/labels?access_token=" + getGithubAccessToken();
	} catch (e) {
		alert("ラベルの変更に失敗しました。\n\n" + e.toLocaleString());
		return;
	}
	var stateLabels = [ 'doing', 'accepting', 'reopen', 'done' ];
	var putLabels = [ label ];

	$.when($.getJSON(labelUrl, null, function(data, status) {
		for (i in data) {
			var labelName = data[i].name;
			if ($.inArray(labelName, stateLabels) == -1) {
				putLabels.push(labelName);
			}
		}
	})).then(function() {
		$.ajax({
			type : "put",
			url : labelUrl,
			data : JSON.stringify(putLabels),
			dataType : 'JSON',
			success : function(data) {
				alert("ラベルを変更しました。");
			},
			error : function(data) {
				alert("ラベルの変更に失敗しました。");
			}
		});
	});
}

function getGithubUrl() {
	chrome.windows.getCurrent(function(window) {
		chrome.tabs.getSelected(window.id, function(tab) {
			console.log(tab.url);
			githubUrl = tab.url;
		});
	});
}

function getGithubOwner() {
	return githubUrl.match(issueUrlRegularExpression)[1];
}

function getGithubRepo() {
	return githubUrl.match(issueUrlRegularExpression)[2];
}

function getGithubIssuesNumber() {
	return githubUrl.match(issueUrlRegularExpression)[4];
}

function getGithubAccessToken() {
	var token = localStorage.getItem("github_access_token");
	if (!token) {
		throw new Error("githubのアクセストークンが設定されていません。");
	}
	return token;
}

function getTrelloBoardId() {
	var id = localStorage.getItem("trello_board_id");
	if (!id) {
		throw new Error("trelloのボードIDが設定されていません。");
	}
	return id;
}
function getTrelloApplicationKey() {
	var key = localStorage.getItem("trello_application_key");
	if (!key) {
		throw new Error("trelloのアプリケーションキーが設定されていません。");
	}
	return key;
}
function getTrelloApplicationAccessToken() {
	var token = localStorage.getItem("trello_application_access_token");
	if (!token) {
		throw new Error("trelloのアプリケーションアクセストークンが設定されていません。");
	}
	return token;
}

function getListId(val) {
	var listId = localStorage.getItem("trello_" + val + "_list_id");
	if (!listId) {
		throw new Error("「" + val + "」のlistIDが設定されていません。");
	}
	return listId;
}

getGithubUrl();
$("div.btn-group").on("click", function(events) {
	console.log("buttons clicked");
	var val = $(events.target).children(':first-child').val();
	changeLabel(val);
	moveCard(val);
});