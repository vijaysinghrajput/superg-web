export const getOrderIdForRazorpay = async (receipt, amount) => {
  const data = await fetch(URL + "/APP-API/App/genrateOrderIdForRazorpay", {
    method: "post",
    header: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      key_id: "rzp_live_xOOOHCL8nWfTlk",
      secret: "SOzxTWWV7ixUGgixAPx5nZAo",
      receipt,
      amount,
    }),
  });
  return data.json();
};
