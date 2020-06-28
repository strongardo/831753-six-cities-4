import React, { PureComponent } from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  render() {
    return <div id="map" ref={this._mapRef} style={{ height: `100%` }} />;
  }

  componentDidMount() {
    const city = [52.38333, 4.9];

    const zoom = 12;
    const map = leaflet.map(this._mapRef.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true,
    });
    map.setView(city, zoom);

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30],
    });

    const iconActive = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 30],
    });

    leaflet
      .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
        }
      )
      .addTo(map);

    this.props.markers.forEach(({ coordinates, id }) => {
      leaflet
        .marker(coordinates, {
          icon: id === this.props.activeMarker ? iconActive : icon,
        })
        .addTo(map);
    });
  }
}

Map.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    })
  ),
};

export default Map;
