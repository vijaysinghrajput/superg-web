import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDDirDSiLgvG8Gl8crjbvrGRXlCPOTYRzE");
Geocode.setLanguage("en");
Geocode.setRegion("in");

export default function useGeocode() {
  const getAddressFromCoords = async ({ lat, lng }) => {
    const address = await Geocode.fromLatLng(`${lat}`, `${lng}`);
    return {
      longAddress: address.results[0].formatted_address,
      shortAddress: address.results[0].address_components[1].short_name,
    };
    // Geocode.fromLatLng(`${lat}`, `${lng}`).then(
    //   (response) => {
    //     const address = response.results[0].formatted_address;
    //     console.log(address);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  };

  const getCoordsFromAddress = async ({ address }) => {
    const coords = await Geocode.fromAddress(address);
    return coords.results[0].geometry.location;
    // .then(
    //   (response) => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     console.log(lat, lng);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  };

  return { getAddressFromCoords, getCoordsFromAddress };
}
