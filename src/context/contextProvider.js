import React, { useReducer, useState, useEffect } from "react";
import Context from "./MainContext";
import { reducer } from '../reducer/reducer';
import Base64 from "../helper/EncodeDecode";
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import URL from "../URL";
import { useDisclosure } from "@chakra-ui/react";
// import { useNavigate } from 'react-router';
import { useQuery } from 'react-query'
import { fetchAllData } from "../api";


const cookies = new Cookies();

const ContextProvider = props => {

    const { data } = useQuery('all_data', fetchAllData);

    const MainData = {
        isLoading: true,
        auth: {
            isUserLogin: false
        },

        user: {
            user_info: {
                name: "",
                email: "",
                phone: "",
                address: "",
                provider_pic: ""
            },
        },

        banners: [],
        categories: [],
        products: [],
        condition: [],
        Storefaq: [],
        public_notification: [],

        subcategories: [],
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        totalItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')).length : 0,
        totalAmount: 0
    };
    const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

    const getUserId = () => {
        const userID = cookies.get("userID");
        // console.log("hey cookieess===>", userID);
        const UserID = userID && Base64.atob(userID);
        // console.log("hey cookiees 2222222222s===>", UserID);
        return UserID | "0";
    };

    // const fetchData = () => {
    //     fetch(URL + "/APP-API/App/reloadData", {
    //         method: 'POST',
    //         header: {
    //             'Accept': 'application/json',
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({

    //         })
    //     }).then((response) => response.json())
    //         .then((responseJson) => {
    //             // //console.log("resjosn", responseJson);
    //             functionality.fetchAllData(responseJson);
    //             // fetchAllData(responseJson);
    //         })
    //         .catch((error) => {
    //             //  console.error(error);
    //         });
    // };

    // const fetchData2 = () => {
    //     fetch(URL + "/APP-API/App/reloadData2", {
    //         method: 'POST',
    //         header: {
    //             'Accept': 'application/json',
    //             'Content-type': 'application/json'
    //         }
    //     }).then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log("resjosn", responseJson);
    //         })
    //         .catch((error) => {
    //             //  console.error(error);
    //         });
    // };

    // const fetchData3 = () => {
    //     fetch("http://localhost:8000/product", {
    //         method: 'GET',
    //         header: {
    //             'Accept': 'application/json',
    //             'Content-type': 'application/json'
    //         }
    //     }).then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log("resjosn", responseJson);
    //         })
    //         .catch((error) => {
    //             //  console.error(error);
    //         });
    // };

    const functionality = {
        fetchAllData: payload => dispatch({ type: "FETCH_ALL_DATA", payload }),
        setUserLogin: credentials => dispatch({ type: "USER_LOGIN", credentials }),
        addToCart: payload => dispatch({ type: "ADD_TO_CART", payload }),
        removeFromCart: payload => dispatch({ type: "REMOVE_FROM_CART", payload }),
        logOut: () => {
            cookies.remove("isUserLogin", { path: "/" });
            cookies.remove("userID", { path: "/" });
            cookies.remove("userProvider_id", { path: "/" });
            cookies.remove("userName", { path: "/" });
            cookies.remove("userMobile", { path: "/" });
            dispatch({ type: "LOGOUT" });
            return <Navigate to="/" />
            // window.location.reload();

        },
        setCartDetails: payload => dispatch({ type: "CART_DETAILS", payload }),
        removeCart: payload => dispatch({ type: "REMOVE_CART", payload }),
        genRanHex: size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        setTotalPrice: price => dispatch({ type: "TOTAL_PRICE", price }),
        reloadData: fetchAllData,

    };

    const getUserDetails = (userID) => {
        fetch(URL + "/APP-API/App/GetUserInfo", {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'

            },
            body: JSON.stringify({
                userID
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                functionality.setUserLogin(responseJson);
                // functionality.fetchAllData(responseJson);

            })
            .catch((error) => {
                //  console.error(error);
            });
    };

    useEffect(() => {
        // console.log("all_data ======------>", data);
        data && functionality.fetchAllData(data);
    }, [data]);

    useEffect(() => {
        // let userCookie = btoa("userID");
        // lets see...
        const userID = cookies.get("userID");
        const UserID = getUserId();
        if (userID && MainData.user.user_info.name == "") {
            getUserDetails(UserID);
        }
        // fetchData3();
        // fetchData2();
        // fetchData();
    }, [MainData.user.user_info.name])

    const [MainDataExport, dispatch] = useReducer(reducer, MainData);

    return (
        <Context.Provider value={{
            ...MainDataExport,
            ...functionality,
            UserID: getUserId(),
            isLoginOpen,
            onLoginOpen,
            onLoginClose

        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;