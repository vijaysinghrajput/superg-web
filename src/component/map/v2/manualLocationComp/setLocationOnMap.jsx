import { SpinnerInCenter } from "@/components";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  InputGroup,
  InputLeftElement,
  ModalHeader,
  ModalCloseButton,
  Flex,
  useBoolean,
  Spinner,
  Image,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { BiChevronLeft } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { MapForLocation } from "../MapForLocation";
import { useRouter } from "next/router";

export function SetLocationOnMap({
  selectedCoords,
  isAddressLoading,
  user,
  onClose,
  closeLocationModal,
}) {
  const { replace } = useRouter();
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

  return (
    <>
      <Box>
        <Box
          position={"absolute"}
          zIndex={9999}
          top={"50%"}
          left={"50%"}
          transform="translate(-50%, -50%)"
        >
          <Image src="https://www.zeptonow.com/images/location-marker.svg" />
        </Box>
        <Box
          position={"absolute"}
          zIndex={9999}
          top={"40%"}
          left={"50%"}
          transform="translate(-50%, -50%)"
          background={"themeColor.1000"}
          color={"#fff"}
          borderRadius={10}
          p={2}
          maxWidth={"10rem"}
          textAlign={"center"}
          fontSize={12}
        >
          <Text>Move your map to adjust your location</Text>
        </Box>
        <MapForLocation
          selectedCoords={selectedCoords}
          containerElement={
            <div
              style={{
                height: isNotSmallerScreen ? "80vh" : "100vh",
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
          }
          // googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAhF6HTMbcmCHaWA3aLVhBJH2kk4RTUhDQ&libraries=places`}
          mapElement={
            <div
              style={{
                height: `100%`,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
          }
          // loadingElement={<div style={{ height: `100%` }} />}
        />
        <Box position={"absolute"} bottom={6} w={"100%"}>
          <Box
            width={"94%"}
            marginX={"auto"}
            borderRadius={8}
            bg={"#fff"}
            p={4}
            boxShadow={"0 0 5px 0 #d4d4d4"}
          >
            <Text
              fontSize={20}
              fontWeight={"700"}
              mb={1}
              opacity={isAddressLoading ? 0.6 : 1}
            >
              {user.shortAddress}
            </Text>
            <Text
              fontWeight={"600"}
              mb={4}
              opacity={isAddressLoading ? 0.6 : 1}
            >
              {user.longAddress}
            </Text>
            <Button
              w="100%"
              p={6}
              fontWeight={"700"}
              fontSize={14}
              variant={"base"}
              isDisabled={isAddressLoading ? true : false}
              onClick={() => {
                if (onClose) {
                  onClose();
                  closeLocationModal();
                } else replace("/");
              }}
            >
              Confirm & Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
