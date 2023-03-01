import React, { useContext } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import contextData from '../context/MainContext';
import { DualHelixLoader } from '../component/Loaders/DualHelix';
import AccountNavigatinMenu from '../component/Account/AccountNavigatinMenu';

const AccountPage = () => {

    const data = useContext(contextData);

    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));

    return (
        <>

            <Header />
            <div className="py-5">
                {data.isLoading ? (
                    <DualHelixLoader />
                ) : (
                    <AccountNavigatinMenu />
                )}
            </div>
            <Footer />

        </>
    );
}

export default (AccountPage);
