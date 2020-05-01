var baseUrl = "http://localhost:3500/";
$(document).ready(function() {


	$('#emailLogin').click(function() {
		//event.preventDefault();
		var formValid = $("#emailLoginForm").valid();
		console.log("Form valid : "+formValid)
		var email = document.getElementById("inputEmail").value;
		var password = document.getElementById("inputPassword").value;
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
                localStorage.token = data.token;
                alert('Got a token from the server! Token: ' + data.token);
            },
            error: function(xhr, status, error) {
				var err = eval("(" + xhr.responseText + ")");
				console.log("xhr.responseText : "+xhr.responseText);
				console.log("status : "+status);
				console.log("error : "+error);
				console.log("err.Message : "+xhr.responseText.data);
				alert(error);
				}
        });
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
				console.log("xhr.responseText : "+xhr.responseText);
				console.log("status : "+status);
				console.log("error : "+error);
				console.log("err.Message : "+xhr.responseText.error);
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
                localStorage.token = data.token;
                alert('Got a token from the server! Token: ' + data.token);
            },
            error: function(xhr, status, error) {
				var err = eval("(" + xhr.responseText + ")");
				console.log("xhr.responseText : "+xhr.responseText);
				console.log("status : "+status);
				console.log("error : "+error);
				console.log("err.Message : "+xhr.responseText.error);
				alert(error);
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
                localStorage.token = data.token;
                alert('Got a token from the server! Token: ' + data.token);
            },
            error: function(xhr, status, error) {
				var err = eval("(" + xhr.responseText + ")");
				console.log("xhr.responseText : "+xhr.responseText);
				console.log("status : "+status);
				console.log("error : "+error);
				console.log("err.Message : "+xhr.responseText.error);
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
				console.log("xhr.responseText : "+xhr.responseText);
				console.log("status : "+status);
				console.log("error : "+error);
				console.log("err.Message : "+xhr.responseText.error);
				alert(error);
				}
        });
    });
    $('#logout').click(function() {
        localStorage.clear();
    });
});