const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
    }, 
    username : {
        type : String, 
        required : true, 
    }, 
    email : {
        type : String, 
        required : true, 
        unique : true, 
    }, 
    avatar : {
        type : String, 
    }, 

    location : {
        type : String, 
    }, 
    purpose : [
        {
            title : String, 
        }
    ],
    isEmailVerified : {
        type : Boolean, 
        default : false, 
    }, 
}, {timestamps : true}); 

module.exports = new mongoose.Model("User", userSchema); 