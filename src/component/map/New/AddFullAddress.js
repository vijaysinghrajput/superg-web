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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import Cookies from "universal-cookie";
import Base64 from "../../../helper/EncodeDecode";
import URL from "../../../URL";
import useBoolean from "../../../hooks/useBoolean";

const cookies = new Cookies();

export default function AddFullAddress({
  isOpen,
  onClose,
  address,
  position,
  onCloseMain,
  setUserAddressData,
  type,
  editData,
}) {
  const [saveInfo, setInfo] = useState({});
  const [errorFeald, setErrorFeald] = useState("");
  const { value: isLoading, setTrue, setFalse } = useBoolean(false);

  const dataToSaveAddress = {
    ...saveInfo,
    ...address,
    ...position,
  };

  const checkValid = () => {
    return new Promise((resolve, reject) => {
      const { fullName, mobile, houseNo, addressFromUser } = dataToSaveAddress;

      // console.log(fullName, mobile, houseNo, addressFromUser);

      if (!fullName) reject("fname");
      else if (!mobile) reject("mobile");
      else if (!houseNo) reject("houseNo");
      else if (!addressFromUser) reject("addressFromUser");
      else resolve("good");
    });
  };

  const saveMyAddress = async () => {
    setErrorFeald("");

    const isValid = checkValid();
    isValid
      .then((val) => {
        setTrue();
        let actiontype = type === "ADD" ? "insert" : "update";
        let address_id = type === "ADD" ? null : editData.address_id;
        const {
          UserID,
          addressType,
          fullName,
          mobile,
          houseNo,
          addressFromUser,
          user_city,
          user_full_address,
          state,
          lat,
          lng,
        } = dataToSaveAddress;

        fetch(URL + "/APP-API/App/insertUserAddress", {
          method: "post",
          header: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            actiontype,
            address_id,
            UserId: UserID,
            user_name: fullName,
            user_mobile: mobile,
            user_house_no: houseNo,
            user_street: user_full_address,
            base_address: addressFromUser,
            user_city: user_city,
            user_addres_type: addressType,
            user_lat: lat,
            user_lng: lng,
            state,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status == "done") {
              setUserAddressData(responseJson.data);
              setFalse();
              onCloseMain();
              //   console.log("result", responseJson);
            }
          })
          .catch((error) => {
            //  console.error(error);
          });
      })
      .catch((feald) => {
        setErrorFeald(feald);
      });
  };

  useEffectOnce(() => {
    const userID = cookies.get("userID");
    const UserID = Base64.atob(userID);
    // console.log("edit ===>", editData, type);
    if (type === "ADD") {
      setInfo((rest) => {
        return { ...rest, UserID };
      });
    } else {
      setInfo((rest) => {
        return {
          ...rest,
          UserID,
          fullName: editData.name,
          mobile: editData.phone,
          houseNo: editData.user_house_no,
          addressFromUser: editData.base_address,
        };
      });
    }
  });

  useEffect(() => {
    // console.log("hey there", saveInfo, address, position);
  }, [saveInfo]);

  return (
    <>
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius={12}>
          <DrawerHeader borderBottomWidth="1px">
            Enter full information
          </DrawerHeader>
          <DrawerBody>
            <Text>Save address as *</Text>
            <AddressType setInfo={setInfo} />
            <Box my={2}>
              <FormControl mt={1} id="email">
                <FormLabel fontSize={12}>Full Name</FormLabel>
                <Input
                  onFocus={() => setErrorFeald("")}
                  value={saveInfo.fullName}
                  type="text"
                  onChange={(e) =>
                    setInfo((rest) => {
                      return { ...rest, fullName: e.target.value };
                    })
                  }
                  isInvalid={errorFeald === "fname" ? true : false}
                  errorBorderColor="crimson"
                />
                {errorFeald === "fname" ? (
                  <Text color={"crimson"} fontSize={10} ml={2} mt={1}>
                    Name is reqired*
                  </Text>
                ) : null}
              </FormControl>
              <FormControl mt={1} id="mobile">
                <FormLabel fontSize={12}>Mobile Number</FormLabel>
                <Input
                  onFocus={() => setErrorFeald("")}
                  value={saveInfo.mobile}
                  type="tel"
                  onChange={(e) =>
                    setInfo((rest) => {
                      return { ...rest, mobile: e.target.value };
                    })
                  }
                  maxLength={10}
                  isInvalid={errorFeald === "mobile" ? true : false}
                  errorBorderColor="crimson"
                />
                {errorFeald === "mobile" ? (
                  <Text color={"crimson"} fontSize={10} ml={2} mt={1}>
                    Phone number is reqired*
                  </Text>
                ) : null}
              </FormControl>
              <FormControl mt={1} id="houseNo">
                <FormLabel fontSize={12}>House Number</FormLabel>
                <Input
                  onFocus={() => setErrorFeald("")}
                  value={saveInfo.houseNo}
                  type="text"
                  onChange={(e) =>
                    setInfo((rest) => {
                      return { ...rest, houseNo: e.target.value };
                    })
                  }
                  isInvalid={errorFeald === "houseNo" ? true : false}
                  errorBorderColor="crimson"
                />
                {errorFeald === "houseNo" ? (
                  <Text color={"crimson"} fontSize={10} ml={2} mt={1}>
                    House number is reqired*
                  </Text>
                ) : null}
              </FormControl>
              <FormControl mt={1} id="completeaddress">
                <FormLabel fontSize={12}>Complete Address</FormLabel>
                <Input
                  onFocus={() => setErrorFeald("")}
                  value={saveInfo.addressFromUser}
                  type="text"
                  onChange={(e) =>
                    setInfo((rest) => {
                      return { ...rest, addressFromUser: e.target.value };
                    })
                  }
                  isInvalid={errorFeald === "addressFromUser" ? true : false}
                  errorBorderColor="crimson"
                />
                {errorFeald === "addressFromUser" ? (
                  <Text color={"crimson"} fontSize={10} ml={2} mt={1}>
                    Full address is reqired*
                  </Text>
                ) : null}
              </FormControl>
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
                onClick={saveMyAddress}
                isLoading={isLoading}
              >
                Save Address
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "#33b31124",
          color: "black",
          borderColor: "#33b311",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={3}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function AddressType({ setInfo }) {
  const options = ["Home", "Work", "Office"];

  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: "addressType",
    defaultValue: "Home",
  });

  const group = getRootProps();

  useEffect(() => {
    setInfo((rest) => {
      return { ...rest, addressType: value };
    });
  }, [value]);

  return (
    <HStack {...group} mt={2}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
