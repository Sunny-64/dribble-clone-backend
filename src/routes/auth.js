const router = require('express').Router();
const authController = require('./../controllers/auth'); 
const auth = require('./../middlewares/auth'); 

router.post("/sign-up", authController.signUp); 
router.get('/verify-email', authController.verifyEmail); 
router.post('/resend-email-confirmation', auth ,authController.resendEmailVerificationMail)

module.exports = router; 