const jwt = require('jsonwebtoken');

const { sendMail } = require('../services/email');
const User = require('./../models/user'); 
const user = require('./../models/user');

async function signUp (req, res) {
    const {name, username, email, password} = req.body; 
    try {
        const newUser = new User({name, username, email, password}); 
        if(!(name && username && email && password)) {
            return res.status(400).json({
                success : 'failed', 
                message : 'invalid data',
            }); 
        }
        const user = await newUser.save(); 
        delete user.password; 

        await sendMail(email); 
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn : 60 * 60}); 

        return res.status(200).json({
            success : 'ok', 
            message : "User Registered successfully", 
            token : token,
        })
    }
    catch(err) {
        console.log(err.message)
        return res.status(500).json({
            success : 'failed',
            message : err?.message ?? 'Internal Server error',
        })
    }
}

const verifyEmail = async (req, res) => {
    const {token} = req.query.token; 
    console.log(token); 
    let userId; 
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            console.log(err); 
            return res.status(401).json({success : 'failed', message : 'Unauthorized'})
        }
        userId = decoded.user_id;
    });

    try{
        const user = await User.findbyId(userId); 
        user.isEmailVerified = true; 
        await user.save(); 
        return res.send('<h1> Email confirmed </h1>'); 
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({
            success : 'failed',
            message : err?.message ?? 'Internal Server error',
        }) 
    }
}

module.exports = {
    signUp, 
    verifyEmail,
}