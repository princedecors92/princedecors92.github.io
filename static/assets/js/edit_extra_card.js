var baseUrl = "http://localhost:3500/";


$(document).ready(function () {

	$("#cancelCard").click(function () {
		console.log("Cancel was clicked.");
		window.location = "https://wishmecards.com/";
	});

	$('#myform').submit(function (e) {
		var count = getCount();
		e.preventDefault();
		var data = $(this).serializeFormJSON();
		console.log(data);
		var formValid = $("#myform").valid();
		console.log("Form valid : " + formValid);
		console.log("localStorage.visiting_card_id : "+localStorage.visiting_card_id);
		if (formValid && count >= 1 && localStorage.visiting_card_id) {
			$.ajax({
				type: "PUT",
				url: baseUrl + "visiting_card/"+localStorage.visiting_card_id,
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
					/*if (localStorage.buy) {
						window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
					} else {
						window.location = "https://wishmecards.com/";
					}*/
				},
				error: function (xhr, status, error) {
					console.log("xhr.responseText : " + xhr.responseText);
					console.log("status : " + status);
					console.log("error : " + error);
					console.log(error);
					console.log("xhr.status : " + xhr.status);
					var x = document.getElementById("serverError");
					x.style.display = "block";
				}
			});
		} else {
			console.log("Invalid form");
		}
	});


	(function ($) {
		$.fn.serializeFormJSON = function () {
			var o = {};
			var a = this.serializeArray();
			$.each(a, function () {
				if (o[this.name]) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}
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


	function getCount() {
		var count = 0;
		$('#myform *').filter(':input').each(function () {
			console.log(this.name + ': ' + this.value);
			if (this.value && this.value != 'Submit' && this.value != 'Cancel') {
				count++;
			}
		});
		var x = document.getElementById("serverError");
		x.style.display = "none";

		console.log("Count : " + count);
		if (count >= 1) {
			console.log("Form is valid");
			var x = document.getElementById("atleastOne");
			x.style.display = "none";
		} else {
			console.log("Atleast enter one field");
			var x = document.getElementById("atleastOne");
			x.style.display = "block";
		}
		return count;
	}
});