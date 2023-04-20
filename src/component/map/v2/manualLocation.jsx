import { useBoolean } from "@chakra-ui/react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useEffect, useState } from "react";
import { SearchLocationByInput } from "./manualLocationComp/searchLocationByInput";
import { SetLocationOnMap } from "./manualLocationComp/setLocationOnMap";
import useMapData from "../New/hooks/useMapData";
import useGeocode from "./hooks/useGoecode";

export function ManualLocation({ onClose }) {
  const [isLoading, setLoading] = useBoolean();
  const [isAddressLoading, setAddressLoading] = useBoolean();
  const { getCoordsFromAddress, getAddressFromCoords } = useGeocode();
  const { position: user } = useMapData({ type: "ADD" });
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({
      apiKey: "AIzaSyDDirDSiLgvG8Gl8crjbvrGRXlCPOTYRzE",
      debounce: 0,
      options: {
        componentRestrictions: { country: "in" },
      },
    });
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedCoords, setSelectedCoords] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    selectedAddress && setCoords(selectedAddress);
  }, [selectedAddress]);

  const getAddress = async () => {
    setAddressLoading.on();
    const coords = {
      lat: user.lat,
      lng: user.lng,
    };
    const address = await getAddressFromCoords(coords);
    setUserInformation({
      shortAddress: address.shortAddress,
      longAddress: address.longAddress,
    });
    setAddressLoading.off();
  };

  useEffect(() => {
    user.lng && getAddress();
  }, [user]);

  const setCoords = async (address) => {
    console.log("if anything comming here...?");
    setLoading.on();
    const coords = await getCoordsFromAddress({
      address,
    });
    setSelectedCoords({
      lat: coords.lat,
      lng: coords.lng,
    });
    setLoading.off();
  };

  if (selectedAddress && !isLoading) {
    return (
      <SetLocationOnMap
        closeLocationModal={closeLocationModal}
        isAddressLoading={isAddressLoading}
        onClose={onClose}
        selectedCoords={selectedCoords}
        user={user}
      />
    );
  }

  return (
    <SearchLocationByInput
      isLoading={isLoading}
      getPlacePredictions={getPlacePredictions}
      isPlacePredictionsLoading={isPlacePredictionsLoading}
      placePredictions={placePredictions}
      setSelectedAddress={setSelectedAddress}
    />
  );
}
