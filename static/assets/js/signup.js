
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