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

export const options = {
  key: "rzp_live_xOOOHCL8nWfTlk",
  amount: "1",
  currency: "INR",
  name: "Acme Corp",
  description: "Test Transaction",
  image: "https://example.com/your_logo",
  order_id: "236874872396",
  handler: (res) => {
    console.log(res);
  },
  prefill: {
    name: "Piyush Garg",
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
