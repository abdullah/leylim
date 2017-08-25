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
    let tmpsrc = '';
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    const area = document.querySelector(`.${AREA_NODE}`);
    const editImage = new MonkButton({ name: 'EDIT', className: 'edit-image' });
    rootNode.appendChild(editImage.getButton());

    modal.onClose = function() {
      editImage.image.style.borderRadius = '';
      editImage.image.src = tmpsrc;
    };

    editImage.onButtonClick = () => {
      const content = createDom('div', null, null);
      tmpsrc = editImage.image.src;

      const titleSource = createDom(
        'span',
        { innerHTML: 'Source' },
        { class: 'edit-image-title' }
      );

      const titleRadius = createDom(
        'span',
        { innerHTML: 'Radius' },
        { class: 'edit-image-title' }
      );

      const input = createDom('input', null, {
        value: editImage.image.src,
        class: 'edit-image-input-form'
      });

      const inputRadius = createDom('input', null, {
        value: '0',
        type: 'range',
        min: '0',
        max: editImage.image.clientWidth / 2,
        class: 'edit-image-input-form'
      });

      input.oninput = function() {
        if (input.value) {
          editImage.image.src = input.value;
        }
      };

      inputRadius.oninput = function() {
        editImage.image.style.borderRadius = `${inputRadius.value}px`;
      };

      const button = createDom(
        'button',
        { innerHTML: 'SAVE' },
        { class: 'edit-image-button' }
      );

      content.appendChild(titleSource);
      content.appendChild(input);
      content.appendChild(titleRadius);
      content.appendChild(inputRadius);
      content.appendChild(button);
      modal.setContent(content);
      modal.open();

      button.onclick = function() {
        editImage.image.src = input.value;
        editImage.image.style.borderRadius = `${inputRadius.value}px`;
        Leylim.forceUpdate();
        editImage.button.style.visibility = 'hidden';
        modal.close();
      };
    };

    editImage.listenArea(area);
  }
};
