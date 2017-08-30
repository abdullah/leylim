import { JSDOM } from 'jsdom';

const doc = new JSDOM(`
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Leylim - ley</title>
  </head>
  <body>
    <div id="app"></div>
    <div class="leylim"></div>
  </body>
  </html>
`);

global.document = doc.window.document;
global.window = doc.window;

window.scrollX = 10;
window.scrollY = 10;
window.scroll = function() {};

Object.keys(window).forEach(key => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

export const isElement = o => {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement //DOM2
    : o &&
      typeof o === 'object' &&
      o !== null &&
      o.nodeType === 1 &&
      typeof o.nodeName === 'string';
};
