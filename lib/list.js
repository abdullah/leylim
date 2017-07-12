import ListItem from './listItem';
import { LIST_ITEM_CONTAINER_NODE } from './constant';

/**
 * Render component list on the right side of the screen
 * that takes component list objecet from area.
 * @export
 * @class List
 */
export default class List {
  constructor(options) {
    this.options = options;
    this.listNode = null;
    this.init();
  }

  update(components){
    this.options.components = components;
    this.renderListItem();
  }

  init() {
    const { rootNode } = this.options;
    const rootEl = document.querySelector(rootNode);
    const listNode = document.createElement('div');
    listNode.classList.add(LIST_ITEM_CONTAINER_NODE);
    rootEl.appendChild(listNode);
    this.listNode = listNode;
    this.renderListItem();
  }

  renderListItem() {
    this.listNode.innerHTML = "";
    const { components } = this.options;
    for (var ii = 0; ii < components.length; ii++) {
      new ListItem(components[ii]);
    }
  }
}
