const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    }
},
{ timestamps : true });


const userId = mongoose.model("userId", userSchema)



module.exports = userId;