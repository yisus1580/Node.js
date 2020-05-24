const express = require('express');
const jwt= require('jsonwebtoken');
const User = express.Router(); 
const db =require('../config/database');

User.post("/signin",async(req, res, next)=>{
	const{User_name,User_email,User_password} = req.body

	if (User_name&&User_email&&User_password) {
	let  query = "INSERT INTO User(User_name, User_email, User_password)";
	query += `VALUES ('${User_name}', '${User_email}', '${User_password}');`;
	const rows= await db.query(query);

	if (rows.affectedRows ==1){
		return res.status (201).json({code:201 , message:"Usuario registrado completamente"});
	}
		return res.status (500).json({code:500, message:"Ocurrio un error "});
	}		
	return res.status (500).json({code:500, message:"Campos  incompletos "});
});

User.post("/login", async(req, res, next) =>{
	const{ User_email, User_password }= req.body;
	const query=`SELECT * FROM User WHERE User_email = '${User_email}' AND User_password= '${User_password}';`;
	const rows = await db.query(query);

	if (User_email&&User_password) {
	if (rows.length == 1) {
		const token= jwt.sign({
			User_id: rows[0].User_id,
			User_email: rows[0].User_email
		},"debugkey");
		return res.status(200).json({ code: 200,message: token});
	} 
	else{ 
		return res.status(200).json({code: 401,message:"Usuario y/o contraseña incorrecta"});
	 }
	}
	return res.status (500).json({code:500, message:"Campos  incompletos "});
});

User.get("/",async(req, res, next) =>{
  const query = "SELECT * FROM User ";
  const rows = await db.query(query);
  return res.status(200).json({code:200 , message: rows});
});

module.exports = User;