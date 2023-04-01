import React, { Component, useEffect } from "react";
import ContextProvider from "./context/contextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import HomePageSeo from "./page/HomePageSeo";

import LoginPage from "./page/LoginPage";
import AccountPage from "./page/AccountPage";
import ConditionPage from "./page/ConditionPage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Verification from "./component/Authentication/Verification";
import ProductsBySubcategoryPage from "./page/ProductsBySubcategoryPage";
import CartPage from "./page/CartPage";
import ProductDetailsPage from "./page/ProductDetailsPage";
import CategoryPage from "./page/CategoryPage";
import AccountPageApp from "./page/AccountPageApp";
import NotFoundPage from "./page/NotFoundPage";

import URL from "./URL";
import SearchPage from "./page/SearchPage";
import { OrderSuccessFull } from "./component/Cart/OrderSuccessfull";
import {
  Box,
  ChakraProvider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import GetMyLocationPage from "./page/GetMyLoactionPage";
import SaveMyAddressPage from "./page/SaveMyAddress";
import Testing from "./page/Testing";
import { useContext } from "react";
import ContextData from "./context/MainContext";
import OrderDetailsPage from "./page/OrderDetailsPage";

const App = () => {
  const { subcategories, products, keywords, seo_area } =
    useContext(ContextData);

  if (subcategories.length) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/location" element={<GetMyLocationPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          {subcategories.map((item, i) => {
            return (
              <Route
                key={i}
                path={
                  "/" +
                  (item.name + " delivery in gorakhpur")
                    .replace(/\s/g, "-")
                    .toLowerCase() +
                  "/:subcatID/:subcatName"
                }
                element={<ProductsBySubcategoryPage />}
              />
            );
          })}
          {products.map((item, i) => {
            return (
              <Route
                key={i}
                path={
                  "/" +
                  (item.product_name + " delivery in gorakhpur")
                    .replace(/\s/g, "-")
                    .toLowerCase() +
                  "/:prodID"
                }
                element={<ProductDetailsPage />}
              />
            );
          })}
          {/* USER ACCOUNT START */}
          <Route path="/orderSuccess" element={<OrderSuccessFull />} />
          <Route path="/accountApp" element={<AccountPageApp />} />
          <Route path="/orderDetails" element={<OrderDetailsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/savemyaddress" element={<SaveMyAddressPage />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/notification" element={<AccountPage />} />
          <Route path="/offers" element={<AccountPage />} />
          <Route path="/orders" element={<AccountPage />} />
          <Route path="/address" element={<AccountPage />} />
          <Route path="/condition" element={<AccountPage />} />
          <Route path="/contact" element={<AccountPage />} />
          <Route path="/about" element={<ConditionPage />} />
          <Route path="/term-and-condition" element={<ConditionPage />} />
          <Route path="/privacy-and-policy" element={<ConditionPage />} />
          <Route path="/shipping-policy" element={<ConditionPage />} />
          <Route path="/return-and-refund-policy" element={<ConditionPage />} />
          <Route path="/faq" element={<ConditionPage />} />
          <Route path="*" exact={true} element={<NotFoundPage />} />

          {/* USER ACCOUNT END */}
          {/* SEO START */}

          {keywords.map((item, i) => {
            return (
              <Route
                key={i}
                path={
                  "/" +
                  (item.keyword + " in gorakhpur")
                    .replace(/\s/g, "-")
                    .toLowerCase()
                }
                element={
                  <HomePageSeo
                    title={
                      item.keyword.replace(/(^\w|\s\w)/g, (m) =>
                        m.toUpperCase()
                      ) + " in Gorakhpur"
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/grocery-delivery-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Grocery Delivery in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/grocery-delivery-app-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Grocery Delivery App in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/grocery-delivery-website-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Grocery Delivery Website in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/online-grocery-delivery-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Online Grocery Delivery in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/online-vegetables-delivery-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Online Vegetables Delivery in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/vegetables-delivery-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Vegetables Delivery in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/vegetables-delivery-app-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Vegetables Delivery App in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/vegetables-delivery-website-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Vegetables Delivery Website in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/online-fruits-delivery-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Online Fruits Delivery in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/fruits-delivery-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Fruits Delivery in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/fruits-delivery-app-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Fruits Delivery App in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {seo_area.map((areadata, i) => {
            return (
              <Route
                key={i}
                path={
                  "/fruits-delivery-website-in-" +
                  areadata.area.replace(/\s/g, "-").toLowerCase() +
                  "-gorakhpur"
                }
                element={
                  <HomePageSeo
                    title={
                      "Fruits Delivery Website in " +
                      areadata.area +
                      " " +
                      areadata.city
                    }
                  />
                }
              />
            );
          })}

          {/* SEO END */}
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <div>
        <Box
          background={{ base: "#6bcb5b", md: "#fff" }}
          style={{ height: "100vh" }}
          className="d-flex justify-content-center"
        >
          <Box display={{ base: "block", md: "none" }}>
            <Image
              height={"100%"}
              width={"100%"}
              src="https://superg.in/admin/images/notification-images/home-loading.gif"
            />
          </Box>

          <Box display={{ base: "none", md: "block" }} mt={4}>
            <Box width={"60%"} margin="auto">
              <img
                src="./img/logo.svg"
                style={{ height: "100px", display: "block", margin: "auto" }}
              />
              <Text fontSize={24} fontWeight="800" textAlign={"center"}>
                Welcome to SuperG.in
              </Text>
            </Box>
            <Flex justifyContent={"center"} alignItems={"center"} my={20}>
              <Spinner />
            </Flex>
            <Box width={"60%"} margin="auto" mt={8}>
              <Text color="#4f5a63" textAlign={"center"}>
                The leading online vegetable, fruit, chicken and grocery home
                delivery service in Gorakhpur.
              </Text>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
};

export default App;
