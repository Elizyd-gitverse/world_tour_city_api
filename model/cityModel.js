const mongoose = require("mongoose");


const citySchema = new mongoose.Schema({
    // "cityName": "Lisbon",
    //   "country": "Portugal",
    //   "emoji": "🚀",
    //   "date": "2027-10-31T15:59:59.138Z",
    //   "notes": "My favorite city so far!",
    //   "position": {
    //     "lat": 38.727881642324164,
    //     "lng": -9.140900099907554

    cityName: {
        type: String,
        required: [true, "Please mention City Name"]
    },

    country: {
        type: String,
        required: [true, "Please mention Contry Name"]
    },

    emoji: {
        type: String,
        required: [true, "Please mention emoji"]
    },

    date: Date,

    notes: String,

    position: {
        lat: {
            type: Number,
            required: [true, "Please mention latitude"]
        },

        lng: {
            type: Number,
            required: [true, "Please mention longitude"]
        },
    },
})


const City = mongoose.model('cities', citySchema)

module.exports = City