import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  useRadio,
  Box,
  useRadioGroup,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  DrawerCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
// import { SaveAddress } from '../../../hooks/useAddressData';
// import useEffectOnce from '../../../hooks/useEffectOnce';
// import useMapData from './hooks/useMapData';
import Cookies from "universal-cookie";
import ContextData from "../../context/MainContext";
import { sendOTP, validateOtp } from "./API";
import { useAuthentication } from "./hooks/useAuthentication";
// import Base64 from '../../../helper/EncodeDecode';
// import URL from '../../../URL';
// import useBoolean from '../../../hooks/useBoolean';
import classes from "./Login.module.css";

const cookies = new Cookies();

export default function LoginDrawer({
  isLoginOpen,
  onLoginOpen,
  onLoginClose,
}) {
  const { setUserLogin } = useContext(ContextData);
  const {
    setMobile,
    setOtpSent,
    otpSent,
    setOtpFromServer,
    wrongOTP,
    setInputOTP,
    inputOTP,
    wrngOTP,
    otpFromServer,
    mobile,
    setLoading,
    isLoading,
    setIsLogedIn,
    isLogedIn,
  } = useAuthentication();
  const ref = useRef(null);
  const toast = useToast();
  const [counter, setCounter] = useState(60);

  const sendOtpToMobile = async () => {
    setLoading(true);
    const mobile = ref.current.value;
    setMobile(mobile);
    const { otp, status } = await sendOTP({ mobile });
    // console.log("otp ====>", otp, status);
    if (status) {
      setOtpFromServer(otp);
      setCounter(60);
      setOtpSent(true);
    } else
      toast({
        title: `Something went wrong, please try again.`,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    setLoading(false);
  };

  const verifyOTP = async () => {
    setLoading(true);
    if (Number(inputOTP) === otpFromServer) {
      const user_info = await validateOtp({ mobile });
      setUserLogin({ user_info });
      setIsLogedIn(true);
      setLoading(false);
      onLoginClose();
    } else wrngOTP();
  };

  useEffect(async () => {
    if (inputOTP.length === 4) {
      verifyOTP();
    }
  }, [inputOTP]);

  useEffect(() => {
    counter > 0 && otpSent && setTimeout(() => setCounter(counter - 1), 1000);
    // console.log("counter ===>", inputOTP.length);
  }, [counter, otpSent]);

  const resendOTP = () => {
    setCounter(60);
    sendOtpToMobile();
  };

  return (
    <>
      {/* <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        ooasdjfoshdiasdf
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onLoginClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
      <Drawer
        placement={"bottom"}
        onClose={onLoginClose}
        isOpen={isLoginOpen}
        disabled={true}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius={12}>
          <DrawerHeader borderBottomWidth="0px" textAlign={"center"}>
            Sign In
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            {otpSent ? (
              <Box>
                <Box mb={5} display="flex" justifyContent={"center"}>
                  <Text textAlign={"center"} mr={2}>
                    OTP send to {mobile}
                  </Text>
                  <AiFillEdit
                    color="#ca0808"
                    size={18}
                    onClick={() => setOtpSent(false)}
                  />
                </Box>
                <OtpInput
                  value={inputOTP}
                  onChange={(e) => setInputOTP(e)}
                  isInputNum={true}
                  numInputs={4}
                  shouldAutoFocus={true}
                  inputStyle="form-control opt form-control-lg text-center"
                  separator={<span className="mx-2"></span>}
                  containerStyle="justify-content-center"
                  // placeholder="0000"
                  hasErrored={wrongOTP}
                  errorStyle={{ border: "1px solid red", color: "red" }}
                />
                <Box my={3} display="flex" justifyContent={"end"}>
                  <Button
                    disabled={counter}
                    bg="none"
                    size={"xs"}
                    onClick={resendOTP}
                    color={"#ca0808"}
                  >
                    SEND AGAIN {counter != 0 ? counter : ""}
                  </Button>
                </Box>
                <Box
                  width={{ base: "100%", md: "56%" }}
                  margin="auto"
                  mt={{ base: 0, md: 5 }}
                >
                  <Button
                    width={"100%"}
                    background="#0db616"
                    color="#fff"
                    fontSize={14}
                    fontWeight="400"
                    mb={2}
                    disabled={!(inputOTP.length == 4)}
                    onClick={verifyOTP}
                    // onClick={saveMyAddress}
                    isLoading={isLoading}
                  >
                    SIGN IN
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box mb={2}>
                  <Box className={classes.placeholder_container}>
                    <Input
                      type={"tel"}
                      placeholder=" "
                      className={classes.c_input}
                      _focus={{
                        borderColor: "#2b8410",
                        boxShadow: "0 0 0 1px #2b8410",
                      }}
                      ref={ref}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    <Text className={classes.c_label}>Mobile Number</Text>
                  </Box>
                </Box>
                <Box
                  width={{ base: "100%", md: "56%" }}
                  margin="auto"
                  mt={{ base: 0, md: 5 }}
                >
                  <Button
                    width={"100%"}
                    background="#0db616"
                    color="#fff"
                    fontSize={14}
                    fontWeight="400"
                    mb={2}
                    disabled={!(mobile.length == 10)}
                    onClick={sendOtpToMobile}
                    // onClick={saveMyAddress}
                    isLoading={isLoading}
                  >
                    REQUEST OTP
                  </Button>
                </Box>
                <Box my={3}>
                  <Text fontSize={10} textAlign="center">
                    Don't have account, just login and your are good to go.
                  </Text>
                </Box>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
