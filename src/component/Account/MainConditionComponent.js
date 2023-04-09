import React, { useContext, useEffect, useState } from "react";
import MainData from "../../context/MainContext";
import AccountContainer from "../comman/AccountContainer";

import AccountNavigatinMenu from "./AccountNavigatinMenu";

import Terms from "./Terms";

import { useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@chakra-ui/react";
import AboutComponent from "./V2/About";
import PrivicyAndPolicyComponent from "./V2/PrivicyPolicy";
import ReturnAndRefund from "./V2/ReturnAndRefund";
import TermsAndCondition from "./V2/TermsAndCondition";

const MainConditionComponent = (props) => {
  const data = useContext(MainData);
  const condition = data.condition[0];
  const Storefaq = data.Storefaq;
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
  // //console.log('faq', faq)

  const location = useLocation();

  return (
    <>
      <AccountContainer>
        <Box pb={24}>
          {isNotSmallerScreen && <AccountNavigatinMenu />}

          {location.pathname == "/about" ? <AboutComponent /> : null}
          {location.pathname == "/term-and-condition" ? (
            <TermsAndCondition />
          ) : null}
          {location.pathname == "/privacy-and-policy" ? (
            <PrivicyAndPolicyComponent />
          ) : null}
          {location.pathname == "/shipping-policy" ? (
            <Terms
              conditionTitel="Shipping Policy"
              conditionData={condition.shiiping}
            />
          ) : null}
          {location.pathname == "/return-and-refund-policy" ? (
            <ReturnAndRefund />
          ) : null}
          {location.pathname == "/faq" ? (
            <Terms conditionTitel="FAQ" conditionData={Storefaq} />
          ) : null}
        </Box>
      </AccountContainer>
    </>
  );
};

export default MainConditionComponent;
