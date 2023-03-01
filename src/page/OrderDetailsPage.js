import React from 'react';
import { useLocation } from 'react-router-dom';
import { OrderDetails } from '../component/Account/OrderComponentV2/OrderDetails';
import Footer from '../component/Footer';
import Header from '../component/Header';


const OrderDetailsPage = () => {

    const { state } = useLocation();

    return (
        <>
            <Header />
            <section className="pb-4 osahan-main-body">
                <div className="container">
                    <div className="row">
                        <OrderDetails data={state.orderDetails} />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default OrderDetailsPage;