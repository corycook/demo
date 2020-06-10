
import {MAP_STYLE_CONFIG} from './constants.js';
import {template} from './utils.js';

/** A map element that creates a map using the Google Maps JavaScript API. */
export class GoogleMap extends HTMLElement {
  static template = template`
    <style>
      :host, #target {
        display: block;
        width: var(--map-size, 500px);
        height: var(--map-size, 500px);
      }
    </style>
    <div id="target"></div>
  `;
  infoWindow = null;
  map = null;
  shadow = this.attachShadow({mode: 'open'});

  /**
   * Gets the location where this map is centered from the 'lat' and 'lng'
   * attributes. It is centered on the Googleplex by default.
   */
  get center() {
    try {
      return {
        lat: Number.parseFloat(this.getAttribute('lat')) || 37.4220,
        lng: Number.parseFloat(this.getAttribute('lng')) || -122.0841,
      };
    } catch {
      return {lat: 37.4220, lng: -122.0841};
    }
  }

  /** Gets the zoom level of the map from this element's attributes. */
  get zoom() {
    try {
      return Number.parseFloat(this.getAttribute('zoom')) || 13;
    } catch {
      return 13;
    }
  }

  /**
   * Manipulating the DOM is not allowed in the constructor, unless it is in
   * the shadow DOM created with this.attachShadow(). The shadow DOM for this
   * element is disconnected from the rest of the page and has unique styling
   * and ids.
   */
  constructor() {
    super();
    this.shadow.appendChild(GoogleMap.template.content.cloneNode(true));

    // Get the target element from the shadow DOM.
    const mapTarget = this.shadow.getElementById('target');

    this.map = new google.maps.Map(mapTarget, {
      center: this.center,
      zoom: this.zoom,
      mapTypeControlOptions: {mapTypeIds: ['roadmap', 'satellite', 'custom']},
    });
    this.infoWindow = new google.maps.InfoWindow();

    this.map.mapTypes.set(
        'custom',
        new google.maps.StyledMapType(MAP_STYLE_CONFIG, {name: 'Custom'}));
    this.map.setMapTypeId('custom');
  }
}

// Define the element. This attaches the definition above to
// <google-map></google-map> in the DOM.
customElements.define('google-map', GoogleMap);
