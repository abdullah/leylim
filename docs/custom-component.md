#Custom Component
###Killer feature

Unlike other wysiwyg editor or content builders Leylim provide a custom components. Each leylim component completely look like this;

```javascript
// myAwesomeComponent.js
export default {
  name: 'myAwesomeComponent', // Leylim support all naming type.
  thumbnail: 'awesome-component.png|jpg|gif|jpeg',
  template: `
  <div class="awesome-component">
    <div class="awesome-component__column" contenteditable>
      <h3>Title</h3>
      <p>Lorem ipsum dolor sit amet consectetur </p>
    </div>
    <div class="awesome-component__column" contenteditable>
      <h3>Title</h3>
      <p>Lorem ipsum dolor sit amet consectetur </p>
    </div>
  </div>`,
  style: `.awesome-component {
    display: flex;
  }`,
  onUpdate(node, component) {
    const titles = [];
    node.querySelectorAll('a').forEach(n => titles.push(n.innerText));
    component.fields = {};
    component.fields = {
      titles
    };
  }
}
```

You need to add the contenteditable attribute to the element you want to be editable.

---

**onUpdate**, method helps you for provide this component raw data like above example, for example we suppose you need img source in component you can use this method as like

```javascript
//....
onUpdate(node, component) {
    component.fields = {};
    component.fields = {
      img: node.querySelector('img').src,
    };
  }
//....
```

**style** Component specific style.

###Define this custom component

```javascript
import myAwesomeComponent from 'myAwesomeComponent.js';

 new Leylim({
    el: '#app',
    thumbnailPath: 'component-images-path',
    components: [myAwesomeComponent]
  });
```
