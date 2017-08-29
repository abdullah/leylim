# UNDER DEVELOPMENT

### What's the Leylim?

[![Coverage Status](https://coveralls.io/repos/github/abdullah/leylim/badge.svg?branch=master)](https://coveralls.io/github/abdullah/leylim?branch=master)

Leylim is a agile and scaleble content builder which simpler and provide content for mobile divice and only **`~12KB`**.
<br>
<br>
Also [Leylim](https://www.youtube.com/watch?v=-NRZme8v4H0) is a sing by Zülfü Livaneli 🎶

See [Demo](https://abdullah.github.io/leylim/example/)
### Motivation

Some cases you may need more than wysiwyg editor, we suppose you need a pure data of dirty html so any platform not support html tags
For example : `<img />` (for Android). You want to display img on mobile application, you will need img source but you can replace html of img tag. In this case you can use Leylim, good right? and for more feature; custom component, lifeCycle method etc 💪

### Quick start

##### Install
```bash
npm i -S leylim
```
##### Import your project

```javascript
import Leylim from 'leylim'; // Core
import lComponents from 'leylim/components/l-components'; // Components generated by us
import 'leylim/dist/leylim.css'; // Style
```

##### Copy thumbnails folder

```bash
cp -r node_modules/leylim/dist/assets/component-images ./myThumbnailPaths
```

#### Use

```javascript
const components = lComponents;
new Leylim({
  el: '#app', // Which parent node?
  thumbnailPath: 'myThumbnailPaths/', // Say where thumbnail path to leylim.
  components // Aviableble components
});
  ```

 # That's All!



