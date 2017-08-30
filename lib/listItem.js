import Bus from './bus';
import { LIST_ITEM_CONTAINER_NODE, LIST_ITEM_NODE } from './constant';
import { ADD_COMPONENT } from './events';
import { getParents } from './utils';

/**
 * Each component list item
 *
 * @export
 * @class ListItem
 * @extends {Bus}
 */
let _uuid = 0;
export default class ListItem {
  constructor(component, thumbnailPath) {
    this.thumbnailPath = thumbnailPath;
    this.component = component;
    this.render();
    this.uuid = _uuid++;
  }
  /**
   * This make a broadcast as ADD_COMPONENT events,
   * when user click from any item of list
   *
   * @memberof ListItem
   */
  onclick(e) {
    e.preventDefault();
    // Fire event
    Bus.fire(ADD_COMPONENT, this.component, this);
  }
  /**
 * Component list item
 *
 * @memberof ListItem
 * @todo handle thumbnail
 */
  render() {
    const parent = document.querySelector(`.${LIST_ITEM_CONTAINER_NODE}`);

    const listItem = document.createElement('a');
    listItem.href = '#';
    listItem.setAttribute('draggable', true);
    listItem.onclick = this.onclick.bind(this);
    listItem.classList.add(LIST_ITEM_NODE);
    listItem.innerHTML = `<img src="${this.thumbnailPath +
      this.component.thumbnail}" />`;

    parent.appendChild(listItem);
    listItem.ondragstart = ev => {
      ev.dataTransfer.setData('text/plain', this.uuid);
    };
  }
}
