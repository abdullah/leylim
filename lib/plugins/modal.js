/* eslint-disable */
export default {
  install(Leylim, options) {

    const { LEYLIM_ROOT } = Leylim.nodes;
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    const modalTemplate = `
        <div class="leylim-header"></div>
        <div class="leylim-content"></div>
        <div class="leylim-footer"></div>
    `

    const modalNode = document.createElement('div')
    modalNode.classList.add('leylim-modal');

    modalNode.innerHTML = modalTemplate;
    rootNode.appendChild(modalNode)
    /**
     * @todo
     * open the modal with modalContent which given from user options
     */
    Leylim.prototype.$openModal = function (modalContent) {

    }
  }
}
