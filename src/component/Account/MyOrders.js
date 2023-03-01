import React from 'react';
import Base64 from "../../helper/EncodeDecode";
import Cookies from 'universal-cookie';
import URL from "../../URL";
import { useEffect } from 'react';
import { useState } from 'react';
import { ModalDeliverd } from './OrderHistory/ModalDeliverd';
import { ModalProgress } from './OrderHistory/ModalInProgress';
import { ModalCanceled } from './OrderHistory/ModalCanceled';
import { Box, Image, Spinner, Text } from '@chakra-ui/react';
import { OrderListItem } from './OrderComponentV2/OrderListItem';
import { fetchAllOrders } from '../../api';
import { useQuery } from 'react-query';

const cookies = new Cookies();

export const MyOrder = (props) => {

    const { data } = useQuery('user_all_order', () => fetchAllOrders());

    return (
        <>
            <section class="col-lg-8">
                <div class="row">
                    {/* <div class="col-md-12 mb-3">
                        <ul class="nav  nav-tabs custom-tabs border-0 flex-row justify-content-around bg-white rounded overflow-hidden shadow-sm p-2 c-t-order"
                            id="myTab" role="tablist">
                            <li class="nav-item border-top" role="presentation">
                                <a class="nav-link border-0 text-dark py-3 active" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} id="progress-tab" data-toggle="tab"
                                    href="#progress" role="tab" aria-controls="progress" aria-selected="false">
                                    <i class="icofont-wall-clock mr-2 text-warning mb-0" style={{ width: "fit-content" }}></i> Progress</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link border-0 text-dark py-3" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} id="completed-tab" data-toggle="tab"
                                    href="#completed" role="tab" aria-controls="completed" aria-selected="true">
                                    <i class="icofont-check-alt mr-2 text-success mb-0" style={{ width: "fit-content" }}></i> Completed</a>
                            </li>
                            <li class="nav-item border-top" role="presentation">
                                <a class="nav-link border-0 text-dark py-3" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} id="canceled-tab" data-toggle="tab"
                                    href="#canceled" role="tab" aria-controls="canceled" aria-selected="false">
                                    <i class="icofont-close-line mr-2 text-danger mb-0" style={{ width: "fit-content" }}></i> Canceled</a>
                            </li>
                        </ul>
                    </div> */}
                    {!data ?
                        <Box h="50vh" display={"flex"} justifyContent="center" alignItems={"center"} w="100%">
                            <Spinner />
                        </Box>
                        :
                        <Box
                            w="100%"
                            pb={24}
                        >
                            {data.map((items, i) => {
                                return (
                                    <OrderListItem key={i} items={items} />
                                )
                            })}
                        </Box>
                    }
                    {/* <div class="tab-content col-md-12" id="myTabContent">
                        <div class="tab-pane fade show active" id="progress" role="tabpanel" aria-labelledby="progress-tab">
                            <div class="order-body">
                                {ordersHistory.some(e => e.Order_status !== 'Delivered' && e.Order_status !== 'Cancel') ?
                                    ordersHistory.map((items, i) => {
                                        return (
                                            items?.Order_status !== "Delivered" && items?.Order_status !== "Cancel" && <ModalProgress key={i} fetchData={fetchData} items={items} />
                                        )
                                    }) : <Box
                                        bg="#fff"
                                        display={"flex"}
                                        alignItems="center"
                                        justifyContent={"center"}
                                        flexDirection="column"
                                        p={10}
                                    >
                                        <Image
                                            src='https://organickle.com/images/no-order.svg'
                                        />
                                        <Text>No orders found</Text>
                                    </Box>}
                            </div>
                        </div>
                        <div class="tab-pane fade" id="completed" role="tabpanel"
                            aria-labelledby="completed-tab">
                            <div class="order-body">
                                {ordersHistory.map((items, i) => {
                                    return (
                                        items?.Order_status === "Delivered" && <ModalDeliverd key={i} items={items} />
                                    )
                                })}
                            </div>
                        </div>
                        <div class="tab-pane fade" id="canceled" role="tabpanel" aria-labelledby="canceled-tab">
                            <div class="order-body">
                                {ordersHistory.map((items, i) => {
                                    return (
                                        items?.Order_status === "Cancel" && <ModalCanceled key={i} items={items} />
                                    )
                                })}
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
        </>
    )

}