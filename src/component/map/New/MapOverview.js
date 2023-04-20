import { Map, InfoWindow, Marker } from "google-maps-react";
import useMapData from "./hooks/useMapData";
import { Image } from "@chakra-ui/react";

const MapOverview = ({
  coords,
  zoom,
  handleMapIdle,
  mapLoaded,
  onMarkerDragEnd,
  getCurrentLocation,
  address,
}) => {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  //console.log("from map ===>", coords, address);

  // const coords = { lat: -21.805149, lng: -49.0921657 };

  return (
    <>
      {/* <Button variant={"solid"} onClick={() => getCurrentLocation()}>
                Get Location
            </Button> */}
      {/* <div class="container-fluid">
                <div class="map-responsive"> */}
      <Image
        src="https://superg.in/admin/images/delivery-here.png"
        position={"absolute"}
        top="50%"
        left="50%"
        zIndex={9}
        transform={"translate(-50%, -50%)"}
        height={"3rem"}
      />
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
        gestureHandling={"greedy"}
        containerStyle={containerStyle}
        // onBoundsChanged={(mapProps, map) =>
        //   console.log("map props ---->", mapProps.center, "map ------>", map)
        // }
        onDragend={(t, map, coord) => onMarkerDragEnd(map.center)}
        style={{
          height: "100%",
          width: "100%",
        }}
      ></Map>

      {/* </div>
            </div> */}
    </>
  );
};

export default MapOverview;
