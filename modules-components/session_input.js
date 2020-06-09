
/**
 * An input field that stores its value in session storage.
 *
 * For additional information about custom elements see
 * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
 */
export class SessionInput extends HTMLInputElement {
  static elementName = 'session-input';  // custom element names require a '-'
  static config = {extends: 'input'};

  /** The unique session key for this input. */
  get sessionKey() {
    return `session-input-${location.pathname}-${this.name}`;
  }

  /** Lifecycle event, called when the element is added to the page. */
  connectedCallback() {
    this.value = sessionStorage.getItem(this.sessionKey);
    this.addEventListener('change', this.onChange);
  }

  /** Lifecycle event, called when the element is removed from the page. */
  disconnectedCallback() {
    this.removeEventListener('change', this.onChange);
  }

  // Defined as an anonymous function to ensure consistent binding of 'this'
  onChange = () => {
    sessionStorage.setItem(this.sessionKey, this.value);
  };
}
