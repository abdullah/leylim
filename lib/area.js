import Bus from './bus';
import Row from './row';
import { AREA_NODE } from './constant';
import { ADD_COMPONENT, DUPLICATE_ROW } from './events';

/**
 * Area is a member of Leylim and that manage update, delete, duplicate ~ row, etc. actions.
 * Area has contain and store all component as template.
 * Therefore can generate dirty html string.
 *
 * @export
 * @class Area
 * @extends {Bus}
 */
export default class Area extends Bus {
  constructor(options) {
    super();
    this.options = options;
    this.rowList = [];

    this.subscribe(this.handleEvents);
    this.generateRow();
    this.initArea();
    this.render();
  }
  /**
   * Return all rowlist data
   *
   * @memberof Area
   * @return {Object} Row list
   */
  getRowData(){
    const data = [];
    const list = this.rowList;
    for (var ii = 0; ii < list.length; ii++) {
      let rowData = Object.assign({}, list[ii].component);
      data.push(rowData);
    }

    return data;
  }
  /**
   * For external raw data generating.
   *
   * @example
   * ```
   *  const components = [...];
   *
   *  const rowList = [
   *    {
   *      name: 'hacucuao',
   *      template: `<div contenteditable>Template hacucuao</div>`
   *    }
   *  ]
   *  const leylim = new Leylim({
   *    el: '#app',
   *    components,
   *    rowList
   *  });
   * ```
   *
   * @memberof Area
  */
  generateRow() {
    const { rowList } = this.options;
    for (var ii = 0; ii < rowList.length; ii++) {
      this.rowList.push(new Row(rowList[ii], ii));
    }
  }
  /**
   * This actions trigger by listItem
   * @param {Object} row
   * @memberof Area
   */
  duplicateRow(row) {
    this.rowList.splice(row.index, 0, new Row(row.component));
    this.render();
  }
  /**
   * Actions from listItem
   * This actions trigger by listItem
   * @param {any} component
   * @memberof Area
   */
  addComponent(component) {
    this.rowList.push(new Row(component));
    this.render();
  }
  /**
   * It make out all relevant events .
   * @memberof Area
   */
  handleEvents = (type, params) => {
    switch (type) {
      case ADD_COMPONENT:
        this.addComponent(params);
        break;
      case DUPLICATE_ROW:
        this.duplicateRow(params);
        break;
    }
  };
  /**
   * This method appendices itself to rootEl of leylim.
   */
  initArea() {
    const { rootNode } = this.options;
    const rootEl = document.querySelector(rootNode);
    const areaNode = document.createElement('div');
    areaNode.classList.add(AREA_NODE);
    rootEl.appendChild(areaNode);
    this.areaNode = areaNode;
  }
  /**
   * re-render and init render all row
   * @memberof Area
   */
  render() {
    this.areaNode.innerHTML = '';
    for (var ii = 0; ii < this.rowList.length; ii++) {
      this.rowList[ii].render(ii);
    }
  }
}
