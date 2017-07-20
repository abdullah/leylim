import Bus from './bus';
import List from './list';
import Area from './area';
import Footer from './footer';
import Editor from './editor';
import lifeCycle from './lifeCycle';

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
    const { beforeCreate = lifeCycle.beforeCreate } = this.options;
    beforeCreate(this.options);
    this.init();
  }
  /**
   * For plugin using
   * @static
   * @memberof Leylim
   */
  static use() {

  }
  /**
   * Update all member of Leylim
   * Avilable update options; components, rowList, buttons
   */
  update(options) {
    const { components } = options;
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
    const {
      components = [],
      el, rowList = [],
      buttons = [],
      thumbnailPath = '',
      customEditorButtons = {
        merge: true,
        buttons: [],
      },
      created = lifeCycle.created,
      beforeRowUpdate = lifeCycle.beforeRowUpdate,
      rowUpdated = lifeCycle.rowUpdated,
      beforeRowDelete = lifeCycle.beforeRowDelete,
      rowDeleted = lifeCycle.rowDeleted,
      beforeRowDuplicate = lifeCycle.beforeRowDuplicate,
      rowDuplicated = lifeCycle.rowDuplicated,
      beforeRowAdd = lifeCycle.beforeRowAdd,
      rowAdded = lifeCycle.rowAdded,
    } = this.options;

    if (!components.length)
      throw new Error("Can you give me components? please! If you don't have an idea; https://github.com/abdullah/leylim ");

    const appNode = document.querySelector(el);
    const leylimNode = document.createElement('div');
    leylimNode.classList.add(LEYLIM_ROOT);
    appNode.appendChild(leylimNode);

    this._list = new List({
      rootNode: `.${LEYLIM_ROOT}`,
      thumbnailPath,
      components
    });

    this._footer = new Footer({
      rootNode: `.${LEYLIM_ROOT}`,
      buttons
    });

    this._area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList,
      events: {
        beforeRowUpdate,
        rowUpdated,
        beforeRowDelete,
        rowDeleted,
        beforeRowDuplicate,
        rowDuplicated,
        beforeRowAdd,
        rowAdded
      }
    });


    this._editor = new Editor({
      merge: customEditorButtons.merge,
      buttons: customEditorButtons.buttons,
      filter: customEditorButtons.filter
    });

    created();
  }
}
