const express = require("express");
const mongoose = require("mongoose")
const userRouter = require("./src/routes/userRouter")
const quizRouter = require("./src/routes/quizRouter");
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); 
app.use(cors({origin:"*"}));

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser:true, useUnifiedTopology:true })
.then(()=> console.log("MongoDB connected"))
.catch((error) => console.log("MongoDB connection error :", error));

app.use("/api/user" , userRouter);
app.use("/api/mcq" , quizRouter);


app.use("/",(req,res) => {
    res.send("server is running successfull!!..")
})
app.listen( port , (req,res) => {
console.log(`Server is running on  port is ${port}...`);
})