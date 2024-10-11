const User = require("../models/userModel");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken")
require('dotenv').config();

exports.register = async ( req,res ) => {
    const { email , password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword})
        
        await newUser.save();
        res.status(201).json({ message:'User register Successfully' })
    } catch (error) {
     res.status(500).json({ message: 'User registration error', error } )   
    }
}

exports.login = async ( req, res ) => {

        try {
                const { email, password } = req.body;
                const user = await User.findOne({ email });

                if (!user || !(await bcrypt.compare(password, user.password))) {
                    return res.status(400).json({ message: 'Invalid credentials.' });
                }
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token , message:"login successfull" });

                
            } catch (error) {
                res.status(500).json({ message: 'user login error' , error });
            }

}