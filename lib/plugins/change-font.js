import { createDom } from '../utils';

const fonts = [
  'Arial',
  'Arial Black',
  'Comic Sans MS',
  'Courier New',
  'Helvetica Neue',
  'Helvetica',
  'Impact',
  'Lucida Grande',
  'Tahoma',
  'Times New Roman',
  'Verdana'
];

export default {
  install(Leylim) {
    let isOpen = false;
    let _selection = null;

    const modal = Leylim.$getModal({
      title: 'SELECT FONT',
      button: {
        cancel() {},
        save() {}
      }
    });

    let options = '';
    for (var ii = 0; ii < fonts.length; ii++) {
      options += `<option value="${fonts[ii]}">${fonts[ii]}</option>`;
    }

    modal.setContent(`
      <select name="select-font" id="leylim-select-font">
        ${options}
      </select>
    `);

    const fontInput = document.querySelector('#leylim-select-font');

    fontInput.onchange = (e) => {
      if (isOpen) {
        document.execCommand(
          'insertHTML',
          true,
          `<span style="font-family: ${e.target.value}">${_selection}</span>`
        );
      }
    };

    modal.onClose = () => {
      _selection = null;
      isOpen = false;
    };

    Leylim.editorButtons.push({
      command: 'my-command',
      icon: 'fa fa-cog',
      handler(selection) {
        isOpen = true;
        _selection = selection;
        modal.open();
      }
    });
  }
};
