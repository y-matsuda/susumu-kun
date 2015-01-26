function init() {
	var githubAccessToken = localStorage.getItem("github_access_token");
	console.log("githubAccessToken:" + githubAccessToken);
	$("#github_access_token").val(githubAccessToken ? githubAccessToken : "");

	var trelloApplicationKey = localStorage.getItem("trello_application_key");
	console.log("trelloApplicationKey:" + trelloApplicationKey);
	$("#trello_application_key").val(
			trelloApplicationKey ? trelloApplicationKey : "");

	var trelloApplicationAccessToken = localStorage
			.getItem("trello_application_access_token");
	console.log("trelloApplicationAccessToken:" + trelloApplicationAccessToken);
	$("#trello_application_access_token").val(
			trelloApplicationAccessToken ? trelloApplicationAccessToken : "");

	var trelloBoardId = localStorage.getItem("trello_board_id");
	console.log("trelloBoardId:" + trelloBoardId);
	$("#trello_board_id").val(trelloBoardId ? trelloBoardId : "");

	var trelloDoingListId = localStorage.getItem("trello_doing_list_id");
	console.log("trelloDoingListId:" + trelloDoingListId);
	$("#trello_doing_list_id").val(trelloDoingListId ? trelloDoingListId : "");

	var trelloAcceptingListId = localStorage
			.getItem("trello_accepting_list_id");
	console.log("trelloAcceptingListId:" + trelloAcceptingListId);
	$("#trello_accepting_list_id").val(
			trelloAcceptingListId ? trelloAcceptingListId : "");

	var trelloReopenListId = localStorage.getItem("trello_reopen_list_id");
	console.log("trelloReopenListId:" + trelloReopenListId);
	$("#trello_reopen_list_id").val(
			trelloReopenListId ? trelloReopenListId : "");

	var trelloDoneListId = localStorage.getItem("trello_done_list_id");
	console.log("trelloDoneListId:" + trelloDoneListId);
	$("#trello_done_list_id").val(trelloDoneListId ? trelloDoneListId : "");
}

function save() {
	localStorage
			.setItem("github_access_token", $("#github_access_token").val());
	localStorage.setItem("trello_application_key", $("#trello_application_key")
			.val());
	localStorage.setItem("trello_application_access_token", $(
			"#trello_application_access_token").val());
	localStorage.setItem("trello_board_id", $("#trello_board_id").val());
	localStorage.setItem("trello_doing_list_id", $("#trello_doing_list_id")
			.val());
	localStorage.setItem("trello_accepting_list_id", $(
			"#trello_accepting_list_id").val());
	localStorage.setItem("trello_reopen_list_id", $("#trello_reopen_list_id")
			.val());
	localStorage
			.setItem("trello_done_list_id", $("#trello_done_list_id").val());
}

var trelloList = new Object();
function findTrelloList() {
	try {
		var findListUrl = "https://trello.com/1/boards/" + getTrelloBoardId()
				+ "/lists?key=" + getTrelloApplicationKey() + "&token="
				+ getTrelloApplicationAccessToken() + "&fields=name";
	} catch (e) {
		throw e;
	}
	$.ajaxSetup({
		async : false
	});
	$.getJSON(findListUrl, null, function(data) {
		for (i in data) {
			var id = data[i].id;
			var name = data[i].name;
			trelloList[id] = name;
			console.log("id:" + id + ", name:" + name);
		}
	});
	$.ajaxSetup({
		async : true
	});
	return trelloList;
}

function getTrelloBoardId() {
	var id = $("#trello_board_id").val();
	if (!id) {
		throw new Error("trelloのボードIDが設定されていません。");
	}
	return id;
}
function getTrelloApplicationKey() {
	var key = $("#trello_application_key").val();
	if (!key) {
		throw new Error("trelloのアプリケーションキーが設定されていません。");
	}
	return key;
}
function getTrelloApplicationAccessToken() {
	var token = $("#trello_application_access_token").val();
	if (!token) {
		throw new Error("trelloのアプリケーションアクセストークンが設定されていません。");
	}
	return token;
}

init();
$("div.btn-group").on("click", function(events) {
	save();
	alert("保存しました。");
});