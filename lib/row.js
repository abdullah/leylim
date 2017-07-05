import Bus from './bus';
import { AREA_NODE, AREA_ROW_NODE } from './constant';
import { UPDATE_ROW } from './events';

export default class Row extends Bus {
  constructor(component) {
    super();
    this.component = Object.assign({}, component);
    this.node = null;
  }

  onblur = () => {
    const dirtyHtml = this.node.innerHTML;
    this.component.template = dirtyHtml;
    this.fire(UPDATE_ROW);
  };

  attachEvents() {
    const editableChild = this.node.querySelectorAll('[contenteditable]');

    editableChild.forEach(element => {
      element.onblur = this.onblur;
    });
  }

  render() {
    const areaNode = document.querySelector(`.${AREA_NODE}`);
    const rowNode = document.createElement('div');
    rowNode.classList.add(AREA_ROW_NODE);
    rowNode.innerHTML = this.component.template;
    this.node = rowNode;
    areaNode.appendChild(rowNode);
    this.attachEvents();
  }
}
