const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Please Enter Your email"],
        validate: [validator.isEmail, "Please Enter correct email"]
    },

    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        min: 8,
        select: false
    },

    passwordConfirm: {
        type: String,
        required: [true, "Please Enter Your Password Confirm"],
        validate: {
            validator: function(el) {
                return el === this.password 
            },

            message: 'Password are Incorrect'
        }
    },

    passwordChangedAt: Date
})

//password encrypt
userSchema.pre("save", async function() {
    if(!this.isModified("password")) return // password is Modified = true = false = dont return, go to next Line

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
})

//password changed at time
userSchema.pre("save", function() {
    if(!this.isModified("password") || this.isNew) return // is not new = go to next line

    this.passwordChangedAt = Date.now() - 1000
})

//correctPassword
userSchema.methods.correctPassword = async function(enteredPassword, userPassword) {
    return await bcrypt.compare(enteredPassword, userPassword)
}

//checked password changed
userSchema.methods.checkPasswordChanged = function(jwtTime) {
    if(this.passwordChangedAt) {
        const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return jwtTime < changedAt
    }

    return false
}

const User = mongoose.model("Users", userSchema)

module.exports = User