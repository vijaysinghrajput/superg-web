import React from 'react';
import Header from '../component/Header';
import { GetCurrentLocation } from '../component/map/New/GetCurrentLocation';


const SaveMyAddressPage = (props) => {
    return (
        <>
            <Header />
            <GetCurrentLocation />
            {/* <Footer /> */}
        </>
    )

}

export default SaveMyAddressPage;