import ListItem from './listItem';
import { LIST_ITEM_CONTAINER_NODE } from './constant';
export default class List {
  constructor(options) {
    this.options = options;
    this.listNode = null;
    this.init();
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
    const { components } = this.options;
    for (var ii = 0; ii < components.length; ii++) {
      new ListItem(components[ii]);
    }
  }
}
