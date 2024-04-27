const mongoose = require('mongoose'); 

const schema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
    }, 
    username : {
        type : String, 
        required : true, 
        unique : true,
    }, 
    email : {
        type : String, 
        required : true, 
        unique : true, 
    }, 
    password : {
        type : String, 
        requried : true,
    },
    avatar : {
        type : String, 
        default : ''
    }, 
    location : {
        type : String, 
        default : ''
    }, 
    purposes : [
        {
            title : String, 
        }
    ],
    isEmailVerified : {
        type : Boolean, 
        default : false, 
    }, 
}, {timestamps : true}); 

schema.post('save', function(err, doc, next) {
    if(err?.name === 'MongoServerError' && err?.code === 11000 && err?.errorResponse?.keyPattern?.username === 1){
        next(new Error('Username is already taken.'));
    }
    if(err?.name === 'MongoServerError' && err?.code === 11000 && err?.errorResponse?.keyPattern?.email === 1){
        next(new Error('Email is already registered.'));
    }
    else{
        next()
    }
});

module.exports = new mongoose.model("User", schema); 