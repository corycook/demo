import {SessionInput} from './session_input.js';

window.addEventListener('DOMContentLoaded', () => {
  customElements.define(
      SessionInput.elementName, SessionInput, SessionInput.config);
});
