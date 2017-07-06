import Bus from './bus';
import Row from './row';
import { AREA_NODE } from './constant';
import { ADD_COMPONENT, UPDATE_ROW, DUPLICATE_ROW } from './events';

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

  generateRow() {
    const { rowList } = this.options;
    for (var ii = 0; ii < rowList.length; ii++) {
      this.rowList.push(new Row(rowList[ii],ii));
    }
  }

  addComponent(component) {
    this.rowList.push(new Row(component));
    this.render();
  }

  handleEvents = (type, params) => {
    switch (type) {
      case ADD_COMPONENT:
        this.addComponent(params);
        break;
      case DUPLICATE_ROW:
        this.addComponent(params);
        break;
    }
  };

  initArea() {
    const { rootNode } = this.options;
    const rootEl = document.querySelector(rootNode);
    const areaNode = document.createElement('div');
    areaNode.classList.add(AREA_NODE);
    rootEl.appendChild(areaNode);
    this.areaNode = areaNode;
  }

  render() {
    this.areaNode.innerHTML = '';
    for (var ii = 0; ii < this.rowList.length; ii++) {
      this.rowList[ii].render(ii);
    }
  }
}
