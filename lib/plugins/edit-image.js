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
  install(Leylim, options) {
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

    const titleSource = createDom(
      'span',
      { innerHTML: 'Source' },
      { class: 'edit-image-title' }
    );

    // const titleFile = createDom(
    //   'span',
    //   { innerHTML: 'Upload File' },
    //   { class: 'edit-image-title' }
    // );

    const titleRadius = createDom(
      'span',
      { innerHTML: 'Radius' },
      { class: 'edit-image-title' }
    );

    const input = createDom('input', null, {
      class: 'edit-image-input-form'
    });

    const inputRadius = createDom('input', null, {
      value: '0',
      type: 'range',
      min: '0',
      class: 'edit-image-input-form'
    });

    const inputFile = createDom('input', null, {
      value: '0',
      type: 'file',
      name: 'file',
      id: 'file',
      class: 'edit-image-input-form inputfile'
    });

    const inputFileLabel = createDom(
      'label',
      {
        innerHTML: `<i class="fa fa-upload" aria-hidden="true"></i> Upload file`
      },
      {
        value: '0',
        for: 'file'
      }
    );

    const content = createDom('div', null, {
      class: 'edit-image-modal-content'
    });

    content.appendChild(titleSource);
    content.appendChild(input);
    content.appendChild(titleRadius);
    content.appendChild(inputRadius);
    if (options.onUploadFile) {
      // content.appendChild(titleFile);
      content.appendChild(inputFile);
      content.appendChild(inputFileLabel);
    }

    modal.setContent(content);

    modal.onClose = function() {
      editImage.image.style.borderRadius = '';
      editImage.image.src = tmpsrc;
      modal.close();
    };

    modal.onSave = function() {
      editImage.image.src = input.value;
      editImage.image.style.borderRadius = `${inputRadius.value}px`;
      Leylim.forceUpdate();
      editImage.button.style.visibility = 'hidden';
      modal.close();
    };

    const onInputSource = e => {
      if (e.target.value) {
        editImage.image.src = e.target.value;
      }
    };

    const onInputFile = e => {
      options.onUploadFile(e.target.files, function(source) {
        editImage.image.src = source;
        input.value = source;
      });
    };

    const onInputRadius = e => {
      editImage.image.style.borderRadius = `${e.target.value}px`;
    };

    editImage.onButtonClick = () => {
      // Values of inputs
      tmpsrc = editImage.image.src;
      input.value = editImage.image.src;
      inputRadius.max = editImage.image.clientWidth / 2;
      // Change
      input.oninput = onInputSource;
      inputRadius.oninput = onInputRadius;
      inputFile.onchange = onInputFile;

      modal.open();
    };

    editImage.listenArea(area);
  }
};
