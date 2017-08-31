import { FOOTER_NODE } from './constant';
import { createDom } from './utils';

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
    const button = createDom(
      'button',
      { innerText: buttonOptions.text },
      {
        class: `leylim__footer-button ${buttonOptions.btnClass}`,
        type: 'button'
      }
    );
    button.onclick = buttonOptions.handler;

    return button;
  }

  init() {
    const { rootNode, buttons = [] } = this.options;
    const rootEl = document.querySelector(rootNode);
    const buttonNodeContainer = createDom('div', null, { class: FOOTER_NODE });

    for (var ii = 0; ii < buttons.length; ii++) {
      let button = this.getButtons(buttons[ii]);
      buttonNodeContainer.appendChild(button);
    }
    rootEl.appendChild(buttonNodeContainer);
  }
}
