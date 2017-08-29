/* eslint-disable */
import Editor from '../lib/editor';
var assert = require('assert');

describe('LEYLIM EDITOR', () => {
  it('should has only one buttons editor', () => {
    const editorNoMerged = new Editor({
      merge: false,
      buttons: [
        {
          command: 'test-command',
          icon: 'test'
        }
      ]
    });
    assert.equal(editorNoMerged.buttons.length, 1);
  });

  it('should has extra buttons editor', () => {
    const editorMerged = new Editor({
      merge: true,
      buttons: [
        {
          command: 'test-command',
          icon: 'test'
        }
      ]
    });

    const mergedButton = editorMerged.buttons.filter(
      b => b.command == 'test-command'
    );
    assert.equal(mergedButton.length, 1);
  });

  it('should working with filtered buttons', () => {
    const editort = new Editor({
      filter(b) {
        return [b[0]];
      }
    });

    assert.equal(editort.buttons.length, 1);
  });
});
