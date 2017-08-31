// import { createDom } from '../utils';

const defColors = [
  '#000000',
  '#f0f8ff',
  '#faebd7',
  '#00ffff',
  '#7fffd4',
  '#f0ffff',
  '#f5f5dc',
  '#ffe4c4',
  '#000000',
  '#ffebcd',
  '#0000ff',
  '#8a2be2',
  '#a52a2a',
  '#deb887',
  '#5f9ea0',
  '#7fff00',
  '#d2691e',
  '#ff7f50',
  '#6495ed',
  '#fff8dc',
  '#dc143c',
  '#00ffff',
  '#00008b',
  '#008b8b',
  '#b8860b',
  '#a9a9a9',
  '#006400',
  '#a9a9a9',
  '#bdb76b',
  '#8b008b',
  '#556b2f',
  '#ff8c00',
  '#9932cc',
  '#8b0000',
  '#e9967a',
  '#8fbc8f',
  '#483d8b',
  '#2f4f4f',
  '#2f4f4f',
  '#00ced1',
  '#9400d3',
  '#ff1493',
  '#00bfff',
  '#696969',
  '#696969',
  '#1e90ff',
  '#b22222',
  '#fffaf0',
  '#228b22',
  '#ff00ff',
  '#dcdcdc',
  '#f8f8ff',
  '#ffd700',
  '#daa520',
  '#808080',
  '#008000',
  '#adff2f',
  '#808080',
  '#f0fff0',
  '#ff69b4',
  '#cd5c5c',
  '#4b0082',
  '#fffff0',
  '#f0e68c',
  '#e6e6fa',
  '#fff0f5',
  '#7cfc00',
  '#fffacd',
  '#add8e6',
  '#f08080',
  '#e0ffff',
  '#fafad2',
  '#d3d3d3',
  '#90ee90',
  '#d3d3d3',
  '#ffb6c1',
  '#ffa07a',
  '#20b2aa',
  '#87cefa',
  '#778899',
  '#778899',
  '#b0c4de',
  '#ffffe0',
  '#00ff00',
  '#32cd32',
  '#faf0e6',
  '#ff00ff',
  '#800000',
  '#66cdaa',
  '#0000cd',
  '#ba55d3',
  '#9370db',
  '#3cb371',
  '#7b68ee',
  '#00fa9a',
  '#48d1cc',
  '#c71585',
  '#191970',
  '#f5fffa',
  '#ffe4e1',
  '#ffe4b5',
  '#ffdead',
  '#000080',
  '#fdf5e6',
  '#808000',
  '#6b8e23',
  '#ffa500',
  '#ff4500',
  '#da70d6',
  '#eee8aa',
  '#98fb98',
  '#afeeee',
  '#db7093',
  '#ffefd5',
  '#ffdab9',
  '#cd853f',
  '#ffc0cb',
  '#dda0dd',
  '#b0e0e6',
  '#800080',
  '#ff0000',
  '#bc8f8f',
  '#4169e1',
  '#8b4513',
  '#fa8072',
  '#f4a460',
  '#2e8b57',
  '#fff5ee',
  '#a0522d',
  '#c0c0c0',
  '#87ceeb',
  '#6a5acd',
  '#708090',
  '#708090',
  '#fffafa',
  '#00ff7f',
  '#4682b4',
  '#d2b48c',
  '#008080',
  '#d8bfd8',
  '#ff6347',
  '#40e0d0',
  '#ee82ee',
  '#f5deb3',
  '#ffffff',
  '#f5f5f5',
  '#ffff00',
  '#9acd32'
];

export default {
  install(Leylim, options) {
    let tmpSelection;
    const colors = (options && options.colors) || defColors;
    let color = '';

    const modal = Leylim.$getModal({
      title: 'SELECT COLOR'
    });

    for (var ii = 0; ii < colors.length; ii++) {
      color += `<span style="background-color: ${colors[
        ii
      ]}" data-color="${colors[ii]}"></span>`;
    }

    modal.setContent(`
      <div id="leylim-color-content">
        ${color}
      </div>
    `);

    modal.modalBodyNode.onclick = function(e) {
      Leylim.restoreSelection();
      const target = e.target;
      if (target.tagName == 'SPAN') {
        document.execCommand('foreColor', true, target.dataset.color);
      }
      Leylim.saveSelection();
      Leylim.restoreSelection();
    };

    modal.onSave = () => {
      modal.close();
      Leylim.forceUpdate();
    };

    modal.onClose = () => {
      if (tmpSelection) {
        tmpSelection = null;
      }

      Leylim.restoreSelection();
      modal.close();
    };

    Leylim.editorButtons.push({
      command: '',
      icon: 'fa fa-paint-brush',
      handler(selection) {
        Leylim.saveSelection();
        tmpSelection = selection;
        modal.open();
        Leylim.restoreSelection();
      }
    });
  }
};
