import React from 'react';
import { useNavigate } from 'react-router';
import { constants } from '../../URL';
import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    ChakraProvider
} from '@chakra-ui/react';
import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Base64 from '../../helper/EncodeDecode';


const cookies = new Cookies();



const ContactUs = (props) => {

    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [cokki, setCookie] = useState("");
    const [userIDD, setUserIDD] = useState("");
    const [aaa, setaaa] = useState("");

    const getToken = async () => {
        const token = window?.Android && await window.Android.getDeviceToken();
        token ? setToken(token) : setToken("SuperG");
    }

    useEffect(() => {
        getToken();
        const userMob = cookies.get("userMobile");
        const UserMobile = userMob && Base64.atob(userMob);

        const userID = cookies.get("userID");
        // console.log("hey cookieess===>", userID);
        const UserID = userID && Base64.atob(userID);

        setCookie(UserMobile);
        setUserIDD(UserID);
        setaaa(userID);
    }, [])

    return (
        <>
            <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
                <h4 class="mb-4 profile-title">Contact Us</h4>
                <div class="help_support">
                    <div className="address_contact">
                        <h5>Address :</h5>
                        <p>281 B Bhardwajpuram, Rustampur, Gorakhpur <br /> 273016</p>
                        <p>Call Us @ <br /> <a href="tel:6391000414">6391000414</a> <br /> <a href="tel:6391000415">6391000415</a> <br /> <a href="tel:6391000416">6391000416</a></p>
                        <p>Whatsapp @ <br /> <a href={`https://api.whatsapp.com/send?text=Hello SuperG.in!&phone=${constants.phone}`}>{constants.phone}</a></p>
                        <p>Email @ <br /> <a href={`mailto:${constants.email}`}>{constants.email}</a></p>
                        <Text>Token : {token}</Text>
                        <Text>User ID : {userIDD}</Text>
                        <Text>mobile : {cokki}</Text>
                        <Text>main User ID : {aaa}</Text>
                    </div>
                    {/* <WrapItem>
                        <Box bg="white" borderRadius="lg">
                            <Box m={8} color="#0B0E3F">
                                <VStack spacing={5}>
                                    <FormControl id="name">
                                        <FormLabel>Your Name</FormLabel>
                                        <InputGroup borderColor="#E0E1E7">
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<BsPerson color="gray.800" />}
                                            />
                                            <Input type="text" size="md" />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="name">
                                        <FormLabel>Mail</FormLabel>
                                        <InputGroup borderColor="#E0E1E7">
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<MdOutlineEmail color="gray.800" />}
                                            />
                                            <Input type="text" size="md" />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="name">
                                        <FormLabel>Message</FormLabel>
                                        <Textarea
                                            borderColor="gray.300"
                                            _hover={{
                                                borderRadius: 'gray.300',
                                            }}
                                            placeholder="message"
                                        />
                                    </FormControl>
                                    <FormControl id="name" float="right">
                                        <Button
                                            variant="solid"
                                            bg="#0D74FF"
                                            color="white"
                                            _hover={{}}>
                                            Send Message
                                        </Button>
                                    </FormControl>
                                </VStack>
                            </Box>
                        </Box>
                    </WrapItem> */}
                </div>
            </div>
        </>
    )

}

export default ContactUs;