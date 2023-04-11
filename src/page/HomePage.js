import React, { useEffect } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import HomeComponent from "../component/HomePage/HomeComponent";
import URL, { SeoData } from "../URL";
import Cookies from "universal-cookie";
import { Helmet } from "react-helmet";
import Base64 from "../helper/EncodeDecode";

const cookies = new Cookies();

const HomePage = () => {
  const setUserFCMtoken = async (token = "token website", provider_id) => {
    sessionStorage.setItem("fcmInserted", true);
    fetch(URL + "/APP-API/App/AddUserFCMtoken", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token,
        provider_id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("token ===>", responseJson);
      })
      .catch((error) => {
        //  console.error(error);
      });
  };

  useEffect(() => {
    const userMob = cookies.get("userMobile");
    const inserted = sessionStorage.getItem("fcmInserted");

    const settingFCMtoken = async () => {
      const token = window?.Android && (await window.Android.getDeviceToken());
      const UserMobile = userMob && Base64.atob(userMob);
      setUserFCMtoken(token, UserMobile);
    };

    userMob && !inserted && settingFCMtoken();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{SeoData.title}</title>

        <meta name="description" content={SeoData.decerption} />
        <meta name="keywords" content={SeoData.keyword} />
        <meta name="author" content={SeoData.author} />
      </Helmet>

      <Header />

      <HomeComponent />

      <Footer />
    </>
  );
};

export default HomePage;
