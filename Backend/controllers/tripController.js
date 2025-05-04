// const { getdestinationId, getAttractions } = require("../utils/travelAdvisor");
const generateItineraryGPT = require("../utils/itineraryAI");
const getFallbackImage = require("../utils/FallbackImage");
const getPackingList = require("../utils/packingAssistant")
const { deleteMany } = require("../models/userModel");
const Itinerary = require("../models/itineraryModel");

const generateItinerary = async (req, res) => {
  const { origin, destination, startDate, endDate } = req.body;

const start = new Date(startDate);
const end = new Date(endDate);

const differenceInTime = end - start;

const days = differenceInTime / (1000 * 3600 * 24);
  console.log(days)

  try {
 

    const plan = await generateItineraryGPT(destination, days);

       const enrichedDays = await Promise.all(
         plan.map(async (day) => {
           const destinationName = day.Destination?.Name;
           const image = await getFallbackImage(destinationName); // fetch image
           return {
             ...day,
             Destination: {
               ...day.Destination,
               image: image || "", // fallback https://source.unsplash.com/featured/?travel
             },
           };
         })
       );

    const packingList = await getPackingList(destination, startDate, endDate); 

    res.json({
      destination,
      startDate,
      endDate,
      enrichedDays,
      packingList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate itinerary" });
  }
};

const saveItinerary = async (req, res) => {
  const userId = req.user._id;
  const { destination, startDate, endDate, enrichedDays, packingList } = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const differenceInTime = end - start;

  const days = differenceInTime / (1000 * 3600 * 24);

  try {
    await Itinerary.deleteMany({ userId });

    const newItinerary = await Itinerary.create({
      userId,
      destination,
      days,
      enrichedDays,
      packingList,
    });
    res.status(200).json({ message: "itinerary is saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error in saving itinerary" });
  }
};

const getItinerary = async (req, res) => {
  const userId = req.user._id;

  try {
    const userItinerary = await Itinerary.findOne({ userId });

    if (!userItinerary) {
      return res.status(404).json({ message: "No itinerary found" });
    }
    res.status(200).json({ userItinerary });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { saveItinerary, getItinerary, generateItinerary };
