function init() {
	var githubAccessToken = localStorage.getItem("github_access_token");
	console.log("githubAccessToken:" + githubAccessToken);
	$("#github_access_token").val(githubAccessToken ? githubAccessToken : "");
}

function save() {
	localStorage.setItem("github_access_token", $("#github_access_token").val());
}

init();
$("div.btn-group").on("click", function(events) {
	save();
});