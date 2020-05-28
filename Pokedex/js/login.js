window.onload = init;

function init() {
	if(!localStorage.getItem("token")){
	document.querySelector('.btn-secondary').addEventListener('click',function(){
		window.location.href= "signin.html"
	});

document.querySelector('.btn-primary').addEventListener('click',login);
	}
	else{
		window.location.href= "pokedex.html";
	}
}

function login(){
	var email = document.getElementById('input-mail').value;
	var pass = document.getElementById('input-password').value;

	axios({
		method:'post',
		url:'http://localhost:3000/user/login',
		data:{
			User_email: email,
			User_password:pass
		}
	}).then(function(res){
		if(res.data.code === 200){
			localStorage.setItem("token",res.data.message);
			window.location.href = "pokedex.html"
		}
		else{
			alert("usuario y o contraseña incorrectos");
		}
	}).catch(function(err){
		console.log(err);
	})

	} 
		
		