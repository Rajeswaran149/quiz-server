const express = require("express");
const mongoose = require("mongoose")

require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser:true, useUnifiedTopology:true })
.then(()=> console.log("MongoDB connected"))
.catch((error) => console.log("MongoDB connection error :", error));

app.use("/",(req,res) => {
    res.send("server is running successfull!!..")
})

app.listen( port , (req,res) => {
console.log(`server is running on the port is ${port}...`);
})