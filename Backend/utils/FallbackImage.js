const axios = require("axios");
require("dotenv").config();

const getFallbackImage = async (query) => {
  const pexelAPIKey = process.env.PEXELS_API_KEY;
  const unsplashAPIKey = process.env.UNSPLASH_API_KEY;

  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: 1 },
      headers: {
        Authorization: `Client-ID ${unsplashAPIKey}`,
      },
    });

    const unsplashImage = res.data.results[0]?.urls?.regular;
    if (unsplashImage) return unsplashImage;
  } catch (err) {
    console.error(err);
  }


  try {
    const res = await axios.get("https://api.pexels.com/v1/search", {
      params: { query, per_page: 1 },
      headers: {
        Authorization: pexelAPIKey,
      },
    });

    const pexelsImage = res.data.photos[0]?.src?.large;
    if (pexelsImage) return pexelsImage;
  } catch (err) {
    console.error(err);
  }
};

module.exports = getFallbackImage;
