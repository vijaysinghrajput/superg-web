import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import URL from '../../URL';
import ContextData from '../../context/MainContext';
import { MdDelete } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';

export const BasicVegitableFruit = ({ data }) => {

    const mainData = useContext(ContextData);
    const location = useLocation();

    const [productData, setProductData] = useState({
        itemQuant: 0,
        productDetails: data,
        price: data.price
    });

    useEffect(() => {
        const isAvilable = mainData.cartItems.find(o => o.id === data.id);
        isAvilable ? setProductData({
            ...productData,
            itemQuant: isAvilable.itemQuant,
            price: isAvilable.price
        }) : setProductData({
            ...productData,
            itemQuant: 0,
            price: data.price
        })
    }, [mainData, data]);


    return (
        <>
            <div class="col-6 col-md-3 mb-3">
                <div
                    class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                    <div class="list-card-image">
                        {data.discount !== "0" && <div class="member-plan position-absolute"><span
                            class="badge m-3 badge-danger">{data.discount} %</span></div>}
                        <div class="p-3">
                            <Link state={location.pathname} to={"/" + (data.product_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + data.id}>
                                <img src={URL + "/images/product-images/" + data.product_image}
                                    class="img-fluid item-img w-100 mb-3"
                                    alt={data.product_name + " delivery in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                                    title={data.product_name + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}

                                />
                                <h6 style={{ color: "#000" }}>{data.product_name} <small>{data?.hindi_name}</small></h6>
                            </Link>
                            <div class="d-flex align-items-center">
                                <h6 class="price m-0 text-success">₹{Math.round((data.price) - ((data.price) * (data.discount / 100)))}/{data.product_size + data.product_unit}</h6>
                                <div className="ml-auto plus-minus-container">
                                    <div>
                                        {!productData.itemQuant ? (
                                            <div className="plusMinusFun d-flex justify-content-between px-3 align-items-center" style={{ width: 'fit-content', padding: 8, marginLeft: "auto" }}>
                                                <BsPlusLg style={{ color: "#454545", cursor: "pointer", fontSize: 18 }} onClick={() =>
                                                    mainData.addToCart({
                                                        ...data,
                                                        itemQuant: 1,
                                                        cartId: data.id
                                                    })
                                                } />
                                            </div>
                                        ) : (
                                            <div class="plusMinusFun d-flex justify-content-between px-3 align-items-center">
                                                {productData.itemQuant === 1 ? (
                                                    <MdDelete
                                                        style={{ fontSize: 18, cursor: "pointer", color: "#454545" }}
                                                        onClick={() =>
                                                            mainData.removeFromCart(data.id)}
                                                    />
                                                ) : (
                                                    <AiOutlineMinus
                                                        style={{ fontSize: 18, cursor: "pointer", color: "#454545" }}
                                                        onClick={() => mainData.addToCart({
                                                            ...data,
                                                            itemQuant: productData.itemQuant - 1,
                                                            price: productData.price - data.price,
                                                            cartId: data.id
                                                        })}
                                                    />
                                                )}
                                                <h5 className="mb-0">{productData.itemQuant}</h5>
                                                <AiOutlinePlus
                                                    style={{ fontSize: 18, cursor: "pointer", color: "#454545" }}
                                                    onClick={() =>
                                                        mainData.addToCart({
                                                            ...data,
                                                            itemQuant: productData.itemQuant + 1,
                                                            price: parseInt(productData.price) + parseInt(data.price),
                                                            cartId: data.id
                                                        })
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}
