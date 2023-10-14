import React, { useContext, useState, useEffect, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import URL from "../../URL";
import ContextData from "../../context/MainContext";
import { MdDelete } from "react-icons/md";
import { BsFillBellFill, BsPlusLg } from "react-icons/bs";
import { Box, Button, Text } from "@chakra-ui/react";
// import { Img } from "react-image";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BasicVegitableFruit = ({ data, key, mdSize = 2, scrollPosition }) => {
  const mainData = useContext(ContextData);
  const location = useLocation();

  const [productData, setProductData] = useState({
    itemQuant: 0,
    productDetails: data,
    price: data.price,
  });

  useEffect(() => {
    const isAvilable = mainData.cartItems.find((o) => o.id === data.id);
    isAvilable
      ? setProductData({
          ...productData,
          itemQuant: isAvilable.itemQuant,
          price: isAvilable.price,
        })
      : setProductData({
          ...productData,
          itemQuant: 0,
          price: data.price,
        });
  }, [mainData, data]);

  return (
    <>
      <div
        class={`col-6 col-md-${mdSize} mb-0 p-1`}
        style={{
          maxWidth: "100%",
        }}
        key={key}
      >
        <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
          <div class="list-card-image">
            {data.discount !== "0" && data.status != "0" && (
              <div class="member-plan position-absolute" style={{ zIndex: 9 }}>
                <span
                  class="badge m-3 badge-danger"
                  style={{
                    background: "#28a745",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  {Math.round(data.discount)} %
                </span>
              </div>
            )}
            <div class="">
              <Link
                state={location.pathname}
                to={
                  "/" +
                  (data.product_name + " delivery in gorakhpur")
                    .replace(/\s/g, "-")
                    .toLowerCase() +
                  "/" +
                  data.id
                }
              >
                <Box position={"relative"} p={1}>
                  <LazyLoadImage
                    src={URL + "/images/product-images/" + data.product_image}
                    // width={250} height={250}
                    placeholderSrc="/img/logo-500-min.png"
                    scrollPosition={scrollPosition}
                    height={140}
                    effect="blur"
                    class="img-fluid item-img w-100 mb-3"
                    alt={
                      data.product_name +
                      " delivery in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                    }
                    title={
                      data.product_name +
                      " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                    }
                    style={data.status == "0" ? { filter: "blur(0px)" } : {}}
                  />

                  {/* <Image
                    src={URL + "/images/product-images/" + data.product_image}
                    class="img-fluid item-img w-100 mb-3"
                    alt={
                      data.product_name +
                      " delivery in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                    }
                    title={
                      data.product_name +
                      " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                    }
                    style={data.status == "0" ? { filter: "blur(0px)" } : {}}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/img/logo-500.png";
                    }}
                  /> */}
                  {data.status == "0" && (
                    <Box
                      position={"absolute"}
                      transform="translate(0%, -36%)"
                      top="50%"
                      p={4}
                      bg="#ffffffde"
                      backdropFilter={"blur(1px)"}
                      width="100%"
                    >
                      <Text
                        textAlign={"center"}
                        fontSize={{ base: 14, md: 20 }}
                        color="red"
                        fontWeight={"800"}
                      >
                        Out Of Stock
                      </Text>
                    </Box>
                  )}
                </Box>
                {/* <h6 className='px-3 pt-3 pb-0' style={{ color: "#000" }}>{data.product_name} <small>{data?.hindi_name}</small></h6> */}
                <Text px={4} noOfLines={1}>
                  {data.product_name} <small>{data?.hindi_name}</small>
                </Text>
              </Link>
              <div class="d-flex align-items-center px-3 pb-3 pt-0">
                {data.status == "1" && (
                  <div>
                    {data.discount != 0 && (
                      <h6
                        class="price m-0 text-dark mt-1"
                        style={{ textDecoration: "line-through" }}
                      >
                        ₹{Math.round(data.price)}/
                        {data.product_size + data.product_unit}
                      </h6>
                    )}
                    <h6
                      class="price m-0 text-success mt-1"
                      style={{ fontSize: 18 }}
                    >
                      ₹
                      {Math.round(
                        data.price - data.price * (data.discount / 100)
                      )}
                      /{data.product_size + data.product_unit}
                    </h6>
                  </div>
                )}
                <div className="ml-auto plus-minus-container">
                  <div>
                    {data.status != "0" ? (
                      !productData.itemQuant ? (
                        <div
                          className="plusMinusFun d-flex justify-content-between px-3 align-items-center"
                          style={{
                            width: "fit-content",
                            padding: 8,
                            marginLeft: "auto",
                            cursor: "pointer",
                            backdropFilter: "blur(8px)",
                          }}
                          onClick={() =>
                            mainData.addToCart({
                              ...data,
                              itemQuant: 1,
                              cartId: data.id,
                            })
                          }
                        >
                          <Box
                            display="flex"
                            color={"#008500"}
                            alignItems="center"
                          >
                            {/* <BsPlusLg style={{ cursor: "pointer" }} size={16} /> */}
                            <Text mx={2} fontSize={14} fontWeight="700">
                              ADD
                            </Text>
                          </Box>
                        </div>
                      ) : (
                        <div class="plusMinusFun d-flex justify-content-between px-3 align-items-center selected_item">
                          {productData.itemQuant === 1 ? (
                            <MdDelete
                              style={{ fontSize: 22, cursor: "pointer" }}
                              onClick={() => mainData.removeFromCart(data.id)}
                            />
                          ) : (
                            <AiOutlineMinus
                              style={{ fontSize: 22, cursor: "pointer" }}
                              onClick={() =>
                                mainData.addToCart({
                                  ...data,
                                  itemQuant: productData.itemQuant - 1,
                                  price: productData.price - data.price,
                                  cartId: data.id,
                                })
                              }
                            />
                          )}
                          <h5 className="mb-0" style={{ fontSize: 18 }}>
                            {productData.itemQuant}
                          </h5>
                          <AiOutlinePlus
                            style={{ fontSize: 22, cursor: "pointer" }}
                            onClick={() =>
                              mainData.addToCart({
                                ...data,
                                itemQuant: productData.itemQuant + 1,
                                price:
                                  parseInt(productData.price) +
                                  parseInt(data.price),
                                cartId: data.id,
                              })
                            }
                          />
                        </div>
                      )
                    ) : (
                      <Box textAlign={"right"}>
                        <Button h={34}>
                          <BsFillBellFill size={18} />
                        </Button>
                      </Box>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default trackWindowScroll(BasicVegitableFruit);
