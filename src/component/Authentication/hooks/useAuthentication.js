import { useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export const useAuthentication = () => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const [mobile, setMobile] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpFromServer, setOtpFromServer] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [inputOTP, setInputOTP] = useState("");
    const [wrongOTP, setWrongOtp] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const isLogin = cookies.get('isUserLogin');

    const wrngOTP = () => {
        setWrongOtp(true)
        setTimeout(() => { setWrongOtp(false); setInputOTP(""); setLoading(false); }, 1000);
    };


    useEffect(() => {

        // console.log("is ===> login ===>", isLogin);
        isLogin && setIsLogedIn(true);

    }, [isLogin])

    return {
        setMobile,
        setOtpSent,
        otpSent,
        setLoading,
        setOtpFromServer,
        wrongOTP,
        setInputOTP,
        inputOTP,
        wrngOTP,
        otpFromServer,
        mobile,
        isLoading,
        setIsLogedIn,
        isLogedIn
    }

}