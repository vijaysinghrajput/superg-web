import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, HStack, Link, Text, useMediaQuery } from '@chakra-ui/react';
import MainData from '../../context/MainContext';
import { GiBasket } from 'react-icons/gi';
import { FiPhoneCall } from 'react-icons/fi';
import { GoPackage } from 'react-icons/go';
import { AiOutlineRight, AiOutlineStar, AiOutlinePoweroff } from 'react-icons/ai';
import { BsShare } from 'react-icons/bs';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { BsFillJournalBookmarkFill, BsPatchExclamation } from 'react-icons/bs';


const AccountNavigatinMenu = (props) => {
    const data = useContext(MainData);
    const { logOut, user, onLoginOpen } = data;
    const navigate = useNavigate();
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");


    if (isNotSmallerScreen) {

        return (
            <>
                <div class="col-lg-4" style={isNotSmallerScreen ? {} : { paddingBottom: "5rem" }}>
                    {!isNotSmallerScreen &&
                        <div class="p-4 profile text-center border-bottom">
                            <Box p={5} border="1px solid #d4d4d4" width={"fit-content"} m="auto" borderRadius={"50%"}>
                                <img
                                    src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${data.UserID}`}
                                    alt="avatar"
                                    style={{ margin: "auto", width: "fit-content" }}
                                />
                            </Box>
                        </div>
                    }
                    <div class="osahan-account bg-white rounded shadow-sm overflow-hidden">
                        {isNotSmallerScreen &&
                            <div class="p-4 profile text-center border-bottom">
                                <Box p={5} border="1px solid #d4d4d4" width={"fit-content"} m="auto" borderRadius={"50%"}>
                                    <img
                                        src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${data.UserID}`}
                                        alt="avatar"
                                        style={{ margin: "auto", width: "fit-content" }}
                                    />
                                </Box>

                            </div>
                        }
                        <div class="account-sections">
                            <ul class="list-group">

                                {data.auth.isUserLogin && (
                                    <>

                                        {/* 
                                    <a href="#" onClick={() => navigate("/address")} class="text-decoration-none text-dark">
                                        <li class="border-bottom bg-white d-flex align-items-center p-3">
                                            <i class="icofont-address-book osahan-icofont bg-dark"></i>My Address
                                            <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                        </li>
                                    </a> */}

                                        <a href="#" onClick={() => navigate("/orders")} class="text-decoration-none text-dark">
                                            <li class="border-bottom bg-white d-flex align-items-center p-3">
                                                <GiBasket size={30} className='osahan-icofont bg-success' />My Orders
                                                <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                            </li>
                                        </a>{/* 

                                    <a href="#" onClick={() => navigate("/notification")} class="text-decoration-none text-dark">
                                        <li class="border-bottom bg-white d-flex align-items-center p-3">
                                            <i class="icofont-notification osahan-icofont bg-success"></i>Notifications
                                            <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                        </li>
                                    </a> */}

                                    </>

                                )}
                                {/* <a href="#" onClick={() => navigate("/offers")} class="text-decoration-none text-dark">
                                <li class="border-bottom bg-white d-flex align-items-center p-3">
                                    <i class="icofont-sale-discount osahan-icofont bg-danger"></i>Offers
                                    <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                </li>
                            </a> */}

                                <a href="#" onClick={() => navigate("/condition")} class="text-decoration-none text-dark">
                                    <li class="border-bottom bg-white d-flex align-items-center p-3">
                                        <i class="icofont-info-circle osahan-icofont bg-primary"></i>Conditions
                                        <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                    </li>
                                </a>
                                <a href="#" onClick={() => navigate("/contact")} class="text-decoration-none text-dark">
                                    <li class="border-bottom bg-white d-flex align-items-center p-3">
                                        <i class="icofont-phone osahan-icofont bg-warning"></i>Contact Us
                                        <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                    </li>
                                </a>
                                {data.auth.isUserLogin && (
                                    <a href="#" onClick={() => logOut()} class="text-decoration-none text-dark">
                                        <li class="border-bottom bg-white d-flex  align-items-center p-3">
                                            <i class="icofont-lock osahan-icofont bg-danger"></i> Logout
                                        </li>
                                    </a>
                                )}


                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Box bg="#fff" p={5}>
                <Box my={2}>
                    <Text fontSize={20} fontWeight="600">My account</Text>
                    <Text fontSize={16} mt={2}>{user.user_info?.mobile}</Text>
                    <Text fontSize={12} textAlign="center" mt={2}>{data.UserID ? "" : "Login to view your compleate profile"}</Text>
                </Box>
                {!data.UserID && <Box mb={4}>
                    <Button
                        variant={"outline"}
                        colorScheme="green"
                        borderWidth={2}
                        width={"100%"}
                        onClick={onLoginOpen}
                    >Login</Button>
                </Box>}
                <Box mb={5} p={5} px={8} bg={"#d7edf9"} borderRadius={6}>
                    <HStack justifyContent={"space-around"}>
                        <Box textAlign={"center"} onClick={() => window.Android?.callMe("6391000414")}>
                            <FiPhoneCall size={20} />
                            <Text mt={1} fontSize={12}>Call Us</Text>
                        </Box>
                        <Box textAlign={"center"} onClick={() => window.Android?.sendMail("support@superg.in")}>
                            <IoMailUnreadOutline size={22} />
                            <Text mt={1} fontSize={12}>Support</Text>
                        </Box>
                        <Box textAlign={"center"} onClick={() => window.Android?.shairApp()}>
                            <BsShare size={20} />
                            <Text mt={1} fontSize={12}>Share</Text>
                        </Box>
                    </HStack>
                </Box>
                <Box opacity={data.UserID ? "1" : "0.5"} pointerEvents={data.UserID ? "unset" : "none"}>
                    <Text color="grey" my={4}>YOUR INFORMATION</Text>
                    <Box mb={5}>
                        <HStack
                            onClick={() => navigate("/orders")}
                            justifyContent={"space-between"} alignItems="center">
                            <Box display={"flex"} alignItems="center">
                                <Box borderRadius={"50%"} bg="#e0e0e0" p={1} display={"flex"} mr={3}>
                                    <GoPackage size={18} />
                                </Box>
                                <Text fontWeight={"500"}>Your orders</Text>
                            </Box>
                            <Box>
                                <AiOutlineRight />
                            </Box>
                        </HStack>
                    </Box>
                    <Box mb={5}>
                        <HStack
                            onClick={() => navigate("/address")}
                            justifyContent={"space-between"} alignItems="center">
                            <Box display={"flex"} alignItems="center">
                                <Box borderRadius={"50%"} bg="#e0e0e0" p={1} display={"flex"} mr={3}>
                                    <BsFillJournalBookmarkFill size={18} />
                                </Box>
                                <Text fontWeight={"500"}>Address Book</Text>
                            </Box>
                            <Box>
                                <AiOutlineRight />
                            </Box>
                        </HStack>
                    </Box>
                </Box>
                <Box>
                    <Text color="grey" my={4}>OTHER INFORMATION</Text>
                    <Box mb={5}>
                        <HStack
                            onClick={() => navigate("/about")}
                            justifyContent={"space-between"} alignItems="center">
                            <Box display={"flex"} alignItems="center">
                                <Box borderRadius={"50%"} bg="#e0e0e0" p={1} display={"flex"} mr={3}>
                                    <BsPatchExclamation size={18} />
                                </Box>
                                <Text fontWeight={"500"}>About us</Text>
                            </Box>
                            <Box>
                                <AiOutlineRight />
                            </Box>
                        </HStack>
                    </Box>
                    <Box mb={5}>
                        {/* <Link href="https://g.page/r/CaODRoxra1JWEBM/review" isExternal> */}
                        <HStack
                            justifyContent={"space-between"}
                            alignItems="center"
                            onClick={() => window.Android?.rateUsOnPlayStore()}
                        >
                            <Box display={"flex"} alignItems="center">
                                <Box borderRadius={"50%"} bg="#e0e0e0" p={1} display={"flex"} mr={3}>
                                    <AiOutlineStar size={18} />
                                </Box>
                                <Text fontWeight={"500"}>Rate us on Play Store</Text>
                            </Box>
                            <Box>
                                <AiOutlineRight />
                            </Box>
                        </HStack>
                        {/* </Link> */}
                    </Box>
                    {data.UserID ?
                        <Box mb={5}>
                            <HStack
                                onClick={() => logOut()}
                                justifyContent={"space-between"} alignItems="center">
                                <Box display={"flex"} alignItems="center">
                                    <Box borderRadius={"50%"} bg="#e0e0e0" p={1} display={"flex"} mr={3}>
                                        <AiOutlinePoweroff size={18} />
                                    </Box>
                                    <Text fontWeight={"500"}>Log out</Text>
                                </Box>
                                <Box>
                                    <AiOutlineRight />
                                </Box>
                            </HStack>
                        </Box> : null
                    }
                </Box>
                <Box mt={6} mb={10}>
                    <Text fontWeight={"900"} fontSize={30} fontFamily="unset !important" color={"#b5b5b5"} textAlign="center">SuperG.in</Text>
                    <Text fontSize={10} color={"#b5b5b5"} textAlign="center">Made with ❤️ by Skyably IT Solution</Text>
                </Box>
            </Box>
        </>
    )

}

export default AccountNavigatinMenu;