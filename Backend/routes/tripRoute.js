const express = require("express");
const router = express.Router()
require("dotenv").config()
const { saveItinerary, getItinerary, generateItinerary } = require("../controllers/tripController")
const protect = require("../middleware/authMiddleware")

router.post("/itinerary", protect, generateItinerary);
router.get("/getItinerary",protect, getItinerary);
router.post("/saveItinerary", protect, saveItinerary);

module.exports = router;