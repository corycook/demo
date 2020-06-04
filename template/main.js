
function renderItem({name, text}) {
  const template = document.getElementById('item-template');
  const content = template.content.cloneNode(true);

  content.querySelector('.name').innerText = name;
  content.querySelector('.text').innerText = text;

  document.getElementById('items-list').appendChild(content);
}

window.addEventListener('DOMContentLoaded', () => {
  [{name: 'Cory', text: 'Hello World!'},
   {name: 'Other', text: 'Whatever.'},
  ].forEach(renderItem);
}, false);
