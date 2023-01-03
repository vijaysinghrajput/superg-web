import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import URL from '../../URL';
import { useMediaQuery } from '@chakra-ui/react';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useLocation } from 'react-router-dom';
import { CategoryLoading } from '../Loaders/SkeletonLoader';


const Category = (props) => {

    const data = useContext(contextData);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const location = useLocation();
    const [SubCategories, SetSubCategories] = useState([]);
    const [loca, setLcoa] = useState()

    useEffect(() => {
        SetSubCategories(data.subcategories);

    }, [data.subcategories]);


    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const p = position.coords;
            setLcoa({
                longitude: p.longitude,
                latitude: p.latitude
            })
        })
    }



    return (
        <>
            <div class="osahan-categories">
                {location.pathname !== "/category" &&
                    <div class="d-flex align-items-center mb-2">
                        <h5 class="m-0">What do you looking for??</h5>
                        <Link to="/category" class="ml-auto btn btn-outline-success btn-sm">See more</Link>
                    </div>
                }
                <div class="row">
                    {data.isLoading ? (
                        <>
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                        </>
                    ) : SubCategories.length ? (
                        < >
                            {SubCategories.map((item, i) => {
                                return (
                                    <div class="col-6 col-md-3 mb-3" key={i}>
                                        <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                            <div class="p-4">

                                                <Link state={location.pathname} to={"/" + (item.name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + item.id + "/" + item.name}>
                                                    <img src={URL + "/images/category_images/" + item.image} class="img-fluid item-img w-100 mb-3"
                                                        alt={item.name + " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                                                        title={item.name + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}

                                                    />
                                                    <p class="m-0 pt-2 text-center" style={{ color: "#505050", fontSize: 14 }}>{item.name}</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    ) : null}
                    {/* <div className="btn btn-primary" onClick={getLocation}>
                        Get Location
                    </div>
                    <div className="box">
                        <p>Latitude : {loca?.latitude}</p>
                        <p>Longitude : {loca?.longitude}</p>
                    </div> */}
                </div>
            </div>
        </>
    )

}

export default Category;


