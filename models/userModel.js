const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username is required'],
    },
    firstname: { 
        type: String, 
        required: [true, 'First name is required'] 
    },
    lastname: { 
        type: String, 
        required: [true, 'Last name is required']  
    },
    age: { 
        type: Number, 
        required: [true, 'Age is required'] ,
    },
    address: { 
        type: String, 
        required: [true, 'Address is required']  
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'] ,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is nod valid']
    },
    password: { 
        type: String, 
        required: [true, 'Passsword is required']  
    },
    numberOfRequests: {
        type: Number, 
        default: 10
    }
}, {
    versionKey: false,
    strict: true
});

const User = mongoose.model("user", UserSchema, "users");

module.exports = User; 