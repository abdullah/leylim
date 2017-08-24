import { createDom } from '../utils';

class MonkButton {
  constructor({ name, className }) {
    this.button = document.createElement('button');
    this.button.innerHTML = name;
    this.button.setAttribute('class', className ? className : '');
    this.button.onclick = this.onclick.bind(this);

    this.image = null;
    return this;
  }
  getButton() {
    return this.button;
  }
  setPosition(node) {
    const { left, top } = node.getBoundingClientRect();
    const { clientHeight, clientWidth } = node;
    const {
      clientHeight: bClientHeight,
      clientWidth: bClientWidth
    } = this.button;

    this.button.style.left = `${left + clientWidth / 2 - bClientWidth / 2}px`;
    this.button.style.top = `${top + clientHeight / 2 - bClientHeight / 2}px`;
  }
  listenArea(areaNode) {
    areaNode.addEventListener('mousemove', e => {
      this.setPosition(e.target);

      if (e.target.tagName === 'IMG') {
        this.image = e.target;
        this.button.style.visibility = 'visible';
      } else {
        this.button.style.visibility = 'hidden';
      }
    });
  }
  onclick() {
    this.onButtonClick(this);
  }
}

export default {
  install(Leylim) {
    const { LEYLIM_ROOT, AREA_NODE } = Leylim.nodes;
    const modal = Leylim.$getModal({
      title: 'EDIT IMAGE',
      button: {
        cancel() {},
        save() {}
      }
    });
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    const area = document.querySelector(`.${AREA_NODE}`);
    const editImage = new MonkButton({ name: 'EDIT', className: 'edit-image' });
    rootNode.appendChild(editImage.getButton());

    // modal.onOpen = function() {};
    // modal.onClose = function() {};

    editImage.onButtonClick = () => {
      const content = createDom('div', null, null);
      const input = createDom('input', null, {
        value: editImage.image.src,
        class: 'edit-image-src'
      });
      const button = createDom(
        'button',
        { innerHTML: 'SAVE' },
        { class: 'edit-image-button' }
      );
      content.appendChild(input);
      content.appendChild(button);
      modal.setContent(content);
      modal.open();

      button.onclick = function() {
        editImage.image.src = input.value;
        Leylim.forceUpdate();
        editImage.button.style.visibility = 'hidden';
        modal.close();
      };
    };

    editImage.listenArea(area);
  }
};
