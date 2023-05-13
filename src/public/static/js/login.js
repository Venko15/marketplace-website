const username_field = document.getElementById('username');
const password_field = document.getElementById('password');

const Btn = document.getElementById('logBtn');

function clear_form(){
	username_field.value = '';
	password_field.value='';
	confirm_password_field.value='';
}

Btn.addEventListener("click", async function(event){
	event.preventDefault();
	var username = username_field.value;
	var password = password_field.value;

	
	var promise = await fetch("/auth/login", {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		headers: {
		  "Content-Type": "application/json",
		  // 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({"name":username_field.value, "password":password_field.value}) // body data type must match "Content-Type" header
	  })
	  var fullResp = {code: promise.status, message: Promise.resolve(promise.text())};
	  console.log(fullResp);
	  
	
})
