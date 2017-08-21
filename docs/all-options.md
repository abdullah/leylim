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
  beforeRowUpdate(component) { return component },
  rowUpdated(component) { return component },
  beforeRowDelete(component) { return component },
  rowDeleted(component) { return component },
  beforeRowDuplicate(component) { return component },
  rowDuplicated(component) { return component },
  beforeRowAdd(component) { return component },
  rowAdded(component) { return component },
});
```
