const amadeus = require("./amadeus");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

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


const getFlightOffers = async (origin, destination, rawDate = "2025-06-10") => {
  const safeDate = rawDate || dayjs().add(7, "day").format("YYYY-MM-DD"); // default 1 week from now

  const parsedDate = dayjs(safeDate, "YYYY-MM-DD", true);
  if (!parsedDate.isValid()) {
    throw new Error("Invalid departure date format. Expected YYYY-MM-DD.");
  }
  const departureDate = parsedDate.format("YYYY-MM-DD");

  const depLocation = await getIATACode(origin);
  const desLocation = await getIATACode(destination);

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: depLocation,
      destinationLocationCode: desLocation,
      departureDate: departureDate,
      adults: "1",
      nonStop: "true",
      max: "5",
    });

    return response.data;
  } catch (err) {
    console.error(
      "❌ Error fetching flights:",
      err.response?.body || err.message || err
    );
    return [];
  }
};

module.exports = { getFlightOffers };
