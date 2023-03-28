import { Container } from "@chakra-ui/react";
import React from "react";

const OshanContainer = (props) => {
  return (
    <>
      <section class="pb-4 osahan-main-body">
        <Container maxW={{ base: "100%", md: "90%" }}>
          <div class="osahan-home-page">
            <div class="osahan-body">{props.children}</div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default OshanContainer;
