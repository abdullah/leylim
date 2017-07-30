/* eslint-disable */
let leylim;

window.onload = () => {
  let components = lComponents;

  // Dummy row data
  const rowList = []

  const onSave = () => {
    const res = leylim.getRowData();
    for (var ii = 0; ii < res.length; ii++) {
      console.log(`${ii} ROW -> ${res[ii]}`);
    }
  }

  Leylim.use(editImage, {
    test: 1
  });

  Leylim.use(modal, {
    sizet: 'large'
  });

  leylim = new Leylim({
    el: '#app',
    thumbnailPath: '../dist/assets/component-images/',
    components,
    rowList,
    buttons: [
      {
        text: "Save",
        class: "save-class-example",
        handler: onSave
      }
    ],
  });
}

