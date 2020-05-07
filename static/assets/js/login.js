var baseUrl = "http://localhost:3500/";

$(document).ready(function() {

    $('#emailLogin').click(function() {
        event.preventDefault();
        var formValid = $("#loginForm").valid();
        console.log("Form valid : " + formValid)
        console.log("Email Login")
        var email = document.getElementById("inputEmail").value;
        var password = document.getElementById("inputPassword").value;
        if (formValid) {
            console.log("Valid input");
            $.ajax({
                type: "POST",
                url: baseUrl + "auth/login",
                contentType: "application/json",
                data: JSON.stringify({
                    "email": email,
                    "password": password
                }),
                success: function(data) {
                    console.log(data);
                    localStorage.token = data.access_token;
                    var x = document.getElementById("invalid_cred");
                    x.style.display = "none";
                    console.log('Got a token from the server! Token: ' + data.access_token);
					if(localStorage.buy){
						window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
					}
					else{
						//window.location = "https://wishmecards.com/";
						window.location.href="index.html";
					}
					
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log("xhr.responseText : " + xhr.responseText);
					console.log(xhr.status);
                    console.log("status : " + status);
                    console.log("error : " + error);
                    if (error == "UNAUTHORIZED") {
                        var x = document.getElementById("invalid_cred");
                        x.style.display = "block";
                    }
                    $loading.hide();
                }
            });
        } else {
            console.log("Invalid input");
        }

    });


    $('#getVisitingCard').click(function() {
        $.ajax({
            type: 'GET',
            url: baseUrl + 'visiting_cards',
            contentType: "application/json",
            beforeSend: function(xhr) {
                if (localStorage.token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
                }
            },
            success: function(data) {
                console.log(JSON.stringify(data));
                alert(JSON.stringify(data));
                alert('Hello ' + data + '! You have successfully accessed to /api/profile.');
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log("xhr.responseText : " + xhr.responseText);
                console.log("status : " + status);
                console.log("error : " + error);
                console.log("err.Message : " + xhr.responseText.error);
                alert(error);
            }
        });
    });
    $('#socialAuth').click(function() {
        $.ajax({
            type: "POST",
            url: baseUrl + "auth/socialauth",
            contentType: "application/json",
            data: JSON.stringify({
                "user_name": "Elavarasan",
                "email": "elavarasan_natarajan@ahoo.com",
                "picture_link": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3166267760083480&height=50&width=50&ext=1590480380&hash=AeR4gImK_vAuhEWz"
            }),
            success: function(data) {
                console.log(data);
                localStorage.token = data.access_token;
                console.log('Got a token from the server! Token: ' + data.access_token);
				if(localStorage.buy){
						window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
					}
					else{
						//window.location = "https://wishmecards.com/";
						window.location.href="index.html"
					}
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log("xhr.responseText : " + xhr.responseText);
                console.log("status : " + status);
                console.log("error : " + error);
                console.log("err.Message : " + xhr.responseText.error);
                console.log(error);
            }
        });
    });
    $('#goodLogin').click(function() {
        $.ajax({
            type: "POST",
            url: baseUrl + "auth/login",
            contentType: "application/json",
            data: JSON.stringify({
                "email": "elavarasan_natarajan@yahoo.com",
                "password": "default"
            }),
            success: function(data) {
                console.log(data);
                localStorage.token = data.access_token;
                alert('Got a token from the server! Token: ' + data.access_token);
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log("xhr.responseText : " + xhr.responseText);
                console.log("status : " + status);
                console.log("error : " + error);
                console.log("err.Message : " + xhr.responseText.error);
                alert(error);
            }
        });
    });
    $('#badLogin').click(function() {
        $.ajax({
            type: "POST",
            url: baseUrl + "auth/login",
            contentType: "application/json",
            data: JSON.stringify({
                "email": "elavarasan_natarajan@yahoo.com",
                "password": "default1"
            }),
            success: function(data) {
                alert("ERROR: it is not supposed to alert.");
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log("xhr.responseText : " + xhr.responseText);
                console.log("status : " + status);
                console.log("error : " + error);
                console.log("err.Message : " + xhr.responseText.error);
                alert(error);
            }
        });
    });
    $('#logout').click(function() {
        localStorage.clear();
    });


    jQuery.validator.setDefaults({
        debug: true,
        success: function(label) {
            label.attr('id', 'valid');
        },
    });
    $("#loginForm").validate({
        messages: {
            inputEmail: {
                required: "Please enter email"
            },
            inputPassword: {
                required: "Please enter password"
            }
        }
    });

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


});