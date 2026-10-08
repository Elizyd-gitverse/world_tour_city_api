const cityRouter = require('./router/cityRouter')
const userRouter = require("./router/userRouter")
const express = require("express")
const AppError = require('./utils/AppError')
const GlobalError = require('./utils/GlobalError')
const app = express()
const cookieParser = require("cookie-parser")
const cors = require('cors')

app.set("trust proxy", 1) //Your request reaches onRender through that proxy, so Express needs to trust the proxy

app.use(cors({ //all node and react to connect
    origin: ["http://localhost:5173", "https://worldtour-zyd.netlify.app"], // here react site link for react connect
    credentials: true //for authentication
}))

app.use(cookieParser()) //for jwt cookies

app.use(express.json({limit: '10kb'}))
app.use("/api/v1/cities", cityRouter)
app.use("/api/v1/users", userRouter)

app.all("/*splat", (req, res, next) => {
    return next(new AppError(`This URL ${req.originalUrl}, is Incorrect`, 404))
})

app.use(GlobalError)

module.exports = app