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

exports.login = async ( req, res ) => {

        try {
                const { email, password } = req.body;
                const user = await User.findOne({ email });

                if (!user || password !== user.password) {
                    return res.status(400).json({ message: 'Invalid credentials.' });
                }

                if (password === user.password) {
                    return res.status(200).json({message: "Login successful"})
                }
            
        } catch (error) {
            res.status(500).json({ message: 'user login error' , error });
        }

}