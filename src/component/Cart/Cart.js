import React, { useContext, useEffect } from "react";
import { Button, useMediaQuery, useToast } from "@chakra-ui/react";
import Address from "./Address";
import CartItems from "./CartItems";
import PaymentDetails from "./PaymentDetails";
import PaymentOption from "./PaymentOption";
import MainContext from "../../context/MainContext";
import { useState } from "react";
import Checkout from "../Checkout/Checkout";
import { BsBagX } from "react-icons/bs";
import {
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import NewDeliveryTiming from "./NewDeliveryTiming";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { getOrderIdForRazorpay } from "./useOnlinePayment";
import Cookies from "universal-cookie";
import Base64 from "../../helper/EncodeDecode";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const Cart = (props) => {
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    auth,
    reloadData,
    condition,
    cartItems,
    products,
    removeFromCart,
    totalAmount,
    cartDetails,
    removeCart,
    setCartDetails,
  } = useContext(MainContext);
  const [selectedAddress, setAddress] = useState();
  const [selectedDeliveryTiming, setDeliveryTiming] = useState();
  const [selectedPaymentOption, setPayment] = useState("COD");
  const [orderSuccessFull, setOrderSuccessFull] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [wantCarryBag, setCarryBag] = useState(false);
  const UserIDs = cookies.get("userID");
  const UserID = UserIDs === undefined ? "" : Base64.atob(UserIDs);
  const Razorpay = useRazorpay();
  const navigator = useNavigate();
  const toast = useToast();

  useEffect(() => {
    reloadData();
  }, []);

  const checkOutData = {
    selectedAddress,
    selectedDeliveryTiming,
    selectedPaymentOption,
    cartItems,
  };

  const handlePayment = useCallback(
    (order_id, orderID) => {
      const options = {
        key: "rzp_live_xOOOHCL8nWfTlk",
        amount: `${Math.round(totalAmount * 100)}`,
        // amount: `100`,
        currency: "INR",
        name: "SuperG.in",
        description: "Perpaid",
        image: "https://superg.in/img/logo.svg",
        order_id,

        handler: (res) => {
          console.log("hellow world responce ---->", res);
          placeOrerByStatus({
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_order_id: res.razorpay_order_id,
            razorpay_signature: res.razorpay_signature,
            PaymentMode: "ONLINE",
            orderID,
            payment_status: "Paid",
          });
          //           {
          //     "razorpay_payment_id": "pay_LcSmwH8BlPpU6P",
          //     "razorpay_order_id": "order_LcSmSrNDzmMOXA",
          //     "razorpay_signature": "d610bd03e13f18da614d249a4976bdd1b40118accb958dbc327d2bc723b042c3",
          //     "status_code": 200
          // }
        },
        prefill: {
          name: "Navneet Pal",
          email: "youremail@example.com",
          contact: "+918318770766",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            // console.log("Checkout form closed");
            toast({
              title: `Payment Failed..!!`,
              status: "error",
              isClosable: true,
              duration: 5000,
            });
            setOrderSuccessFull(false);
          },
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.on("payment.failed", function (response) {
        setOrderSuccessFull(false);
        // console.log(response);
      });
      rzpay.open();
    },
    [Razorpay, totalAmount, cartDetails]
  );

  const placeOrder = async () => {
    setOrderSuccessFull(true);
    const orderID = `${UserID}-${+new Date()}`;
    if (selectedPaymentOption === "ONLINE") {
      const orderIdRazorpay = await getOrderIdForRazorpay(
        orderID,
        Math.round(totalAmount * 100)
        // "100"
      );
      handlePayment(orderIdRazorpay.order_id, orderID);
    } else {
      placeOrerByStatus({
        PaymentMode: "COD",
        razorpay_order_id: null,
        razorpay_payment_id: null,
        razorpay_signature: null,
        orderID,
        payment_status: "Unpaid",
      });
    }
  };

  const placeOrerByStatus = ({
    razorpay_signature,
    razorpay_order_id,
    razorpay_payment_id,
    PaymentMode,
    orderID,
    payment_status,
  }) => {
    const couponId =
      cartDetails.couponDetails !== undefined
        ? cartDetails.couponDetails[0]?.coupon_id
        : "";

    const bodyContent = {
      orderID,
      AddressId: cartDetails.selectedAddress.address_id,
      UserID,
      FinalTotalAmount: totalAmount,
      iscouponApplied: cartDetails.couponApplied,
      couponPrice: cartDetails.discountPriceByCoupon
        ? cartDetails.discountPriceByCoupon
        : 0,
      PaymentMode: PaymentMode,
      payment_status,
      couponId,
      razorpay_signature,
      razorpay_order_id,
      razorpay_payment_id,
      isDevApplied: cartDetails.isDeliveryChargeApplied,
      delcharge: cartDetails.deliveryCharge,
      order_time: +new Date(),
      delivery_date: +new Date(selectedDeliveryTiming.day),
      delivery_slot: selectedDeliveryTiming.timingSlot,
      cartItems,
      is_carry_bag_taken: wantCarryBag,
      carryBagCharges: condition[0].carry_bag_charge,
    };

    fetch(URL + "/APP-API/App/finalPlaceOrderNew", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodyContent),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // setOrderSuccessFull(true);
        setCartDetails([]);
        removeCart();
        responseJson.status &&
          navigator("/orderSuccess", { state: { order: true } });
      })
      .catch((error) => {
        //  console.error(error);
      });
  };

  const setNavigateFunc = (val) => {
    !val && setPayment("COD");
    setNavigate(val);
  };

  const checkIfAllItemsAvilable = () => {
    const soldOutItems = products.filter((data) => {
      return cartItems.find((o) => o.id == data.id && o.status != data.status);
    });

    if (soldOutItems.length) {
      onOpen();
    } else setNavigateFunc(true);
  };

  const removeSoldOutItems = () => {
    // const soldOutItems = cartItems.filter((data) => {
    //   return data;
    // });
    const soldOutItems = products.filter((data) => {
      return cartItems.find((o) => o.id == data.id && o.status != data.status);
    });
    // console.log("removed items --->", soldOutItems, soldOutItems2);
    soldOutItems.map((items) => {
      removeFromCart(items.id);
    });
    onClose();
  };

  const GetTotal = cartItems.reduce(function (a, b) {
    const price = Math.round(
      (b.price - b.price * (b.discount / 100)) * b.itemQuant
    );
    return a + Number(price);
  }, 0);

  return (
    <>
      <section className="pb-4 osahan-main-body">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 pb-3">
              {navigate ? (
                <Checkout
                  setNavigate={setNavigateFunc}
                  checkOutData={checkOutData}
                />
              ) : (
                <div className="accordion" id="accordionExample">
                  <CartItems />
                  {auth.isUserLogin &&
                    Number(condition[0]?.minimum_order) <= GetTotal && (
                      <>
                        <Address setAddress={setAddress} />
                        <NewDeliveryTiming
                          setDeliveryTiming={setDeliveryTiming}
                        />
                        <PaymentOption
                          selectedAddress={selectedAddress}
                          setNavigate={checkIfAllItemsAvilable}
                          setPayment={setPayment}
                        />
                      </>
                    )}
                </div>
              )}
            </div>
            {isNotSmallerScreen ? (
              <div className="col-lg-4">
                <div className="sticky_sidebar">
                  <PaymentDetails setCarryBagMain={setCarryBag} />
                  {navigate && (
                    <Button
                      isLoading={orderSuccessFull}
                      onClick={() => placeOrder()}
                      class="btn bg-success text-light btn-lg btn-block mt-3 mb-3 d-flex justify-content-center align-items-center"
                    >
                      Place Order
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              navigate && (
                <div className="col-lg-4 mb-5">
                  <div className="sticky_sidebar">
                    <PaymentDetails setCarryBagMain={setCarryBag} />
                    {navigate && (
                      <div
                        style={{
                          position: "fixed",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          background: "#fff",
                          padding: 10,
                        }}
                      >
                        <Button
                          isLoading={orderSuccessFull}
                          onClick={() => placeOrder()}
                          class="btn bg-success btn-lg btn-block d-flex justify-content-center align-items-center"
                        >
                          Place Order
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      {/* <ChakraProvider resetCSS={true}> */}
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton background="none" border="none" />
          <ModalBody>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <BsBagX size={54} style={{ color: "red" }} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <h5>Some items are currently out of stock.</h5>
            </div>
            <p style={{ textAlign: "center" }}>
              Please remove unavilable items.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              background="red"
              border="none"
              onClick={removeSoldOutItems}
              colorScheme={"red"}
            >
              Remove Items
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* </ChakraProvider> */}
    </>
  );
};

export default Cart;
