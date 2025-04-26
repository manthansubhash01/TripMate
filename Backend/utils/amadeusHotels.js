const amadeus = require("./amadeus");

const getIATACode = async (city) => {
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: city,
      subType: "CITY",
    });

    if (response.data.length === 0) {
      throw new Error(`No IATA code found for ${city}`);
    }

    const iataCode = response.data[0].iataCode;
    console.log(`${city} => ${iataCode}`);
    return iataCode;
  } catch (err) {
    console.error(`Error fetching IATA code:`, err);
    throw err;
  }
};

const getHotelOffers = async (city) => {
  const cityCode = await getIATACode(city);

const hotelsResponse = await amadeus.referenceData.locations.hotels.byCity.get({
  cityCode: cityCode,
});
const hotelIds = hotelsResponse.data.map((h) => h.hotelId).slice(0, 5);

      if (!hotelIds.length) {
      console.error('No hotels found in city');
      return [];
    }

    const validOffers = [];

    for (const hotelId of hotelIds) {
      try {
        const offerResponse = await amadeus.shopping.hotelOffersSearch.get({
          hotelIds: hotelId,
        });
        if (offerResponse.data && offerResponse.data.length > 0) {
          validOffers.push({
            name: offerResponse.data[0].hotel.name,
            address:
              offerResponse.data[0].hotel.address?.lines?.[0] || "No address",
            rating: offerResponse.data[0].hotel.rating || "N/A",
          });
        }
      } catch (err) {
        console.error(
          `Hotel ID ${hotelId} failed:`,
          err.description || err.message
        );
      }
    }

    return validOffers;
};

module.exports = { getHotelOffers };
