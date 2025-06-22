const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//manage user signup
exports.userSignup = async(req, res) => {
    const{username, email, password} = req.body;
    
//password hased 
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({ username,email: email.toLowerCase(), password: hashedPassword});
        await newUser.save();
        res.status(201).json({ message : " User Signup successfully"});
        
    } catch (error) {
        res.status(500).json({message: "Error signup user", error});
    }

};

//controler to login

exports.userLogin = async(req,res) => {
    const{username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({ message: "user is not available"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: "login successfully" ,
            token,
        user:{
            username:user.username,
            email:user.email
        }});
    } catch (error) {
        console.error("lgoin error:", error);
        res.status(500).json({ message: "Error logging in", error});
    }
}

