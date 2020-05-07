var baseUrl = "http://localhost:3500/";

(function($) {
    $.fn.serializeFormJSON = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
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
    .ajaxStart(function() {
        $loading.show();
        console.log("ajax start");
    })
    .ajaxStop(function() {
        $loading.hide();
        console.log("ajax stop");
    });

$(document).ready(function() {


    jQuery.validator.setDefaults({
        debug: true,
        success: function(label) {
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
        url: baseUrl+'visiting_cards',
        contentType: "application/json",
        beforeSend: function(xhr) {
          if (localStorage.token) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
          }
        },
        success: function(data) {
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(data));
        console.log('Hello ' + data + '! You have successfully accessed to /api/profile.');
		
        },
        error: function() {
          console.log("Sorry, you are not logged in.");
		  
        }
      });
    }
	
	
    $('#myform').submit(function(e) {
        e.preventDefault();
        var data = $(this).serializeFormJSON();
        console.log(data);
        var formValid = $("#myform").valid();
        console.log("Form valid : " + formValid)
        if (formValid) {
            $.ajax({
                type: "POST",
                url: baseUrl + "visiting_cards",
                contentType: "application/json",
                data: data,
                beforeSend: function(xhr) {
                    if (localStorage.token) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
                    }
                },
                success: function(data) {
                    console.log(data);
                    console.log('Visiting card response : ' + data);
                    if (localStorage.buy) {
                        window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
                    } else {
                        window.location = "https://wishmecards.com/";
                    }
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log("xhr.responseText : " + xhr.responseText);
                    console.log("status : " + status);
                    console.log("error : " + error);
                    console.log("err.Message : " + xhr.responseText.error);
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
});