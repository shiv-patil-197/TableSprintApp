const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        fn: {
            type: String,
            required: { value: true, message: "fn is mandatory" }
        },
        ln: {
            type: String,
            
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is mandatory"],
            match: [/\S+@\S+\.\S+/, 'Email is invalid']
        },
        number: {
            type: Number,
            unique: true,
            required: [true, "Number is mandatory"],
            validate: {
                validator: function (v) {
                    // Regular expression to validate exactly 10 digits starting with 6-9
                    return /^[6-9]\d{9}$/.test(v);
                },
            
                message: props => `${props.value} is not a valid 10-digit mobile number starting with 6-9!`
            }
        },
        password: {
            type: String,
            required: { value: true, message: "Password is mandatory" }
        },
        confirmPassword: {
            type: String,
            required: { value: true, message: "confirmPassword is mandatory" }
        }
    }, { timeStamps: true }    
);

const User = mongoose.model('User', userSchema);

module.exports = User;
