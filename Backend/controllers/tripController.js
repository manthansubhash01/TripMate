const { getHotelOffers } = require("../utils/amadeusHotels")
// const { getdestinationId, getAttractions } = require("../utils/travelAdvisor");
const generateItineraryGPT = require("../utils/itineraryAI");
const getFallbackImage = require("../utils/FallbackImage");
const { deleteMany } = require("../models/userModel");
const Itinerary = require("../models/itineraryModel");
// const dayjs = require("dayjs");
// const customParseFormat = require("dayjs/plugin/customParseFormat");
// dayjs.extend(customParseFormat);

const generateItinerary = async (req, res) => {
  const { origin, destination, startDate, endDate } = req.body;

const start = new Date(startDate);
const end = new Date(endDate);

// Calculate the difference in time (milliseconds)
const differenceInTime = end - start;

// Convert milliseconds to days
const days = differenceInTime / (1000 * 3600 * 24);
  console.log(days)

  try {
    // const destination_id = await getdestinationId(destination);
    // const attractions = await getAttractions(destination_id);

    // const attractions = await getPOI(destination);
    // console.log(attractions)
    // const topAttractions = await Promise.all(
    //   attractions.map(async (item) => {
    //     const image = item.image || (await getFallbackImage(item.name)); 
    //     return {
    //       name: item.name,
    //       image,
    //       description: item.description || "No description available",
    //     };
    //   })
    // );

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

    const hotelOffers = await getHotelOffers(destination); 

    res.json({
      destination,
      startDate,
      endDate,
      enrichedDays,
      hotelOffers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate itinerary" });
  }
};

const saveItinerary = async (req, res) => {
  const userId = req.user._id;
  const { destination, startDate, endDate, enrichedDays, hotelOffers } = req.body;

  try {
    await Itinerary.deleteMany({ userId });

    const newItinerary = await Itinerary.create({
      destination,
      startDate,
      endDate,
      enrichedDays,
      hotelOffers,
    });
    res.status(200).json({ message: "itinerary is saved" });
  } catch (err) {
    console.error(err);
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
