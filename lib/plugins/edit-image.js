/* eslint-disable */

const imgEditButton = {
  init() {
    const button = document.createElement('button');
    button.innerHTML = 'EDIT';
    button.style.display = 'none';
    button.style.position = 'fixed';
    this.button = button;
    return this.button;
  },
  getButton() {
    return this.button;
  },
  setPosition(node) {
    const { left, top } = node.getBoundingClientRect();
    const { clientHeight, clientWidth } = node;
    const { clientHeight: bClientHeight, clientWidth: bClientWidth } = this.button;

    this.button.style.left = `${left + (clientWidth / 2) - (bClientWidth / 2)}px`;
    this.button.style.top = `${top + (clientHeight / 2) - (bClientHeight / 2)}px`;
    this.button.style.display = 'block';

  },
  listenOnImageMove(area) {
    area.addEventListener('mouseover', (e) => {
      if (e.target.tagName === 'IMG') {
        this.setPosition(e.target);
      } else {
        this.button.style.display = 'none';
      }
    })
  }
}

export default {
  install(Leylim, options) {
    const { LEYLIM_ROOT, AREA_NODE } = Leylim.nodes;
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    const area = document.querySelector(`.${AREA_NODE}`);

    rootNode.appendChild(imgEditButton.init());
    imgEditButton.listenOnImageMove(area)
  }
}
