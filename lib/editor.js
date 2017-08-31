import { LEYLIM_ROOT } from './constant';
import { createDom } from './utils';
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
    } else if (options.buttons) {
      this.buttons = options.buttons;
    } else {
      this.buttons = _editorButtons;
    }

    this.init();
  }

  init() {
    const buttons = this.buttons;
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    const editorNode = createDom('DIV', null, { class: 'leylim-editor' });

    this.editorNode = editorNode;

    for (let ii = 0; ii < buttons.length; ii++) {
      const buttonNode = createDom(
        'A',
        {
          innerHTML: `<i class="${buttons[ii].icon}"></i>${buttons[ii]
            .innerText || ''}`
        },
        { class: 'leylim-editor__button', href: '#' }
      );

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
