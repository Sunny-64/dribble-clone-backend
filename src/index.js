require("dotenv").config(); 

// library imports 
const express = require('express'); 
const cors = require("cors"); 
const morgan = require("morgan")

// custom imports 
const initiateServer = require('./config/server'); 


const app = express(); 
const router = express.Router(); 
initiateServer(app); 

let corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions)); 
router.use(cors(corsOptions))

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); 


app.use("/.netlify/functions/app", router);

router.get("/", (req, res) => {
    res.status(200).json({message : "Welcome to dribble clone backend"}); 
})

// Auth routes...
const authRoutes = require('./routes/auth'); 
router.use('/auth', authRoutes); 

// User routes...
const userRoutes = require('./routes/user'); 
router.use('/user', userRoutes); 

// Invalid routes...
router.get("*", (req, res) => {
    res.status(404).json({message : 'not-found'}); 
})

module.exports = {
    app,
}