import React from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import ProductsByCategory from "../component/ProductsBy/ProductByCategory";

const ProductsByCategoryPage = (props) => {
  return (
    <>
      <Header />
      <ProductsByCategory />
      <Footer />
    </>
  );
};

export default ProductsByCategoryPage;
