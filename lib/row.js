import Bus from './bus';
import { AREA_NODE, AREA_ROW_NODE, AREA_ROW_ACTIONS_NODE, AREA_ROW_TEMPLATE_NODE, HTML_MODE_NODE } from './constant';
import { UPDATE_ROW, DUPLICATE_ROW, DELETE_ROW } from './events';

/**
 * Row class is a child item of area and that handle duplicate, edit, sort actions.
 * Also, that store dirty html and raw data of component object.
 *
 * @export
 * @class Row
 * @extends {Bus}
 */
export default class Row extends Bus {
  constructor(component) {
    super();
    this.component = Object.assign({}, component);
    this.rowNode = null;
    this.index = 0;
    this.templateNode = null;
    this.actionsNode = null;
    this.rawHTMLmode = false;
    this.actionButtons = {
      ACTIONS_DUPLICATE: 'leylim-actions actions--dupicate',
      ACTIONS_DELETE: 'leylim-actions actions--delete',
      ACTIONS_HTML: 'leylim-actions actions--edit',
      ACTIONS_ACTIVE: 'action-active'
    }
  }

  static useEvents(options) {
    this.beforeRowUpdate = options.beforeRowUpdate;
    this.rowUpdated = options.rowUpdated;
  }

  /**
   * @description This function is triggered two condition.
   * First; When blured one of editable child of templateNode
   * Second; When condition in renderContent method is changed as htmlMode = true
   *
   * @memberof Row
   */
  onUpdateRowTemplate = () => {
    Row.beforeRowUpdate(this.templateNode, this.component, (node, component) => {
      const rawHtml = node.innerHTML;
      this.component = component;
      this.component.template = rawHtml;
    });

    Row.rowUpdated(this.component, this.index);
    // this.fire(UPDATE_ROW);
  };

  attachEvents() {
    const { ACTIONS_DUPLICATE, ACTIONS_DELETE, ACTIONS_HTML } = this.actionButtons;


    const editableChild = this.templateNode.querySelectorAll('[contenteditable]');
    const duplicateButton = this.rowNode.querySelector(`.${ACTIONS_DUPLICATE.split(' ').join('.')}`);
    const deleteButton = this.rowNode.querySelector(`.${ACTIONS_DELETE.split(' ').join('.')}`);
    const editButton = this.rowNode.querySelector(`.${ACTIONS_HTML.split(' ').join('.')}`);

    editableChild.forEach(element => {
      element.onblur = this.onUpdateRowTemplate;
    });

    duplicateButton.onclick = this.onDuplicate;
    deleteButton.onclick = this.onDelete;
    editButton.onclick = this.changeMode;
  }
  /**
   * @description If user change render mode (rawHTMLmode) as html for editing template,
   * according to that which condition is true renderContent react that condition.
   * For example; we suppose the rawHTMLmode is true, templateNode content set as innerText otherwise innerHTML
   * This condition is for support editing row content as html .
   *
   * @memberof Row
   */
  renderContent = (inital) => {
    if (this.rawHTMLmode) {
      this.templateNode.innerText = this.component.template
      this.templateNode.setAttribute('contenteditable', true)
      this.templateNode.classList.add(HTML_MODE_NODE);
    } else {
      // condition is for init time, if empty templateNode.innerHTML
      this.templateNode.innerHTML = this.templateNode.innerText || this.component.template
      this.templateNode.setAttribute('contenteditable', false)
      this.templateNode.classList.remove(HTML_MODE_NODE);
      if (!inital) {
        this.onUpdateRowTemplate();
      }
    }

    this.attachEvents();
  }
  // For changing render mode
  changeMode = (e) => {
    const { ACTIONS_ACTIVE } = this.actionButtons;

    e.preventDefault();
    if (!this.rawHTMLmode) {
      e.target.classList.add(ACTIONS_ACTIVE)
    } else {
      e.target.classList.remove(ACTIONS_ACTIVE)
    }

    this.rawHTMLmode = !this.rawHTMLmode;
    this.renderContent();
  }
  // Duplicate clicked row member of rowList which stored by area
  onDuplicate = (e) => {
    e.preventDefault();

    const component = Object.assign({}, this.component);
    const index = this.index;
    this.fire(DUPLICATE_ROW, {
      component,
      index
    });
  }
  // Delete clicked row member of rowList which stored by area
  onDelete = (e) => {
    e.preventDefault();

    const component = Object.assign({}, this.component);
    const index = this.index;
    this.fire(DELETE_ROW, {
      component,
      index
    });
  }

  applyStyle() {
    const { name, style } = this.component;
    let linkName = `leylim-css-module-${name}`;
    //https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
    linkName = linkName.toLowerCase().trim()
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

    const link = document.querySelector(`#${linkName}`)
    if (link) return;

    const linkNode = document.createElement('STYLE');
    linkNode.setAttribute('id', linkName)
    linkNode.innerHTML = style;
    document.head.appendChild(linkNode);
  }

  render(index) {
    const { ACTIONS_DUPLICATE, ACTIONS_DELETE, ACTIONS_HTML, ACTIONS_ACTIVE } = this.actionButtons;

    // index is stored for duplicate and delete actions
    this.index = index;

    const areaNode = document.querySelector(`.${AREA_NODE}`);
    const rowNode = document.createElement('div');
    rowNode.classList.add(AREA_ROW_NODE);
    // For component template (HTML)
    const templateNode = document.createElement('div');
    templateNode.classList.add(AREA_ROW_TEMPLATE_NODE);
    // For row actions delete, duplicate, edit etc.
    const actionsNode = document.createElement('div');
    actionsNode.classList.add(AREA_ROW_ACTIONS_NODE);
    actionsNode.innerHTML = `
      <a href="#" class="${ACTIONS_DUPLICATE}">C</a>
      <a href="#" class="${ACTIONS_DELETE}">D</a>
      <a href="#" class="${ACTIONS_HTML} ${this.rawHTMLmode ? ACTIONS_ACTIVE : ''}">E</a>
    `;

    this.rowNode = rowNode;
    this.templateNode = templateNode;
    this.actionsNode = actionsNode;

    // Appending child node to parent node
    rowNode.appendChild(templateNode);
    rowNode.appendChild(actionsNode);
    areaNode.appendChild(rowNode);

    // Apply component based css
    this.applyStyle();

    // Render content for two condition; rawHTMLmode and !rawHTMLmode
    this.renderContent(true /*initial*/);
    // Finally attachEvents :)
    this.attachEvents();
  }
}
