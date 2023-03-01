import { Box, Divider, Flex, Text } from "@chakra-ui/react"
import { AiOutlineRight } from "react-icons/ai";
import { IoMdRefresh } from 'react-icons/io';
import { IoCall } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export const OrderListItem = ({ items }) => {

    const { Order_status, orderItems, delivery_boy } = items;
    const navigation = useNavigate();

    return (
        <>
            <Box
                bg="#fff"
                my={2}
                p={3}
                px={5}
                w="100%"
                borderRadius={8}
                onClick={() => navigation("/orderDetails", { state: { orderDetails: items } })}
            >
                <Box mb={2}>
                    <Text
                        fontWeight={"700"}
                    >#{items.order_number}</Text>
                    <Text
                        fontWeight={"600"}
                    >{new Date(Number(items.order_time)).toLocaleDateString() == new Date().toLocaleDateString() ? "Today"
                        : new Date(Number(items.order_time)).toDateString()}, {new Date(Number(items.order_time)).toLocaleTimeString()}</Text>
                </Box>
                <Flex
                    justifyContent={"space-between"}
                >
                    <Box>
                        <Text fontWeight={"600"}>{orderItems.length} Items</Text>
                        <Box>
                            {orderItems.slice(0, 2).map((item, i) => {
                                return <Text color="#686868" fontSize={12}>{item.p_name} x{item.p_qty}</Text>;
                            })}
                            {/* <Text color="#686868" fontSize={12}>Atta 5kg x2</Text> */}
                            {/* <Text color="#686868" fontSize={12}>Dall of aarahar 5kg x2</Text> */}
                        </Box>
                    </Box>
                    <Box>
                        <Text fontWeight={"600"}>₹ {Math.round(items.total_amount)}</Text>
                    </Box>
                </Flex>
                <Divider my={3} />
                {
                    Order_status === "On the way" && <>
                        <Flex
                            justifyContent={"space-between"}
                            alignItems="center"
                        >
                            <Text display={"flex"}>Delivery boy: <Text fontWeight={"600"} ml={2}>
                                {delivery_boy.name}
                            </Text>
                            </Text>
                            <Flex
                                mr={3}
                                alignItems="center"
                                color="green"
                                onClick={() => window.Android?.callMe(delivery_boy.phone)}
                            >
                                <IoCall />
                                <Text ml={1}>Call Now</Text>
                            </Flex>
                        </Flex>
                        <Divider my={3} />
                    </>
                }
                <Box
                    color={"#fff"}
                >
                    {Order_status === "Cancel" ?
                        <Flex
                            justifyContent={"space-between"}
                            padding="8px 20px"
                            bg="#ff6c6c"
                            borderRadius={10}
                        // mt={4}
                        >
                            <Text
                                fontSize={12}
                                fontWeight="600"
                            >Canceled</Text>
                            <Text
                                fontSize={12}
                                fontWeight="600"
                            >View order <AiOutlineRight /> </Text>
                        </Flex> : Order_status === "Delivered" ?
                            <Flex
                                justifyContent={"space-between"}
                                padding="8px 20px"
                                bg="#00ad00"
                                borderRadius={10}
                            // mt={4}
                            >
                                <Text
                                    fontSize={12}
                                    fontWeight="600"
                                >Delivered</Text>
                                <Text
                                    fontSize={12}
                                    fontWeight="600"
                                >View order <AiOutlineRight /> </Text>
                            </Flex> : <Flex
                                justifyContent={"space-between"}
                                padding="8px 20px"
                                bg="#f59f00"
                                borderRadius={10}
                            // mt={4}
                            >
                                <Text
                                    fontSize={12}
                                    fontWeight="600"
                                >{Order_status}</Text>
                                <Text
                                    fontSize={12}
                                    fontWeight="600"
                                >View order <AiOutlineRight /> </Text>
                            </Flex>
                    }
                </Box>
            </Box>
        </>
    )

}