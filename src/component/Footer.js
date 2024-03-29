import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import MainData from "../context/MainContext";
import { BsFacebook } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiOutlineInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { Box } from "@chakra-ui/react";

const Footer = () => {
  const data = useContext(MainData);

  const { subcategories } = data;

  const navigate = useNavigate();

  return (
    <>
      <footer class="section-footer border-top bg-white">
        <section class="footer-top py-4">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="form-inline">
                  <select class="custom-select mr-2">
                    <option>INR</option>
                  </select>
                  <select class="custom-select">
                    <option>INDIA</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4 text-md-right">
                <a href="#" class="btn btn-icon btn-light">
                  <i class="icofont-facebook"></i>
                </a>
                <a href="#" class="btn btn-icon btn-light">
                  <i class="icofont-twitter"></i>
                </a>
                <a href="#" class="btn btn-icon btn-light">
                  <i class="icofont-instagram"></i>
                </a>
                <a href="#" class="btn btn-icon btn-light">
                  <i class="icofont-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section class="footer-main border-top pt-5 pb-4">
          <div class="container">
            <div class="row">
              <aside class="col-md">
                <h6 class="title">Category</h6>
                <ul class="list-unstyled list-padding">
                  {subcategories.length ? (
                    <>
                      {subcategories.map((item, i) => {
                        return (
                          <Link
                            key={i}
                            to={
                              "/" +
                              (item.name + " delivery in gorakhpur")
                                .replace(/\s/g, "-")
                                .toLowerCase() +
                              "/" +
                              item.id +
                              "/" +
                              item.name
                            }
                          >
                            <li>
                              <a href="#" class="text-dark">
                                {item.name}
                              </a>
                            </li>
                          </Link>
                        );
                      })}
                    </>
                  ) : null}
                </ul>
              </aside>

              <aside class="col-md">
                <h6 class="title">Important Links</h6>
                <ul class="list-unstyled list-padding">
                  <li>
                    {" "}
                    <a
                      href="#"
                      onClick={() => navigate("/about")}
                      class="text-dark"
                    >
                      {" "}
                      About{" "}
                    </a>
                  </li>
                  {/* <li> <a href="#" onClick={() => navigate("/offers")} class="text-dark">Offers</a></li> */}

                  <li>
                    {" "}
                    <a
                      href="#"
                      onClick={() => navigate("/contact")}
                      class="text-dark"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </aside>

              <aside class="col-md">
                <h6 class="title">Corporate</h6>
                <ul class="list-unstyled list-padding">
                  <li>
                    <a
                      href="#"
                      onClick={() => navigate("/term-and-condition")}
                      class="text-dark"
                    >
                      {" "}
                      Term & Condition{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => navigate("/privacy-and-policy")}
                      class="text-dark"
                    >
                      {" "}
                      Privacy & Policy{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => navigate("/shipping-policy")}
                      class="text-dark"
                    >
                      {" "}
                      Shipping Policy{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => navigate("/return-and-refund-policy")}
                      class="text-dark"
                    >
                      {" "}
                      Return & Refund Policy{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => navigate("/faq")}
                      class="text-dark"
                    >
                      {" "}
                      FAQ{" "}
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>
        <Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113996.61805998416!2d83.33387111029188!3d26.763697937330406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d54fadbb4c853b5%3A0x56526b6b8c4683a3!2sSuperG.in%20%7C%20Online%20Grocery%20Home%20Delivery%20Service%20in%20Gorakhpur!5e0!3m2!1sen!2sin!4v1678378442382!5m2!1sen!2sin"
            width="100%"
            height="300"
            // style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          >
            Online Grocery Delivery Service in Gorakhpur ,Online Vegetables
            Delivery Service in Gorakhpur,Online Fruits Delivery Service in
            Gorakhpur
          </iframe>
        </Box>
        <section class="footer-bottom border-top py-4">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <span class="pr-2">© 2021 Powerd By Skyably IT Solution</span>
              </div>
              <div class="col-md-4">
                <div className="d-flex justify-content-center">
                  <a
                    className="mx-1"
                    style={{ color: "#000", fontSize: 16 }}
                    href="https://www.facebook.com/supergforgrocery"
                  >
                    <BsFacebook />
                  </a>
                  <a
                    className="mx-1"
                    style={{ color: "#000", fontSize: 16 }}
                    href="https://twitter.com/superg_in"
                  >
                    <AiFillTwitterCircle />
                  </a>
                  <a
                    className="mx-1"
                    style={{ color: "#000", fontSize: 16 }}
                    href="https://www.instagram.com/superg.in/"
                  >
                    <AiOutlineInstagram />
                  </a>
                  <a
                    className="mx-1"
                    style={{ color: "#000", fontSize: 16 }}
                    href="https://www.linkedin.com/company/superg-in/"
                  >
                    <AiFillLinkedin />
                  </a>
                </div>
              </div>

              <div class="col-md-4 text-md-right">
                <a href="https://play.google.com/store/apps/details?id=com.apk.superg">
                  <img
                    src="/img/playmarket.png"
                    style={{
                      height: 40,
                      marginLeft: "auto",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </footer>

      <div
        class="modal fade right-modal"
        id="login"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header p-0">
              <nav class="schedule w-100">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    class="nav-link active col-5 py-4"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    <p class="mb-0 font-weight-bold">Sign in</p>
                  </a>
                  <a
                    class="nav-link col-5 py-4"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <p class="mb-0 font-weight-bold">Sign up</p>
                  </a>
                  <a
                    class="nav-link col-2 p-0 d-flex align-items-center justify-content-center"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <h1 class="m-0 h4 text-dark">
                      <i class="icofont-close-line"></i>
                    </h1>
                  </a>
                </div>
              </nav>
            </div>
            <div class="modal-body p-0">
              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div class="osahan-signin p-4 rounded">
                    <div class="p-2">
                      <h2 class="my-0">Welcome Back</h2>
                      <p class="small mb-4">Sign in to Continue.</p>

                      <p class="text-muted text-center small m-0 py-3">or</p>
                      <a
                        href="verification.html"
                        class="btn btn-dark btn-block rounded btn-lg btn-apple"
                      >
                        <i class="icofont-brand-apple mr-2"></i> Sign up with
                        Apple
                      </a>
                      <a
                        href="verification.html"
                        class="btn btn-light border btn-block rounded btn-lg btn-google"
                      >
                        <i class="icofont-google-plus text-danger mr-2"></i>{" "}
                        Sign up with Google
                      </a>
                      <p class="text-center mt-3 mb-0">
                        <a href="signup.html" class="text-dark">
                          Don't have an account? Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div class="osahan-signup bg-white p-4">
                    <div class="p-2">
                      <h2 class="my-0">Let's get started</h2>
                      <p class="small mb-4">
                        Create account to see our top picks for you!
                      </p>
                      <p class="text-muted text-center small py-2 m-0">or</p>
                      <a
                        href="verification.html"
                        class="btn btn-dark btn-block rounded btn-lg btn-apple"
                      >
                        <i class="icofont-brand-apple mr-2"></i> Sign up with
                        Apple
                      </a>
                      <a
                        href="verification.html"
                        class="btn btn-light border btn-block rounded btn-lg btn-google"
                      >
                        <i class="icofont-google-plus text-danger mr-2"></i>{" "}
                        Sign up with Google
                      </a>
                      <p class="text-center mt-3 mb-0">
                        <a href="signin.html" class="text-dark">
                          Already have an account! Sign in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer p-0 border-0">
              <div class="col-6 m-0 p-0">
                <a
                  href="#"
                  class="btn border-top border-right btn-lg btn-block"
                  data-dismiss="modal"
                >
                  Close
                </a>
              </div>
              <div class="col-6 m-0 p-0">
                <a
                  href="help_support.html"
                  class="btn border-top btn-lg btn-block"
                >
                  Help
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
