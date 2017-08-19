class Modal {
  constructor(rootNode) {
    this.rootNode = rootNode;

    const modalNode = document.createElement('div');
    modalNode.setAttribute('class', 'leylim-modal');
    this.modalNode = modalNode;

    rootNode.appendChild(modalNode);
  }
  setContent(content) {
    this.modalNode.innerHTML = content;
  }
  open() {
    this.modalNode.classList.add('open');
  }
  close() {
    this.modalNode.classList.remove('open');
  }
}

export default {
  install(Leylim, options) {
    const { LEYLIM_ROOT } = Leylim.nodes;
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    Leylim.$getModal = function() {
      return new Modal(rootNode);
    };
  }
};
