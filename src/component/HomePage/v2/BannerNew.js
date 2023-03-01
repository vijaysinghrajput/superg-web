import React, { useContext, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { PromoLoading } from "../../Loaders/SkeletonLoader";
import ContextData from "../../../context/MainContext";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BannerNew = () => {
  const data = useContext(ContextData);

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
        items: 3,
      },
    },
  };

  return (
    <>
      <div
        class="mt-4 osahan-promos "
        style={{ borderRadius: 10, background: "#f09ff1" }}
      >
        <Text fontSize={16} fontWeight="700" color="#000" mb={1} ml={1} p={2}>
          Best deals for you
        </Text>
        {!data.category_banners?.length ? (
          <>
            <PromoLoading />
          </>
        ) : (
          <div class="promo-sliders pb-2 mb-0">
            {data.category_banners?.length ? (
              <OwlCarousel className="owl-theme" {...options}>
                {data.category_banners?.map((item, i) => {
                  return (
                    <div className="item" key={i}>
                      <div class="osahan-slider-item mx-2">
                        <Link
                          to={
                            "/" +
                            (item.offers_name + " delivery in gorakhpur")
                              .replace(/\s/g, "-")
                              .toLowerCase() +
                            "/" +
                            item.product_id +
                            "/" +
                            item.offers_name
                          }
                        >
                          <img
                            src={
                              URL + "/images/offer-image/" + item.offers_image
                            }
                            class="img-fluid mx-auto rounded"
                            // style={{ height: 180 }}
                            alt="Responsive image"
                          />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default BannerNew;
