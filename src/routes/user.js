const router = require("express").Router(); 
const multer = require('multer');

const { updateUserDetails, getUser } = require("../controllers/user");
const auth = require('./../middlewares/auth'); 
const {storage} = require('./../services/storage'); 

const upload = multer({ storage });


router.use(auth); 

router.get("/", getUser); 
router.put('/', upload.single('avatar'), updateUserDetails); 

module.exports = router; 