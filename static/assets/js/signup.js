var baseUrl = "http://localhost:3500/";

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
		  	success:  function(label){
        		label.attr('id', 'valid');
   		 	},
		});
		$( "#myform" ).validate({
		  	rules: {
		    	password: "required",
		    	confirm_password: {
		      		equalTo: "#password"
		    	}
		  	},
		  	messages: {
		  		your_email: {
		  			required: "Please enter email"
		  		},
		  		password: {
	  				required: "Please enter password"
		  		},
		  		confirm_password: {
		  			required: "Please enter confirm password",
		      		equalTo: "Please enter same Password"
		    	}
		  	}
		});
		
		$('#signup').click(function() {
			event.preventDefault();
        var formValid = $("#myform").valid();
        console.log("Form valid : " + formValid)
        console.log("Email Login")
        var email = document.getElementById("your_email").value;
        var password = document.getElementById("password").value;
        if (formValid) {
        $.ajax({
            type: "POST",
            url: baseUrl + "auth/signup",
            contentType: "application/json",
            data: JSON.stringify({
                "email": email,
                "password": password
            }),
            success: function(data) {
                console.log(data);
                localStorage.token = data.token;
                console.log('Got a token from the server! Token: ' + data.token);
				if(localStorage.buy){
						window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
					}
					else{
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
				console.log("xhr.status : "+xhr.status);
				if(xhr.status == 409){
					 var x = document.getElementById("duplicateEmail");
                        x.style.display = "block";
				}else{
					 var x = document.getElementById("serverError");
                        x.style.display = "block";
				}
				
            }
        });
		}else{
			console.log("Invalid form");
		}
			});
		});