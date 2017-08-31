import { getParents } from '../utils';

export default {
  install(Leylim) {
    let isOpen = false;
    let tmpSelection = null;

    const modal = Leylim.$getModal({
      title: 'INSERT LINK'
    });

    modal.setContent(`
      <input class="leylim-modal-input" id="leylim-insert-link"/ >
    `);

    const linkInput = document.querySelector('#leylim-insert-link');

    linkInput.onchange = e => {
      Leylim.restoreSelection();
      if (isOpen) {
        document.execCommand('createLink', false, e.target.value);
      }
      Leylim.saveSelection();
    };

    modal.onSave = () => {
      modal.close();
      Leylim.forceUpdate();
    };

    modal.onClose = () => {
      if (tmpSelection) {
        tmpSelection = null;
      }

      isOpen = false;
      linkInput.value = '';
      Leylim.restoreSelection();
      modal.close();
    };

    modal.onOpen = () => {
      var selObj = window.getSelection();
      if (selObj.focusNode) {
        let a = selObj.focusNode.parentNode;
        const parents = getParents(a, 'DIV');
        const link = parents.filter(n => n.tagName == 'A')[0];

        if (link) {
          linkInput.value = link;

          if (selObj.rangeCount > 0) selObj.removeAllRanges();

          var range = document.createRange();
          range.selectNode(link);
          selObj.addRange(range);
          Leylim.saveSelection();
        }
      }

      linkInput.placeholder = 'Insert Link';
    };

    Leylim.editorButtons.unshift({
      command: '',
      icon: 'fa fa-link',
      handler(selection) {
        Leylim.saveSelection();
        isOpen = true;
        tmpSelection = selection;
        modal.open();
      }
    });
  }
};
