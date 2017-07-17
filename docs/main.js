/* eslint-disable */
let leylim;

window.onload = () => {

  let components = [
    {
      name: 'blabla', // tmp name
      template: `<div class="blabla" contenteditable>Lorem ipsum dolor sit <b>amet</b>, consectetur adipisicing elit. At reiciendis et aliquid dolores eligendi repellendus, voluptate ut odio omnis,
      <img src="http://tetrailetisim.com/resim/olcekle/37775/600/574" /> aliquam deserunt reprehenderit eum exercitationem neque nemo veritatis eveniet molestiae!</div>`,
      style: `
        .blabla img {
          display: block;
        }
      `
    },
    {
      name: 'fooo', // tmp name
      template: `<div class="fooo" contenteditable><i>Lorem</i> ipsum dolor sit amet.</div>`,
      style: `.fooo { color: red }`
    }
  ];

  const rowList = [
    {
      name: 'wiki-info', // tmp name
      template: `<div class="wiki-info" contenteditable><h1>Leylim Ley </h1> Bestesi Zülfü Livaneli’ye aittir. Türkünün üç dörtlükten oluşan sözleri, Sabahattin Ali’nin Ses (1937) adlı öykü kitabına adını veren “Ses” öyküsünde yer alır. Öykünün kahramanı yol amelesi Sivaslı Ali, çadırının önünde durup saz çalıp, bu türküyü söyler. Zülfü Livaneli, öyküyü okurken bu türkünün sözlerinden çok etkilendiğini ve bestelediğini açıklamıştır.
      <p>Eseri seslendirilen sanatçılar arasında İbrahim Tatlıses, Edip Akbayram, Zerrin Özer, Leman Sam, Zara, Özdemir Erdoğan yer alır.</p>
      </div>`,
      style: `.wiki-info { color: black }`
    }
  ]


  const onSave = () => {
    const res = leylim.getRowData()
    for (var ii = 0; ii < res.length; ii++) {
      console.log(`${ii} ROW -> \n ${res[ii]}`);
    }
  }

  const onUpdate = () => {
    components = [
      ...components,
      {
        name: `dynamic ${Math.random()}`, // tmp name
        template: `<div contenteditable>Dynamic components ${Math.random()}</div>`
      }
    ];

    leylim.update({
      components
    })

  }

  leylim = new Leylim({
    el: '#app',
    components,
    rowList,
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
    ]
  });


}
