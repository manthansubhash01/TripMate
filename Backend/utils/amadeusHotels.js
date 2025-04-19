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
  cityCode = await getIATACode(city);

const hotelIdResponse = await amadeus.referenceData.locations.hotels.byCity.get({ cityCode });
    const hotelIds = hotelIdResponse.data.map(h => h.hotelId).slice(0, 5);

      if (!hotelIds.length) {
      console.warn('No hotels found in city');
      return [];
    }

    // Step 2: Get offers using hotel IDs
    const offerResponse = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: hotelIds.join(',')
    });

    return offerResponse.data.map(offer => ({
      name: offer.hotel.name,
      address: offer.hotel.address?.lines?.[0] || 'No address',
      rating: offer.hotel.rating || 'N/A'
    }));
  } 

module.exports = { getHotelOffers };
