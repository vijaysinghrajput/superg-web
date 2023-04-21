import {
  Box,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ReturnAndRefund = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Box bg="#fff" p={3} borderRadius={5}>
        <Text mb={2} fontSize={24} fontWeight={"100"}>
          Return and Refund Policy
        </Text>
        <Text mb={2} fontSize={11}>
          Thank you for shopping at SuperG.in website and SuperG.in app.
        </Text>
        <Text mb={2} fontSize={11}>
          If, for any reason, You are not completely satisfied with a purchase
          We invite You to review our policy on refunds and returns.
        </Text>
        <Text mb={2} fontSize={11}>
          The following terms are applicable for any products that You purchased
          with Us.
        </Text>
        <Text mb={2} fontSize={24} fontWeight={"100"}>
        The procedure for cancelling an order is as follows.
        </Text>
        <Box py={2}>
          
          <Text mb={2} fontSize={11}>
          You have the option to cancel an order if it has already been placed or is in the process of being prepared.
          </Text>
          <Text mb={2} fontSize={11}>
          The order won't be cancelled if it has already been sent out for delivery.
          </Text>
          <Text mb={2} fontSize={11}>
          If you cancel an order after it has been delivered to your door and the justification for the cancellation is false, you will be put on a blacklist. You won't ever have another opportunity to buy with us.
          </Text>
        </Box>
   
        <Text mb={2} fontSize={24} fontWeight={"100"}>
        Refund Policy
        </Text>
        <Text mb={2} fontSize={11}>
        We only offer replacements we don't offer refunds.
        </Text>
       
        <Text mb={2} fontSize={24} fontWeight={"100"}>
          Conditions for Returns
        </Text>
        <Text mb={2} fontSize={11}>
        Fresh products such as fruits, vegetables, poultry, milk, and curd can only be changed within six hours of the delivery of the order however, complaints regarding other grocery items can be made up to twenty-four hours in advance.
          <UnorderedList mt={2}>
            <ListItem>The Goods were purchased in the same day</ListItem>
            <ListItem>The Goods are in the original packaging</ListItem>
            <ListItem> Vegetables - We only replace vegetables when they are not fresh in appearance from outside, or are damaged. After cutting the vegetable, if there is any problem inside, then we do not guarantee or replace it.</ListItem>
            <ListItem> Fruits - We only replace Fruits when they are not fresh in appearance from outside, or are damaged. After cutting the Fruits, if there is any problem inside, then they do not guarantee or replace it.We cannot guarantee the sweetness of the fruits.</ListItem>
            <ListItem> Poultry - We only replace poultry when they are not fresh in appearance from outside, or are damaged. After cutting the Poultry, if there is any problem inside, then they do not guarantee or replace it.</ListItem>
            <ListItem> Fresh Items - We only replace Fresh Items when they are not fresh in appearance from outside, or are damaged. After cutting the Fresh Items, if there is any problem inside, then they do not guarantee or replace it.</ListItem>
          </UnorderedList>
        </Text>
        <Text mb={2} fontSize={11}>
        The replacement procedure is as follows.
          <UnorderedList mt={2}>
            <ListItem>
            First, WhatsApp your order number to 6391000414 next, click on the image of the product you're unhappy with and last, WhatsApp 6391000414
            </ListItem>
            <ListItem>
            If a legitimate reason for replacement is discovered after being examined by our quality team, that product will be replaced.
            </ListItem>
            <ListItem>
            The next delivery window will be used to process order replacement.
            </ListItem>
         
          </UnorderedList>
        </Text>
        <Text mb={2} fontSize={11}>
          We reserve the right to refuse returns of any merchandise that does
          not meet the above return conditions in our sole discretion.
        </Text>
   

      </Box>
      <Box
        borderRadius={6}
        bg="#fff"
        mt={3}
        py={4}
        px={4}
        mb={3}
        onClick={() => navigate("/about")}
      >
        <Text>About</Text>
      </Box>
      <Box
        borderRadius={6}
        bg="#fff"
        mt={3}
        py={4}
        px={4}
        mb={3}
        onClick={() => navigate("/privacy-and-policy")}
      >
        <Text>Privacy Policy</Text>
      </Box>
      <Box
        borderRadius={6}
        bg="#fff"
        mb={3}
        py={4}
        px={4}
        onClick={() => navigate("/term-and-condition")}
      >
        <Text>Terms & Condition</Text>
      </Box>
    </>
  );
};

export default ReturnAndRefund;
