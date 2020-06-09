
/** A map marker for a GoogleMap. */
export class GoogleMapMarker extends HTMLElement {
  marker = null;

  /** The GoogleMap element that this map marker belongs to. */
  get googleMap() {
    return this.parentElement;
  }

  /**
   * Gets the position of this map marker from the 'lat' and 'lng' attributes.
   */
  get position() {
    try {
      return {
        lat: Number.parseFloat(this.getAttribute('lat')),
        lng: Number.parseFloat(this.getAttribute('lng')),
      };
    } catch {
      return {lat: 0, lng: 0};
    }
  }

  /** Gets the hover text for this map marker from the 'title' attribute. */
  get title() {
    return this.getAttribute('title');
  }

  /**
   * Lifecycle event. Since this element doesn't have its own shadow DOM and
   * google.maps.Marker manipulates the DOM, it needs to be implemented here
   * rather than the constructor.
   */
  connectedCallback() {
    this.marker = new google.maps.Marker({
      position: this.position,
      map: this.googleMap.map,
      title: this.title,
    });

    google.maps.event.addListener(this.marker, 'click', () => {
      const {infoWindow, map} = this.googleMap;
      infoWindow.close();
      infoWindow.setContent(this.innerHTML);
      infoWindow.open(map, this.marker);
    });
  }
}

customElements.define('google-map-marker', GoogleMapMarker);
