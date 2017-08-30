import { FOOTER_NODE } from './constant';

/**
 * Footer
 * @export
 * @class Footer
 */
export default class Footer {
  constructor(options) {
    this.options = options;
    if (!options.rootNode) throw new Error('Root node not defined');
    this.init();
  }
  /**
   * Generate button node for footer
   *
   * @param {object} buttonOptions
   * @returns {HTMLButtonElement}
   * @memberof Footer
   */
  getButtons(buttonOptions) {
    const button = document.createElement('button');
    button.classList.add('leylim__footer-button');
    button.classList.add(buttonOptions.btnClass);
    button.setAttribute('type', 'button');
    button.innerText = buttonOptions.text;
    button.onclick = buttonOptions.handler;

    return button;
  }

  init() {
    const { rootNode, buttons = [] } = this.options;
    const rootEl = document.querySelector(rootNode);
    const buttonNodeContainer = document.createElement('div');
    buttonNodeContainer.classList.add(FOOTER_NODE);

    for (var ii = 0; ii < buttons.length; ii++) {
      let button = this.getButtons(buttons[ii]);
      buttonNodeContainer.appendChild(button);
    }
    rootEl.appendChild(buttonNodeContainer);
  }
}
