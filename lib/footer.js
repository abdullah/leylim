import Bus from './bus';
/**
 * Footer
 * @export
 * @class Footer
 */
export default class Footer extends Bus {
  constructor(options) {
    super();
    this.options = options;
    this.init();
  }

  onShow = () => {
    /* eslint-disable */
    this.fire()
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
    button.classList.add('footer__button');
    button.classList.add(buttonOptions.class);
    button.innerText = buttonOptions.text;
    button.onclick = buttonOptions.handler;

    return button;
  }

  init() {
    const { rootNode, buttons } = this.options;
    const rootEl = document.querySelector(rootNode);
    const buttonNodeContainer = document.createElement('div');
    buttonNodeContainer.classList.add('leylim-footer');

    for (var ii = 0; ii < buttons.length; ii++) {
      let button = this.getButtons(buttons[ii]);
      buttonNodeContainer.appendChild(button);
    }
    rootEl.appendChild(buttonNodeContainer);
  }

}
