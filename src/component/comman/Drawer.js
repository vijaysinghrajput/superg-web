import React, { useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Box,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import MainContext from "../../context/MainContext";
import { GoLocation } from "react-icons/go";
import { useNavigate } from "react-router";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdLocalOffer } from "react-icons/md";
import { FcContacts } from "react-icons/fc";
import {
  BsViewStacked,
  BsBell,
  BsPhoneFill,
  BsFillGeoAltFill,
  BsTelephone,
  BsFileLock,
  BsFileLock2,
} from "react-icons/bs";
import {
  AiOutlineLogin,
  AiOutlineQuestionCircle,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { RiHome4Line } from "react-icons/ri";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { TbFileCheck } from "react-icons/tb";

const MainDrawer = ({ isOpen, onClose }) => {
  const { user, logOut, auth, onLoginOpen } = useContext(MainContext);
  const navigateTo = useNavigate();

  const navigate = (path) => {
    onClose();
    navigateTo(path);
  };

  const openLogin = () => {
    onClose();
    onLoginOpen();
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent style={{ width: "68%" }}>
          <DrawerHeader borderBottom={"1px solid #efefef"}>
            {/* <div class="bs-canvas-header side-cart-header">
                            <p className="mb-1">Hello Sir,</p>
                            {auth.isUserLogin && <p style={{ textTransform: "uppercase", fontSize: 10 }}><BsPhoneFill />  {user?.user_info?.mobile}</p>}
                        </div> */}
            <Flex alignItems={"center"}>
              <Image
                src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.user_info?.mobile}`}
                alt="avatar"
                borderRadius={"50%"}
                height={10}
              />
              <Box ml={2}>
                <Text fontSize={16}>Hello Family</Text>
                <Text fontSize={12} fontWeight={"500"}>
                  {auth.isUserLogin && user?.user_info?.mobile}
                </Text>
              </Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <div className="cart_options">
              <>
                <Box
                  py={3}
                  onClick={() => navigate("/")}
                  className="d-flex align-items-center close_me_please"
                >
                  <RiHome4Line size={22} />{" "}
                  <p
                    className="ml-2 mb-0"
                    style={{ fontWeight: "700", fontSize: 12 }}
                  >
                    {" "}
                    Home
                  </p>
                </Box>
                <Box
                  py={3}
                  onClick={() => navigate("/search")}
                  className="d-flex align-items-center close_me_please"
                >
                  <BiSearchAlt2 size={22} />{" "}
                  <p
                    className="ml-2 mb-0"
                    style={{ fontWeight: "700", fontSize: 12 }}
                  >
                    {" "}
                    Search Products
                  </p>
                </Box>
                <Box
                  py={3}
                  onClick={() => navigate("/category")}
                  className="d-flex align-items-center close_me_please"
                >
                  <BsViewStacked size={22} />{" "}
                  <p
                    className="ml-2 mb-0"
                    style={{ fontWeight: "700", fontSize: 12 }}
                  >
                    {" "}
                    Shop By Category
                  </p>
                </Box>
                {/* <div onClick={() => navigate("/condition")} className="d-flex align-items-center py-3 close_me_please"><AiOutlineQuestionCircle size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Terms and Condition</p></div> */}
                <Box fontWeight={"500"}>
                  <Flex
                    py={3}
                    alignItems={"center"}
                    gap={2}
                    onClick={() => navigate("/about")}
                  >
                    <HiOutlineInformationCircle size={20} />
                    <Text fontSize={12} fontWeight={"600"}>
                      About Us
                    </Text>
                  </Flex>
                  <Flex
                    py={3}
                    alignItems={"center"}
                    gap={2}
                    onClick={() => navigate("/contact")}
                  >
                    <BsTelephone size={20} />
                    <Text fontSize={12} fontWeight={"600"}>
                      Contact Us
                    </Text>
                  </Flex>
                  <Flex
                    py={3}
                    alignItems={"center"}
                    gap={2}
                    onClick={() => navigate("/privacy-and-policy")}
                  >
                    <BsFileLock2 size={20} />
                    <Text fontSize={12} fontWeight={"600"}>
                      Privacy & Policy
                    </Text>
                  </Flex>
                  <Flex
                    py={3}
                    alignItems={"center"}
                    gap={2}
                    onClick={() => navigate("/return-and-refund-policy")}
                  >
                    <TbFileCheck size={20} />
                    <Text fontSize={12} fontWeight={"600"}>
                      Return & Refund Policy
                    </Text>
                  </Flex>
                </Box>
                {auth.isUserLogin ? (
                  <>
                    <div
                      onClick={() => logOut()}
                      className="d-flex align-items-center py-3 close_me_please"
                    >
                      <AiOutlinePoweroff size={22} />{" "}
                      <p className="ml-2 mb-0" style={{ fontWeight: "700" }}>
                        {" "}
                        Logout
                      </p>
                    </div>
                  </>
                ) : (
                  <div
                    onClick={openLogin}
                    className="d-flex justify-content-center pt-5 align-items-center py-3 close_me_please"
                  >
                    <AiOutlineLogin size={22} />{" "}
                    <p className="ml-2 mb-0" style={{ fontWeight: "700" }}>
                      {" "}
                      Login
                    </p>
                  </div>
                )}
              </>
            </div>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MainDrawer;
