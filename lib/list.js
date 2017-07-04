import Bus from './bus';
import ListItem from './listItem';

export default class List extends Bus {
  constructor(options) {
    super();
    this.options = options;
    this.listNode = null;
    this.render();
  }

  renderListItem() {
    const { components } = this.options;
    for (var ii = 0; ii < components.length; ii++) {
      new ListItem({
        listNode: this.listNode,
        component: components[ii]
      });
    }
  }

  render() {
    const { el } = this.options;
    const rootEl = document.querySelector(el);
    const listNode = document.createElement('div');
    listNode.classList.add('leylim__component-list');
    rootEl.appendChild(listNode);
    this.listNode = listNode;
    this.renderListItem();
  }
}
