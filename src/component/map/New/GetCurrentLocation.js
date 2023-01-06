import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { AddressAutocomplete } from "./AddressAutocomplete";
import MapOverview from "./MapOverview";
import { HiLocationMarker } from 'react-icons/hi';
import useMapData from "./hooks/useMapData";


export const GetCurrentLocation = () => {

    const { position: coords, zoom, handleMapIdle, mapLoaded, onMarkerDragEnd, getCurrentLocation, address, handleSelect, gettingCoords } = useMapData();


    return (
        <>
            <Box
                height={"100vh"}
            >
                <MapOverview
                    coords={coords}
                    zoom={zoom}
                    handleMapIdle={handleMapIdle}
                    mapLoaded={mapLoaded}
                    onMarkerDragEnd={onMarkerDragEnd}
                    getCurrentLocation={getCurrentLocation}
                    address={address}
                />
                <Box
                    position={"absolute"}
                    top={"10%"}
                    width="100%"
                    textAlign={"center"}
                >
                    <AddressAutocomplete
                        handleSelect={handleSelect}
                        address={address}
                    // gettingCoords={gettingCoords}
                    />
                </Box>
                <Box
                    position={"absolute"}
                    bottom={0}
                    left={0}
                    width="100%"
                    bg="#fff"
                    px={5}
                    pt={4}
                    pb={5}
                    borderTopRadius={15}
                >
                    <Box
                    >
                        <HStack alignItems={"center"}>
                            <HiLocationMarker size={28} />
                            <Text fontSize={20} fontWeight="800">{address.user_full_address}</Text>
                        </HStack>
                        <Text ml={10}>Gorakhpur</Text>
                    </Box>
                    <Box mt={4} textAlign="center">
                        <Button width={"100%"}
                            background="#0db616"
                            color="#fff"
                            fontSize={14}
                            fontWeight="400"
                        >Enter Complete Address</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}