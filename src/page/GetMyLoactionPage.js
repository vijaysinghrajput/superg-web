import Header from '../component/Header';
import { GetCurrentLocation } from '../component/map/New/GetCurrentLocation';


const GetMyLocationPage = (props) => {
    return (
        <>
            <Header />
            <GetCurrentLocation />
            {/* <Footer /> */}
        </>
    )

}

export default GetMyLocationPage;