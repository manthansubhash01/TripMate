const { getLocationId, getAttractions } = require("../utils/travelAdvisor");
const generateItineraryGPT = require("../utils/itineraryAI");
const getFallbackImage = require("../utils/FallbackImage");
const { deleteMany } = require("../models/userModel");
const Itinerary = require("../models/itineraryModel");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const generateItinerary = async(req, res) => {
    const location = req.body.location
    const startDate = req.body.startDate;
    const endDate = req.body.endDate

    const parsedStart = dayjs(startDate, "DD-MM-YYYY");
    const parsedEnd = dayjs(endDate, "DD-MM-YYYY");
    const days = parsedEnd.diff(parsedStart, "day") + 1;

    try{
        const location_id = await getLocationId(location);
        const attractions = await getAttractions(location_id);

        const topAttractions = await Promise.all(
          attractions
            .filter((item) => item.name)
            .slice(0, days)
            .map(async (item) => {
              let image =
                item.photo?.images?.large?.url ||
                (await getFallbackImage(item.name));

              return {
                name: item.name,
                image,
                description: item.description || "No description available",
              };
            })
        );

        const plan = await generateItineraryGPT(location, topAttractions, days);

        res.json({
          location,
          startDate,
          endDate,
          topAttractions,
          plan,
        });
    }catch(err){
        console.error(err)
        res.status(500).json({message : "Failed to generate itinerary"})
    }
}


const saveItinerary = async(req, res) => {
  const userId = req.user._id;
  const { location, days, topAttractions, plan } = req.body;

  try{
    await Itinerary.deleteMany({userId});

    const newItinerary = await Itinerary.create({
      userId,
      location,
      days,
      topAttractions,
      plan,
    });
    res.status(200).json({message : "itinerary is saved" })
  }catch(err){
    console.error(err)
  }
}

const getItinerary = async(req, res) => {
  const userId = req.user._id;
  
  try{
    const userItinerary = await Itinerary.findOne({userId});

    if (!userItinerary) {
      return res.status(404).json({message : "No itinerary found"})
    }
    res.status(200).json({userItinerary})
  }catch(err){
    res.status(500).json({message : "Something went wrong"})
  }
}

module.exports = { saveItinerary, getItinerary, generateItinerary };