import { Map, InfoWindow, Marker } from 'google-maps-react';
import useMapData from './hooks/useMapData';


const MapOverview = ({ coords, zoom, handleMapIdle, mapLoaded, onMarkerDragEnd, getCurrentLocation, address }) => {

    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '100%'
    }

    //console.log("from map ===>", coords, address);

    // const coords = { lat: -21.805149, lng: -49.0921657 };

    return (
        <>


            {/* <Button variant={"solid"} onClick={() => getCurrentLocation()}>
                Get Location
            </Button> */}
            {/* <div class="container-fluid">
                <div class="map-responsive"> */}

            <Map
                google={window.google}
                initialCenter={coords}
                center={coords}
                zoom={zoom}
                // defaultZoom="Zoom"
                // initialCenter={{
                //     lat: position.lat,
                //     lng: position.lng
                // }}
                onIdle={handleMapIdle}
                disableDefaultUI={true}
                containerStyle={containerStyle}
                style={{
                    height: "100%",
                    width: "100%",
                }}

            >
                {mapLoaded && (
                    <Marker
                        // map={window.google}
                        draggable={true}
                        position={coords}
                        onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
                        title={"Delivery Here"}
                        name={"Delivery Here"}
                    // animation={window.google.maps.Animation.BOUNCE}
                    />
                )}



                <InfoWindow
                    position={coords}
                >
                    <div>
                        <p style={{ padding: 0, margin: 0 }}>hello</p>
                    </div>
                </InfoWindow>


            </Map>

            {/* </div>
            </div> */}


        </>






    );


}

export default MapOverview;