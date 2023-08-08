import { Spinner, Text } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ContextData from "../../context/MainContext";
import { Filter } from "../comman/Fillter";
import OshanContainer from "../comman/OshanContainer";
import { BasicVegitableFruit } from "../ProductsCards/BasicVegitableFruit";
import Seo from "../Seo";
import { Box, Flex, Grid, GridItem, Image, SimpleGrid } from "@chakra-ui/react";

const ProductsByCategory = (props) => {
  const { subcatID, subcatName } = useParams();
  const data = useContext(ContextData);
  const { products, subcategories } = data;
  const [isLoading, setIsLoading] = useState(true);
  const [productsBySub, setProductsBySub] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [shorting, setShorting] = useState({});
  const location = useLocation();

  useEffect(() => {
    // window.scrollTo(0, 0)
    setIsLoading(true);
    setSubCat(subcategories.filter((sc) => sc.parent_id == subcatID));
    setProductsBySub(products.filter((p) => p.parent_id == subcatID));
    setIsLoading(false);
  }, [products, subcatID]);

  const setShortingByClick = (shorting) => {
    const myProd = products.filter((p) => p.category_id == subcatID);
    const { priceLTH, priceHTL, discount } = shorting;
    priceLTH
      ? setProductsBySub(
          myProd.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        )
      : priceHTL
      ? setProductsBySub(
          myProd.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        )
      : discount
      ? setProductsBySub(
          myProd.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount))
        )
      : setProductsBySub(products.filter((p) => p.category_id == subcatID));
  };

  return (
    <>
      <Seo
        title={
          subcatName +
          " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
        }
        descreption={
          subcatName +
          " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
        }
        image={null}
      />

      {/* <OshanContainer>
                <div class="d-flex align-items-center mb-3">
                    <Text fontSize={24} fontWeight="800">{subcatName}</Text>
                    <div class="m-0 text-center ml-auto">
                        <a href="#" data-toggle="modal" data-target="#exampleModal"
                            class="btn text-muted bg-white mr-2"><i class="icofont-filter mr-1"></i> Filter</a>
                    </div>
                </div>
                <div class="row">
                    {
                        productsBySub.map((data, i) => {
                            return (
                                <BasicVegitableFruit key={i} data={data} />
                            )
                        })
                    }
                </div>
                <Filter setShortingMain={setShortingByClick} />
            </OshanContainer> */}
      {/* <OshanContainer> */}
      <Box py={{ base: 14 }}>
        <Grid templateColumns="repeat(6, 1fr)" gap={0}>
          <GridItem
            position={"sticky"}
            top={14}
            left={0}
            height={"100vh"}
            overflow={"auto"}
            paddingBottom={"6rem"}
          >
            <Box pb={20}>
              <Flex
                p={{ base: 2, lg: 2 }}
                mt={2}
                mb={2}
                px={{ base: 1, lg: 4 }}
                alignItems={"center"}
                bg={"#e7e7ee"}
                color={"#000"}
                borderLeft={{
                  base: "none",
                  lg: "4px solid",
                }}
                borderLeftColor={"themeColor.700"}
                _hover={{
                  bg: "#e7e7ee",
                  color: "#000",
                }}
                cursor={"pointer"}
                direction={{ base: "column", lg: "row" }}
              >
                <Text
                  h={12}
                  w={12}
                  borderRadius={"50%"}
                  bg="#efefef"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  align={"center"}
                >
                  All
                </Text>
                <Text
                  fontSize={{ base: 8, lg: 14 }}
                  ml={{ base: 0, lg: 2 }}
                  color={"themeColor.800"}
                  textAlign={{ base: "center", lg: "left" }}
                >
                  All
                </Text>
              </Flex>
              {subCat.map((item, i) => {
                return (
                  <Link
                    state={location.pathname}
                    to={
                      "/" +
                      (item.name + " delivery in gorakhpur")
                        .replace(/\s/g, "-")
                        .toLowerCase() +
                      "/" +
                      item.id +
                      "/" +
                      item.name
                    }
                  >
                    <Flex
                      p={{ base: 1, lg: 2 }}
                      mb={2}
                      px={{ base: 1, lg: 4 }}
                      alignItems={"center"}
                      bg={item.id === subcatID ? "#e7e7ee" : "#fff"}
                      color={item.id === subcatID ? "#000" : "#000"}
                      borderLeft={{
                        base: "none",
                        lg: i === 1 ? "4px solid" : "",
                      }}
                      borderLeftColor={"themeColor.700"}
                      _hover={{
                        bg: "#e7e7ee",
                        color: "#000",
                      }}
                      cursor={"pointer"}
                      direction={{ base: "column", lg: "row" }}
                    >
                      <Image
                        //   borderRadius={"50%"}
                        //   bg={i === 1 ? "#fff" : "#9f9f9f"}
                        src={URL + "/images/category_images/" + item.image}
                      />
                      <Text
                        // fontWeight={i === 1 ? "700" : "500"}
                        fontSize={{ base: 8, lg: 14 }}
                        ml={{ base: 0, lg: 2 }}
                        color={"themeColor.800"}
                        textAlign={{ base: "center", lg: "left" }}
                      >
                        {item.name}
                      </Text>
                    </Flex>
                  </Link>
                );
              })}
            </Box>
          </GridItem>
          <GridItem colSpan={5} borderLeft={"1px solid #efefef"}>
            {isLoading ? (
              <Flex
                height={"70%"}
                width={"fit-content"}
                margin={"auto"}
                alignItems={"center"}
              >
                <Spinner />
              </Flex>
            ) : (
              <Box>
                <Box py={6} px={8} display={{ base: "none", lg: "block" }}>
                  <Text fontSize={24} fontWeight={"500"}>
                    Fruits & Vegetables (266)
                  </Text>
                </Box>
                <Box background={{ base: "#efefef", lg: "none" }} p={1}>
                  <SimpleGrid
                    columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
                    gap={0}
                  >
                    {productsBySub.map((data, i) => {
                      return <BasicVegitableFruit key={i} data={data} w={9} />;
                    })}
                  </SimpleGrid>
                </Box>
              </Box>
            )}
          </GridItem>
        </Grid>
      </Box>
      {/* </OshanContainer> */}
    </>
  );
};

export default ProductsByCategory;
