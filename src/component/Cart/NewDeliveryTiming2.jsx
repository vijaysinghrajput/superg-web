import {
  Box,
  Text,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const fetchSlots = async ({ STORE_CODE = "", lat, lng, address_id }) => {
  const body = { STORE_CODE, lat, lng, address_id };
  const data = await fetch(URL + "/APP-API/App/fetchSlots", {
    method: "post",
    header: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const finalResponse = await data.json();
  return finalResponse;
};

export default function CartSlot({
  address,
  setMinimumOrderValue,
  setDeliveryTiming,
  setDeliveryNotAvilable,
  setMinimumAmountForFreeDelivery,
  setDeliveryCharge,
}) {
  // console.log("sdjfksdfkhsakdhfkshdkfh ---->", address);
  const [selectedSlot, setSelected] = useState({
    id: null,
    title: null,
  });

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["slots", address],
    queryFn: (e) =>
      fetchSlots({
        lat: address.latitude,
        lng: address.longitude,
        address_id: address.address_id,
      }),
    enabled: address !== undefined && address !== null,
    refetchInterval: 5 * 60 * 1000,
  });

  const slotsResponse = data;

  useEffect(() => {
    console.log("daya --->", slotsResponse);
    if (slotsResponse) {
      setMinimumOrderValue(slotsResponse?.minimumOrder);
      setMinimumAmountForFreeDelivery(
        slotsResponse?.miniumAmountForFreeDelivery
      );
      setDeliveryCharge(slotsResponse?.deliveryCharge);
    }

    slotsResponse &&
      !slotsResponse?.slotsData.length &&
      setDeliveryNotAvilable({
        status: true,
        reason: slotsResponse?.deliveryNotAvilablereason,
      });
    slotsResponse &&
      !slotsResponse?.deliveryNotAvilable &&
      setDeliveryNotAvilable({
        status: true,
        reason: slotsResponse?.deliveryNotAvilablereason,
      });
  }, [slotsResponse]);

  useEffect(() => {
    setDeliveryTiming({
      day: new Date(),
      timingSlot: selectedSlot?.title,
    });
  }, [selectedSlot]);

  //   useEffect(() => {
  //     if (slotsResponse && slotsResponse.deliveryCharge) {
  //       setDeliveryCharge(slotsResponse.deliveryCharge);
  //       setMiniumAmountForFreeDelivery(slotsResponse.miniumAmountForFreeDelivery);
  //     }

  //     console.log("chote paa --->", slotsResponse);

  //     if (slotsResponse && !slotsResponse?.deliveryNotAvilable) {
  //       setIsDeliveryNotAvilable({
  //         avilable: true,
  //         reason: slotsResponse?.deliveryNotAvilablereason,
  //       });
  //     } else {
  //       setIsDeliveryNotAvilable({
  //         avilable: false,
  //         reason: "",
  //       });
  //     }

  //     return () => {
  //       setUserSelectedSlot(null);
  //     };
  //   }, [slotsResponse]);

  // console.log("hey there ---->", distanceFromStore);
  // console.log("hey data from slots component ---->", slotsResponse);

  const setValue = (value) => {
    console.log("va;ue --->", value);
    // setUserSelectedSlot(id);
    setSelected({
      id: value.id,
      title: `${value.slot_time_start}${value.start_time_postfix} - ${value.slot_time_end}${value.end_time_postfix}`,
    });
  };

  //   if (!slotsResponse?.deliveryNotAvilable) {
  //     return <></>;
  //   }

  return (
    <>
      <div className="card border-0 osahan-accor rounded overflow-hidden mt-3">
        <div className="card-header bg-white border-0 p-0" id="headingthree">
          <h2 className="mb-0">
            <button
              className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0"
              type="button"
              data-toggle="collapse"
              data-target="#collapsethree"
              aria-expanded="true"
              aria-controls="collapsethree"
            >
              <span className="c-number">3</span> Delivery Time
            </button>
          </h2>
        </div>
        <div
          id="collapsethree"
          className="collapse"
          aria-labelledby="headingthree"
          data-parent="#accordionExample"
        >
          <Box
            p={4}
            bg={"#fff"}
            mb={4}
            // boxShadow={"0 0 10px 0px #dbdbdb"}
            borderRadius={{ base: 0, sm: 8 }}
          >
            <HStack justifyContent={"space-between"}>
              <Text fontSize={16} fontWeight={"700"}>
                Delivery Slots
                <Text as={"span"} ml={2} fontSize={14}>
                  ( {slotsResponse?.slotsFor} )
                </Text>
              </Text>
              {isFetching && (
                <HStack alignItems={"center"}>
                  <Text fontWeight={"600"} fontSize={12}>
                    Fetching
                  </Text>
                  <Spinner size={"xs"} />
                </HStack>
              )}
            </HStack>

            {isFetching || isLoading ? (
              <Box py={4}>
                <Skeleton height="12px" w={66} borderRadius={3} />
                <HStack mt={4}>
                  <Skeleton height="32px" w={86} borderRadius={6} />
                  <Skeleton height="32px" w={86} borderRadius={6} />
                </HStack>
                <Skeleton mt={6} height="12px" w={66} borderRadius={3} />
                <HStack mt={4}>
                  <Skeleton height="32px" w={86} borderRadius={6} />
                  <Skeleton height="32px" w={86} borderRadius={6} />
                </HStack>
              </Box>
            ) : (
              slotsResponse?.slotsData?.map((slot, i) => {
                return (
                  <Box my={1}>
                    <Text fontWeight={"500"} mt={3} fontSize={12}>
                      {slot.title}
                    </Text>
                    <Flex mt={2} flexWrap={"wrap"} gap={1}>
                      {slot.slots.map((times, i) => {
                        const disabled = times.exceded && {
                          borderColor: "blackAlpha.400",
                          color: "blackAlpha.300",
                          cursor: "no-drop",
                        };

                        return (
                          <Flex
                            key={`slots${times.id}`}
                            p={2}
                            px={4}
                            direction={"column"}
                            fontSize={10}
                            borderRadius={6}
                            border={"1px solid"}
                            data-toggle="collapse"
                            data-target="#collapsefour"
                            // borderColor={"secondaryColor.700"}
                            bg={selectedSlot.id === times.id ? "#149d143d" : ""}
                            // color={"secondaryColor.900"}
                            borderColor={
                              selectedSlot.id === times.id
                                ? "#149d14c2"
                                : "blackAlpha.500"
                            }
                            // bg={"secondaryColor.100"}
                            color={
                              selectedSlot.id === times.id
                                ? "#149d14e8"
                                : "blackAlpha.700"
                            }
                            fontWeight={"700"}
                            w={"fit-content"}
                            cursor={"pointer"}
                            onClick={() => !times.exceded && setValue(times)}
                            {...disabled}
                            ml={0}
                          >
                            <Text>
                              {times.slot_time_start}
                              {times.start_time_postfix} - {times.slot_time_end}
                              {times.end_time_postfix}
                            </Text>
                            {/* <Text
                          fontWeight={"600"}
                          color={"blackAlpha.700"}
                          fontSize={10}
                        >
                          Delivery Fee
                        </Text> */}
                          </Flex>
                        );
                      })}
                      {/* <Flex
                  p={2}
                  px={4}
                  direction={"column"}
                  fontSize={10}
                  borderRadius={6}
                  border={"1px solid"}
                  borderColor={"blackAlpha.500"}
                  // bg={"secondaryColor.100"}
                  color={"blackAlpha.700"}
                  fontWeight={"700"}
                  w={"fit-content"}
                >
                  <Text>8AM - 9AM</Text>
                </Flex> */}
                    </Flex>
                  </Box>
                );
              })
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
