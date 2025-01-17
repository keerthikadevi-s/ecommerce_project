const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    userId:{
        type: String, 
        required: true,
        unique: true
    },
    email :{
        type: String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required: true
    }
}, {timestamps : true});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;