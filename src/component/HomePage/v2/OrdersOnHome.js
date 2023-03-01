import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useQuery } from "react-query"
import { fetchAllOrders } from "../../../api"



const OrdersOnHome = () => {

    const { data } = useQuery("user_all_order", fetchAllOrders);

    return (
        <>
            {
                data?.map((orders, i) => {
                    const { Order_status, total_amount } = orders;
                    console.log("oerijksbisbjkasfkjlfjklhjkafkljafahsfkjas", orders)
                    if (Order_status === "On the way" || Order_status === "Preparing for Dispatch") {
                        return <>
                            <Flex
                                // justifyContent={"space-between"}
                                p={2}
                                my={3}
                                bg="#fff"
                                borderRadius={8}
                                alignItems="center"
                            >
                                <Box>
                                    <Image
                                        src={Order_status === "Preparing for Dispatch" ?
                                            "https://www.justmyfoods.com/images/delivery.gif" :
                                            "https://cdn.dribbble.com/users/379798/screenshots/3244368/scooter-running.gif"}
                                        height={10}
                                    />
                                </Box>
                                <Text
                                    textTransform={"capitalize"}
                                    ml={2}
                                    fontSize={12}
                                >
                                    Your order worth ₹{Math.round(total_amount)} is {Order_status}
                                </Text>
                            </Flex>
                        </>
                    }
                })
            }
        </>
    )

}


export default OrdersOnHome;