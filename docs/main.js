/* eslint-disable */

const components = [
  {
    name: 'blabla', // tmp name
    template: '<div contenteditable>Lorem ipsum dolor sit <b>amet</b>, consectetur adipisicing elit. At reiciendis et aliquid dolores eligendi repellendus, voluptate ut odio omnis, consectetur aliquam deserunt reprehenderit eum exercitationem neque nemo veritatis eveniet molestiae!</div>'
  },
  {
    name: 'fooooo', // tmp name
    template: '<div contenteditable><i>Lorem</i> ipsum dolor sit amet.</div>'
  }
];

const rowList = [
  {
    name: 'hacucuao', // tmp name
    template: `<div contenteditable>une kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır.Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren </div>`
  }
]

const leylim = new Leylim({
  el: '#app',
  components,
  rowList
});
