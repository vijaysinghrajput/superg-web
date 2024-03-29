import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PrivicyAndPolicyComponent = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Box bg="#fff" p={3} borderRadius={5}>
        <Text mb={2} fontSize={24} fontWeight={"100"}>
          Privacy Policy
        </Text>
        <Text mb={2} fontSize={11}>
          SuperG.in built the SuperG.in app as a Free app. This SERVICE is
          provided by SuperG.in at no cost and is intended for use as is.
        </Text>
        <Text mb={2} fontSize={11}>
          This page is used to inform visitors regarding our policies with the
          collection, use, and disclosure of Personal Information if anyone
          decided to use our Service.
        </Text>
        <Text mb={2} fontSize={11}>
          If you choose to use our Service, then you agree to the collection and
          use of information in relation to this policy. The Personal
          Information that we collect is used for providing and improving the
          Service. We will not use or share your information with anyone except
          as described in this Privacy Policy.
        </Text>
        <Text mb={2} fontSize={11}>
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which are accessible at SuperG.in unless
          otherwise defined in this Privacy Policy.
        </Text>
        <Text mb={2} fontSize={11}>
          We are constantly expanding our range of products and services, so be
          sure to check back often!
        </Text>
        <Box py={2}>
          <Text fontSize={14} fontWeight={"600"} ml={2} mb={2}>
            Information Collection and Use
          </Text>
          <Text mb={2} fontSize={11}>
            For a better experience, while using our Service, we may require you
            to provide us with certain personally identifiable information,
            including but not limited to Mobile Number . The information that we
            request will be retained by us and used as described in this privacy
            policy.
          </Text>
          <Text mb={2} fontSize={11}>
            The app does use third-party services that may collect information
            used to identify you.
          </Text>
        </Box>
        <Box py={2}>
          <Text fontSize={14} fontWeight={"600"} ml={2} mb={2}>
            Log Data
          </Text>
          <Text mb={2} fontSize={11}>
            We want to inform you that whenever you use our Service, in a case
            of an error in the app we collect data and information (through
            third-party products) on your phone called Log Data. This Log Data
            may include information such as your device Internet Protocol (“IP”)
            address, device name, operating system version, the configuration of
            the app when utilizing our Service, the time and date of your use of
            the Service, and other statistics.
          </Text>
        </Box>
        <Box py={2}>
          <Text fontSize={14} fontWeight={"600"} ml={2} mb={2}>
            Cookies
          </Text>
          <Text mb={2} fontSize={11}>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device's internal
            memory.
          </Text>
          <Text mb={2} fontSize={11}>
            This Service does not use these “cookies” explicitly. However, the
            app may use third-party code and libraries that use “cookies” to
            collect information and improve their services. You have the option
            to either accept or refuse these cookies and know when a cookie is
            being sent to your device. If you choose to refuse our cookies, you
            may not be able to use some portions of this Service.
          </Text>
        </Box>
        <Box py={2}>
          <Text fontSize={14} fontWeight={"600"} ml={2} mb={2}>
            Security
          </Text>
          <Text mb={2} fontSize={11}>
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </Text>
        </Box>
        <Box py={2}>
          <Text fontSize={14} fontWeight={"600"} ml={2} mb={2}>
            Links to Other Sites
          </Text>
          <Text mb={2} fontSize={11}>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </Text>
        </Box>
        <Box py={2}>
          <Text fontSize={14} fontWeight={"600"} ml={2} mb={2}>
            Changes to This Privacy Policy
          </Text>
          <Text mb={2} fontSize={11}>
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy on this
            page. This policy is effective as of 2023-04-01
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

export default PrivicyAndPolicyComponent;
