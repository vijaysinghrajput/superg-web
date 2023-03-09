import React from "react";
import Category from "./Category";
import OshanContainer from "../comman/OshanContainer";
import Promo from "./Promo";
import TodayPicks from "./TodayPicks";
import { Box, Image } from "@chakra-ui/react";
import { useContext } from "react";
import ContextData from "../../context/MainContext";
import ProductsByCategoryHomePage from "./ProductsByCategoryHomePage";
import HomeCategorys from "./v2/HomeCategorys";
import OrderOnHome from "./v2/OrdersOnHome";
import BannerNew from "./v2/BannerNew";

const HomeComponent = (props) => {
  const { subcategories } = useContext(ContextData);

  return (
    <>
      <OshanContainer>
        <Box p={{ base: 6, md: 0 }} />

        <OrderOnHome />

        <Promo />

        <HomeCategorys />

        <TodayPicks />

        {/* <Promo /> */}

        <BannerNew />

        {subcategories.slice(0, 3).map((subCat, i) => {
          return (
            <Box py={4} key={i}>
              <ProductsByCategoryHomePage subCat={subCat} />
            </Box>
          );
        })}
      </OshanContainer>
    </>
  );
};

export default HomeComponent;
