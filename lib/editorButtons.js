export default [
  {
    command: 'bold',
    icon: 'fa fa-bold'
  },
  {
    command: 'italic',
    icon: 'fa fa-italic'
  },
  {
    command: 'createLink',
    icon: 'fa fa-link',
    handler(){
      const url = window.prompt('Please insert a link', 'http://');
      document.execCommand('createLink', true, url);
    }
  },
  {
    command: 'unLink',
    icon: 'fa fa-unlink',
  },
  {
    command: 'cut',
    icon: 'fa fa-cut'
  },
  {
    command: 'delete',
    icon: 'fa fa-trash-o',
    handler(selection){
      document.execCommand('insertHTML', true, `<p>${selection.toString()}</p>`);
    }
  },
  {
    command: 'fontName',
    icon: 'fa fa-font',
    value: 'sans',
    handler(selection){
      const ff = window.prompt('Please insert font family', 'sans');
      document.execCommand('insertHTML', true, `<span style="font-family: ${ff}">${selection}</span>`);
    }
  },
  {
    command: 'foreColor',
    icon: 'fa fa-paint-brush',
    value: 'yellow',
    handler(selection){
      const color = window.prompt('Please insert color', '#000');
      document.execCommand('insertHTML', true, `<span style="color: ${color}">${selection}</span>`);
    }
  },
  {
    command: 'formatBlock',
    icon: 'fa fa-header fa-1',
    innerText: 1,
    handler(selection){
      document.execCommand('insertHTML', true, `<h1>${selection}</h1>`);
    }
  },
  {
    command: 'formatBlock',
    icon: 'fa fa-header fa-1',
    innerText: 2,
    handler(selection){
      document.execCommand('insertHTML', true, `<h2>${selection}</h2>`);
    }
  },
  {
    command: 'formatBlock',
    icon: 'fa fa-header fa-1',
    innerText: 3,
    handler(selection){
      document.execCommand('insertHTML', true, `<h3>${selection}</h3>`);
    }
  },
  {
    command: 'formatBlock',
    icon: 'fa fa-header fa-1',
    innerText: 4,
    handler(selection){
      document.execCommand('insertHTML', true, `<h4>${selection}</h4>`);
    }
  },
  {
    command: 'formatBlock',
    icon: 'fa fa-header fa-1',
    innerText: 5,
    handler(selection){
      document.execCommand('insertHTML', true, `<h5>${selection}</h5>`);
    }
  },
  {
    command: 'formatBlock',
    icon: 'fa fa-header fa-1',
    innerText: 6,
    handler(selection){
      document.execCommand('insertHTML', true, `<h6>${selection}</h6>`);
    }
  },
]
