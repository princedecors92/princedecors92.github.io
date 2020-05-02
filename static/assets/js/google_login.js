var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '4894903574-rl2k1hhdbr6br42b9n9t95tr62fiu46c.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('customBtn'));
    });
  };

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
		console.log("Signed in user : "+googleUser.getBasicProfile().getName());
		var profile =  	googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('FirstName: ' + profile.getGivenName());
        console.log('LastName: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());


        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
		
		if(localStorage.buy){
						window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
					}
					else{
						window.location = "https://wishmecards.com/";
					}
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        /*document.getElementsByClassName("userContent")[0].innerHTML = '';
        document.getElementsByClassName("userContent")[0].style.display = "none";
        document.getElementById("gSignIn").style.display = "block";*/
    });
    auth2.disconnect();

}