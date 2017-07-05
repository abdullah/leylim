import Bus from './bus';
import List from './list';
import Area from './area';

export default class Leylim extends Bus {
  /**
   * For plugin using
   * @static
   * @memberof Leylim
   */
  static use() {}
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

    this._list = new List({
      rootNode: el,
      components
    });

    this._area = new Area({
      rootNode: el,
      rowList
    });
  }
}
