import Bus from './bus';
import { dispatch } from './lifeCycle';
import { AREA_NODE, AREA_ROW_NODE, AREA_ROW_ACTIONS_NODE, AREA_ROW_TEMPLATE_NODE, HTML_MODE_NODE } from './constant';
import { DUPLICATE_ROW, DELETE_ROW } from './events';

/**
 * Row class is a child item of area and that handle duplicate, edit, sort actions.
 * Also, that store dirty html and raw data of component object.
 *
 * @export
 * @class Row
 * @extends {Bus}
 */
let _uuid = 0;
export default class Row {
  constructor(component) {
    this.component = Object.assign({}, component);
    this.rowNode = null;
    this.templateNode = null;
    this.actionsNode = null;
    this.rawHTMLmode = false;
    this.actionButtons = {
      ACTIONS_DUPLICATE: 'actions--dupicate',
      ACTIONS_DELETE: 'actions--delete',
      ACTIONS_HTML: 'actions--edit',
      ACTIONS_ACTIVE: 'action-active'
    }
    this._uuid = _uuid++;
  }

  /**
   * @description This function toggle contenteditable attribute of each element with given state.
   * @param {Boolean} state ~ which state is active
   */
  toggleEditable(state) {
    const editableChild = this.templateNode.querySelectorAll('[contenteditable]');
    for (let ii = 0; ii < editableChild.length; ii++) {
      editableChild[ii].setAttribute('contenteditable', state);
    }
  }
  /**
   * @description This function call from area which member of Leylim.
   * @return {String} raw html of component object
   */
  getRawData() {
    this.toggleEditable(false);
    const component = Object.assign({}, this.component);
    component.template = this.templateNode.innerHTML
    this.toggleEditable(true);
    return component;
  }

  /**
   * @description This function is triggered two condition.
   * First; When blured one of editable child of templateNode
   * Second; When condition in renderContent method is changed as htmlMode = true
   *
   * @memberof Row
   */
  onUpdateRowTemplate = () => {
    const data = dispatch('beforeRowUpdate', { node: this.templateNode, component: this.component });
    const rawHtml = data.node.innerHTML;
    this.component = data.component;
    this.component.template = rawHtml;
    dispatch('rowUpdated', { component: this.component, _uuid: this._uuid });
  };

  attachEvents() {
    const { ACTIONS_DUPLICATE, ACTIONS_DELETE, ACTIONS_HTML } = this.actionButtons;


    const editableChild = this.templateNode.querySelectorAll('[contenteditable]');
    const duplicateButton = this.rowNode.querySelector(`.${ACTIONS_DUPLICATE}`);
    const deleteButton = this.rowNode.querySelector(`.${ACTIONS_DELETE}`);
    const editButton = this.rowNode.querySelector(`.${ACTIONS_HTML}`);

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
      this.toggleEditable(true);
    }

    this.attachEvents();
  }
  // For changing render mode
  changeMode = (e) => {
    e.preventDefault();

    const { ACTIONS_ACTIVE, ACTIONS_HTML } = this.actionButtons;
    const node = this.actionsNode.querySelector(`.${ACTIONS_HTML}`);

    if (!this.rawHTMLmode) {
      node.classList.add(ACTIONS_ACTIVE)
    } else {
      node.classList.remove(ACTIONS_ACTIVE)
    }

    this.rawHTMLmode = !this.rawHTMLmode;
    this.renderContent();
  }
  // Duplicate clicked row member of rowList which stored by area
  onDuplicate = (e) => {
    e.preventDefault();
    Bus.fire(DUPLICATE_ROW, this._uuid);
  }
  // Delete clicked row member of rowList which stored by area
  onDelete = (e) => {
    e.preventDefault();
    Bus.fire(DELETE_ROW, this._uuid);
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

  render() {
    const { ACTIONS_DUPLICATE, ACTIONS_DELETE, ACTIONS_HTML, ACTIONS_ACTIVE } = this.actionButtons;

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
      <a href="#" class="leylim-actions ${ACTIONS_DUPLICATE}"><i class="fa fa-copy"></i></a>
      <a href="#" class="leylim-actions ${ACTIONS_DELETE}"><i class="fa fa-trash-o"></i></a>
      <a href="#" class="leylim-actions ${ACTIONS_HTML} ${this.rawHTMLmode ? ACTIONS_ACTIVE : ''}"><i class="fa fa-html5"></i></a>
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
