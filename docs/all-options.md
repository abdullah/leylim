```javascript
// Dummy row data
const rowList = [
  {
    name: 'l-one-column', // tmp name
    thumbnail: 'l-one.png',
    template: `<DIRTY HTML>`,
    style: `.l-one-column {
      display: flex;
    }`
  }
];

const onSave = () => {
  const res = leylim.getRowData();
  for (var ii = 0; ii < res.length; ii++) {
    console.log(`${ii} ROW -> ${res[ii]}`);
  }
};

new Leylim({
  el: '#app',
  thumbnailPath: '../dist/assets/component-images/',
  components: components,
  rowList: rowList,
  buttons: [{
    text: 'Save',
    btnClass: 'save-class-example',
    handler: onSave
  }],
  customEditorButtons: {
    merge:true,
    buttons:[
      {
        command: 'test',
        icon: 'fa fa-cog',
      }
    ]
  },
  beforeCreate() {},
  created() {},
  beforeRowUpdate(o) { return o },
  rowUpdated(o) { return o },
  beforeRowDelete(o) { return o },
  rowDeleted(o) { return o },
  beforeRowDuplicate(o) { return o },
  rowDuplicated(o) { return o },
  beforeRowAdd(o) { return o },
  rowAdded(o) { return o },
});
```
