import Bus from './bus';
import { AREA_CLASS } from './constant';

export default class Area extends Bus {
  constructor(options) {
    super();
    this.options = options;
    this.subscribe(this.handleEvents);
    this.initArea();
    this.render();
  }

  handleEvents = () => {};

  initArea() {
    const { rootNode } = this.options;
    const rootEl = document.querySelector(rootNode);
    const areaNode = document.createElement('div');
    areaNode.classList.add(AREA_CLASS);
    rootEl.appendChild(areaNode);
    this.areaNode = areaNode;
  }

  render() {

  }
}
