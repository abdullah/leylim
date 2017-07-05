import Bus from './bus';
import ListItem from './listItem';
import { LIST_ITEM_CLASS } from './constant';
export default class List extends Bus {
  constructor(options) {
    super();
    this.options = options;
    this.listNode = null;
    this.init();
  }

  renderListItem() {
    const { components } = this.options;
    for (var ii = 0; ii < components.length; ii++) {
      new ListItem(components[ii]);
    }
  }

  init() {
    const { rootNode } = this.options;
    const rootEl = document.querySelector(rootNode);
    const listNode = document.createElement('div');
    listNode.classList.add(LIST_ITEM_CLASS);
    rootEl.appendChild(listNode);
    this.listNode = listNode;
    this.renderListItem();
  }
}
