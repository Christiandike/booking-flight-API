const express = require("express");
const router = express.Router();
const controller = require("../controllers/flightController");

//add flight
router.post("/", controller.postFlight);

//get all flights
router.get("/", controller.getAllFlights);

//get single flight
router.get("/:id", controller.getSingleFlight);

//update flight
router.put("/:id", controller.putFlight);

//delete flight
router.delete("/:id", controller.deleteFlight);

module.exports = router;
