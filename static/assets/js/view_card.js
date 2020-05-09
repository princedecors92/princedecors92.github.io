var baseUrl = "http://localhost:3500/";

$(document).ready(function () {
	console.log("On Load call get card api " + localStorage.visiting_card_id, );
	if (localStorage.token) {
		console.log("user is logged in : " + localStorage.token);
	} else {
		console.log("user is not logged in redirect to login : " + localStorage.token);
		window.location = "login.html";
	}
	//below code will create a dummy card if not created or will get the card details if already created
	$.ajax({
		type: 'GET',
		url: baseUrl + 'visiting_card/' + localStorage.visiting_card_id,
		contentType: "application/json",
		beforeSend: function (xhr) {
			if (localStorage.token) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
			}
		},
		success: function (data) {
			console.log(JSON.stringify(data));
			localStorage.visiting_card_id = Object.values(data._id)
			console.log('Visiting exist or created Visiting Card ID : ' + Object.values(data._id));

			var resultJson = data;
			delete resultJson["_id"];
			delete resultJson["added_by"];
			delete resultJson["created"];
			name.innerText = "public offers";
			$("#user_name").text(toTitleCase(resultJson["user_name"]));
			$("#facebook_link").attr("href", toTitleCase(resultJson["facebook_link"]));
			console.log("Result json ");
			console.log(resultJson);
			//$('#myform').populate(resultJson);
		},
		error: function (xhr, status, error) {
			console.log(xhr);
			var err = JSON.parse(xhr.responseText);
			console.log("xhr.responseText : " + xhr.responseText);
			console.log("error message : " + err.error);
			console.log(xhr.status);
			console.log("status : " + status);
			console.log("error : " + error);
		}
	});

	function toTitleCase(str) {
		return str.replace(/(?:^|\s)\w/g, function (match) {
			return match.toUpperCase();
		});
	}
});