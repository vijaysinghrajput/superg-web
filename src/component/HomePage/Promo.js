import React, { useContext, useEffect, useState } from "react";
import contextData from "../../context/MainContext";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import URL from "../../URL";
import { PromoLoading } from "../Loaders/SkeletonLoader";

const Promo = (props) => {
  const data = useContext(contextData);

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
      <div class="py-3 osahan-promos ">
        {!data.banners.length ? (
          <>
            <PromoLoading />
          </>
        ) : (
          <div class="promo-sliders pb-0 mb-0">
            {data.banners.length ? (
              <OwlCarousel className="owl-theme" {...options}>
                {data.banners.map((item, i) => {
                  return (
                    <div className="item" key={i}>
                      <div class="osahan-slider-item mx-2">
                        <a href="#">
                          <img
                            src={URL + "/images/offer-image/" + item.image}
                            class="img-fluid mx-auto rounded"
                            style={{ height: 180 }}
                            alt="Responsive image"
                          />
                        </a>
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

export default Promo;
