const verifiedEmailRequired = async (req, res, next) => {
    if(!req.user.isEmailVerified){
        return res.status(401).json({
            success : 'failed', 
            message : 'Please Verify the email'
        })
    }
    next(); 
}

module.exports = verifiedEmailRequired; 