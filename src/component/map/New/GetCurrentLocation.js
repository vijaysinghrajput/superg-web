import { Box, Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { AddressAutocomplete } from "./AddressAutocomplete";
import MapOverview from "./MapOverview";
import { HiLocationMarker } from 'react-icons/hi';
import useMapData from "./hooks/useMapData";
import AddFullAddress from "./AddFullAddress";
import { MdGpsFixed } from "react-icons/md";
import { useEffect } from "react";


export const GetCurrentLocation = ({ onClose, setUserAddressData, type, editData }) => {

    const { position: coords,
        zoom,
        handleMapIdle,
        mapLoaded,
        onMarkerDragEnd,
        getCurrentLocation,
        address,
        handleSelect,
        // gettingCoords,
        // setUserInfo,
        setAddress,
        setPosition } = useMapData({ type });
    const { isOpen: isOpenFull, onOpen: onOpenFull, onClose: onCloseFull } = useDisclosure();

    useEffect(() => {
        if (type === "EDIT") {
            setAddress({
                user_city: editData.city,
                user_full_address: editData.address
            })
            setPosition({
                lat: editData.latitude,
                lng: editData.longitude
            })
        }
    }, [])

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
                    top={{ base: "10%", lg: "10%" }}
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
                >
                    <Box
                        margin={"auto"}
                        borderTopRadius={15}
                        px={5}
                        pt={4}
                        pb={5}
                        bg="#fff"
                        width={{ base: "100%", md: "35%" }}
                    >
                        <Box
                            position={"relative"}
                        >
                            <Box position={"absolute"} top={-10} left="50%" right="50%" transform={"translate(-50%, -50%)"} w={"100%"} textAlign="center">
                                <Button size={"sm"} color="#0db616" border={"1px solid #20bc28"} bg="#fff" onClick={getCurrentLocation} leftIcon={<MdGpsFixed />}>Use Current Location</Button>
                            </Box>
                            <HStack alignItems={"center"}>
                                <Box>
                                    <HiLocationMarker size={28} />
                                </Box>
                                <Text fontSize={20} fontWeight="800">{address.user_full_address}</Text>
                            </HStack>
                            <Text ml={10}>{address.user_city}</Text>
                        </Box>
                        <Box mt={4} textAlign="center">
                            <Button width={"100%"}
                                background="#0db616"
                                color="#fff"
                                fontSize={14}
                                fontWeight="400"
                                onClick={onOpenFull}
                            >Enter Complete Address</Button>
                        </Box>
                    </Box>
                    <AddFullAddress
                        isOpen={isOpenFull}
                        onOpen={onOpenFull}
                        address={address}
                        position={coords}
                        onClose={onCloseFull}
                        // setUserInfo={setUserInfo}
                        type={type}
                        editData={editData}
                        onCloseMain={onClose}
                        setUserAddressData={setUserAddressData}
                    />
                </Box>
            </Box>
        </>
    )
}