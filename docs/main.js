/* eslint-disable */
let leylim;

window.onload = () => {

  let components = [
    {
      name: 'blabla', // tmp name
      template: '<div contenteditable>Lorem ipsum dolor sit <b>amet</b>, consectetur adipisicing elit. At reiciendis et aliquid dolores eligendi repellendus, voluptate ut odio omnis, <img src="http://qnimate.com/wp-content/uploads/2014/03/images2.jpg" /> aliquam deserunt reprehenderit eum exercitationem neque nemo veritatis eveniet molestiae!</div>'
    },
    {
      name: 'fooo', // tmp name
      template: `<div class="fooo" contenteditable><i>Lorem</i> ipsum dolor sit amet.</div>`,
      style: `.fooo { color: red }`
    }
  ];

  const rowList = [
    {
      name: 'hacucuao', // tmp name
      template: `<div class="hacucuao" contenteditable>une kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır.Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren </div>`,
      style: `.hacucuao { color: cornflowerblue }`
    },
    {
      name: 'hacucuao', // tmp name
      template: `<div class="hacucuao" contenteditable>une kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır.Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren </div>`,
      style: `.hacucuao { color: blue }`
    }
  ]


  const onSave = () => {
    const res = leylim.getRowData()
    for (var ii = 0; ii < res.length; ii++) {
      console.log(res[ii]);
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
