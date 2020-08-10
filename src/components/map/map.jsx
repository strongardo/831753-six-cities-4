import React, {useEffect} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

const mapRef = React.createRef();

const icon = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [30, 30],
});

const iconActive = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [30, 30],
});

let map = null;
let layer = null;

const Map = (props) => {
  const {city, markers, activeMarker} = props;

  useEffect(
      () => {
        map = leaflet.map(mapRef.current, {
          zoomControl: false,
          marker: true,
        });

        leaflet
          .tileLayer(
              `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
              {
                attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
              }
          )
          .addTo(map);
      }, []
  );

  useEffect(
      () => {
        map.setView(city.coordinates, city.zoom);

        const mapMarkers = [];
        markers.forEach(({coordinates, id}) => {
          const marker = leaflet
            .marker(coordinates, {
              icon: id === activeMarker ? iconActive : icon,
            });
          mapMarkers.push(marker);
        });

        if (layer) {
          layer.remove();
        }
        layer = leaflet.layerGroup(mapMarkers);
        layer.addTo(map);
      }, [activeMarker, markers]
  );

  return <div id="map" ref={mapRef} style={{height: `100%`}} />;
};

Map.propTypes = {
  city: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    zoom: PropTypes.number.isRequired,
  }),
  markers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number),
      })
  ),
  activeMarker: PropTypes.number,
};

export default Map;
