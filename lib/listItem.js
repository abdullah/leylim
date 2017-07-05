import Bus from './bus';
import { LIST_ITEM_CLASS } from './constant';
import { COMPONENT_ADDED } from './events';

export default class ListItem extends Bus {
  constructor(component) {
    super();
    this.component = component;
    this.render();
  }

  /**
   * @todo move event name to global
   *
   * @memberof ListItem
   */
  onclick() {
    // Fire event
    this.fire(COMPONENT_ADDED, this.component, this);
  }
  /**
 * Component list item
 *
 * @memberof ListItem
 * @todo handle thumbnail
 */
  render() {
    const parent = document.querySelector(`.${LIST_ITEM_CLASS}`);
    const listItem = document.createElement('a');
    listItem.onclick = this.onclick.bind(this);
    listItem.classList.add('component-list__item');
    listItem.innerHTML = this.component.name;
    parent.appendChild(listItem);
  }
}
