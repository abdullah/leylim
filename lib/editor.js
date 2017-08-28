import { LEYLIM_ROOT } from './constant';
// import editorButtons from './editorButtons';
import Leylim from './index';

export default class Editor {
  constructor(options) {
    this.options = options;
    this.editorNode = null;

    const editorButtons = Leylim.editorButtons;
    const _editorButtons = options.filter
      ? options.filter(editorButtons)
      : editorButtons;

    if (options.merge) {
      this.buttons = _editorButtons.concat(options.buttons);
    } else {
      this.buttons = options.buttons;
    }

    this.init();
    // this.catchSelection();
  }

  /**
   * @todo when selection contains any button add active class to selected button
   * @memberof Editor
   */
  // catchSelection() {
  //   document.onselectionchange = (e) => {
  //     const selection = window.getSelection();
  //     // console.log(selection);
  //   }
  // }

  init() {
    const buttons = this.buttons;
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    const editorNode = document.createElement('div');
    this.editorNode = editorNode;
    editorNode.classList.add('leylim-editor');

    for (let ii = 0; ii < buttons.length; ii++) {
      const buttonNode = document.createElement('A');
      buttonNode.href = '#';
      buttonNode.classList.add('leylim-editor__button');
      buttonNode.innerHTML = `<i class="${buttons[ii].icon}"></i>${buttons[ii]
        .innerText || ''}`;
      buttonNode.onclick = e => this.onClick(e, buttons[ii]);

      editorNode.appendChild(buttonNode);
    }
    rootNode.appendChild(editorNode);
  }

  /**
   * @todo provide selection object for commandObject handler (customEditorButtons)
   *
   * @memberof Editor
   */
  onClick = (e, commandObject) => {
    e.preventDefault();
    if (commandObject.handler) {
      commandObject.handler(window.getSelection(), Leylim);
    } else {
      document.execCommand(
        commandObject.command,
        true,
        commandObject.value || 2
      );
    }
  };
}
