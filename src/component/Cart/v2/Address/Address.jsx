import React from "react";
import Geocode from "react-geocode";
import Base64 from "../../../../helper/EncodeDecode";
import Cookies from "universal-cookie";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import URL from "../../../../URL";
import { GetCurrentLocation } from "../../../map/New/GetCurrentLocation";
import { HiLocationMarker, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import useMapData from "../../../map/New/hooks/useMapData";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { AiOutlineClose } from "react-icons/ai";

const cookies = new Cookies();

Geocode.setApiKey("AIzaSyDDirDSiLgvG8Gl8crjbvrGRXlCPOTYRzE");
Geocode.setLanguage("en");
Geocode.setRegion("in");

function AddressInModal({ setUserAddressData, type = "ADD", editData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModelSearch,
    onOpen: onOpenModelSearch,
    onClose: onCloseModelSearch,
  } = useDisclosure();
  const {
    isOpen: isOpenModelPin,
    onOpen: onOpenModelPin,
    onClose: onCloseModelPin,
  } = useDisclosure();
  // const { position, getCurrentLocation } = useMapData({
  //   type: "ELSE",
  // });
  const [steps, setStep] = useState(type == "EDIT" ? 3 : 1);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({
      apiKey: "AIzaSyDDirDSiLgvG8Gl8crjbvrGRXlCPOTYRzE",
      debounce: 0,
      defaultValue: "Gorakhpur Uttar Pardesh",
      options: {
        componentRestrictions: { country: "in" },
      },
    });
  const [selectedAddress, setSelectedAddress] = useState();
  const [auto, setAuto] = useBoolean();

  useEffect(() => {
    // return () => {
    isOpen && setStep(1);
    type == "EDIT" && setStep(3);
    // };
  }, [isOpen, type]);

  const closeAllModel = () => {
    onClose();
    onCloseModelSearch();
    onCloseModelPin();
  };

  return (
    <>
      {type === "ADD" ? (
        <Button
          onClick={onOpen}
          w="100%"
          color={"#000"}
          bg={"#fff"}
          border="2px solid #11982a"
        >
          + Add New Address
        </Button>
      ) : (
        <div class="text-decoration-none text-success" onClick={onOpenModelPin}>
          <i class="icofont-edit"></i> Edit
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        allowPinchZoom={true}
      >
        <ModalOverlay />
        <ModalContent overflow={"hidden"} borderRadius={0}>
          <ModalHeader boxShadow={"0 1px 5px 0 #cbcbcb"} py={4}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text fontSize={14}>Select address method</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton zIndex={9999} top="1.5%" />
          <ModalBody bg="none" p={0}>
            <Box h={"90vh"} mt={4}>
              <Box px={6}>
                <Box textAlign={"center"}>
                  <Image
                    margin={"auto"}
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/location-not-found-5581208-4669828.png"
                    height={40}
                  />
                  <Text mb={4} fontWeight={"700"} fontSize={20}>
                    Welcome to SuperG
                  </Text>
                  <Text mb={6} px={10}>
                    Please provide your delivery location / कृपया अपनी डिलीवरी
                    की लोकेशन का फॉर्म भरे
                  </Text>
                </Box>
                <Box gap={10}>
                  <Box mb={6}>
                    <Button
                      colorScheme="green"
                      w={"100%"}
                      py={6}
                      fontWeight={"700"}
                      onClick={() => {
                        setAuto.on();
                        onOpenModelPin();
                        setStep(3);
                      }}
                    >
                      Use Current Location
                    </Button>
                  </Box>
                  <Box mb={6}>
                    <Button
                      variant={"outline"}
                      color={"green"}
                      borderColor={"green"}
                      w={"100%"}
                      py={6}
                      fontWeight={"700"}
                      onClick={() => {
                        setAuto.off();
                        onOpenModelSearch();
                        setStep(2);
                      }}
                    >
                      Set Your Location Manaully
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenModelSearch}
        onClose={onCloseModelSearch}
        size="full"
        allowPinchZoom={true}
      >
        <ModalOverlay />
        <ModalContent overflow={"hidden"} borderRadius={0}>
          <ModalHeader boxShadow={"0 1px 5px 0 #cbcbcb"} py={4}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text fontSize={14}>Enter your location</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton zIndex={9999} top="1.5%" />
          <ModalBody bg="none" p={0}>
            <Box h={"90vh"} mt={4}>
              <>
                <Box px={6} mt={2}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BsSearch color="gray.300" />}
                    />
                    <Input
                      placeholder="Example : Asuran , Gorakhnath , Golghar"
                      fontSize={12}
                      bg={"#efefef"}
                      onChange={(evt) => {
                        getPlacePredictions({ input: evt.target.value });
                      }}
                      loading={isPlacePredictionsLoading}
                    />
                  </InputGroup>
                  <Box
                    h={{ base: "100%", lg: "36vh" }}
                    overflow={"scroll"}
                    mt={2}
                  >
                    {isPlacePredictionsLoading ? (
                      <>
                        <Flex
                          alignItems={"center"}
                          justifyContent={"center"}
                          h={"40vh"}
                        >
                          <Spinner />
                        </Flex>
                      </>
                    ) : (
                      placePredictions.map((addressList, i) => {
                        const { structured_formatting: address, description } =
                          addressList;
                        return (
                          <Flex
                            mt={2}
                            gap={4}
                            px={4}
                            py={2}
                            alignItems={"center"}
                            borderRadius={10}
                            cursor={"pointer"}
                            _hover={{
                              bg: "#efefef",
                            }}
                            onClick={() => {
                              setSelectedAddress(description);
                              // console.log("description ----->", description);
                              setStep(3);
                              onOpenModelPin();
                            }}
                          >
                            <Box color="themeColor.1000">
                              <HiLocationMarker size={20} />
                            </Box>
                            <Box>
                              <Text fontWeight={"700"} fontSize={16}>
                                {address.main_text}
                              </Text>
                              <Text>{address.secondary_text}</Text>
                            </Box>
                          </Flex>
                        );
                      })
                    )}
                  </Box>
                </Box>
              </>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenModelPin}
        onClose={onCloseModelPin}
        size="full"
        allowPinchZoom={true}
      >
        <ModalOverlay />
        <ModalContent overflow={"hidden"} borderRadius={0}>
          <ModalHeader boxShadow={"0 1px 5px 0 #cbcbcb"} py={4}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text fontSize={14}>Drop the pin to your address</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton zIndex={9999} top="1.5%" />
          <ModalBody bg="none" p={0}>
            <Box h={"90vh"}>
              <GetCurrentLocation
                onClose={closeAllModel}
                setUserAddressData={setUserAddressData}
                type={type}
                editData={editData}
                position={auto}
                description={selectedAddress}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const AddressNewV2 = ({ setAddress }) => {
  return (
    <>
      <div className="card border-0 osahan-accor rounded overflow-hidden mt-3">
        <div className="card-header bg-white border-0 p-0" id="headingtwo">
          <h2 className="mb-0">
            <button
              className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0"
              type="button"
              data-toggle="collapse"
              data-target="#collapsetwo"
              aria-expanded="true"
              aria-controls="collapsetwo"
            >
              <span className="c-number">2</span> Order Address
            </button>
          </h2>
        </div>
        <div
          id="collapsetwo"
          className="collapse"
          aria-labelledby="headingtwo"
          data-parent="#accordionExample"
        >
          <AddressMainComponent setAddress={setAddress} />
        </div>
      </div>
    </>
  );
};

export function AddressMainComponent({ setAddress }) {
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [UserAddressData, setUserAddressData] = useState([]);
  const [isLoading, setLoading] = useBoolean();

  useEffect(() => {
    !UserAddressData.length && fetchAllAddress();
  }, []);

  const UserIDs = cookies.get("userID");
  const UserID = UserIDs && Base64.atob(UserIDs);

  const fetchAllAddress = () => {
    setLoading.on();
    fetch(URL + "/APP-API/App/getAllAddress", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ UserID }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.address.length && setUserAddressData(responseJson.address);
        setAddress(responseJson.address[0]);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading.off();
      });
  };

  return (
    <div className="card-body p-0 border-top">
      <div className="osahan-order_address">
        <div className="p-3 row">
          <div className="col-12 mb-3">
            <AddressInModal setUserAddressData={setUserAddressData} />
          </div>
          <>
            {isLoading ? (
              <>
                <HStack alignItems={"center"}>
                  <Text fontWeight={"600"} fontSize={12}>
                    Fetching
                  </Text>
                  <Spinner size={"xs"} />
                </HStack>
              </>
            ) : UserAddressData.length ? (
              <>
                {UserAddressData.map((item, i) => {
                  return (
                    <div
                      key={i}
                      class="custom-control col-lg-6 custom-radio mb-3 position-relative border-custom-radio defaultChecked"
                      style={{ position: "relative" }}
                    >
                      {/* <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" /> */}
                      {item.distance_km}
                      <label
                        class="custom-control-label w-100"
                        for="customRadioInline1"
                      >
                        <div>
                          <div class="p-3 bg-white rounded w-100">
                            <p
                              class="mb-2 m-0"
                              style={{
                                fontSize: 16,
                                fontWeight: "700",
                                color: "#000",
                                textTransform: "capitalize",
                              }}
                            >
                              {item.name} , {item.phone}
                            </p>
                            <p class="small text-muted m-0">
                              {item.user_house_no} , {item.address}
                            </p>
                            <p class="small text-muted m-0">
                              {item.base_address} , {item.city}
                            </p>
                            <p
                              class="pt-2 m-0 text-right"
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 16,
                              }}
                            >
                              <span class="small">
                                <AddressInModal
                                  setUserAddressData={setUserAddressData}
                                  type="EDIT"
                                  editData={item}
                                />
                              </span>
                            </p>
                          </div>
                          <span
                            data-toggle="collapse"
                            data-target="#collapsethree"
                            onClick={() => {
                              setSelectedDeliveryAddress(item.address_id);
                              setAddress(item);
                            }}
                            className={
                              selectedDeliveryAddress == item.address_id
                                ? "pb-3 pt-2 text-center btn-block deliverHere-txt"
                                : "btn btn-default text-center btn-lg btn-block"
                            }
                          >
                            Deliver Here <HiOutlineArrowNarrowRight />
                          </span>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default AddressNewV2;
