import { createDom } from '../utils';

class Modal {
  constructor(rootNode, option) {
    this.rootNode = rootNode;
    this.modalNode = createDom('div', null, { class: 'leylim-modal' });
    this.modalBodyNode = createDom('div', null, {
      class: 'leylim-modal__body'
    });
    this.headerNode = createDom(
      'div',
      { innerHTML: option.title || '' },
      { class: 'leylim-modal__header' }
    );
    this.contentNode = createDom('div', null, {
      class: 'leylim-modal__content'
    });
    this.modalBodyNode.appendChild(this.headerNode);
    this.modalBodyNode.appendChild(this.contentNode);
    this.modalNode.appendChild(this.modalBodyNode);

    this.modalNode.onclick = e => {
      if (e.target.classList.contains('leylim-modal')) {
        this.close();
        this.onClose && this.onClose();
      }
    };
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
}

export default {
  install(Leylim) {
    const { LEYLIM_ROOT } = Leylim.nodes;
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    Leylim.$getModal = function(option) {
      return new Modal(rootNode, option);
    };
  }
};
