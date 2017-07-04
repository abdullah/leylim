import Bus from './bus';
import List from './list';

export default class Leylim extends Bus {
  constructor(options) {
    super();
    /**
     * @todo extends options
     * @todo check is options.el dom element?
     */
    this.options = options;
    this.subscribe(this.render);
    this.init();
  }
  /**
   * For plugin using
   *
   * @static
   * @memberof Leylim
   */
  static use() {}

  init() {
    const { components, el } = this.options;

    this.list = new List({
      el,
      components
    });

    // this.fire('test event', {
    //   oldData: 1
    // });
  }

  render() {}
}
