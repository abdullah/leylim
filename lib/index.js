import Bus from './bus';
import List from './list';
import Area from './area';
import Footer from './footer';

import { LEYLIM_ROOT } from './constant';

/**
 * Constructor of Leylim
 *
 * @example
 * ```javascript
 * const leylim = new Leylim({
 *   el: '#app',
 *   components,
 *   rowList
 * });
 * ```
 *
 * @export
 * @class Leylim
 * @extends {Bus}
 */
export default class Leylim extends Bus {

  constructor(options) {
    super();
    /**
     * @todo extends options
     * @todo check is options.el dom element?
     */
    this.options = options;
    this.init();
  }
  /**
   * For plugin using
   * @static
   * @memberof Leylim
   */
  static use() {}
  /**
   * Update all member of Leylim
   * Avilable update options; components, rowList, buttons
   */
  update(options) {
    /* eslint-disable */
    const {components} = options;
    this.options.components = components;
    this._list.update(components);
  }
  /**
   * Public method for get all rowList
   * @public
   * @returns
   * @memberof Leylim
   */
  getRowData() {
    return this._area.getRowData();
  }
  /**
   * init member of leylim for example; List, Area etc
   * @private
   */
  init() {
    const {components, el, rowList, buttons} = this.options;
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
      rowList,
    });

    this._footer = new Footer({
      rootNode: `.${LEYLIM_ROOT}`,
      buttons
    })
  }
}
