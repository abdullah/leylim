import Bus from './bus';
import { LIST_ITEM_CONTAINER_NDEO, LIST_ITEM_NODE } from './constant';
import { ADD_COMPONENT } from './events';

export default class ListItem extends Bus {
  constructor(component) {
    super();
    this.component = component;
    this.render();
  }

  /**
   * @memberof ListItem
   */
  onclick() {
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
    const parent = document.querySelector(`.${LIST_ITEM_CONTAINER_NDEO}`);
    const listItem = document.createElement('a');
    listItem.onclick = this.onclick.bind(this);
    listItem.classList.add(LIST_ITEM_NODE);
    listItem.innerHTML = this.component.name;
    parent.appendChild(listItem);
  }
}
