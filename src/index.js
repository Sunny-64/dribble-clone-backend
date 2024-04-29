require("dotenv").config(); 

// library imports 
const express = require('express'); 
const cors = require("cors"); 
const morgan = require("morgan")

// custom imports 
const initiateServer = require('./config/db'); 


const app = express(); 
const router = express.Router(); 
initiateServer(app); 

// Connect Database.
connectDb(); 

app.use(cors({
    origin : '*'
})); 

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); 


app.use("/.netlify/functions/app", router);

app.get("/", (req, res) => {
    res.status(200).json({message : "Welcome to dribble clone backend"}); 
})

// Auth routes...
const authRoutes = require('./routes/auth'); 
app.use('/auth', authRoutes); 

// User routes...
const userRoutes = require('./routes/user'); 
app.use('/user', userRoutes); 

// Invalid routes...
app.get("*", (req, res) => {
    res.status(404).json({message : 'not-found'}); 
})

module.exports = {
    app,
}