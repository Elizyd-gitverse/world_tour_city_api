const User = require("../model/userModel")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const {promisify} = require("util")

const createToken = function(id) {
  return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    })
}

const createCookie = function(user, statusCode, res) {
  const token = createToken(user.id) 

  const cookieOption = {
     expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
     httpOnly: true,
     secure:process.env.NODE_ENV==='production',
     sameSite: process.env.NODE_ENV==='production' ? "none" : "lax"
  }

    res.cookie("jwt", token, cookieOption)

    user.password = undefined //wont visible on res

    res.status(statusCode).json({
        status: "success",
        data: {
            user
        }
    })
}

//signup
exports.signup = async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    })

    createCookie(user, 201, res)
}

//login
exports.login = async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password) {
        return next(new AppError("Please enter email and Password", 404))
    }

    const user = await User.findOne({email}).select("+password")
    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401))
    }

    createCookie(user, 200, res)
}

//protect
exports.protect = async (req, res, next) => {
    const token = req.cookies.jwt
    if(!token) {
        return next(new AppError("Your are not logged in, Please login to get Access", 401))
    }

    //verify token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const user = await User.findById(decode.id)
    //for this project 👆this are enough cuz in this i have not implemented updating or resetting the password in my react frontend project
    if(!user) {
        return next(new AppError("User with this token doenot exists anymore", 404))
    }

    //if user changes password
    if(user.checkPasswordChanged(decode.iat)) {
        return next(new AppError("User recently changed Password, Please Login Again", 401))
    }

    req.user = user 
    next()   
}