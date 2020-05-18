//Dependencias
const morgan = require('morgan');
const express= require('express');
const app = express();
//Routes
const pokemon = require('./routes/pokemon')
const User=require('./routes/User');
//Middleware(Ruta por que no esta haciendo gran cosa con el codigo)
const auth =require('./middleware/auth'); 
const notfound =require('./middleware/notfound'); 
const index =require('./middleware/index');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",index);
app.use("/user",User);
app.use(auth);
app.use("/pokemon", pokemon);
app.use(notfound );

app.listen(process.env.PORT || 3000,() =>{
	console.log("Server is running better go catch it ");
});

