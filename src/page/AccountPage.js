import React, { useContext } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import contextData from '../context/MainContext';
import MainAccountComponent from '../component/Account/MainAccountComponent';
import GlobalSpinner from '../component/comman/GlobalSpinner';

const AccountPage = () => {

    const data = useContext(contextData);

    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));


    return (
        <>

            <Header />

            {data.isLoading ? (
                <GlobalSpinner />
            ) : (
                <MainAccountComponent />
            )}

            <Footer />

        </>
    );
}

export default (AccountPage);
