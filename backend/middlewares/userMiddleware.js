const User = require('../models/User');

// middleware to  check vlaidation for signup request and check for user existence

const validateSignup = async (req, res, next) => {
    const { username , email, password} = req.body;

    //validation of request body

    //if username is not enter
    if(!username || typeof username !== "string" || username.trim().length < 3) {
        return res.status(400).json({ message: " Username is required "});

    }
    //if email is not enter 

    if(!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({message: "email is required"});
    }

    //if password is not enter
    if(!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ message: "password is required and must be at least 6 digit"});

    }

    //check if user is exist or  not 
    try {
        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(409).json({ message: "Username already exist"});

        }
  
        const existingUserByEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingUserByEmail) {
      return res.status(409).json({ message: 'Email already registered' });
    }

        next(); // proceed next , if all is good

        
    } catch (error){
        console.error('Error in signup', error);
        res.status(500).json({ message:'server error'});
    }
};

//check validation for a login request body

const validateLogin = (req, res, next) => {
    const { username, password } = req.body;

    //username  is required condition
    if(!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({message: 'username is required'});

    }

    //pasword validation
    if(!password || typeof password !== 'string' || password === ''){
        return res.status(400).json({message:'password is required'});

    }
    //valid input proceed next
    next();

};

module.exports ={
    validateSignup,validateLogin
};