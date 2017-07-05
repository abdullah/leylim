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

const leylim = new Leylim({
  el: '#app',
  components
});
