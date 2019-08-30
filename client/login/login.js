function login(){
	var username = document.getElementById("User").value //get username input from textbox
	var password = document.getElementById("Password").value //get password input from textbox
	
	$.ajax({
		type: "POST",
		url: 'http://localhost:3000/auth',
		data: {
			username,
			password
		},
		success: function(data) {                    
			if(data.token === "ERROR") {
				alert("Invalid Combination of Username and Password");
			} else {
				sessionStorage.setItem('token', data.token);
				window.location = '/home';
			}                
		},    
		error: function() {
			alert("SOMETHING WENT WRONG");
		}
	});	
}