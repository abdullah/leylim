import Bus from './bus';
import { LIST_ITEM_CONTAINER_NODE, LIST_ITEM_NODE } from './constant';
import { ADD_COMPONENT } from './events';

/**
 * Each component list item
 *
 * @export
 * @class ListItem
 * @extends {Bus}
 */
export default class ListItem extends Bus {
  constructor(component) {
    super();
    this.component = component;
    this.render();
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
    this.fire(ADD_COMPONENT, this.component, this);
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
    listItem.onclick = this.onclick.bind(this);
    listItem.classList.add(LIST_ITEM_NODE);
    listItem.innerHTML = `<img src="${this.component.thumbnail}" />`;

    parent.appendChild(listItem);
  }
}
