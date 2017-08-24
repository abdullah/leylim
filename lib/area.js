import Bus from './bus';
import Row from './row';
import { getIndex } from './utils';
import { AREA_NODE } from './constant';
import { ADD_COMPONENT, DUPLICATE_ROW, DELETE_ROW } from './events';
import { dispatch } from './lifeCycle';

/**
 * Area is a member of Leylim and that manage update, delete, duplicate ~ row, etc. actions.
 * Area has contain and store all component as template.
 * Therefore can generate dirty html string.
 *
 * @export
 * @class Area
 * @extends {Bus}
 */
export default class Area {
  constructor(options) {
    this.options = options;
    this.rowList = [];

    Bus.subscribe(this.handleEvents);
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
   * For external row data generating.
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

  saveScroll() {
    this.scrollPosition = {
      x: window.scrollX,
      y: window.scrollY
    };
  }

  restoreScroll() {
    const { x, y } = this.scrollPosition;
    window.scroll(x, y);
  }
  /**
   * This actions trigger by listItem
   * @param {Object} row
   * @memberof Area
   */
  deleteAndDuplicateRow(_uuid, isDuplicate) {
    this.saveScroll();
    const row = {};
    const duplicatedRow = this.rowList.filter(r => r._uuid == _uuid)[0];
    const index = getIndex(this.rowList, duplicatedRow);

    row.component = Object.assign({}, duplicatedRow.component);

    if (isDuplicate) {
      const newRow = dispatch('beforeRowDuplicate', row.component);
      this.rowList.splice(index + 1, 0, new Row(newRow));
      this.render();
      dispatch('rowDuplicated', row.component);
    } else {
      const newRow = dispatch('beforeRowDelete', row);
      this.rowList.splice(index, 1);
      this.render();
      dispatch('rowDeleted', newRow);
    }

    this.restoreScroll();
  }
  /**
   * Actions from listItem
   * This actions trigger by listItem
   * @param {any} component
   * @memberof Area
   */
  addComponent(row) {
    const newRow = dispatch('beforeRowAdd', row);
    this.rowList.push(new Row(newRow));
    this.render();
    dispatch('rowAdded');
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
        this.deleteAndDuplicateRow(params, true);
        break;
      case DELETE_ROW:
        this.deleteAndDuplicateRow(params, false);
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
   * re-render and initial render all row
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
      areaNode.innerHTML = `<div class="leylim__empty-area"><span>😒</span> </br> No content</div>`;
    }
  }
}
