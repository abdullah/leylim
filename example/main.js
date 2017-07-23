/* eslint-disable */
let leylim;

window.onload = () => {
  let components = lComponents;

  // Dummy row data
  const rowList = [
    {
      name: 'wiki-info', // tmp name
      thumbnail: 'http://www.truebeck.com/wp-content/uploads/2016/12/work-item-placeholder-Copy-150x150.png',
      template: `<div class="wiki-info" contenteditable="false"><h1>Lorem ipsum </h1> Bestesi Zülfü Livaneli’ye aittir. Türkünün üç dörtlükten oluşan sözleri, Sabahattin Ali’nin Ses (1937) adlı öykü kitabına adını veren “Ses” öyküsünde yer alır. Öykünün kahramanı yol amelesi Sivaslı Ali, çadırının önünde durup saz çalıp, bu türküyü söyler. Zülfü Livaneli, öyküyü okurken bu türkünün sözlerinden çok etkilendiğini ve bestelediğini açıklamıştır.
      <p>Eseri seslendirilen sanatçılar arasında İbrahim Tatlıses, Edip Akbayram, Zerrin Özer, Leman Sam, Zara, Özdemir Erdoğan yer alır.</p>
      </div>`,
      style: `.wiki-info { color: black }`
    }
  ]

  const onSave = () => {
    const res = leylim.getRowData();
    console.log(res);

    for (var ii = 0; ii < res.length; ii++) {
      console.log(`${ii} ROW -> ${res[ii]}`);
    }
  }

  const onUpdate = () => {
    components = [
      ...components,
      {
        name: `dynamic ${Math.random()}`, // tmp name
        thumbnail: 'http://www.truebeck.com/wp-content/uploads/2016/12/work-item-placeholder-Copy-150x150.png',
        template: `<div contenteditable>Dynamic components ${Math.random()}</div>`
      }
    ];

    leylim.update({
      components
    })

  }

  leylim = new Leylim({
    el: '#app',
    thumbnailPath: '../dist/assets/component-images/',
    components,
    rowList,
    customEditorButtons: {
      merge: true,
      filter(buttons) {
        return buttons;
        // Should return array
      },
      buttons:
      [
        {
          command: 'test',
          icon: 'fa fa-cog',
          handler(selection) {
            console.log(selection);
          }
        }
      ]
    },
    buttons: [
      {
        text: "Save",
        class: "save-class-example",
        handler: onSave
      },
      {
        text: "Update",
        class: "update-class-example",
        handler: onUpdate
      }
    ],
    beforeCreate(o) {
      console.log('beforeCreate(o)');
      return o;
    },
    created(o) {
      console.log('created(o)');
      return o;
    },
    beforeRowUpdate(o) {
      console.log('beforeRowUpdate(o)');
      // o.component.extraFields = {
      //   imgSource: `o.node.querySelector('img').src`,
      //   title: `o.node.querySelector('h1').innerText`,
      // };
      return o;
    },
    rowUpdated(o) {
      console.log('rowUpdated(o)');
      return o;
    },
    beforeRowDelete(o) {
      console.log('beforeRowDelete(o)');
      return o;
    },
    rowDeleted(o) {
      console.log('rowDeleted(o)');
      return o;
    },
    beforeRowDuplicate(o) {
      console.log('beforeRowDuplicate(o)');
      return o;
    },
    rowDuplicated(o) {
      console.log('rowDuplicated(o)');
      return o;
    },
    beforeRowAdd(o) {
      console.log('beforeRowAdd(o)');
      return o;
    },
    rowAdded(o) {
      console.log('rowAdded(o)');
      return o;
    },
  });
}

