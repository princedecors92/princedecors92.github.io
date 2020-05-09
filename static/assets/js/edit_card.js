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
		type: 'POST',
		url: baseUrl + 'visiting_cards',
		contentType: "application/json",
		data: JSON.stringify({
			"user_name": "",
			"email": "",
			"mobile_no": "",
			"company_name": "",
			"designation": "",
			"services_provided": "",
			"company_link": "",
			"company_address": "",
			"facebook_link": "",
			"messenger_link": "",
			"twitter_link": "",
			"linkedin_link": "",
			"instagram_link": "",
			"youtube_link": "",
			"payment_link": "",
			"other_payment_link": "",
			"google_map_link": ""
		}),
		beforeSend: function (xhr) {
			if (localStorage.token) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
			}
		},
		success: function (data) {
			console.log(JSON.stringify(data));
			localStorage.visiting_card_id = Object.values(data._id)
			console.log('Visiting exist or created Visiting Card ID : ' + Object.values(data._id));
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
});

$(document).ready(function () {
	$("#cancelCard").click(function () {
		console.log("Cancel was clicked.");
		window.location = "https://wishmecards.com/";
	});


	$('#myform').submit(function (e) {
		e.preventDefault();
		var data = $(this).serializeFormJSON();
		console.log("Request data&&&&&&&&&&77");
		console.log(data);
		var formValid = $("#myform").valid();
		console.log("Form valid : " + formValid);
		if (formValid) {
			$.ajax({
				type: "PUT",
				url: baseUrl + "visiting_card/" + localStorage.visiting_card_id,
				contentType: "application/json",
				data: data,
				beforeSend: function (xhr) {
					if (localStorage.token) {
						xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
					}
				},
				success: function (data) {
					console.log(data);
					console.log('Visiting card response : ' + data);
					//go to next page 
					//window.location="editExtraCard.html";
					if (localStorage.buy) {
						//window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
					} else {
						//window.location = "https://wishmecards.com/";
					}
				},
				error: function (xhr, status, error) {
					console.log(xhr);
					var err = JSON.parse(xhr.responseText);
					console.log("xhr.responseText : " + xhr.responseText);
					console.log("status : " + status);
					console.log("error : " + error);
					console.log("err.Message : " + err.error);
					console.log(error);
					console.log("xhr.status : " + xhr.status);
					if (xhr.status == 409) {
						var x = document.getElementById("duplicateEmail");
						x.style.display = "block";
					} else {
						var x = document.getElementById("serverError");
						x.style.display = "block";
					}

				}
			});
		} else {
			console.log("Invalid form");
		}
	});

	function createDummyCard() {
		$.ajax({
			type: 'POST',
			url: baseUrl + 'visiting_cards',
			contentType: "application/json",
			data: JSON.stringify({
				"user_name": "",
				"email": "",
				"mobile_no": "",
				"company_name": "",
				"designation": "",
				"services_provided": "",
				"company_link": "",
				"company_address": "",
				"facebook_link": "",
				"messenger_link": "",
				"twitter_link": "",
				"linkedin_link": "",
				"instagram_link": "",
				"youtube_link": "",
				"payment_link": "",
				"other_payment_link": "",
				"google_map_link": ""
			}),
			beforeSend: function (xhr) {
				if (localStorage.token) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
				}
			},
			success: function (data) {
				console.log(JSON.stringify(data));
				alert(JSON.stringify(data));
				alert('Hello ' + data + '! You have successfully accessed to /api/profile.');
			},
			error: function (xhr, status, error) {
				var err = JSON.parse(xhr.responseText);
				console.log("xhr.responseText : " + xhr.responseText);
				console.log("error message : " + err.error);
				console.log(xhr.status);
				console.log("status : " + status);
				console.log("error : " + error);
			}
		});
	}

	jQuery.validator.setDefaults({
		debug: true,
		success: function (label) {
			label.attr('id', 'valid');
		},
	});
	$("#myform").validate({
		messages: {
			user_name: {
				required: "Please enter email"
			},
			designation: {
				required: "Please enter password"
			},
			company_name: {
				required: "Please enter company name"
			},
			email: {
				required: "Please enter email"
			},
			mobile_no: {
				required: "Please enter mobile number"
			}
		}
	});


	function getVisitingCard() {
		$.ajax({
			type: 'GET',
			url: baseUrl + 'visiting_cards',
			contentType: "application/json",
			beforeSend: function (xhr) {
				if (localStorage.token) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
				}
			},
			success: function (data) {
				console.log(JSON.stringify(data));
				console.log(JSON.stringify(data));
				console.log('Hello ' + data + '! You have successfully accessed to /api/profile.');

			},
			error: function () {
				console.log("Sorry, you are not logged in.");

			}
		});
	}


	$("#cancelCard").click(function () {
		console.log("cancelCard was clicked.");
		window.location = "viewCard.html";

	});

	(function ($) {
		$.fn.serializeFormJSON = function () {
			var o = {};
			var a = this.serializeArray();
			$.each(a, function () {
				if(this.value){
				if (o[this.name]) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}}
			});
			return JSON.stringify(o);
		};
	})(jQuery);

	var $loading = $('#loader').hide();
	$(document)
		.ajaxStart(function () {
			$loading.show();
			console.log("ajax start");
		})
		.ajaxStop(function () {
			$loading.hide();
			console.log("ajax stop");
		});

});