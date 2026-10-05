const City = require("../model/cityModel")
const AppError = require("../utils/AppError")

exports.createCity = async (req, res, next) => {
    const city = await City.create(req.body)

    res.status(201).json({
        status: "success",
        data: {
            city
        }
    })
},


exports.getAllCity = async (req, res, next) => {
    const cities = await City.find()

    res.status(200).json({
        status: "success",
        results: cities.length,
        data: {
            cities
        }
    })
},

exports.getACity = async (req, res, next) => {
    const city = await City.findById(req.params.id)

    if(!city) return next(new AppError("City With this ID not Found", 404))
    
    res.status(200).json({
        status: "success",
        data: {
            city
        }
    })

},

exports.deleteCity = async (req, res, next) => {
    const city = await City.findByIdAndDelete(req.params.id)

    if(!city) return next(new AppError("City With this ID not Found", 404))

    res.status(204).send()
}