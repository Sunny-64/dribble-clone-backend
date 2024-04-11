require("dotenv").config(); 

// library imports 
const express = require('express'); 
const cors = require("cors"); 
const morgan = require("morgan")

// custom imports 
const connectDb = require('./config/db'); 


const app = express(); 
const PORT = process.env.PORT; 

// Connect Database.
connectDb(); 

app.use(cors({
    origin : '*'
})); 

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); 

app.get("/", (req, res) => {
    res.status(200).json({message : "Welcome to dribble clone backend"}); 
})

app.get("*", (req, res) => {
    res.status(404).json({message : 'not-found'}); 
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT : ${PORT}`)
})