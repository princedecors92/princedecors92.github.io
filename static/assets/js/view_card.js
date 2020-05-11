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

			var user_name = data.user_name;
			var email = data.email;
			var mobile_no = data.mobile_no;
			var company_name = data.company_name;
			var designation = data.designation;
			var company_link = data.company_link;
			var company_address = data.company_address;
			var services_provided = data.services_provided;
			var facebook_link = data.facebook_link;
			var messenger_link = data.messenger_link;
			var twitter_link = data.twitter_link;
			var linkedin_link = data.linkedin_link;
			var instagram_link = data.instagram_link;
			var youtube_link = data.youtube_link;
			var payment_link = data.payment_link;
			var other_payment_link = data.other_payment_link;
			var google_map_link = data.google_map_link;
			var profile_picture_link = data.profile_picture_link;
			
			if(data.profile_picture_exist){
				console.log("profile picture exist image_ref_id data.profile_picture_exist "+data.profile_picture_exist);
				$("#profile_picture_link").attr("src",baseUrl+"display_image/"+localStorage.visiting_card_id);
			}else{
				console.log("no profile picture exist data.profile_picture_exist  image_ref_id "+data.profile_picture_exist);
			}

			$("#user_name").text(toTitleCase(user_name));
			$("#email").attr("href", "mailto:" + email + "?Subject=Hello");
			$("#mobile_no").attr("href", "tel:+91" + mobile_no);
			$('#company_name').text(company_name.toUpperCase());
			$('#designation').text(designation.toUpperCase())
			$("#whatsapp_link").attr("href", "https://api.whatsapp.com/send?phone=+91" + mobile_no);
			$("#company_link").attr("href", company_link);
			$("#messenger_link").attr("href", messenger_link);
			$("#facebook_link").attr("href", facebook_link);
			$("#twitter_link").attr("href", twitter_link);
			$("#linkedin_link").attr("href", linkedin_link);
			$("#instagram_link").attr("href", instagram_link);
			$("#youtube_link").attr("href", youtube_link);
			$("#payment_link").attr("href", payment_link);
			$("#other_payment_link").attr("href", other_payment_link);
			$("#google_map_link").attr("href", google_map_link);

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