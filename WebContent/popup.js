function changeLabel(label) {
	console.log("label is " + label);
	var labelUrl = "https://api.github.com/repos/" + $("#owner").val() + "/"
			+ $("#repo").val() + "/issues/" + $("#issues_number").val()
			+ "/labels?access_token=" + $("#github_access_token").val();

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
				console.log("put is success");
			},
			error : function(data) {
				console.log("put is not success");
			}
		});
	})

}

$("div.btn-group").on("click", function(events) {
	console.log("buttons clicked");
	changeLabel($(events.target).children(':first-child').val());
});
