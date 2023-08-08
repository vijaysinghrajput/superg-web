import React, { useContext, useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link, useLocation } from "react-router-dom";
import { CategoryLoading } from "../../Loaders/SkeletonLoader";
import ContextData from "../../../context/MainContext";
import { Box, Flex, Text } from "@chakra-ui/react";

const HomeCategorys = (props) => {
  const data = useContext(ContextData);
  const location = useLocation();

  const { categories } = data;

  return (
    <>
      <div class="osahan-categories">
        <Text fontSize={20} fontWeight="800" my={4}>
          Shop by categorys
        </Text>
        <div class="row">
          {!categories ? (
            <>
              <CategoryLoading />
              <CategoryLoading />
              <CategoryLoading />
              <CategoryLoading />
            </>
          ) : categories ? (
            <>
              {categories.map((item, i) => {
                return (
                  <div class="col-4 col-md-2 mb-0 p-1" key={i}>
                    <Box
                      bg="#cdeeff"
                      className="list-card h-100 rounded overflow-hidden position-relative shadow-sm"
                    >
                      <Flex
                        p={3}
                        justifyContent="center"
                        alignItems={"center"}
                        h="100%"
                      >
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
                          <Text
                            fontWeight={"600"}
                            fontSize={12}
                            color="#000"
                            textAlign="center"
                          >
                            {item.name}
                          </Text>
                          <img
                            src={URL + "/images/category_images/" + item.image}
                            class="img-fluid item-img w-100"
                            alt={
                              item.name +
                              " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                            }
                            title={
                              item.name +
                              " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                            }
                            style={{ height: 75, objectFit: "contain" }}
                          />
                        </Link>
                      </Flex>
                    </Box>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default HomeCategorys;
