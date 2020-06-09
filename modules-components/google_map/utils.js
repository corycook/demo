
/** 
 * A string literal tag that creates a <template> with the contents.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 * 
 * @param {string[]} templateStrings an array of strings
 * @returns {HTMLTemplateElement} template element
 */
export function template(templateStrings) {
  const template = document.createElement('template');
  template.innerHTML = templateStrings.join('');
  return template;
}
