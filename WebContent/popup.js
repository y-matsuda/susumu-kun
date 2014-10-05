changeLabel(label)
{
	var labelUrl = "https://api.github.com/repos/" + $("#owner").val() + "/"
			+ $("#repo").val() + "/issues/" + $("#issues_number").val()
			+ "/labels?access_token=" + $("#github_access_token").val();

	var isSuccess = true;

	// 進捗に関係するすべてのラベルを外す
	var deleteLabels = [ 'doing', 'accepting', 'reopen', 'done' ];
	$.ajax({
		type : "put",
		url : deleteLabels,
		data : JSON.stringify(labels),
		dataType : 'JSON',
		success : function(data) {
			isSuccess = true;
		},
		error : function(data) {
			isSuccess = false;
		}
	});

	// ラベルを交換する ここから
	var labels = [ label ];
	$.ajax({
		type : "post",
		url : labelUrl,
		data : JSON.stringify(labels),
		dataType : 'JSON',
		success : function(data) {
			if (isSuccess) {
				isSuccess = true;
			}
		},
		error : function(data) {
			if (isSuccess) {
				isSuccess = false;
			}
		}
	});

	if (isSuccess) {
		alert("success");
	} else {
		alert("error");
	}

}

$(document).ready(function() {
	$("input:radio").click(function() {
		changeLabel($("input:radio[name='radio_group']:checked").val());
	});
});
