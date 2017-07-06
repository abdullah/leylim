import Bus from './bus';
import List from './list';
import Area from './area';

import { LEYLIM_ROOT } from './constant';

export default class Leylim extends Bus {
  /**
   * For plugin using
   * @static
   * @memberof Leylim
   */
  static use() { }
  constructor(options) {
    super();
    /**
     * @todo extends options
     * @todo check is options.el dom element?
     */
    this.options = options;
    this.init();
  }

  init() {
    const { components, el, rowList } = this.options;
    const appNode = document.querySelector(el);
    const leylimNode = document.createElement('div');
    leylimNode.classList.add(LEYLIM_ROOT);
    appNode.appendChild(leylimNode);

    this._list = new List({
      rootNode: `.${LEYLIM_ROOT}`,
      components
    });

    this._area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList
    });
  }
}
