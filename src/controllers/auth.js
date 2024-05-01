const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

const { sendMail } = require('../services/email');
const User = require('./../models/user'); 

async function signUp (req, res) {
    const {name, username, email, password} = req.body; 
    try {
        const hashedPassword = bcrypt.hashSync(password, 10); 
        const newUser = new User({name, username, email, password : hashedPassword}); 
        if(!(name && username && email && password)) {
            return res.status(400).json({
                success : 'failed', 
                message : 'invalid data',
            }); 
        }
        const user = await newUser.save(); 
        delete user.password; 

        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn : '24h'}); 

        await sendMail(email, "email-confirmation", token); 

        return res.status(200).json({
            success : 'ok', 
            message : "User Registered successfully", 
            token : token,
        })
    }
    catch(err) {
        return res.status(500).json({
            success : 'failed',
            message : err?.message ?? 'Internal Server error',
        })
    }
}

const verifyEmail = async (req, res) => {
    const token = req.query.token; 
    let userId; 
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            throw new Error('Unauthorized token'); 
        }
        userId = decoded?.userId;
    });

    try{
        const user = await User.findById(userId); 
        user.isEmailVerified = true; 
        await user.save(); 
        await sendMail(user.email, 'thank-you'); 
        return res.status(200).redirect('https://dribble-clone-gamma.vercel.app/'); 
    }
    catch(err){
        return res.status(500).json({
            success : 'failed',
            message : err?.message ?? 'Internal Server error',
        }) 
    }
}

const resendEmailVerificationMail = async (req, res) => {
    const token = req.body.token;

    if(!token || !req.user){
        return res.status(401).json({
            success : 'failed', 
            message : 'unauthorized',
        })
    }
    try{
        const user = await User.findById(req.user.userId); 
        if(!user){
            return res.status(404).json({
                success : 'failed', 
                message : 'user not found',
            }); 
        }
        await sendMail(user?.email, "email-confirmation", token); 
        return res.status(200).json({
            success : 'ok', 
            message : 'Email sent.'
        })
    }
    catch(err){
        return res.status(500).json({
            success : 'failed',
            message : err?.message ?? 'Internal Server error',
        }) 
    }
}

module.exports = {
    signUp, 
    verifyEmail,
    resendEmailVerificationMail,
}