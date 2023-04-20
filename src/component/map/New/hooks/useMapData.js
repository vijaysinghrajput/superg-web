import { useState } from "react";
import Geocode from "react-geocode";
import Base64 from "../../../../helper/EncodeDecode";
import Cookies from "universal-cookie";
import URL from "../../../../URL";
import useEffectOnce from "../../../../hooks/useEffectOnce";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const cookies = new Cookies();

Geocode.setApiKey("AIzaSyDDirDSiLgvG8Gl8crjbvrGRXlCPOTYRzE");
Geocode.setLanguage("en");
Geocode.setRegion("in");

const useMapData = ({ type }) => {
  const [position, setPosition] = useState({
    lat: 26.75449275728612,
    lng: 83.37227732009886,
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [zoom, setZoom] = useState(14);
  const [address, setAddress] = useState({
    user_full_address: "",
    user_city: "",
  });
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    console.log("map data ----->", position);
  }, [position]);

  const handleMapIdle = () => {
    setMapLoaded(true);
  };

  function getAddressFromLatAndLng(lat, lng) {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        getAddressFromNavneetMethod(response.results[0]);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const getAddressFromNavneetMethod = (addressFromUser) => {
    // console.log("step 1 ====> ", addressFromUser.formatted_address)
    const address = addressFromUser.formatted_address;
    const addressArray = address.split(",");
    const addressLength = addressArray.length;
    const addressAcurateArray = addressArray.slice(0, addressLength - 2);
    const addressForState = addressArray.slice(0, addressLength - 1);
    const state = addressForState.pop();
    const city = addressAcurateArray.pop();
    const userAddressWithoutCity = addressAcurateArray.toString();

    setAddress({
      user_city: city.trim(),
      user_full_address: userAddressWithoutCity,
      state,
    });
  };

  const onMarkerDragEnd = async (coord, index) => {
    console.log("onmarkerDragEnds------->", coord);
    const latLng = await coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    getAddressFromLatAndLng(lat, lng);

    // console.log("on drop ====>", lat, lng);

    setZoom(18);

    setPosition((prevState) => {
      let position = Object.assign({}, prevState); // creating copy of state variable position
      position.lat = lat;
      position.lng = lng; // update the name property, assign a new value
      return { ...position }; // return new object position object
    });
  };

  useEffectOnce(() => {
    const UserIDs = cookies.get("userID");
    const UserID = Base64.atob(UserIDs);
    FetchAllAddress(UserID);
    if (type === "ADD") {
      getAddressFromLatAndLng(position.lat, position.lng);
      // getCurrentLocation();
    }
  });

  function FetchAllAddress(UserID) {
    fetch(URL + "/APP-API/App/getAllAddress", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ UserID: UserID }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isDataLoading: false,
          UserAddressData: responseJson.address,
        });
        // //console.log('address', responseJson.address)
      })
      .catch((error) => {});
  }

  const getCurrentLocation = () => {
    try {
      setZoom(18);
      navigator.geolocation.getCurrentPosition((position) => {
        const p = position.coords;
        //console.log("location ===>", p);
        getAddressFromLatAndLng(p.latitude, p.longitude);
        setPosition({
          lat: p.latitude,
          lng: p.longitude,
        });
      });
    } catch (err) {
      // console.log("err ====>", err);
    }
  };

  const handleSelect = async (address) => {
    //console.log("autocomplete ====>", address);
    await geocodeByAddress(address)
      .then((results) => {
        gettingCoords(results[0]);
        getAddressFromNavneetMethod(results[0]);
      })
      .catch((error) => console.error(error));
  };

  const gettingCoords = async (Googleresult) => {
    const coords = await getLatLng(Googleresult);
    //console.log("from autocomplete =====>", coords);
    setPosition(coords);
  };

  return {
    position,
    zoom,
    handleMapIdle,
    mapLoaded,
    onMarkerDragEnd,
    getCurrentLocation,
    address,
    getAddressFromNavneetMethod,
    setPosition,
    handleSelect,
    gettingCoords,
    setUserInfo,
    userInfo,
    setAddress,
  };
};

export default useMapData;
