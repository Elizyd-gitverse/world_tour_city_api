const AppError = require("./AppError")

const sendDevErr = (err, res) => {
   res.status(err.statusCode).json({
     status: err.status,
     message: err.message,
     err: err,
     stack: err.stack 
   })
}

const sendProdErr = (err, res) => {
   if(err.isOperational) {
     res.status(err.statusCode).json({
     status: err.status,
     message: err.message
    })
   }else {
    res.status(500).json({
     status: "error",
     message: "something went wrong"
   })
   }   
}

function handleMissingFields(err) {
  const message = Object.values(err.errors).map(el => el).join(", ")
  return new AppError(message, 400)
}

function handleCastError(err) {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500,
   err.status = err.status || "error"

   if(process.env.NODE_ENV==='development') {
    sendDevErr(err, res)
   }else if(process.env.NODE_ENV==='production') {
    let error = {...err, name: err.name, message: err.message}

    if(err.name==='ValidationError') error = handleMissingFields(error)
    if(err.name==='CastError') error = handleCastError(error)    
    sendProdErr(error, res)
   }
}