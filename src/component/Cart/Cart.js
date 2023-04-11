import React, { useContext, useEffect } from "react";
import { Button, useMediaQuery } from "@chakra-ui/react";
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
    genRanHex,
    totalAmount,
    cartDetails,
  } = useContext(MainContext);
  const [selectedAddress, setAddress] = useState();
  const [selectedDeliveryTiming, setDeliveryTiming] = useState();
  const [selectedPaymentOption, setPayment] = useState("COD");
  const [orderSuccessFull, setOrderSuccessFull] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [wantCarryBag, setCarryBag] = useState(false);
  const Razorpay = useRazorpay();

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
    (order_id) => {
      const options = {
        key: "rzp_live_xOOOHCL8nWfTlk",
        amount: `${Math.round(totalAmount * 100)}`,
        currency: "INR",
        name: "SuperG.in",
        description: "Perpaid",
        image: "https://superg.in/img/logo.svg",
        order_id,
        handler: (res) => {
          console.log(res);
        },
        prefill: {
          name: "Navneet Pal",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    },
    [Razorpay, totalAmount]
  );

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  // async function displayRazorpay(orderID) {
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );

  //   if (!res) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }

  //   // creating a new order
  //   // const result = await axios.post("http://localhost:5000/payment/orders");

  //   // if (!result) {
  //   //   alert("Server error. Are you online?");
  //   //   return;
  //   // }

  //   // // Getting the order details back
  //   // const { amount, id: order_id, currency } = result.data;

  //   const orderIdRazorpay = await getOrderIdForRazorpay(
  //     orderID,
  //     Math.round(totalAmount * 100)
  //   );
  //   //  orderIdRazorpay && handlePayment(orderIdRazorpay);

  //   const options = {
  //     key: "rzp_live_xOOOHCL8nWfTlk", // Enter the Key ID generated from the Dashboard
  //     amount: `${Math.round(totalAmount * 100)}`,
  //     currency: "INR",
  //     name: "SuperG.in",
  //     description: "Prepaid",
  //     image: "https://superg.in/img/logo.svg",
  //     order_id: orderIdRazorpay,
  //     modal: {
  //       ondismiss: function () {
  //         console.log("Checkout form closed");
  //       },
  //     },
  //     handler: async function (response) {
  //       // const data = {
  //       //   orderCreationId: order_id,
  //       //   razorpayPaymentId: response.razorpay_payment_id,
  //       //   razorpayOrderId: response.razorpay_order_id,
  //       //   razorpaySignature: response.razorpay_signature,
  //       // };

  //       // const result = await axios.post(
  //       //   "http://localhost:5000/payment/success",
  //       //   data
  //       // );

  //       // alert(result.data.msg);
  //       console.log("responce data ---->", response);
  //     },
  //     prefill: {
  //       name: "Soumya Dey",
  //       email: "SoumyaDey@example.com",
  //       contact: "9999999999",
  //     },
  //     notes: {
  //       address: "Soumya Dey Corporate Office",
  //     },
  //     theme: {
  //       color: "#61dafb",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // }

  const __DEV__ = document.domain === "localhost";

  // async function displayRazorpay() {
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );

  //   if (!res) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }

  //   const data = await fetch("http://localhost:1337/razorpay", {
  //     method: "POST",
  //   }).then((t) => t.json());

  //   console.log(data);

  //   const options = {
  //     key: __DEV__ ? "rzp_test_diD5e52lqnOy9k" : "PRODUCTION_KEY",
  //     currency: data.currency,
  //     amount: data.amount.toString(),
  //     order_id: data.id,
  //     name: "Donation",
  //     description: "Thank you for nothing. Please give us some money",
  //     image: "http://localhost:1337/logo.svg",
  //     handler: function (response) {
  //       alert(response.razorpay_payment_id);
  //       alert(response.razorpay_order_id);
  //       alert(response.razorpay_signature);
  //     },
  //     prefill: {
  //       name: "navneet",
  //       email: "sdfdsjfh2@ndsfdf.com",
  //       phone_number: "9899999999",
  //     },
  //   };
  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // }

  const placeOrder = async () => {
    setOrderSuccessFull(true);
    const orderID = `${+new Date()}${genRanHex(16)}`;
    if (selectedPaymentOption === "ONLINE") {
      // const orderIdRazorpay = await getOrderIdForRazorpay(
      //   orderID,
      //   Math.round(totalAmount * 100)
      // );
      // displayRazorpay(orderID);
      handlePayment();
      // displayRazorpay();
    }
    const couponId =
      cartDetails.couponDetails !== undefined
        ? cartDetails.couponDetails[0]?.coupon_id
        : "";

    //console.log("sll list", cartItems, wantCarryBag)

    // fetch(URL + "/APP-API/App/finalPlaceOrder", {
    //   method: "post",
    //   header: {
    //     Accept: "application/json",
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     orderID,
    //     AddressId: cartDetails.selectedAddress.address_id,
    //     UserID,
    //     FinalTotalAmount: totalAmount,
    //     iscouponApplied: cartDetails.couponApplied,
    //     couponPrice: cartDetails.discountPriceByCoupon
    //       ? cartDetails.discountPriceByCoupon
    //       : 0,
    //     PaymentMode: cartDetails.selectedPaymentOption,
    //     couponId,
    //     isDevApplied: cartDetails.isDeliveryChargeApplied,
    //     delcharge: cartDetails.deliveryCharge,
    //     order_time: +new Date(),
    //     delivery_date: +new Date(selectedDeliveryTiming.day),
    //     delivery_slot: selectedDeliveryTiming.timingSlot,
    //     cartItems,
    //     is_carry_bag_taken: wantCarryBag,
    //     carryBagCharges: condition[0].carry_bag_charge,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     // setOrderSuccessFull(true);
    //     setCartDetails([]);
    //     removeCart();
    //     responseJson.status &&
    //       navigator("/orderSuccess", { state: { order: true } });
    //   })
    //   .catch((error) => {
    //     //  console.error(error);
    //   });
  };

  const checkIfAllItemsAvilable = () => {
    const soldOutItems = products.filter((data) => {
      return cartItems.find((o) => o.id == data.id && o.status != data.status);
    });

    if (soldOutItems.length) {
      onOpen();
    } else setNavigate(true);
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

  useEffect(() => {
    console.log("from cart component ---->", selectedDeliveryTiming);
  }, [selectedDeliveryTiming]);

  return (
    <>
      <section className="pb-4 osahan-main-body">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 pb-3">
              {navigate ? (
                <Checkout
                  setNavigate={setNavigate}
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
