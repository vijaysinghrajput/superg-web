import React, { useContext, useEffect, useState } from "react";
import contextData from "../../context/MainContext";
import URL from "../../URL";
import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link, useLocation } from "react-router-dom";
import { CategoryLoading } from "../Loaders/SkeletonLoader";
import ContextData from "../../context/MainContext";
import { BasicVegitableFruit } from "../ProductsCards/BasicVegitableFruit";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { SliderProductCard } from "../ProductsCards/SliderProductCard";
import Promo from "./Promo";
import BannerNew from "./v2/BannerNew";

const ProductsByCategoryHomePage = ({ subCat }) => {
  const { products } = useContext(ContextData);
  const [productsBySub, setProductsBySub] = useState([]);
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

  // console.log("navneeteugi ===>", subCat, products)

  useEffect(() => {
    setProductsBySub(products.filter((p) => p.category_id == subCat.id));
  }, [products, subCat.id]);

  const options = {
    autoplay: true,
    autoplayHoverPause: true,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 7,
      },
    },
  };

  return (
    <>
      <Box
        borderRadius={5}
        // padding="0.5rem 1rem"
        // bg="#8EC5FC"
        // backgroundImage={"linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"}
        // backgroundImage={"linear-gradient( 109.6deg,  rgba(209,0,116,1) 11.2%, rgba(110,44,107,1) 91.1% )"}
      >
        <Text fontSize={20} fontWeight="800" mb={4} mt={2} color="#000">
          {subCat.name}
        </Text>
        <Box my={4}>
          <Flex
            direction={"row"}
            className="no-scroll"
            wrap={{ base: "unset", lg: "wrap" }}
            overflow={"auto"}
            gap={{ base: 2, lg: 0 }}
          >
            {productsBySub
              .slice(0, !isNotSmallerScreen ? 5 : 11)
              .map((data, i) => {
                if (!isNotSmallerScreen) {
                  return <SliderProductCard key={i} data={data} w={9} />;
                }
                return <BasicVegitableFruit key={i} data={data} w={9} />;
              })}
            <div class="col-6 col-md-2 mb-0 p-1">
              <Link
                to={
                  "/" +
                  (subCat.name + " delivery in gorakhpur")
                    .replace(/\s/g, "-")
                    .toLowerCase() +
                  "/" +
                  subCat.id +
                  "/" +
                  subCat.name
                }
              >
                <Box
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent={"center"}
                  h="100%"
                  borderRadius={10}
                  color="#fff"
                  fontWeight={"600"}
                  background="#149d14"
                  textAlign={"center"}
                  p={8}
                  boxShadow="0 1px 12px 0px #bcbcbc"
                >
                  <Box>
                    {/* <Image
                                    src={"https://static.vecteezy.com/system/resources/thumbnails/008/935/632/small/abstract-3d-green-waves-paper-art-layer-background-and-texture-vector.jpg"}
                                    filter="blur(5px)"
                                /> */}
                    <Text fontSize={18} mr={2} textAlign="center">
                      Show More {subCat.name}
                    </Text>
                    <HiOutlineArrowNarrowRight size={18} />
                  </Box>
                </Box>
              </Link>
            </div>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default ProductsByCategoryHomePage;
