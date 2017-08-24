/* eslint-disable */
let leylim;

window.onload = () => {
  let components = lComponents;

  // Dummy row data
  const rowList = [{
    name: 'l-one-column', // tmp name
    thumbnail: 'l-one.png',
    template: `
    <div class="l-one-column">
      <div class="l-col" contenteditable>
        <h3>Title</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque rem impedit autem dolor explicabo dolorem adipisci, magnam ipsa sit nostrum nam ipsum dicta neque repellendus nihil cupiditate officiis, consequatur beatae?</p>
      </div>
      <div class="l-col" contenteditable>
        <h3>Title</h3>
        <div><img src="https://www.fandomsky.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/_/a_1_3.jpg" /></div>
      </div>
    </div>`,
    style: `.l-one-column {
      display: flex;
    }`,
  }]

  const onSave = () => {
    const res = leylim.getRowData();
    for (var ii = 0; ii < res.length; ii++) {
      console.log(`${ii} ROW -> ${res[ii]}`);
    }
  }

  Leylim.use(modal, {
    sizet: 'large'
  });

  Leylim.use(editImage, {
    test: 1
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
    beforeRowUpdate(o){
      console.log(o.node);
      return o
    }
  });
}

