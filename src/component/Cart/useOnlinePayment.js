export const getOrderIdForRazorpay = async (receipt, amount) => {
  const data = await fetch(URL + "/APP-API/App/genrateOrderIdForRazorpay", {
    method: "post",
    header: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      key_id: process.env.REACT_PUBLIC_RAZORPAY_KEY,
      secret: process.env.REACT_PUBLIC_RAZORPAY_SECRET,
      receipt,
      amount,
    }),
  });
  return data.json();
};
