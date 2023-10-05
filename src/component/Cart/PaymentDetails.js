import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../context/MainContext";
import { RiCoupon3Fill } from "react-icons/ri";
import {
  Box,
  Button,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getOrderIdForRazorpay } from "./useOnlinePayment";
import { useCallback } from "react";
import Cookies from "universal-cookie";
import Base64 from "../../helper/EncodeDecode";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const cookies = new Cookies();

export const PaymentDetails = ({
  deliveryCharge = 0,
  minimumAmountForFreeDelivery,
  setDeliveryCharge,
}) => {
  const data = useContext(MainContext);
  const {
    cartItems,
    condition,
    setCartDetails,
    cartDetails,
    setTotalPrice,
    genRanHex,
    totalAmount,
    removeCart,
  } = data;
  const [total, setTotal] = useState(0);
  // const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [isDeliveryChargeApplied, setIsDeliveryChargeApplied] = useState(false);
  const CARRY_BAG_CHARGE_MINIMUM_QTY = Number(
    condition[0]?.carry_bag_charge_minimum_qty
  );
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const youHaveToTakeCarryBag =
    cartItems.length > CARRY_BAG_CHARGE_MINIMUM_QTY ? true : false;
  const [wantCarryBag, setCarryBag] = useState(true);
  const UserIDs = cookies.get("userID");
  const UserID = UserIDs === undefined ? "" : Base64.atob(UserIDs);
  const toast = useToast();
  const [orderSuccessFull, setOrderSuccessFull] = useState(false);
  const Razorpay = useRazorpay();
  const navigator = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("hey nvaett", setDeliveryCharge);

  // useEffect(() => {
  //     setCarryBagMain(wantCarryBag);
  // }, [wantCarryBag]);

  const GetTotal = cartItems.reduce(function (a, b) {
    const price = b.price - b.price * (b.discount / 100);
    return a + Number(price * b["itemQuant"]);
  }, 0);

  const GetDiscount = cartItems.reduce(function (a, b) {
    const price = b.price * (b.discount / 100) * b.itemQuant;
    return a + Number(price);
  }, 0);

  //console.log("asdsa", wantCarryBag);

  useEffect(() => {
    setTotal(GetTotal);
    setTotalDiscount(GetDiscount);
    if (GetTotal < parseInt(minimumAmountForFreeDelivery)) {
      // setDeliveryCharge(condition[0].charges);
      setIsDeliveryChargeApplied(true);
    } else {
      // setDeliveryCharge(0);
      setIsDeliveryChargeApplied(false);
    }
  }, [condition, data]);

  useEffect(() => setTotalPrice(grandTotal), [grandTotal]);

  useEffect(() => {
    cartDetails?.discountPriceByCoupon
      ? setGrandTotal(
          Number(total) +
            Number(deliveryCharge) -
            cartDetails?.discountPriceByCoupon
        )
      : setGrandTotal(Number(total) + Number(deliveryCharge));
    if (GetTotal < parseInt(minimumAmountForFreeDelivery)) {
      setCartDetails({
        deliveryCharge: Number(deliveryCharge),
        isDeliveryChargeApplied,
        total: GetTotal,
      });
    } else {
      setCartDetails({
        isDeliveryChargeApplied,
        deliveryCharge: 0,
      });
    }
    setCartDetails({
      coupon: undefined,
      couponApplied: false,
      couponDetails: undefined,
      couponId: undefined,
      discountPriceByCoupon: undefined,
    });
  }, [deliveryCharge, total]);

  useEffect(() => {
    cartDetails?.discountPriceByCoupon &&
      setGrandTotal(
        Number(total) +
          Number(deliveryCharge) -
          cartDetails?.discountPriceByCoupon
      );
    //console.log("cartdetails ->", cartDetails)
  }, [cartDetails?.discountPriceByCoupon, total]);

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
    if (cartDetails?.selectedPaymentOption === "ONLINE") {
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
      delivery_date: +new Date(cartDetails?.selectedDeliveryTiming.day),
      delivery_slot: cartDetails?.selectedDeliveryTiming.timingSlot,
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

  return (
    <>
      <div className="bg-white rounded overflow-hidden mb-3 checkout-sidebar">
        <div className="d-flex align-items-center osahan-cart-item-profile border-bottom bg-white p-3">
          <img
            alt="osahan"
            src="/img/logo.svg"
            className="mr-3 rounded-circle img-fluid"
          />
          <div className="d-flex flex-column">
            <h6 className="font-weight-bold m-0">SuperG.in</h6>
            {/* <p className="mb-0 small text-muted"><i className="feather-map-pin" /> Bhardwadjpuram, Rustampur, 273004</p> */}
          </div>
        </div>
        <div>
          <div className="bg-white p-3 clearfix">
            <p className="font-weight-bold small mb-2">Bill Details</p>
            <p className="mb-1">
              Item Total{" "}
              <span className="small text-muted">
                ({Math.round(cartItems.length)} item)
              </span>{" "}
              <span className="float-right text-dark">
                <span style={{ fontWeight: "700", marginRight: 2 }}>₹</span>
                {Math.round(total)}
              </span>
            </p>
            {/* <p className="mb-1">Store Charges <span className="float-right text-dark">$62.8</span></p> */}
            {Math.round(total) < Number(minimumAmountForFreeDelivery) && (
              <>
                {" "}
                <p className="mb-3">
                  Delivery Fee{" "}
                  <span className="float-right text-dark">
                    + ₹{Math.round(deliveryCharge)}
                  </span>
                </p>
                <div class="alert alert-danger text-center p-1" role="alert">
                  <small>
                    Shop more for ₹
                    {Math.round(Number(minimumAmountForFreeDelivery) - total)}{" "}
                    to get free delivery.
                  </small>
                </div>{" "}
              </>
            )}
            {cartDetails?.couponApplied && (
              <h6 className="mb-0 mt-2 text-success" style={{ fontSize: 14 }}>
                <RiCoupon3Fill style={{ marginBottom: 3, marginRight: 5 }} />
                Coupon Discount @{" "}
                {parseInt(cartDetails?.couponDetails[0].coupon_discount)}
                {cartDetails?.couponDetails[0].coupon_type == "amount"
                  ? "₹ Flat"
                  : "%"}
                <span className="float-right text-success">
                  - ₹{Math.round(cartDetails.discountPriceByCoupon)}
                </span>
              </h6>
            )}
            {/*  {youHaveToTakeCarryBag ? (
              <>
                <h6 className="mb-0 text-dark mt-3" style={{ fontSize: 14 }}>
                  Carry Bag{" "}
                  <Switch
                    size="sm"
                    isChecked={youHaveToTakeCarryBag}
                    disabled
                  />
                  <span className="float-right">
                    + ₹{condition[0]?.carry_bag_charge}
                  </span>
                </h6>
                <small>
                  Carry bag is required for more than{" "}
                  {CARRY_BAG_CHARGE_MINIMUM_QTY} items
                </small>
              </>
            ) : (
              <h6 className="mb-0 text-dark mt-3" style={{ fontSize: 14 }}>
                Carry Bag
                <Switch
                  size="md"
                  ml={2}
                  isChecked={wantCarryBag}
                  onChange={(e) => setCarryBag(e.target.checked)}
                />
                <span className="float-right">
                  + ₹{condition[0]?.carry_bag_charge}
                </span>
              </h6>
            )} */}
          </div>
          <div className="p-3 border-top">
            <h5 className="mb-0">
              TO PAY{" "}
              <span className="float-right text-danger">
                ₹{" "}
                {/* {wantCarryBag
                  ? Math.round(grandTotal) +
                    Number(condition[0]?.carry_bag_charge)
                  : Math.round(grandTotal)} */}
                {Math.round(grandTotal)}
              </span>
            </h5>
          </div>
        </div>
        <Box
          position={"fixed"}
          bottom={0}
          left={0}
          zIndex={9}
          w={"100%"}
          background={"#fff"}
          py={3}
          px={5}
          boxShadow={"0 -1px 5px 0 #e1e1e1"}
        >
          <Button
            isLoading={orderSuccessFull}
            onClick={() => {
              if (condition[0].taking_order_now == "0") {
                onOpen();
              } else {
                placeOrder();
              }
            }}
            w={"100%"}
            backgroundColor={"green"}
            color={"#fff"}
            fontWeight={"400"}
          >
            Place Order
          </Button>
        </Box>
      </div>
      <Modal onClose={onClose} size="xs" isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={"#fff"} />
          <ModalBody
            py={8}
            px={5}
            bg={"#1c1a20"}
            color={"#fff"}
            borderRadius={6}
          >
            <Text align={"center"}>{condition[0].not_taking_order_msg}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentDetails;
