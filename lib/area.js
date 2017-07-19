import Bus from './bus';
import Row from './row';
import { AREA_NODE } from './constant';
import { ADD_COMPONENT, DUPLICATE_ROW, DELETE_ROW } from './events';

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

    const {
      beforeRowUpdate,
      rowUpdated
    } = this.options.events;

    Row.useEvents({
      beforeRowUpdate,
      rowUpdated
    })

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
  getRowData() {
    const data = [];
    const list = this.rowList;
    for (var ii = 0; ii < list.length; ii++) {
      let rawData = list[ii].getRawData();
      data.push(JSON.stringify(rawData));
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
      this.rowList.push(new Row(rowList[ii]));
    }
  }
  /**
   * This actions trigger by listItem
   * @param {Object} row
   * @memberof Area
   */
  duplicateRow(row) {
    const {
      beforeRowDuplicate,
      rowDuplicated
    } = this.options.events;
    let interimRow;
    beforeRowDuplicate(row.component, (newRow) => {
      interimRow = newRow;
      this.rowList.splice((row.index + 1), 0, new Row(newRow));
      this.render();
    });
    rowDuplicated(interimRow);
  }

  /**
   * This actions trigger by listItem
   * @param {Object} row
   * @memberof Area
   */
  deleteRow(row) {
    const {
      beforeRowDelete,
      rowDeleted
    } = this.options.events;

    let interimRow;

    beforeRowDelete(row, (newRow) => {
      interimRow = newRow;
      this.rowList.splice(newRow.index, 1);
      this.render();
    });
    rowDeleted(interimRow);
  }
  /**
   * Actions from listItem
   * This actions trigger by listItem
   * @param {any} component
   * @memberof Area
   */
  addComponent(row) {
    const {
      beforeRowAdd,
      rowAdded
    } = this.options.events;

    let interimRow;
    beforeRowAdd(row, (newRow) => {
      interimRow = newRow;
      this.rowList.push(new Row(newRow));
      this.render();
    });

    rowAdded(interimRow)
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
      case DELETE_ROW:
        this.deleteRow(params);
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
    const areaNode = this.areaNode;

    while (areaNode.firstChild) {
      areaNode.removeChild(areaNode.firstChild);
    }

    if (this.rowList.length) {
      for (var ii = 0; ii < this.rowList.length; ii++) {
        this.rowList[ii].render(ii);
      }
    } else {
      areaNode.innerHTML = `<div class="leylim__empty-area"><span>😒</span> </br> No content</div>`
    }
  }
}
