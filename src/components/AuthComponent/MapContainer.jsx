
import React, { useEffect, useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import dark from "../../images/dark-btnbg.png";
import dark2 from "../../images/dark2.png"



const MapContainer = React.memo((props) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [controlledVisible, setControlledVisible] = React.useState(false);
  const [initialCenter, setInitialCenter] = useState(
    props?.showData && props.showData.length > 0
      ? {
          lat: parseFloat(props.showData[0].latitude),
          lng: parseFloat(props.showData[0].longitude),
        }
      : []
  );
  const Itenary = props.itenary;
  const { showData } = props;
  const zoom = props.zoomValue;

  const path = showData
    ? showData.map((location) => ({
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude),
      }))
    : [];

  const mapRef = React.createRef();

  const baseCountryUrl = "https://argosmob.uk/snaptrip/admin/uploads/country/";
  const baseCityUrl = "https://argosmob.uk/snaptrip/admin/uploads/city/";
  const baseAbstractionUrl =
    "https://argosmob.uk/snaptrip/admin/uploads/attraction/";

  const { getArrowProps, getTooltipProps, setTooltipRef, visible } =
    usePopperTooltip({
      trigger: null,
      interactive: true,
      closeOnOutsideClick: false,
      placement: "auto",
      visible: controlledVisible,
      onVisibleChange: setControlledVisible,
    });

  const handlAction = (props) => {
      setSelectedPlace(props.store);
      setControlledVisible(true);
  };

  const handleMouseLeave = () => {
    setSelectedPlace(null);
    setControlledVisible(!controlledVisible);
  };

  const onMarkerClick = (id) => {
    props.open(id);
  };

  const onMapReady = (mapProps, map) => {
    const { google } = mapProps;
    const mapType = google.maps.MapTypeId.ROADMAP    ;
    map.setMapTypeId(mapType);
  };

  useEffect(() => {
    if (initialCenter && mapRef.current) {
      const map = mapRef.current.map;
      map.panTo(initialCenter);
    }  
  }, [initialCenter.lat, initialCenter.lng]); 


  useEffect(()=>{
    setInitialCenter( props?.showData && props.showData.length > 0
      ? {
          lat: parseFloat(props.showData[0].latitude),
          lng: parseFloat(props.showData[0].longitude),
        }
      : null)
  },[props])

  return (
    <Map
      key={showData ? showData.length : 0}
      google={props.google}
      zoom={zoom}
      initialCenter={initialCenter}
      ref={mapRef}
      style={{ height: "120vh" }}
      onReady={onMapReady}
    >
      {showData?.length > 0 &&
        showData?.map((store, index) => {
          const latitude = parseFloat(store.latitude);
          const longitude = parseFloat(store.longitude);
          const position = { lat: latitude, lng: longitude };
          return (
            <Marker
            title={store.description}
              key={index}
              // onMouseover={handlAction}
              // onMouseout={handleMouseLeave}
              onClick={store?.city_name && (() => onMarkerClick(store.id))}
              store={store}
              position={position}
              options={{
                icon: ((store?.city_name && store?.city_name.length > 14) || (store?.attraction_title && store?.attraction_title.length > 14)) ? dark2 : dark,
              }}
              label={{
                text: (
                  (store?.city_name && store?.city_name.length > 30) || 
                  (store?.attraction_title && store?.attraction_title.length > 30)
                ) ? 
                  (store?.city_name || store?.attraction_title).slice(0, 30) : 
                  store?.city_name || store?.attraction_title,
                color: store?.score == 1 ? "#fff" : "#fff",
                fontSize: "13px",
              }}
            />
          );
        })}

      {visible && (
        <div style={{ position: "relative" }}>
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: "tooltip-container" })}
          >
            <div className="infoWindow">
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                  cursor: "pointer",
                }}
                onClick={handleMouseLeave}
              >
                X
              </div>
              <h3 className="text-center">{selectedPlace?.name}</h3>
              <div class="infoWindow_image">
                <img
                  src={
                    selectedPlace?.image
                      ? `${baseCityUrl}${selectedPlace?.image}`
                      : `${baseAbstractionUrl}${selectedPlace?.attraction_image}`
                  }
                  alt={selectedPlace?.name}
                  className="infoImage"
                />
              </div>
              <p>
                desc:
                {selectedPlace?.description
                  ? selectedPlace?.description.slice(0, 100)
                  : selectedPlace?.attraction_description.slice(0, 100)}
              </p>
            </div>
            <div {...getArrowProps({ className: "tooltip-arrow" })} />
          </div>
        </div>
      )}
      {Itenary ? (
        <Polyline
          path={path}
          strokeColor="#fbba18"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
      ) : null}
    </Map>
  );
});

export default GoogleApiWrapper({
  apiKey: "AIzaSyCJMXymcHZyztIOFe89U_qGgd53TFoTw20",
})(MapContainer);


