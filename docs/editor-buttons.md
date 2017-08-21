#Editor

Leylim have customizable editor, you can filter buttons, add or customize that editor.

#### Full example

```javascript
new Leylim({
  //
  customEditorButtons: {
    merge: true,
    filter(buttons) {
      return buttons;
      // Should return Array<Button>
    },
    buttons:
    [
      {
        command: 'bold',
        icon: 'fa fa-bold',
      },
      {
        command: 'my-command',
        icon: 'fa fa-my-command',
        handler(selection) {
          // My command handler
        }
      }
    ]
  }
  //
});
```

### Without Handler helper
Adding a editor button without handler

```javascript
new Leylim({
  //....
  customEditorButtons: {
    buttons: [
      {
        command: 'bold',
        icon: 'fa fa-bold',
      }
    ]
  },
  //....
});
```

This buttons shown list right of screen, when user click this button, selected text will be wrapping `<b>` tag. See [Command List](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)

### With Handler helper

Some cases, you want to handle click event independent leylim core. In this case you can use `handler` helper;

```javascript
new Leylim({
  //....
  customEditorButtons: {
    buttons: [
      {
        command: 'bold',
        icon: 'fa fa-bold',
        handler(selection) {
          // Do this
        }
      }
    ]
  }
  //....
});
```


### Filter

```javascript
new Leylim({
  //....
  customEditorButtons: [
    filter(buttons) {
      // Filter then return
      return buttons;
    }
  ]
  //....
});
```

### Merge

```javascript
new Leylim({
  //....
  customEditorButtons: [
    merge: false,
    buttons: [
      // Your buttons
    ]
  ]
  //....
});
```
