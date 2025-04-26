const axios = require("axios");
require("dotenv").config();

const rapidAPIKey = process.env.RAPID_API_KEY;

const getLocationId = async (location) => {
  const options = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/locations/search",
    params: {
      query: "paris",
      limit: "30",
      offset: "0",
      units: "km",
      location_id: "1",
      currency: "USD",
      sort: "relevance",
      lang: "en_US",
    },
    headers: {
      "x-rapidapi-key": "1200b0feeemsh3dfcd9b34a1b4fcp139ca0jsnc08ff3ffbae5",
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (err) {
    console.error(err);
    throw new Error("Could not fetch location ID.");
  }
};

const getAttractions = async (location_id) => {
  const options = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/attractions/list",
    params: {
      location_id: location_id,
      currency: "USD",
      lang: "en_US",
      lunit: "km",
      sort: "recommended",
    },
    headers: {
      "x-rapidapi-key": rapidAPIKey,
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    const attractionData = response.data.data; // assuming response.data is the object you posted
    const attractionNames = attractionData.map((attraction) => attraction.name);
    return attractionData;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getLocationId, getAttractions };
