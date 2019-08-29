function login(){
	var username = document.getElementById("User").value //get username input from textbox
	var password = document.getElementById("Password").value //get password input from textbox
	
	$.ajax({
		type: "POST",
		url: URL,
		dataType: "html",
		success: function(msg) {
			var json = msg
			if (json.code=200) { //check if the cod is 200, which means it was sucessful, server sends back token, store token in session, then redirect to homepage
			}
			else {
				//have server print back error message                    
				document.getElementById("maindiv").innerHTML = msg;                
			}
		},    
		error: function() {
			alert("Invalid Combination of Username and Password");
		}
	});	
}