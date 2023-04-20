import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";

export function SearchLocationByInput({
  isLoading,
  isPlacePredictionsLoading,
  getPlacePredictions,
  placePredictions,
  setSelectedAddress,
}) {
  return (
    <>
      <Box p={{ base: 5 }} pt={{ base: 16, lg: 5 }}>
        {isLoading ? (
          <Flex h={"50%"} className="items-center justify-center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsSearch color="gray.300" />}
              />
              <Input
                placeholder="Search your address"
                fontSize={12}
                bg={"#efefef"}
                onChange={(evt) => {
                  getPlacePredictions({ input: evt.target.value });
                }}
                loading={isPlacePredictionsLoading}
              />
            </InputGroup>
            <Box h={{ base: "100%", lg: "36vh" }} overflow={"scroll"} mt={2}>
              {isPlacePredictionsLoading ? (
                <Flex h={"50%"} className="items-center justify-center">
                  <Spinner />
                </Flex>
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
          </>
        )}
      </Box>
    </>
  );
}
