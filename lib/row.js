import Bus from './bus';
import { AREA_NODE, AREA_ROW_NODE, AREA_ROW_ACTIONS_NODE, AREA_ROW_TEMPLATE_NODE, ACTIONS_DUPLICATE } from './constant';
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
    const duplicateButton = this.rowNode.querySelector(`.${ACTIONS_DUPLICATE}`);

    duplicateButton.onclick = this.onDuplicate;

    editableChild.forEach(element => {
      element.onblur = this.onblur;
    });
  }

  onDuplicate = (e) => {
    e.preventDefault();
    const component = Object.assign({}, this.component);
    const index = this.index;
    this.fire(DUPLICATE_ROW, {
      component,
      index
    });
  }

  render(index) {
    this.index = index;
    const areaNode = document.querySelector(`.${AREA_NODE}`);
    const rowNode = document.createElement('div');
    rowNode.classList.add(AREA_ROW_NODE);

    const templateNode = document.createElement('div');
    templateNode.classList.add(AREA_ROW_TEMPLATE_NODE);
    templateNode.innerHTML = this.component.template;

    const actionsNode = document.createElement('div');
    actionsNode.classList.add(AREA_ROW_ACTIONS_NODE);
    actionsNode.innerHTML = `<a class="${ACTIONS_DUPLICATE}">Duplicate</a>`

    this.rowNode = rowNode;
    this.templateNode = templateNode;
    this.actionsNode = actionsNode;

    rowNode.appendChild(templateNode);
    rowNode.appendChild(actionsNode);
    areaNode.appendChild(rowNode);

    this.attachEvents();
  }
}
