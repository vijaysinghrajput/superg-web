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

  // function gettingAddressFormating(response) {
  //     let address_line_1, address_line_2, address_line_3, address_line_4, city;
  //     for (let i = 0; i < response.address_components.length; i++) {
  //         for (let j = 0; j < response.address_components[i].types.length; j++) {
  //             switch (response.address_components[i].types[j]) {
  //                 case "route":
  //                     address_line_1 = response.address_components[i].long_name;
  //                     break;
  //                 case "sublocality_level_2":
  //                     address_line_2 = response.address_components[i].long_name;
  //                     break;
  //                 case "neighborhood":
  //                     address_line_3 = response.address_components[i].long_name;
  //                     break;
  //                 case "sublocality_level_1":
  //                     address_line_4 = response.address_components[i].long_name;
  //                     break;
  //                 case "administrative_area_level_3":
  //                     city = response.address_components[i].long_name;
  //                     break;
  //             }
  //         }
  //     }

  //     var Addressdata = [address_line_1, address_line_2, address_line_3, address_line_4];

  //     Addressdata = Addressdata.filter(function (element) {
  //         return element !== undefined;
  //     });

  //     console.log('addrees', Addressdata, "city  ====>", response.formatted_address);

  //     setAddress({ user_city: city, user_full_address: Addressdata[0] });

  //     if (city !== 'Gorakhpur') {
  //         toast({
  //             title: 'Delivery is not avilable at your location.!',
  //             description: "Sorry! We only deliver in Gorakhpur UP",
  //             status: 'error',
  //             duration: 1000,
  //             isClosable: true,
  //         })
  //     }
  // }

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

  // useEffect(() => {
  //     console.log("address ===>", address);
  // }, [address])

  const onMarkerDragEnd = async (coord, index) => {
    const { latLng } = await coord;
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
      getCurrentLocation();
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
