import { ApiClient } from "@prokerala/api-client";

const fetchPanchangData = async (latitude, longitude, datetime) => {
  try {
    const client = new ApiClient(
      "23967d7e-6718-4039-9b09-f07d6a3a4a97",
      "nk22E3FPhYrlPPmsLIUWpx61H52VNtiIwqVe20vB"
    );
    // const client = new ApiClient('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET');

    const response = await client.get("v2/astrology/panchang", {
      ayanamsa: 1,
      coordinates: `${latitude},${longitude}`,
      datetime: datetime,
    });

    return response; // Return data for use in components
  } catch (error) {
    console.error("Error fetching Panchang data:", error);
    return null; // Return null in case of an error
  }
};

export default fetchPanchangData;
