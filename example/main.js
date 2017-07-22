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
    const res = leylim.getRowData()
    for (var ii = 0; ii < res.length; ii++) {
      // console.log(`${ii} ROW -> ${res[ii]}`);
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
            // console.log(selection);
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
    beforeCreate() {
      // console.log("beforeCreate")
    },
    created() {
      // console.log("created")
    },
    beforeRowUpdate(node, row, cb) {
      // console.log("beforeRowUpdate", node, row)
      row.extraFields = {
        // imgSource: node.querySelector('img').src,
        // title: node.querySelector('h1').innerText,
      };
      cb(node, row);
    },
    rowUpdated(row, index) {
      // console.log("rowUpdated", row, index)
    },
    beforeRowDelete(row, cb) {
      // Do this
      cb(row)
      // console.log("beforeRowDelete", row)
    },
    rowDeleted(row) {
      // console.log("rowDeleted", row)
    },
    beforeRowDuplicate(row, cb) {
      cb(row);
      // console.log("beforeRowDuplicate");
    },
    rowDuplicated() {
      // console.log("rowDuplicated");
    },
    beforeRowAdd(row, cb) {
      // console.log("beforeRowAdd", row);
      cb(row);
    },
    rowAdded() {
      // console.log('rowAdded');
    }
  });
}

