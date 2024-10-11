const User = require("../models/userModel");


exports.register = async ( req,res ) => {
    const { email , password } = req.body;
    try {
        const newUser = new User({ email,password });
        await newUser.save();
        res.status(201).json({ message:'User register Successfully' })
    } catch (error) {
     res.status(500).json({ message: 'User registration error', error } )   
    }
}