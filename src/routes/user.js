const router = require("express").Router(); 
const multer = require('multer');

const { updateUserDetails, getUser } = require("../controllers/user");
const auth = require('./../middlewares/auth'); 
const {storage} = require('./../services/storage'); 
const verifiedEmailRequired = require("../middlewares/verifiedEmail");

const upload = multer({ storage });


router.use(auth); 

router.put('/', upload.single('avatar'), updateUserDetails); 
router.use(verifiedEmailRequired); 
router.get("/", getUser); 

module.exports = router; 