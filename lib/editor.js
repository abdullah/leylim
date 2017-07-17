/* eslint-disable */
import { LEYLIM_ROOT } from './constant';
import editorButtons from './editorButtons';


export default class Editor {
  constructor(options) {
    this.options = options;
    this.editorNode = null;
    this.buttons = editorButtons.concat(options.buttons);
    this.init();
  }


  init() {
    const buttons = this.buttons;
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    const editorNode = document.createElement('div');
    this.editorNode = editorNode;
    editorNode.classList.add('leylim-editor');

    let editorHtml = '';

    for (var ii = 0; ii < buttons.length; ii++) {
      editorHtml += `<a href="#" class="leylim-editor__button" data-command="${buttons[ii].command}">${buttons[ii].icon}</a>`
    }
    editorNode.innerHTML = editorHtml;
    rootNode.appendChild(editorNode);
    this.attachEvents();
  }

  attachEvents() {
    const editorNode = this.editorNode;
    const buttons = editorNode.querySelectorAll('.leylim-editor__button');
    for (var ii = 0; ii < buttons.length; ii++) {
      buttons[ii].onclick = this.onClick;
    }
  }

  onClick = (e) => {
    e.preventDefault();
    const commandKey = e.target.dataset.command;
    const commandObject = this.buttons.filter(b => b.command === commandKey)[0];
    document.execCommand(commandObject.command, false, commandObject.value || '')

  }

}
