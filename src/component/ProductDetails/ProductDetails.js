import React, { useContext, useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import MainContext from "../../context/MainContext";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import BasicVegitableFruit from "../ProductsCards/BasicVegitableFruit";
import Seo from "../Seo";
import { Box, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { FcApproval } from "react-icons/fc";
import { HiOutlineCake } from "react-icons/hi";

import { Img } from "react-image";

const ProductDetails = () => {
  const { prodID } = useParams();
  const data = useContext(MainContext);
  const { products, addToCart, removeFromCart, cartItems } = data;
  const [moreLikeThis, setMoreLikeThis] = useState([]);
  const [product, setProduct] = useState();

  useEffect(() => {
    // window.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [prodID]);

  useEffect(() => {
    const more = products.filter(
      (e) => e?.category_id === product?.category_id
    );
    setMoreLikeThis(more);
  }, [product]);

  useEffect(() => {
    const getData = products.find((e) => e.id === prodID);
    const isAvilable = cartItems.find((o) => o.id === prodID);
    isAvilable
      ? setProduct({
          ...getData,
          itemQuant: isAvilable.itemQuant,
        })
      : setProduct({
          ...getData,
          itemQuant: 0,
        });
  }, [products, cartItems, data, prodID]);

  return (
    <>
      <Seo
        title={
          product?.product_name +
          " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
        }
        descreption={
          product?.product_name +
          " delivery in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
        }
        image={URL + "/images/product-images/" + product?.product_image}
        web_url={
          "https://superg.in/" +
          (product?.product_name + " delivery in gorakhpur")
            .replace(/\s/g, "-")
            .toLowerCase() +
          "/" +
          product?.id
        }
        availability={product?.status == 1 ? "in stock" : "out of stock"}
        amount={Math.round(
          product?.price - (product?.price * product?.discount) / 100
        )}
        retailer_item_id={product?.id}
        item_group_id={product?.parent_id}
        category_id={product?.category_id}
        product_name={
          product?.product_name +
          " " +
          product?.product_size +
          " " +
          product?.product_unit
        }
      />

      <div>
        <div itemtype="https://schema.org/Product" itemscope>
          <meta itemprop="mpn" content={product?.id} />
          <meta itemprop="name" content={product?.product_name} />
          <link
            itemprop="image"
            href={URL + "/images/product-images/" + product?.product_image}
          />
          <meta itemprop="description" content={product?.product_name} />
          <div itemprop="offers" itemtype="https://schema.org/Offer" itemscope>
            <link
              itemprop="url"
              href={
                "https://superg.in/" +
                (product?.product_name + " delivery in gorakhpur")
                  .replace(/\s/g, "-")
                  .toLowerCase() +
                "/" +
                product?.id
              }
            />
            <meta
              itemprop="availability"
              content={
                "https://schema.org/" + product?.status == 1
                  ? "InStock"
                  : "outOfStock"
              }
            />
            <meta itemprop="priceCurrency" content="INR" />
            <meta
              itemprop="itemCondition"
              content="https://schema.org/NewCondition"
            />
            <meta
              itemprop="price"
              content={Math.round(
                product?.price - (product?.price * product?.discount) / 100
              )}
            />
          </div>

          <meta itemprop="sku" content={product?.brand_id} />
          <div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
            <meta itemprop="name" content="SuperG.in" />
          </div>
        </div>
      </div>

      <section className="pb-4 osahan-main-body">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="d-flex mb-3">
                <Image
                  src={URL + "/images/product-images/" + product?.product_image}
                  className="img-fluid mx-auto shadow-sm rounded"
                  alt={
                    product?.product_name +
                    " delivery in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                  }
                  title={
                    product?.product_name +
                    " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                  }
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/img/logo-500.png";
                  }}
                />
              </div>
            </div>
            {/* <div className="col-lg-6">
                            <div className="p-4 bg-white rounded shadow-sm">
                                <div className="pt-0">
                                    <h2 className="font-weight-bold">{product?.product_name} <h3>{product?.hindi_name}</h3></h2>
                                    <p className="font-weight-light text-dark m-0 d-flex align-items-center">
                                        Product MRP : <b className="h6 text-dark mb-0" style={{ fontSize: 18, marginLeft: 5 }}>₹{Math.round((product?.price) - (product?.price * product?.discount / 100))} {product?.discount != 0 && <span style={{ textDecoration: "line-through", fontSize: 16 }}>({product?.price})</span>}</b>
                                        {product?.discount != "" || product?.discount != "0" && <span className="badge badge-danger ml-2">{product?.discount}%</span>}
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="font-weight-bold m-0">Available in:</p>
                                            <p className="text-muted m-0">{product?.product_size + product?.product_unit}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="pt-3 bg-white">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                {!product?.itemQuant ? (
                                                    <div>
                                                        <a href="#" onClick={() =>
                                                            addToCart({
                                                                ...product,
                                                                itemQuant: 1,
                                                                cartId: product?.id
                                                            })
                                                        } className="btn btn-warning p-3 rounded btn-block d-flex align-items-center justify-content-center mr-3 btn-lg"><i className="icofont-plus m-0 mr-2" /> ADD TO CART</a>

                                                    </div>
                                                ) : (
                                                    <div class="plusMinusFun d-flex justify-content-between px-3 align-items-center" style={{ width: 120, padding: 16 }}>
                                                        {product?.itemQuant === 1 ? (
                                                            <MdDelete
                                                                style={{ fontSize: 20, cursor: "pointer", color: "#c23838" }}
                                                                onClick={() =>
                                                                    removeFromCart(product?.id)}
                                                            />
                                                        ) : (
                                                            <AiOutlineMinus
                                                                style={{ fontSize: 20, cursor: "pointer", color: "#454545" }}
                                                                onClick={() => addToCart({
                                                                    ...product,
                                                                    itemQuant: product?.itemQuant - 1,
                                                                    price: product?.price - product?.price,
                                                                    cartId: product?.id
                                                                })}
                                                            />
                                                        )}
                                                        <h5 className="mb-0" style={{ fontSize: 20 }}>{product?.itemQuant}</h5>
                                                        <AiOutlinePlus
                                                            style={{ fontSize: 20, cursor: "pointer", color: "#454545" }}
                                                            onClick={() =>
                                                                addToCart({
                                                                    ...product,
                                                                    itemQuant: product?.itemQuant + 1,
                                                                    price: parseInt(product?.price) + parseInt(product?.price),
                                                                    cartId: product?.id
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        <p className="font-weight-bold my-2">Product Details</p>
                                        <p className="text-muted small mb-0">{product?.products_description}</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            <div className="col-lg-6">
              <div className="p-4 bg-white rounded shadow-sm">
                <div className="pt-0">
                  <h2
                    className="font-weight-bold"
                    style={{ fontSize: 20, fontWeight: "800" }}
                  >
                    {product?.product_name} <h3>{product?.hindi_name}</h3>
                  </h2>
                  <HStack mt={4} mb={2}>
                    <FcApproval size={24} />
                    <Text fontSize={16}>
                      {product?.parent_id == 11 ||
                      product?.parent_id == 1 ||
                      product?.parent_id == 4
                        ? "Fresh"
                        : "Trusted"}
                    </Text>
                  </HStack>
                  {product?.status == "1" && (
                    <HStack>
                      <Text fontSize={18}>₹</Text>
                      <Text fontSize={40} fontWeight="800">
                        {Math.round(
                          product?.price -
                            (product?.price * product?.discount) / 100
                        )}
                      </Text>
                      <Box>
                        <Text>
                          {product?.discount != 0 && (
                            <span
                              style={{
                                textDecoration: "line-through",
                                fontSize: 17,
                                fontWeight: "600",
                              }}
                            >
                              ₹{product?.price}
                            </span>
                          )}
                          {product?.discount != 0 && (
                            <span
                              className="text-success ml-2"
                              style={{ fontSize: 18 }}
                            >
                              {Math.round(product?.discount)}% off
                            </span>
                          )}
                        </Text>
                        <Text fontSize={10}>Inclusive of all taxes</Text>
                      </Box>
                    </HStack>
                  )}
                  <SimpleGrid columns={{ base: 1 }}>
                    {product?.products_description && (
                      <Box padding={6}>
                        <Text
                          fontSize={14}
                          color="#303b52"
                          display="flex"
                          alignItems={"center"}
                        >
                          Description
                        </Text>
                        <Text fontSize={14} mt={2} fontWeight="600">
                          {product?.products_description}
                        </Text>
                      </Box>
                    )}
                  </SimpleGrid>
                </div>
                <div className="pt-2 mb-3 mt-2">
                  <p className="font-weight-bold m-0">Available in:</p>
                  <HStack mt={2}>
                    <Box
                      border={"1px solid #ff8d35"}
                      background="#ff8d35"
                      color="#fff"
                      borderRadius={50}
                      p={1}
                      px={4}
                    >
                      {product?.product_size + product?.product_unit}
                    </Box>
                  </HStack>
                  {/* <p className="text-muted m-0">{product?.product_size + product?.product_unit}</p> */}
                </div>
                <div className="details">
                  <div className="pt-3 bg-white">
                    <div>
                      {product?.status != "0" ? (
                        !product?.itemQuant ? (
                          <div>
                            <a
                              href="#"
                              onClick={() =>
                                addToCart({
                                  ...product,
                                  itemQuant: 1,
                                  cartId: product?.id,
                                })
                              }
                              className="btn btn-custom btn-block d-flex align-items-center justify-content-center mr-3"
                            >
                              Add to Cart
                            </a>
                          </div>
                        ) : (
                          <div class="d-flex justify-content-center px-3 align-items-center">
                            <Box borderRadius={8} background="#1eb866" p={2}>
                              {product?.itemQuant === 1 ? (
                                <MdDelete
                                  style={{
                                    fontSize: 26,
                                    cursor: "pointer",
                                    color: "#fff",
                                  }}
                                  onClick={() => removeFromCart(product?.id)}
                                />
                              ) : (
                                <AiOutlineMinus
                                  style={{
                                    fontSize: 26,
                                    cursor: "pointer",
                                    color: "#fff",
                                  }}
                                  onClick={() =>
                                    addToCart({
                                      ...product,
                                      itemQuant: product?.itemQuant - 1,
                                      price: product?.price - product?.price,
                                      cartId: product?.id,
                                    })
                                  }
                                />
                              )}
                            </Box>
                            <h5 className="mb-0 mx-4" style={{ fontSize: 26 }}>
                              {product?.itemQuant}
                            </h5>
                            <Box borderRadius={8} background="#1eb866" p={2}>
                              <AiOutlinePlus
                                style={{
                                  fontSize: 26,
                                  cursor: "pointer",
                                  color: "#fff",
                                }}
                                onClick={() =>
                                  addToCart({
                                    ...product,
                                    itemQuant: product?.itemQuant + 1,
                                    price:
                                      parseInt(product?.price) +
                                      parseInt(product?.price),
                                    cartId: product?.id,
                                  })
                                }
                              />
                            </Box>
                          </div>
                        )
                      ) : (
                        <Box>
                          <Text
                            textAlign={"center"}
                            fontSize={18}
                            fontWeight="800"
                          >
                            Out of stock
                          </Text>
                        </Box>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h5 className="mt-3 mb-3">Maybe You Like this.</h5>
          <div className="row">
            {moreLikeThis.slice(0, 8).map((data, i) => {
              return (
                data.id !== prodID && (
                  <BasicVegitableFruit mdSize={3} key={i} data={data} />
                )
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
