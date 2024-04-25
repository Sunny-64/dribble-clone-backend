const router = require('express').Router();
const authController = require('./../controllers/auth'); 

router.post("/sign-up", authController.signUp); 
router.post('/verify-email', authController.verifyEmail); 

module.exports = router; 