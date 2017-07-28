export default {
  install(Leylim, options) {

    Leylim.editorButtons.push({
      command: 'bold',
      icon: 'fa fa-bold',
      handler(){
        const url = window.prompt('Please insert a link', 'http://');
        document.execCommand('createLink', true, url);
      }
    });

    Leylim.prototype.$xx = function () {

    }
  }
}
