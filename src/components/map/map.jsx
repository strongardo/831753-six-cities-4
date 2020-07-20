import React, {PureComponent} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  render() {
    return <div id="map" ref={this._mapRef} style={{height: `100%`}} />;
  }

  componentDidMount() {
    this._map = leaflet.map(this._mapRef.current, {
      center: this.props.city.coordinates,
      zoom: this.props.city.zoom,
      zoomControl: false,
      marker: true,
    });

    this._icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [30, 30],
    });

    this._iconActive = leaflet.icon({
      iconUrl: `/img/pin-active.svg`,
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
    if (this.props.activeMarker !== prevProps.activeMarker || this.props.markers !== prevProps.markers) {
      this._map.setView(this.props.city.coordinates, this.props.city.zoom);
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
