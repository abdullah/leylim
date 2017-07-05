import Bus from './bus';
import Row from './row';
import { AREA_CLASS } from './constant';
import { COMPONENT_ADDED } from './events';

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

  handleEvents = (type, params) => {
    switch (type) {
      case COMPONENT_ADDED:
        this.addComponent(params);
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
