# Plugins

####Writing a plugin

**Use**

You take many arguments by Leylim after register your plugin

**Leylim.nodes** Leylim HTML nodes, check node [list](https://github.com/abdullah/leylim/blob/master/lib/constant.js)

**Leylim.editorButtons** Right of the screen, you can put button or costumize that buttons, [Button List](https://github.com/abdullah/leylim/blob/master/lib/editorButtons.js)

**Leylim.forceUpdate** Some cases you need call forceUpdate. This methods says to Leylim update all components.

#### Example

```javascript
const plugin = {
  install(Leylim, options) {
    // options #= { changeSomeThing: true }
    Leylim.proptotype.$yourPluginMethod;
  }
};

const options = {
  changeSomeThing: true
};

Leylim.use(plugin, options);
```

---

**Plugin list**

- [Modal](#modal)
- [Edit Image](#edit-image)
- [Change Font](#change-font)
- [Link](#link)

### Modal
Modal plugins helps you for while writing a plugin

**Use**

```javascript
import Modal from 'leylim/dist/plugins/modal.js';
import 'leylim/dist/plugins/modal.css';

Leylim.use(Modal);

const AwesomePlugin = {
  install(Leylim) {
    const modal = Leylim.$getModal({
      title: 'Awesome Plugin Title',
    });
    modal.setContent(`<div>Awesome Content</div>`)
    modal.open();
  }
};

Leylim.use(AwesomePlugin);

new Leylim({
  // Options
});

```


**API**

`setContent`
`open`
`close`
`onClose`
`onSave`

See [modal plugin](https://github.com/abdullah/leylim/blob/master/lib/plugins/modal.js);


### Edit Image

**Use**


```javascript
import EditImage from 'leylim/dist/plugins/modal.js';
import 'leylim/dist/plugins/modal.css';

Leylim.use(EditImage);

new Leylim({
  // Options
});
```


**With upload options**

```javascript
import EditImage from 'leylim/dist/plugins/edit-image.js';
import 'leylim/dist/plugins/edit-image.css';

Leylim.use(EditImage,
  {
    onUploadFile: function(image, cb) {
      var file = image[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        cb(reader.result)
      }
      reader.readAsDataURL(file);
    }
  }
);

new Leylim({
  // Options
});
```

### Change Font

**Use**

```javascript
import ChangeFont from 'leylim/dist/plugins/change-font.js';

Leylim.use(changeFont);

new Leylim({
  // Options
});
```


### Link

**Use**

```javascript
import Link from 'leylim/dist/plugins/link.js';

Leylim.use(Link);

new Leylim({
  // Options
});
```
