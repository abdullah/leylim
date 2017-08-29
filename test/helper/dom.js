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
  </body>
  </html>
`);

global.document = doc.window.document;
global.window = doc.window;

Object.keys(window).forEach(key => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
