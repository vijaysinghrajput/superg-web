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
          Interpretation and Definitions
        </Text>
        <Box py={2}>
          <Text fontSize={14} fontWeight={"600"} ml={2} mb={2}>
            Interpretation
          </Text>
          <Text mb={2} fontSize={11}>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </Text>
        </Box>
        <Box py={2}>
          <Text fontSize={14} fontWeight={"600"} ml={2} mb={2}>
            Definitions
          </Text>
          <Text mb={2} fontSize={11}>
            For the purposes of this Return and Refund Policy:
          </Text>
          <UnorderedList>
            <ListItem>
              <Text fontWeight={"600"} as={"span"} mr={1}>
                Application
              </Text>
              means the software program provided by the Company downloaded by
              You on any electronic device, named SuperG.in
            </ListItem>
            <ListItem>
              <Text fontWeight={"600"} as={"span"} mr={1}>
                Company
              </Text>
              (referred to as either "the Company", "We", "Us" or "Our" in this
              Agreement) refers to SuperG.in, 281 B Transport Nagar , Gorakhpur.
            </ListItem>
            <ListItem>
              <Text fontWeight={"600"} as={"span"} mr={1}>
                Goods
              </Text>
              refer to the items offered for sale on the Service.
            </ListItem>
            <ListItem>
              <Text fontWeight={"600"} as={"span"} mr={1}>
                Orders
              </Text>
              mean a request by You to purchase Goods from Us.
            </ListItem>
            <ListItem>
              <Text fontWeight={"600"} as={"span"} mr={1}>
                Service
              </Text>
              refers to the Application or the Website or both.
            </ListItem>
            <ListItem>
              <Text fontWeight={"600"} as={"span"} mr={1}>
                Website
              </Text>
              refers to SuperG.in, accessible from superg.in.
            </ListItem>
            <ListItem>
              <Text fontWeight={"600"} as={"span"} mr={1}>
                You
              </Text>
              means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual
              is accessing or using the Service, as applicable.
            </ListItem>
          </UnorderedList>
        </Box>
        <Text mb={2} fontSize={24} fontWeight={"100"}>
          Your Order Cancellation Rights
        </Text>
        <Text mb={2} fontSize={11}>
          You are entitled to cancel Your Order within 1 days without giving any
          reason for doing so.
        </Text>
        <Text mb={2} fontSize={11}>
          The deadline for cancelling an Order is same day for vegetables ,
          fruits, chiken and all fresh items from the date on which You received
          the Goods or on which a third party you have appointed, who is not the
          carrier, takes possession of the product delivered.
        </Text>
        <Text mb={2} fontSize={11}>
          In order to exercise Your right of cancellation, You must inform Us of
          your decision by means of a clear statement. You can inform us of your
          decision by:
          <UnorderedList mt={2}>
            <ListItem>By email: support@superg.in</ListItem>
            <ListItem>By phone number: 6391000414</ListItem>
          </UnorderedList>
        </Text>
        <Text mb={2} fontSize={11}>
          We will reimburse You no later than 14 days from the day on which We
          receive the returned Goods. We will use the same means of payment as
          You used for the Order, and You will not incur any fees for such
          reimbursement.
        </Text>
        <Text mb={2} fontSize={24} fontWeight={"100"}>
          Conditions for Returns
        </Text>
        <Text mb={2} fontSize={11}>
          In order for the Goods to be eligible for a return, please make sure
          that:
          <UnorderedList mt={2}>
            <ListItem>The Goods were purchased in the same day</ListItem>
            <ListItem>The Goods are in the original packaging</ListItem>
          </UnorderedList>
        </Text>
        <Text mb={2} fontSize={11}>
          The following Goods cannot be returned:
          <UnorderedList mt={2}>
            <ListItem>
              The supply of Goods made to Your specifications or clearly
              personalized.
            </ListItem>
            <ListItem>
              The supply of Goods which according to their nature are not
              suitable to be returned, deteriorate rapidly or where the date of
              expiry is over.
            </ListItem>
            <ListItem>
              The supply of Goods which are not suitable for return due to
              health protection or hygiene reasons and were unsealed after
              delivery.
            </ListItem>
            <ListItem>
              The supply of Goods which are, after delivery, according to their
              nature, inseparably mixed with other items.
            </ListItem>
          </UnorderedList>
        </Text>
        <Text mb={2} fontSize={11}>
          We reserve the right to refuse returns of any merchandise that does
          not meet the above return conditions in our sole discretion.
        </Text>
        <Text mb={2} fontSize={11}>
          Only regular priced Goods may be refunded. Unfortunately, Goods on
          sale cannot be refunded. This exclusion may not apply to You if it is
          not permitted by applicable law.
        </Text>
        <Box>
          <Text mb={2} fontSize={24} fontWeight={"100"}>
            Returning Goods
          </Text>
          <Text mb={2} fontSize={11}>
            You are responsible for the cost and risk of returning the Goods to
            Us. You should send the Goods at the following address:
          </Text>
          <Text mb={2} fontSize={11}>
            281 B Transport Nagar , Gorakhpur
          </Text>
          <Text mb={2} fontSize={11}>
            We cannot be held responsible for Goods damaged or lost in return
            shipment. Therefore, We recommend an insured and trackable mail
            service. We are unable to issue a refund without actual receipt of
            the Goods or proof of received return delivery.
          </Text>
        </Box>
        <Box>
          <Text mb={2} fontSize={24} fontWeight={"100"}>
            Gifts
          </Text>
          <Text mb={2} fontSize={11}>
            If the Goods were marked as a gift when purchased and then shipped
            directly to you, You'll receive a gift credit for the value of your
            return. Once the returned product is received, a gift certificate
            will be mailed to You.
          </Text>
          <Text mb={2} fontSize={11}>
            If the Goods weren't marked as a gift when purchased, or the gift
            giver had the Order shipped to themselves to give it to You later,
            We will send the refund to the gift giver.
          </Text>
        </Box>
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
