import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainData from '../context/MainContext';
import { useDisclosure, useMediaQuery, Select, Text, Button, Box } from '@chakra-ui/react';
import { MdOutlineShoppingCart, MdArrowForwardIos } from 'react-icons/md';
import { BiCategory, BiSearchAlt2 } from 'react-icons/bi';
// import { BsWhatsapp } from 'react-icons/bs';
import { FcSearch } from 'react-icons/fc';
import { AiOutlineLogin } from 'react-icons/ai';
import { BsWhatsapp, BsFillTelephoneFill, BsArrowLeft } from 'react-icons/bs';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { constants } from '../URL';
import Drawer from './comman/Drawer';
import { useMemo } from 'react';
import { HiArrowNarrowLeft, HiOutlineHome, HiOutlineMenuAlt3 } from 'react-icons/hi';
import MainDrawer from './comman/Drawer';
import LoginDrawer from './Authentication/LoginDrawer';

const Header = ({ }) => {

  const data = useContext(MainData);
  localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
  const { products, logOut, serviceArea, subcategories, cartItems, auth, isLoginOpen, onLoginOpen, onLoginClose } = data;
  const { pathname } = useLocation();
  const [searchedProduct, setSearchedProduct] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = React.useState(false)
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();


  useMemo(() => {
    const oldCartItem = [...cartItems];
    cartItems.filter((data, i) => {
      const newP = products.find(o => o.id == data.id);
      const newIndex = oldCartItem.findIndex((obj => obj.id === data.id));
      // //console.log("asdasd", newP?.price, newIndex)
      if (newP) {
        oldCartItem[newIndex]["price"] = newP?.price;
        oldCartItem[newIndex]["discount"] = newP?.discount;
      }
    });
  }, [cartItems]);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          onBlur();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (products.length != 0) {
      const filteredClubs = products.filter(Club => {
        let ClubLowercase = (
          Club.product_name
        ).toLowerCase();
        let searchTermLowercase = searchTerm.toLowerCase();
        return ClubLowercase.indexOf(searchTermLowercase) > -1;
      });
      setSearchedProduct(filteredClubs);
    }
  }, [searchTerm]);

  useEffect(() => {
    setSearchedProduct(products);
  }, [products]);

  const GetTotal = cartItems.reduce(function (a, b) {
    const price = (b.price) - ((b.price) * (b.discount / 100))
    return a + Number(price * b["itemQuant"]);
  }, 0);

  return (
    <>
      <LoginDrawer isLoginOpen={isLoginOpen} onLoginClose={onLoginClose} onLoginOpen={onLoginOpen} />
      {!isNotSmallerScreen &&
        <>
          <Drawer isOpen={isOpen} onClose={onClose} />
          {cartItems.length !== 0
            && pathname !== "/cart"
            && pathname !== "/login"
            && pathname !== "/verification"
            && pathname !== "/location"
            && pathname !== "/saveMyAddress"
            && pathname !== "/accountApp"
            && pathname !== "/orders"
            && pathname !== "/orderDetails"
            && pathname !== "/search"
            // && pathname !== "/category"
            && pathname !== "/address"
            &&
            <div className="pb-0 pt-2 px-3 letItFlowInAir">
              <Link to="/cart">
                <div class="rounded shadow bg-success p-3 text-white">
                  <div class="d-flex align-items-center justify-content-between">
                    <div className='d-flex align-items-center'><MdOutlineShoppingCart size={20} style={{ fontWeight: "700" }} /><h6 class="m-0 ml-2">{cartItems.length} items. ₹{Math.round(GetTotal)}</h6></div> <h6 className='ml-auto mb-0 d-flex'>view cart <MdArrowForwardIos /></h6>
                  </div>
                </div>
              </Link>
            </div>
          }
          {pathname !== "/cart" && pathname !== "/login" && pathname !== "/verification" && pathname !== "/location" && pathname !== "/saveMyAddress" &&
            <div class="osahan-menu-fotter fixed-bottom bg-white text-center border-top">
              <div class="row m-0">
                <Link to="/" class={pathname === "/" ? "text-dark small col font-weight-bold text-decoration-none p-2 selected" : "text-muted col small text-decoration-none p-2"}>
                  <p class="h5 m-0"><i class="icofont-grocery"></i></p>
                  Home
                </Link>
                <Link to="/category" class={pathname === "/category" ? "text-dark small col font-weight-bold text-decoration-none p-2 selected" : "text-muted col small text-decoration-none p-2"}>
                  <p class="h5 m-0"><BiCategory /></p>
                  Category
                </Link>
                <a href={`https://api.whatsapp.com/send?text=Hello SuperG.in!&phone=${constants.phone}`} class={pathname === "/offers" ? "text-dark small col font-weight-bold text-decoration-none p-2 selected" : "text-muted col small text-decoration-none p-2"}>
                  <p class="h5 m-0"><BsWhatsapp /></p>
                  Whatsapp
                </a>
                <Link to="/search" class={pathname === "/search" ? "text-dark small col font-weight-bold text-decoration-none p-2 selected" : "text-muted col small text-decoration-none p-2"}>
                  <p class="h5 m-0"><BiSearchAlt2 /></p>
                  Search
                </Link>
                {/* <Link to="/offers" class={pathname === "/offers" ? "text-dark small col font-weight-bold text-decoration-none p-2 selected" : "text-muted col small text-decoration-none p-2"}>
                  <p class="h5 m-0"><BsWhatsapp /></p>
                  Offers
                </Link> */}
                {auth.isUserLogin ? <Link to="/accountApp" class={pathname === "/accountApp" ? "text-dark small col font-weight-bold text-decoration-none p-2 selected" : "text-muted col small text-decoration-none p-2"}>
                  <p class="h5 m-0"><i class="icofont-user"></i></p>
                  Account
                </Link> : <Box className='text-muted col small text-decoration-none p-2' onClick={onLoginOpen}>
                  <p class="h5 m-0"><AiOutlineLogin /></p>
                  Login
                </Box>
                }
              </div>
            </div>
          }
        </>
      }
      {
        !isNotSmallerScreen && pathname !== "/" ? (
          <div class="p-3 border-bottom mobile-nav" style={{ background: "#fff", boxShadow: "0 1px 5px 0px #dadada" }}>
            <div class="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div class="font-weight-bold text-success text-decoration-none" onClick={() => navigate(-1)}>
                  <HiArrowNarrowLeft size={26} style={{ fontWeight: "800", cursor: "pointer" }} />
                </div>
                <Text fontSize={16} textTransform="capitalize" fontWeight="600" ml={3}>{pathname?.replace(/-.*/, '').replace(/\//, '')}</Text>
                <a class="ml-auto hc-nav-trigger hc-nav-1" href="#" onClick={onOpen}><i class="icofont-navigation-menu"></i></a>
              </div>
              <div className='mr-3'
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                <HiOutlineHome size={24} />
              </div>
            </div>
          </div>
        ) : (
          <div class="border-bottom p-3 d-none mobile-nav" style={{ background: "#fff" }}>
            <div class="title d-flex align-items-center justify-content-between">
              <Link to="/" class="text-decoration-none text-dark d-flex align-items-center">
                <img
                  class="osahan-logo mr-2"
                  // src="/img/logo.svg" 
                  src='https://media.tenor.com/LagCHLX1iosAAAAi/india-flag-india.gif'
                />
                <h4 class="font-weight-bold text-success m-0">SuperG.in</h4>
              </Link>
              <MainDrawer isOpen={isOpenDrawer} onClose={onCloseDrawer} />
              <HiOutlineMenuAlt3 size={24} style={{ cursor: "pointer" }} onClick={onOpenDrawer} />
              {/* <div class="dropdown">
                <a class="text-dark dropdown-toggle d-flex align-items-center osahan-location-drop" href="#">
                  <div><i class="icofont-location-pin d-flex align-items-center bg-light rounded-pill p-2 icofont-size border shadow-sm mr-2"></i></div>
                  <div>
                    <p class="text-muted mb-0 small">Delivery Area</p>
                    <Select size="xs" style={{ border: "none", padding: 0, maxWidth: "fit-content", cursor: "pointer" }} >
                      {serviceArea?.sort((a, b) => a.area_name.localeCompare(b.area_name)).map((areas, i) => {
                        return (
                          <option className='p-1' style={{ background: "#fff" }} value={areas.area_name}>{areas.area_name}</option>
                        )
                      })}
                    </Select>
                  </div>
                </a>
              </div> */}
              {/* <a href="#" role="button" class="toggle ml-auto"><i class="icofont-navigation-menu"></i></a> */}
              <a class="ml-auto hc-nav-trigger hc-nav-1" href="#" onClick={onOpen} role="button" aria-controls="hc-nav-1"><i class="icofont-navigation-menu"></i></a>

            </div>
            <div className='position-relative'>
              <div class="input-group mt-3 rounded shadow-sm overflow-hidden bg-white" style={{ border: "1px solid #efefef" }}>
                <div class="input-group-prepend">
                  <button class="border-0 btn btn-outline-secondary text-success bg-white"><i class="icofont-search"></i></button>
                </div>
                <input type="text" onClick={() => navigate("/search")} class="shadow-none border-0 form-control pl-0" id="inlineFormInputGroupUsername2" placeholder="Search for Products.." />
              </div>
            </div>
          </div>
        )
      }

      {/* <div onClick={() => null} class="theme-switch-wrapper">
        <label class="theme-switch" for="checkbox">
          <input type="checkbox" id="checkbox" />
          <div class="slider round"></div>
          <i class="icofont-moon"></i>
        </label>
        <em>Enable Dark Mode!</em>
      </div> */}

      <div class="bg-white shadow-sm osahan-main-nav position-fixed w-100" style={{ zIndex: 99 }}>
        <nav class="navbar navbar-expand-lg navbar-light bg-white osahan-header py-0 container">
          <Link class="navbar-brand mr-0" to="/"><img class="img-fluid logo-img rounded-pill border shadow-sm"
            // src="/img/logo.svg" 
            src='https://media.tenor.com/LagCHLX1iosAAAAi/india-flag-india.gif'
          /></Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="ml-3 d-flex align-items-center">
            <div class="dropdown mr-3">
              <a class="text-dark dropdown-toggle d-flex align-items-center osahan-location-drop" href="#">
                <div><i class="icofont-location-pin d-flex align-items-center bg-light rounded-pill p-2 icofont-size border shadow-sm mr-2"></i></div>
                <div>
                  <p class="text-muted mb-0 small">Delivery Area</p>
                  <Select size="xs" icon="none" style={{ border: "none", padding: 0, width: "unset", cursor: "pointer" }} >
                    {serviceArea?.sort((a, b) => a.area_name.localeCompare(b.area_name)).map((areas, i) => {
                      return (
                        <option className='p-1' key={i} style={{ background: "#fff" }} value={areas.area_name}>{areas.area_name}</option>
                      )
                    })}
                  </Select>
                </div>
              </a>
            </div>

            <div class="input-group mr-sm-2 col-lg-12" ref={wrapperRef}>
              <input type="text" onFocus={onFocus} onChange={e => setSearchTerm(e.target.value)} class="form-control" id="inlineFormInputGroupUsername2" placeholder="Search for Products.." />
              <div class="input-group-prepend">
                <div class="btn btn-success rounded-right"><i class="icofont-search"></i></div>
              </div>
              {focused ? (
                <div class="search-items-layout" aria-labelledby="dropdownMenuButton">
                  {searchedProduct.length ? searchedProduct.slice(0, 10).map((item, i) => {
                    return (
                      <Link key={i} onClick={onBlur} class="dropdown-item" to={"/" + (item.product_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + item.id}>
                        <div>
                          <img src={URL + "/images/product-images/" + item?.product_image} style={{ height: 30, marginRight: 5 }} /> {item.product_name} <small className='mr-2'>{item.hindi_name}</small>
                          <span className='ml-auto'>₹{Math.round((item?.price) - (item?.price * item?.discount / 100))}/{item?.product_size + item?.product_unit}</span>
                        </div>
                      </Link>
                    )
                  }) : <div className="col-12">
                    <div className="text-center mt-1">
                      <FcSearch size={36} />
                      <h6 className='mt-2'>Result not found</h6>
                    </div>
                  </div>}
                </div>
              ) : (null)}
            </div>
          </div>
          <div class="ml-auto d-flex align-items-center">
            {data.auth.isUserLogin ? (
              <div class="dropdown mr-3">
                <a href="#" class="dropdown-toggle text-dark" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img
                    src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${data.UserID}`}
                    alt="avatar"
                    class="img-fluid rounded-circle header-user mr-2"
                  /> Hi {data.user?.user_info?.name?.replace(/ .*/, '')}
                </a>
                <div class="dropdown-menu dropdown-menu-right top-profile-drop" aria-labelledby="dropdownMenuButton">
                  {/* <a class="dropdown-item" href="#" onClick={() => navigate("/notification")}>Notification</a> */}
                  {/* <a class="dropdown-item" href="#" onClick={() => navigate("/offers")}>Offers</a> */}
                  <a class="dropdown-item" href="#" onClick={() => navigate("/orders")}>My Orders</a>
                  {/* <a class="dropdown-item" href="#" onClick={() => navigate("/address")}>My address</a> */}
                  <a class="dropdown-item" href="#" onClick={() => navigate("/condition")}>Conditions</a>
                  <a class="dropdown-item" href="#" onClick={() => navigate("/contact")}>Contact Us</a>
                  <a class="dropdown-item" href="#" onClick={() => logOut()}>Logout</a>
                </div>
              </div>
            ) : <a href="#" onClick={() => onLoginOpen()} class="mr-2 text-dark bg-light rounded-pill p-2 icofont-size border shadow-sm">
              <i class="icofont-login"></i>
            </a>}


            <a href="#" onClick={() => navigate("/cart")} style={{ position: 'relative' }} class="ml-2 text-dark bg-light rounded-pill p-2 icofont-size border shadow-sm">
              <span className='cartItemCount'>{cartItems.length}</span>
              <i class="icofont-shopping-cart"></i>
            </a>
          </div>
        </nav>

        <div class="bg-color-head">
          <div class="container menu-bar d-flex align-items-center">
            <ul class="list-unstyled form-inline mb-0">
              <li class="nav-item active">
                <a class="nav-link text-white pl-0" href="#" onClick={() => navigate("/")}>Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Shop By Category
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  {subcategories.length ? (
                    <>
                      {subcategories.map((item, i) => {
                        return (
                          <Link key={i} to={"/" + (item.name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + item.id + "/" + item.name}>
                            <a class="dropdown-item" href="#">{item.name}</a>
                          </Link>
                        )
                      })}
                    </>
                  ) : null}
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Order On
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a href={`https://api.whatsapp.com/send?text=Hello SuperG.in!&phone=${constants.phone}`} className="orderOnBlock dropdown-item d-flex align-items-center mb-2" style={{ color: "green" }}>
                    <BsWhatsapp />
                    <h6 className='mb-0 ml-2'>Whatsapp</h6>
                  </a>
                  <a href={`tel:${constants.phone}`} className="orderOnBlock dropdown-item d-flex align-items-center" style={{ color: "blue" }}>
                    <BsFillTelephoneFill />
                    <h6 className='mb-0 ml-2'>Phone</h6>
                  </a>
                </div>
              </li>
            </ul>
            {/*  <div class="list-unstyled form-inline mb-0 ml-auto">
              <a href="#" onClick={() => navigate("/offers")} class="text-white bg-offer px-3 py-2"><i class="icofont-sale-discount h6"></i>Offers</a>
            </div> */}
          </div>
        </div>
      </div>


    </>
  );

}

export default Header;