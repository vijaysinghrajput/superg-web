import { useState } from 'react';
import Geocode from "react-geocode";
import Base64 from "../../../../helper/EncodeDecode";
import Cookies from 'universal-cookie';
import URL from '../../../../URL'
import useEffectOnce from '../../../../hooks/useEffectOnce';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";


const cookies = new Cookies()

Geocode.setApiKey("AIzaSyDDirDSiLgvG8Gl8crjbvrGRXlCPOTYRzE");
Geocode.setLanguage("en");
Geocode.setRegion("in");


const useMapData = () => {

    const [position, setPosition] = useState({
        lat: 26.7606,
        lng: 83.3732
    });
    const toast = useToast();
    const [mapLoaded, setMapLoaded] = useState(false);
    const [zoom, setZoom] = useState(14);
    const [address, setAddress] = useState({
        user_full_address: "",
        user_city: ""
    });
    const [fullAddressByUser, setFullAddress] = useState();

    const handleMapIdle = () => {
        setMapLoaded(true);
    }

    function getAddressFromLatAndLng(lat, lng) {
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                gettingAddressFormating(response.results[0])
            },
            (error) => {
                console.error(error);
            }
        );
    }

    function gettingAddressFormating(response) {
        let address_line_1, address_line_2, address_line_3, address_line_4, city;
        for (let i = 0; i < response.address_components.length; i++) {
            for (let j = 0; j < response.address_components[i].types.length; j++) {
                switch (response.address_components[i].types[j]) {
                    case "route":
                        address_line_1 = response.address_components[i].long_name;
                        break;
                    case "sublocality_level_2":
                        address_line_2 = response.address_components[i].long_name;
                        break;
                    case "neighborhood":
                        address_line_3 = response.address_components[i].long_name;
                        break;
                    case "sublocality_level_1":
                        address_line_4 = response.address_components[i].long_name;
                        break;
                    case "administrative_area_level_3":
                        city = response.address_components[i].long_name;
                        break;
                }
            }
        }

        var Addressdata = [address_line_1, address_line_2, address_line_3, address_line_4];

        Addressdata = Addressdata.filter(function (element) {
            return element !== undefined;
        });

        //console.log('addrees', Addressdata[0], "city  ====>", city);

        setAddress({ user_city: city, user_full_address: Addressdata[0] });

        if (city !== 'Gorakhpur') {
            toast({
                title: 'Delivery is not avilable at your location.!',
                description: "Sorry! We only deliver in Gorakhpur UP",
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
        }
    }

    const onMarkerDragEnd = async (coord, index) => {

        const { latLng } = await coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        getAddressFromLatAndLng(lat, lng)

        //console.log("on drop ====>", lat, lng);

        setZoom(16)

        setPosition(prevState => {
            let position = Object.assign({}, prevState);  // creating copy of state variable position
            position.lat = lat;
            position.lng = lng          // update the name property, assign a new value
            return { ...position };                                 // return new object position object
        })

    };


    useEffectOnce(() => {
        const UserIDs = cookies.get("userID");
        const UserID = Base64.atob(UserIDs)
        FetchAllAddress(UserID);
        getAddressFromLatAndLng(position.lat, position.lng);
    })


    useEffect(() => {
        //console.log("position ====>", position, address);
    }, [position])

    function FetchAllAddress(UserID) {


        fetch(URL + "/APP-API/App/getAllAddress", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }, body: JSON.stringify({ UserID: UserID })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isDataLoading: false, UserAddressData: responseJson.address, })
                // //console.log('address', responseJson.address)
            })
            .catch((error) => { });
    }


    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const p = position.coords;
            //console.log("location ===>", p);
            setPosition({
                lat: p.latitude,
                lng: p.longitude
            })
        })
    }

    const handleSelect = async (address) => {
        //console.log("autocomplete ====>", address);
        await geocodeByAddress(address)
            .then(
                (results) => {
                    gettingCoords(results[0])
                    gettingAddressFormating(results[0])
                }
            )
            .catch(error => console.error(error));
    };

    const gettingCoords = async (Googleresult) => {
        const coords = await getLatLng(Googleresult);
        //console.log("from autocomplete =====>", coords);
        setPosition(coords);
    }



    return {
        position,
        zoom,
        handleMapIdle,
        mapLoaded,
        onMarkerDragEnd,
        getCurrentLocation,
        address,
        gettingAddressFormating,
        setPosition,
        handleSelect,
        gettingCoords,
        setFullAddress
    };


}

export default useMapData;