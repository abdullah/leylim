import Bus from './bus';
import { AREA_CLASS } from './constant';
// import { COMPONENT_ADDED } from './events';

export default class Row extends Bus {
  constructor(component) {
    super();
    this.component = component;
  }

  render() {
    const areaNode = document.querySelector(`.${AREA_CLASS}`);
    const rowNode = document.createElement('div');
    rowNode.classList.add('ROW');
    rowNode.innerHTML = this.component.template;
    rowNode.setAttribute('contenteditable', true);
    areaNode.appendChild(rowNode);
  }
}
