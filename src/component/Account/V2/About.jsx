import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AboutComponent = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Box bg="#fff" p={3} borderRadius={5}>
        <Text mb={2} fontSize={24} fontWeight={"100"}>
          About Us
        </Text>
        <Text mb={2} fontSize={11}>
          Welcome to SuperG.in, the leading online vegetable, fruit, chicken and
          grocery home delivery service in Gorakhpur, Uttar Pradesh.
        </Text>
        <Text mb={2} fontSize={11}>
          SuperG.in is an online grocery delivery website and app that delivers
          groceries to your doorsteps in Gorakhpur. We are a tech startup with a
          team of self-funded professionals who strive to provide the best
          possible service to our customers.
        </Text>
        <Text mb={2} fontSize={11}>
          At SuperG.in, we understand that busy lifestyles can make grocery
          shopping a hassle. That's why we offer same-day delivery of your
          groceries, so you don't have to worry about waiting in lines or
          fighting traffic. Plus, our secure online ordering system makes it
          easy to shop from the comfort of your own home.
        </Text>
        <Text mb={2} fontSize={11}>
          We understand the hectic pace of life and how difficult it can be to
          find the time to go grocery shopping. That's why we created SuperG.in,
          to make your life just that little bit easier. With our convenient
          online ordering system, you can have your groceries delivered right to
          your door.
        </Text>
        <Text mb={2} fontSize={11}>
          We are constantly expanding our range of products and services, so be
          sure to check back often!
        </Text>
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
      <Box
        borderRadius={6}
        bg="#fff"
        mb={3}
        py={4}
        px={4}
        onClick={() => navigate("/return-and-refund-policy")}
      >
        <Text>Return & Refund Policy</Text>
      </Box>
    </>
  );
};

export default AboutComponent;
