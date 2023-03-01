import { Box, Divider, Flex, Image, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { IoCall } from "react-icons/io5";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react';
import { FcCancel } from "react-icons/fc";
import { cancelOrder } from "../../../api";



const reasionForCancelingTheOrders = [
    {
        reasion: "Order placed by mistake",
        key: 1
    },
    {
        reasion: "I want to order a different product",
        key: 2
    },
    {
        reasion: "The order took too long to deliver",
        key: 3
    },
    {
        reasion: "Need to Change Shipping Address",
        key: 4
    },
    {
        reasion: "I am getting a better price",
        key: 5
    },
    {
        reasion: "My reason is not listed",
        key: 6
    },

];


export const OrderDetails = ({ data }) => {

    const { Order_status: status_order, address_details, orderItems } = data;
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [canceledResion, setResion] = useState("");
    const [Order_status, setOrderStatus] = useState(status_order);

    const cancelMyOrder = async (order_number) => {
        setIsLoading(true);
        const data = await cancelOrder(order_number, reasionForCancelingTheOrders[canceledResion - 1].reasion);
        if (data) {
            setOrderStatus("Cancel");
            onCloseModal();
        }
    }

    return (
        <>
            <Box
                bg="#fff"
                my={2}
                p={4}
                // pt={}
                px={5}
                mb={"6rem"}
                w="100%"
                borderRadius={8}
            >
                <Flex justifyContent={"space-between"}>
                    <Box mb={2}>
                        <Text
                            fontWeight={"700"}
                        >#{data.order_number}</Text>
                        <Text
                            fontWeight={"600"}
                        >{new Date(Number(data.order_time)).toLocaleDateString() == new Date().toLocaleDateString() ? "Today"
                            : new Date(Number(data.order_time)).toDateString()}, {new Date(Number(data.order_time)).toLocaleTimeString()}</Text>
                    </Box>
                    <Box>
                        {Order_status === "Cancel" ?
                            <Text
                                color="red"
                                fontSize={12}
                                fontWeight="600"
                            >Canceled</Text>
                            : Order_status === "Delivered" ?
                                <Text
                                    color="#00b778"
                                    fontSize={12}
                                    fontWeight="600"
                                >Delivered</Text>
                                :
                                <Text
                                    color="#ffb116"
                                    fontSize={12}
                                    fontWeight="600"
                                >{Order_status}</Text>
                        }
                    </Box>
                </Flex>
                <Box>
                    <Text fontWeight={"500"} color="#686868">Delivery to</Text>
                    <Box>
                        <Text color="#000" fontWeight={"600"} fontSize={12}>{address_details?.name}, {address_details?.phone}</Text>
                        <Text color="#000" fontWeight={"600"} fontSize={12}>{address_details?.user_house_no}, {address_details?.address}, {address_details?.base_address}</Text>
                    </Box>
                </Box>
                <Box mt={3}>
                    <Text fontWeight={"500"} color="#686868">Payment Method</Text>
                    <Box>
                        <Text color="#000" fontWeight={"600"} fontSize={12}>Cash on delivery</Text>
                    </Box>
                </Box>
                <Divider my={3} />
                <Box>
                    <Text fontWeight={"500"} color="#686868">ITEMS</Text>
                    <Box mt={2}>
                        {orderItems.map((item, i) => {
                            return <Flex alignItems={"center"} mb={2} justifyContent="space-between">
                                <Flex alignItems={"center"} >
                                    <Image height={8} boxShadow="0 1px 5px 0 #d7d7d7" borderRadius={10} src={URL + "/images/product-images/" + item.p_image} />
                                    <Box>
                                        <Text ml={3} fontWeight="600" color={"#000"}>{item.p_name} x{item.p_qty}</Text>
                                        <Text ml={3} fontSize={10} color={"#686868"}>{item.p_size}{item.p_unit}</Text>
                                    </Box>
                                </Flex>
                                <Text fontWeight={"600"}>₹ {Math.round((item.p_price) - ((item.p_price) * (item.p_discount / 100))) * item.p_qty}</Text>
                            </Flex>
                        })}
                    </Box>
                </Box>
                <Divider my={3} />
                <Box mt={4}>
                    <Flex justifyContent={"space-between"} mb={2}>
                        <Text fontSize={12}>Item total</Text>
                        <Text style={{ fontWeight: "700" }}>₹ {Math.round(data.isDevApplied ? (data.total_amount - data.delcharge) : (data.total_amount))}</Text>
                    </Flex>
                    {Number(data.isDevApplied) ? <Flex justifyContent={"space-between"} mb={2}>
                        <Text fontSize={12}>Delivery Charges</Text>
                        <Text style={{ fontWeight: "700" }}>+₹ {data.isDevApplied ? (data.delcharge) : "00"}</Text>
                    </Flex> : null}
                    <Divider width={"80%"} margin="auto" my={3} />
                    <Flex justifyContent={"space-between"} alignItems="center" mb={2}>
                        <Text fontSize={16} style={{ fontWeight: "700" }}>Total</Text>
                        <Text style={{ fontWeight: "700" }}>₹ {Number(data.is_carry_bag_taken) ? Math.round(data.total_amount) + Number(data.carry_bag_charge) : Math.round(data.total_amount)}</Text>
                    </Flex>
                </Box>
                {Order_status === "Delivered" || Order_status === "Cancel" ? null :
                    <>
                        <Divider my={3} />
                        <Flex alignItems={"center"} justifyContent="center" py={3} px={5} borderRadius={10} bg="none">
                            <Button onClick={onOpenModal} colorScheme={"red"} size={"sm"} px={10} fontSize={14} fontWeight="500">Cancel Order</Button>
                        </Flex>
                    </>
                }
                <Divider my={3} />
                <Flex alignItems={"center"} justifyContent="space-between" py={3} px={5} borderRadius={10} bg="green.100">
                    <Flex alignItems={"center"}>
                        <IoCall color="green" size={20} />
                        <Box ml={3}>
                            <Text fontWeight={"700"} fontSize={14}>Need Support?</Text>
                            <Text fontWeight={"500"} fontSize={10}>Call Us</Text>
                        </Box>
                    </Flex>
                    <Text color="green"
                        onClick={() => window.Android?.callMe("6391000414")}
                    >Make call</Text>
                </Flex>
            </Box>
            <Modal onClose={onCloseModal} isOpen={isOpenModal} size={"xs"} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cancel Order
                        <Text fontSize={12} fontWeight="500">Please choose a reason below</Text>
                    </ModalHeader>
                    <ModalCloseButton background="none" border="none" />
                    <ModalBody maxHeight="lg" overflow="auto">
                        {reasionForCancelingTheOrders.map((reasion, i) => {
                            return <Box
                                key={reasion.key}
                                padding={2}
                                borderRadius={4}
                                mb={3}
                                pl={3}
                                onClick={() => setResion(reasion.key)}
                                bg={canceledResion == reasion.key ? "#24252e" : "#efefef"}
                                color={canceledResion == reasion.key && "#fff"}
                            >
                                <Text>{reasion.reasion}</Text>
                            </Box>
                        })}
                        {/* <div className="text-center">
                            <FcCancel size={65} />
                            <p>Are you sure to cancel your order??</p>
                        </div> */}
                    </ModalBody>
                    <ModalFooter justifyContent={"end"}>
                        <Button isLoading={isLoading} disabled={!canceledResion} colorScheme={"red"} size={"sm"} onClick={() => cancelMyOrder(data.order_number)} >Cancel Order</Button>
                        {/* <Button colorScheme={"blue"} onClick={onCloseModal} >No</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}