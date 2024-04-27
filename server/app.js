const express= require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
require("./db/connection")

const PORT= process.env.PORT||8000
const app= express();
const user = require("./router/user")
const session = require("./router/session")
app.use(express.json())
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({  extended: false }));
app.use(cors());
app.use("/user",user);
app.use("/session",session);
app.get("/",(req,res)=>{
    res.send("Hello")
})
app.listen(PORT,()=>{
    console.log("app is running 9000");
})