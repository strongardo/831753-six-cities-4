import React, {PureComponent} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
    // this._markers = [];
  }

  render() {
    return <div id="map" ref={this._mapRef} style={{height: `100%`}} />;
  }

  componentDidMount() {
    const city = [52.38333, 4.9];

    const zoom = 12;
    this._map = leaflet.map(this._mapRef.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true,
    });
    this._map.setView(city, zoom);

    this._icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30],
    });

    this._iconActive = leaflet.icon({
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
      .addTo(this._map);

    this._addMarkers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeMarker !== prevProps.activeMarker) {
      this._map.removeLayer(this._layer);
      this._addMarkers();
    }
  }

  _addMarkers() {
    this._markers = [];

    this.props.markers.forEach(({coordinates, id}) => {
      const marker = leaflet
        .marker(coordinates, {
          icon: id === this.props.activeMarker ? this._iconActive : this._icon,
        });
      this._markers.push(marker);
    });

    this._layer = leaflet.layerGroup(this._markers).addTo(this._map);
  }
}

Map.propTypes = {
  markers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number),
      })
  ),
  activeMarker: PropTypes.number,
};

export default Map;
