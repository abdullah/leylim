import Bus from './bus';
import { AREA_NODE, AREA_ROW_NODE } from './constant';
import { UPDATE_ROW, DUPLICATE_ROW } from './events';

export default class Row extends Bus {
  constructor(component) {
    super();
    this.component = Object.assign({}, component);
    this.rowNode = null;
    this.templateNode = null;
    this.actionsNode = null;
  }

  onblur = () => {
    const dirtyHtml = this.templateNode.innerHTML;
    this.component.template = dirtyHtml;
    this.fire(UPDATE_ROW);
  };

  attachEvents() {
    const editableChild = this.rowNode.querySelectorAll('[contenteditable]');
    const duplicateButton = this.rowNode.querySelector('.row-duplicate');

    duplicateButton.onclick = this.onDuplicate;

    editableChild.forEach(element => {
      element.onblur = this.onblur;
    });
  }

  onDuplicate = (e) => {
    e.preventDefault();
    this.fire(DUPLICATE_ROW, this.component);
  }

  render() {
    const areaNode = document.querySelector(`.${AREA_NODE}`);
    const rowNode = document.createElement('div');
    rowNode.classList.add(AREA_ROW_NODE);

    const templateNode = document.createElement('div');
    templateNode.classList.add('row-template');
    templateNode.innerHTML = this.component.template;

    const actionsNode = document.createElement('div');
    actionsNode.classList.add('row-actions');
    actionsNode.innerHTML = `<a class="row-duplicate">Duplicate</a>`

    this.rowNode = rowNode;
    this.templateNode = templateNode;
    this.actionsNode = actionsNode;

    rowNode.appendChild(templateNode);
    rowNode.appendChild(actionsNode);
    areaNode.appendChild(rowNode);

    this.attachEvents();
  }
}
