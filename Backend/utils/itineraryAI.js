const axios = require("axios");
require("dotenv").config();

const generateItineraryGPT = async (destination, days) => {
  const API_KEY = process.env.META_API_KEY;
  const prompt = `Create a ${days}-days travel itinerary for ${destination}. 
Rules:
- Each day must be DISTINCT (no repetition of Day numbers).
- There must be EXACTLY ${days} items in the array.
- Return ONLY a clean JSON array (no object wrapping).
Format:
[
  {
    "Day": 1,
    "Destination": {
      "Name": "Place Name",
      "Address": "Full Address",
      "BestTimeToVisit": "Best Time",
      "Speciality": "Speciality",
      "TipsOrWarnings": ["Tip 1"]
    }
  },
  { "Day": 2, "Destination": { ... } }
]
Strictly NO extra text before or after JSON.`;

  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "meta-llama/llama-4-maverick",
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

  const gptResponse = res.data.choices[0].message.content.trim();
  let cleanedResponse = gptResponse;
  if (cleanedResponse.startsWith("```json")) {
    cleanedResponse = cleanedResponse
      .replace(/```json\n/, "")
      .replace(/```$/, "");
  }

  const itinerary = JSON.parse(cleanedResponse);

  return itinerary;
};

module.exports = generateItineraryGPT;