const app = require("./app")
const dotenv = require("dotenv")
dotenv.config({path: "./config.env"})
const mongoose = require("mongoose")

const Port = process.env.PORT || 5001
const DB = process.env.DATABASE
mongoose.connect(DB).then(() => console.log("DB connected"))

app.listen(Port, '0.0.0.0', () => {
    console.log("Server is Running")
})