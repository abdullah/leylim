import Bus from './bus';
import { AREA_CLASS } from './constant';
import { ROW_SORT } from './events';

export default class Row extends Bus {
  constructor(component) {
    super();
    this.component = Object.assign({}, component);
    this.node = null;
  }

  onblur = () => {
    const dirtyHtml = this.node.innerHTML;
    this.component.template = dirtyHtml;
    this.fire(ROW_SORT);
  };

  attachEvents() {
    const editableChild = this.node.querySelectorAll('[contenteditable]');

    editableChild.forEach(element => {
      element.onblur = this.onblur;
    });
  }

  render() {
    const areaNode = document.querySelector(`.${AREA_CLASS}`);
    const rowNode = document.createElement('div');
    rowNode.classList.add('ROW');
    rowNode.innerHTML = this.component.template;
    this.node = rowNode;
    areaNode.appendChild(rowNode);
    this.attachEvents();
  }
}
