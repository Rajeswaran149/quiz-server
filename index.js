const express = require("express");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); 

app.use("/",(req,res) => {
    res.send("server is running successfull!!..")
})

app.listen( port , (req,res) => {
console.log(`server is running on the port is ${port}...`);
})