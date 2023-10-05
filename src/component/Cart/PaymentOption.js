import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PaymentOption = ({
  setPayment,
  setNavigate,
  selectedAddress,
  minimumOrderValue,
  carTotal,
  deliveryNotAvilable,
  selectedDeliveryTiming,
  deliveryNotAvilableReason,
}) => {
  const navigation = useNavigate();

  return (
    <>
      <div className="card border-0 osahan-accor rounded overflow-hidden mt-3">
        <div className="card-header bg-white border-0 p-0" id="headingfour">
          <h2 className="mb-0">
            <button
              className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0"
              type="button"
              data-toggle="collapse"
              data-target="#collapsefour"
              aria-expanded="true"
              aria-controls="collapsefour"
            >
              <span className="c-number">4</span> Payment
            </button>
          </h2>
        </div>
        <div
          id="collapsefour"
          className="collapse"
          aria-labelledby="headingfour"
          data-parent="#accordionExample"
        >
          <div className="card-body px-3 pb-3 pt-1 border-top">
            {!deliveryNotAvilable ? (
              <div className="schedule">
                <ul
                  className="nav nav-tabs justify-content-center nav-fill"
                  id="myTab"
                  role="tablist"
                >
                  <li
                    className="nav-item"
                    role="presentation"
                    onClick={() => setPayment("COD")}
                  >
                    <a
                      className="nav-link text-dark active show"
                      id="cash-tab"
                      data-toggle="tab"
                      href="#cash"
                      role="tab"
                      aria-controls="cash"
                      aria-selected="false"
                    >
                      <p className="mb-0 font-weight-bold">
                        <i className="icofont-rupee mr-2" />
                        Pay on Delivery
                      </p>
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                    onClick={() => setPayment("ONLINE")}
                  >
                    <a
                      className="nav-link text-dark"
                      id="online-tab"
                      data-toggle="tab"
                      href="#online"
                      role="tab"
                      aria-controls="online"
                      aria-selected="false"
                    >
                      <p className="mb-0 font-weight-bold">
                        <i className="icofont-globe mr-2" />
                        Online Payment
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            ) : null}
            {deliveryNotAvilable ? (
              <>
                <Box mt={4}>
                  <Text textAlign={"center"} fontWeight={"600"}>
                    {deliveryNotAvilableReason}
                  </Text>
                </Box>
              </>
            ) : Number(minimumOrderValue) > carTotal ? (
              <div className="p-3">
                <div className="rounded shadow bg-dark d-flex align-items-center p-3 text-white">
                  <div className="more w-100">
                    <h6 className="text-center">
                      Minimum order must be more than ₹{minimumOrderValue} 😢
                    </h6>
                  </div>
                </div>
                <div className="rounded shadow bg-success mt-2 d-flex align-items-center p-3 text-white">
                  <div className="more w-100">
                    <h6
                      className="text-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigation("/category")}
                    >
                      Shop more...
                    </h6>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                disabled={
                  selectedDeliveryTiming?.timingSlot !== null ? false : true
                }
                onClick={() => setNavigate(true)}
                className="btn btn-success btn-lg btn-block mt-3 w-100"
                type="button"
              >
                {selectedDeliveryTiming?.timingSlot !== null
                  ? "Continue"
                  : "Select or Add New Address / Slot"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentOption;
