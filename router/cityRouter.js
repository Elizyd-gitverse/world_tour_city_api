const cityController = require("../controller/cityController")
const authController = require("../controller/authController")
const express = require("express")
const router = express.Router()

router.route("/")
      .post(authController.protect, cityController.createCity)
      .get(authController.protect, cityController.getAllCity)

router.route("/:id")
      .get(authController.protect, cityController.getACity)
      .delete(authController.protect, cityController.deleteCity)
      
module.exports = router      