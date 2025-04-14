const axios = require("axios");
require("dotenv").config();

const generateItineraryGPT = async (destination, attractions, days) => {
  const API_KEY = process.env.META_API_KEY;
  const prompt = `Create a ${days}-day travel itinerary for ${destination}, focused on ${attractions.map((att) => att.name)}. Include daily activities, places to visit, and travel tips ${
    days > 5 ? 300 : 200
  } words.`;

  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "meta-llama/llama-4-maverick:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const itinerary = res.data.choices[0].message.content;
  return itinerary;
};


module.exports = generateItineraryGPT;