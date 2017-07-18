/* eslint-disable */
let leylim;

window.onload = () => {
  // Dummy row data
  const rowList = [
    {
      name: 'wiki-info', // tmp name
      thumbnail: 'http://www.truebeck.com/wp-content/uploads/2016/12/work-item-placeholder-Copy-150x150.png',
      template: `<div class="wiki-info" contenteditable><h1>Leylim Ley </h1> Bestesi Zülfü Livaneli’ye aittir. Türkünün üç dörtlükten oluşan sözleri, Sabahattin Ali’nin Ses (1937) adlı öykü kitabına adını veren “Ses” öyküsünde yer alır. Öykünün kahramanı yol amelesi Sivaslı Ali, çadırının önünde durup saz çalıp, bu türküyü söyler. Zülfü Livaneli, öyküyü okurken bu türkünün sözlerinden çok etkilendiğini ve bestelediğini açıklamıştır.
      <p>Eseri seslendirilen sanatçılar arasında İbrahim Tatlıses, Edip Akbayram, Zerrin Özer, Leman Sam, Zara, Özdemir Erdoğan yer alır.</p>
      </div>`,
      style: `.wiki-info { color: black }`
    }
  ]

  const onSave = () => {
    const res = leylim.getRowData()
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
    components: [
      oneImage,
      twoImage
    ],
    // rowList,
    customEditorButtons: [
      {
        command: 'test',
        icon: 'fa fa-cog',
        handler(selection) {
          console.log(selection);
        }
      }
    ],
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
    onCreate: {
      before(options){
        console.log(options);
      },
      after(){
        console.log(1);
      }
    },
  });
}

