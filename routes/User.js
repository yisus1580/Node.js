const express = require('express');
const User = express.Router(); 
const db =require('../config/database');

User.post("",async(req, res, next)=>{
	const{User_name,User_email,User_password} = req.body

	if (User_name&&User_email&&User_password) {
	let  query = "INSERT INTO User(User_name, User_email, User_password)"
	query += `VALUES ('${User_name}', '${User_email}', '${User_password}')`;
	const rows= await db.query(query);

	if (rows.affectedRows ==1){
		return res.status (201).json({code:201 , message:"Usuario registrado completamente"});
	}
		return res.status (500).json({code:500, message:"Ocurrio un error "});
	}		
	return res.status (500).json({code:500, message:"Campos  incompletos "});
});

User.get("/",async(req, res, next) =>{
  const query = "SELECT * FROM User ";
  const rows = await db.query(query);
  return res.status(200).json({code:201 , message: rows});
});

module.exports = User;