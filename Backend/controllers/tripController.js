// const { getdestinationId, getAttractions } = require("../utils/travelAdvisor");
const generateItineraryGPT = require("../utils/itineraryAI");
const getFallbackImage = require("../utils/FallbackImage");
const getPackingList = require("../utils/packingAssistant");
const { deleteMany } = require("../models/userModel");
const Itinerary = require("../models/itineraryModel");

const generateItinerary = async (req, res) => {
  const { origin, destination, startDate, endDate } = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const differenceInTime = end - start;

  const days = differenceInTime / (1000 * 3600 * 24);
  console.log(days);

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
  const { destination, startDate, endDate, enrichedDays, packingList } =
    req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const differenceInTime = end - start;

  const days = differenceInTime / (1000 * 3600 * 24);

  try {
    const newItinerary = await Itinerary.create({
      userId,
      destination,
      startDate,
      endDate,
      days,
      enrichedDays,
      packingList,
    });
    res
      .status(200)
      .json({
        message: "Itinerary saved successfully",
        itinerary: newItinerary,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in saving itinerary" });
  }
};

const getItinerary = async (req, res) => {
  const userId = req.user._id;

  try {
    const userItineraries = await Itinerary.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ itineraries: userItineraries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteItinerary = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  try {
    const itinerary = await Itinerary.findOne({ _id: id, userId });

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    await Itinerary.deleteOne({ _id: id });
    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting itinerary" });
  }
};

module.exports = {
  saveItinerary,
  getItinerary,
  generateItinerary,
  deleteItinerary,
};
