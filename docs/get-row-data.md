

### Example
In this example we see how to get row data from leylim;
Each leylim instance have getRowData function for generate row data itself.

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
