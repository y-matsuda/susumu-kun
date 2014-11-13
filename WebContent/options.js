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
}

function save() {
	localStorage
			.setItem("github_access_token", $("#github_access_token").val());
	localStorage.setItem("trello_application_key", $("#trello_application_key")
			.val());
	localStorage.setItem("trello_application_access_token", $(
			"#trello_application_access_token").val());
	localStorage.setItem("trello_board_id", $("#trello_board_id").val());
}

init();
$("div.btn-group").on("click", function(events) {
	save();
});