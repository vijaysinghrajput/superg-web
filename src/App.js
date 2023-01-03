import React, { Component, useEffect } from 'react';
import ContextProvider from './context/contextProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import HomePageSeo from './page/HomePageSeo';

import LoginPage from './page/LoginPage';
import AccountPage from './page/AccountPage';
import ConditionPage from './page/ConditionPage';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Verification from './component/Authentication/Verification';
import ProductsBySubcategoryPage from './page/ProductsBySubcategoryPage';
import CartPage from './page/CartPage';
import ProductDetailsPage from './page/ProductDetailsPage';
import CategoryPage from './page/CategoryPage';
import AccountPageApp from './page/AccountPageApp';
import NotFoundPage from './page/NotFoundPage';
import SeoKeyWord from './component/SeoKeyWord'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import URL from './URL'
import SearchPage from './page/SearchPage';
import { OrderSuccessFull } from './component/Cart/OrderSuccessfull';


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      subcategories: [],
      products: [],
      seo_area: [],
      keywords: [],
    }
  }



  componentDidMount() {

    const firebaseConfig = {
      apiKey: "AIzaSyBksxbUeVGEmghg74n33mjtzl_0JJrwpCo",
      authDomain: "superg-6abfb.firebaseapp.com",
      projectId: "superg-6abfb",
      storageBucket: "superg-6abfb.appspot.com",
      messagingSenderId: "898160022906",
      appId: "1:898160022906:web:a5ffbbb1e19ebae47cf2c3",
      measurementId: "G-4CJM9JLRF5"
    };

    // Initialize Firebase
    const appFireBase = initializeApp(firebaseConfig);
    const analytics = getAnalytics(appFireBase);

    // const posi = coords.latitude;
    // const geo = navigator.geolocation.getCurrentPosition;
    // if (!geo) {
    //   console.log('Geolocation is not supported');
    //   return;
    // } else console.log("heyyy --->", geo, posi);

    // navigator.geolocation.getCurrentPosition((position) => {
    //   const p = position.coords;
    //   alert(`latitude ---> ${p.latitude}, longitude ---> ${p.longitude}`);
    // })

    this.fetchReloder();
  }

  fetchReloder() {
    fetch(URL + "/APP-API/App/reloadData", {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
           subcategories: responseJson.subcategories,
           products: responseJson.products,
           seo_area: responseJson.seo_area,
           keywords: responseJson.keywords, })
        // fetchAllData(responseJson);
      })
      .catch((error) => {
        //  console.error(error);
      });
  }

  render() {


    if (this.state.subcategories.length) {


      
      return (
        <ContextProvider>
          {/* <ChakraProvider> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              {this.state.subcategories.map((item, i) => {
                return (
                  <Route path={"/" + (item.name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/:subcatID/:subcatName"} element={<ProductsBySubcategoryPage />} />
                )
              })}
              {this.state.products.map((item, i) => {
                return (
                  <Route path={"/" + (item.product_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/:prodID"} element={<ProductDetailsPage />} />
                )
              })}
              {/* USER ACCOUNT START */}
              <Route path="/orderSuccess" element={<OrderSuccessFull />} />
              <Route path="/accountApp" element={<AccountPageApp />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/notification" element={<AccountPage />} />
              <Route path="/offers" element={<AccountPage />} />
              <Route path="/orders" element={<AccountPage />} />
              <Route path="/address" element={<AccountPage />} />
              <Route path="/condition" element={<AccountPage />} />
              <Route path="/contact" element={<AccountPage />} />
              <Route path="/about" element={<ConditionPage />} />
              <Route path="/term-and-condition" element={<ConditionPage />} />
              <Route path="/privacy-and-policy" element={<ConditionPage />} />
              <Route path="/shipping-policy" element={<ConditionPage />} />
              <Route path="/return-and-refund-policy" element={<ConditionPage />} />
              <Route path="/faq" element={<ConditionPage />} />
              <Route path='*' exact={true} element={<NotFoundPage />} />

              {/* USER ACCOUNT END */}
              {/* SEO START */}


{this.state.keywords.map((item, i) => {
                return (
                  <Route path={"/" + (item.keyword + " in gorakhpur").replace(/\s/g, "-").toLowerCase()} element={<HomePageSeo  title={item.keyword.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + " in Gorakhpur"}  />} />
                )
 })}

 {this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/grocery-delivery-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Grocery Delivery in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/grocery-delivery-app-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Grocery Delivery App in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/grocery-delivery-website-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Grocery Delivery Website in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

 {this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/online-grocery-delivery-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Online Grocery Delivery in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/online-vegetables-delivery-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Online Vegetables Delivery in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/vegetables-delivery-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Vegetables Delivery in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/vegetables-delivery-app-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Vegetables Delivery App in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/vegetables-delivery-website-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Vegetables Delivery Website in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/online-fruits-delivery-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Online Fruits Delivery in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/fruits-delivery-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Fruits Delivery in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/fruits-delivery-app-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Fruits Delivery App in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}

{this.state.seo_area.map((areadata, i) => {
        return (

          <Route path={"/fruits-delivery-website-in-" + (areadata.area).replace(/\s/g, "-").toLowerCase()+"-gorakhpur"} element={<HomePageSeo  title={"Fruits Delivery Website in "+ (areadata.area)+" "+ (areadata.city)}  />} />
        )
})}


              {/* SEO END */}
            </Routes>
          </BrowserRouter>
          {/* </ChakraProvider> */}
        </ContextProvider>
      );
    } else {
      return (
        <div >
          <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
            Please Wait... <AiOutlineLoading3Quarters size={28} className="rorateMe ml-3" />
          </div>
        </div>
      )
    }
  }
}

export default App;