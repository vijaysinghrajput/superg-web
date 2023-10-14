import React, { useContext } from "react";
import { useState } from "react";
import ContextData from "../../context/MainContext";
import { ProductLoading } from "../Loaders/SkeletonLoader";
import BasicVegitableFruit from "../ProductsCards/BasicVegitableFruit";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { SliderProductCard } from "../ProductsCards/SliderProductCard";

const TodayPicks = (props) => {
  const data = useContext(ContextData);
  const { features_products } = data;

  return (
    <>
      <Box
      // borderRadius={5}
      // padding="0.5rem 1rem"
      // bg="#56ab2f"
      // mt={4}
      // background="-webkit-linear-gradient(to right, #637ae0, #2f4bab)"
      // backgroundImage="linear-gradient(to right, #637ae0, #2f4bab)"
      >
        <Text fontSize={20} fontWeight="800" mb={4} mt={2} color="#000">
          Best selling products
        </Text>
        <Box my={4} className="row">
          {/* <Flex
                        direction={"row"}
                        className="no-scroll"
                        overflow={"auto"}
                        gap={2}
                    > */}
          {features_products.map((data, i) => {
            return <BasicVegitableFruit data={data} />;
          })}
          {/* </Flex> */}
        </Box>
      </Box>
    </>
  );
};

export default TodayPicks;
