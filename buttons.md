#Buttons

Leylim provides custom buttons like save or cancel etc.
You can add button to leylim like below example;

```javascript
let leylim;

const onSave = () => {
  const res = leylim.getRowData();
  for (var ii = 0; ii < res.length; ii++) {
    console.log(`${ii} ROW -> ${res[ii]}`);
  }
};

leylim = new Leylim({
  //......
  buttons: [
    {
      text: 'Save',
      btnClass: 'save-class',
      handler: onSave
    }
  ]
  //......
});
```
