function signup(){
	const username = document.getElementById("User").value //get username input from textbox
	const password = document.getElementById("Password").value //get password input from textbox
	const confirmPass = $('#ConfirmPassword').val();

	console.log(password);
	console.log(confirmPass);
	if (password !== confirmPass){
		$('#maindiv').html('Your passwords do not match');
	} else {
		$.ajax({
			type: "POST",
			url: 'http://localhost:3000/addUser',
			data: {
				username,
				password
			},
			success: function(data) {
				console.log('signed up successfully');
				sessionStorage.setItem('token', data.token);
				window.location = '/home';
			},    
			error: function(err) {
				document.getElementById("maindiv").innerHTML = "That username is already taken";
				console.log(err);
			}
		});
	}	
}