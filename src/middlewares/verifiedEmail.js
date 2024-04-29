const User = require('./../models/user')
const verifiedEmailRequired = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.userId); 
        if(!user){
            return res.status(404).json({
                success : 'failed', 
                message : 'user not found'
            }); 
        }
        if(!req.user.isEmailVerified){
            return res.status(401).json({
                success : 'failed', 
                message : 'Please Verify the email'
            })
        }
        next(); 

    }
    catch(err){
        return res.status(500).json({
            success : 'failed', 
            message : "internal server error"
        })
    }
}

module.exports = verifiedEmailRequired; 