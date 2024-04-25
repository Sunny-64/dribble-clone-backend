const jwt = require('jsonwebtoken'); 

const auth = (req, res, next) => {
    const token  = req?.headers?.authorization.split(" ")[1]; 
    if(!token) return res.status(401).json({success : 'failed', message : 'Unauthorized'})
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            console.log(err); 
            return res.status(401).json({success : 'failed', message : 'Unauthorized'})
        }
        req.user = decoded; 
        next(); 
      });
}

module.exports = auth; 