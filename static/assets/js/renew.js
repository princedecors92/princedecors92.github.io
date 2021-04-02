


$(document).ready(function () {

	$('#renew').click(function () {
		event.preventDefault();
		 window.open('https://wa.link/bkbpar', '_blank');
	});

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

	jQuery.validator.setDefaults({
		debug: true,
		success: function (label) {
			label.attr('id', 'valid');
		},
	});
	


});