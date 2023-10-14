import React, { useContext, useEffect, useState } from "react";
import contextData from "../../context/MainContext";
import URL from "../../URL";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
// import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link, useLocation } from "react-router-dom";
import { CategoryLoading } from "../Loaders/SkeletonLoader";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Category = (props) => {
  const data = useContext(contextData);
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
  const location = useLocation();
  const [categories, Setcategories] = useState([]);
  const [loca, setLcoa] = useState();
  console.log("dat ===>", data);
  useEffect(() => {
    Setcategories(data.categories);
  }, [data.categories]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const p = position.coords;
      setLcoa({
        longitude: p.longitude,
        latitude: p.latitude,
      });
    });
  };

  return (
    <>
      <div class="osahan-categories">
        <div class="row">
          {!data.banners.length ? (
            <>
              <CategoryLoading />
              <CategoryLoading />
              <CategoryLoading />
              <CategoryLoading />
            </>
          ) : categories.length ? (
            <>
              {categories.map((item, i) => {
                return (
                  <div class="col-6 col-md-2 mb-0 p-1" key={i}>
                    <Box
                      className="list-card h-100 rounded overflow-hidden position-relative shadow-sm"
                      bg="#ffb681"
                    >
                      <Box p={3}>
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
                            textAlign={"left"}
                            fontSize={24}
                            fontWeight={"700"}
                            color="#fff"
                          >
                            {item.name}
                          </Text>

                          <LazyLoadImage 
              src={URL + "/images/category_images/" + item.image}
    PlaceholderSrc="/img/logo-500.png"
    effect="blur"
    class="img-fluid item-img w-100"
                            alt={
                              item.name +
                              " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                            }
                            title={
                              item.name +
                              " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"
                            }
                            style={{ height: 110, objectFit: "contain" }}
/>


                          {/* <img
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
                            style={{ height: 110, objectFit: "contain" }}
                          /> */}
                        </Link>
                      </Box>
                    </Box>
                  </div>
                );
              })}
            </>
          ) : null}
          {/* <div className="btn btn-primary" onClick={getLocation}>
                        Get Location
                    </div>
                    <div className="box">
                        <p>Latitude : {loca?.latitude}</p>
                        <p>Longitude : {loca?.longitude}</p>
                    </div> */}
        </div>
      </div>
    </>
  );
};

export default Category;
