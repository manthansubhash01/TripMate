const axios = require("axios");
require("dotenv").config();

const destination = "Paris";
const startDate = "May 5, 2025";
const endDate = "May 10, 2025";

async function getPackingList(destination, startDate, endDate) {
  const API_KEY = process.env.META_API_KEY;

  const prompt = `I'm traveling to ${destination} from ${startDate} to ${endDate}. Based on the expected weather during that period, cultural norms, and any major local events, please suggest what I should pack. List items by category such as clothing, accessories, documents, and optional extras in below format.
  Format : [
        {
            clothing : ['Light jackets or cardigans', 'T-shirts and tops'],
            accessories : ['Sunglasses',  'Hat or cap'],
            documents : ['Passport', 'Travel insurance documents','ID card'],
            extras : ['Snacks for travel days','First aid kit']
        }
    ]
  - Return ONLY a clean JSON array (no object wrapping).
  - Strictly NO extra text before or after JSON.`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-small-3.1-24b-instruct:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let content = response.data.choices[0].message.content.trim();

    if (content.startsWith("```json")) {
      content = content
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();
    }

    const start = content.indexOf("[");
    const end = content.lastIndexOf("]");
    if (start === -1 || end === -1) {
      throw new Error("No JSON array found in model response");
    }

    const jsonText = content.slice(start + 1, end);

    const packingSuggestions = JSON.parse(jsonText);
    console.log("Parsed suggestions:", packingSuggestions);

    return packingSuggestions;
  } catch (error) {
    console.error(
      "Error fetching packing list:",
      error.response?.data || error.message
    );
  }
}

module.exports = getPackingList;
