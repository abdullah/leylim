import Bus from './bus';
import Row from './row';
import { AREA_CLASS } from './constant';
import { ADD_COMPONENT, SORT_ROW } from './events';

export default class Area extends Bus {
  constructor(options) {
    super();
    this.options = options;
    this.rowList = [];
    this.subscribe(this.handleEvents);
    this.initArea();
    this.render();
  }

  addComponent(component) {
    this.rowList.push(new Row(component));
    this.render();
  }
  /* eslint-disable */
  sortList(oldIndex, newIndex) {
    // this.render();
  }
  /* eslint-enable */

  handleEvents = (type, params) => {
    switch (type) {
      case ADD_COMPONENT:
        this.addComponent(params);
        break;
      case SORT_ROW:
        this.sortList(params);
        break;
    }
  };

  initArea() {
    const { rootNode } = this.options;
    const rootEl = document.querySelector(rootNode);
    const areaNode = document.createElement('div');
    areaNode.classList.add(AREA_CLASS);
    rootEl.appendChild(areaNode);
    this.areaNode = areaNode;
  }

  render() {
    this.areaNode.innerHTML = '';
    for (var ii = 0; ii < this.rowList.length; ii++) {
      this.rowList[ii].render();
    }
  }
}
