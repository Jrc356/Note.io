function signup(){
	var username = document.getElementById("User").value //get username input from textbox
	var password = document.getElementById("Password").value //get password input from textbox
	
	$.ajax({
		type: "POST",
		url: 'http://localhost:3000/addUser',
		data: {
			username,
			password
		},
		success: function(data) {
			sessionStorage.setItem(data.token);
			window.location = '/home';
		},    
		error: function(err) {
			document.getElementById("maindiv").innerHTML = "Invalid Combination of Username and Password";
			console.log(err);
		}
	});	
}