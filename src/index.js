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

app.use(cors({
    origin : '*',
}))
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); 


app.use("/.netlify/functions/app", router);

router.options('*', cors()); // Enable preflight for all routes
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

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