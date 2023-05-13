const username_field = document.getElementById('username');
const password_field = document.getElementById('password');
const email_field = document.getElementById('email');
const confirm_password_field = document.getElementById('confirm_password');
const Btn = document.getElementById('regBtn');

function clear_form(){
	username_field.value = '';
	password_field.value='';
	confirm_password_field.value='';
}

Btn.addEventListener("click", async function(event){
	event.preventDefault();
	var username = username_field.value;
	var username = email_field.value;
	var password = password_field.value;
	var confirm_password = confirm_password_field.value;
	if(password !== confirm_password ){
		alert("password missmatch");
		clear_form();
		return;
	}

	if(username.length <= 4 || username.length >= 25){
			alert("Username must be between 4 and 25 characters.");
		 	clear_form();
			return;
	}

	if(password.length <= 4 || password.length >= 25){
		alert("Password must be between 4 and 25 characters.");
		clear_form();
		return;
	}
	var res = await fetch("/auth/register", {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		headers: {
		  "Content-Type": "application/json",
		  // 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({"name":username_field.value, "email":email_field.value, "password":password_field.value}) // body data type must match "Content-Type" header
	  });
	
    console.log(res);
})
