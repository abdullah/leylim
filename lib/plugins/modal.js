import { createDom } from '../utils';

class Modal {
  constructor(rootNode) {
    this.rootNode = rootNode;
    this.modalNode = createDom('div', null, { class: 'leylim-modal' });
    this.contentNode = createDom('div', null, {
      class: 'leylim-modal__content'
    });

    this.modalNode.appendChild(this.contentNode);
    rootNode.appendChild(this.modalNode);
  }
  setContent(content) {
    this.contentNode.innerHTML = '';
    if (content instanceof HTMLElement) {
      this.contentNode.appendChild(content);
    } else {
      this.contentNode.innerHTML = content;
    }
  }
  open() {
    this.modalNode.classList.add('open');
  }
  close() {
    this.modalNode.classList.remove('open');
  }

  addButton() {}
  setHeader() {}
}

export default {
  install(Leylim) {
    const { LEYLIM_ROOT } = Leylim.nodes;
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    Leylim.$getModal = function(n) {
      return new Modal(n || rootNode);
    };
  }
};
