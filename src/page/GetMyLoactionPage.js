import OshanContainer from '../component/comman/OshanContainer';
import { useMediaQuery } from '@chakra-ui/react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import { GetCurrentLocation } from '../component/map/New/GetCurrentLocation';


const GetMyLocationPage = (props) => {
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    return (
        <>
            <Header />
            <GetCurrentLocation />
            {/* <Footer /> */}
        </>
    )

}

export default GetMyLocationPage;