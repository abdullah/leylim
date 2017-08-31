/* eslint-disable */
import Editor from '../lib/editor';
import expect from 'expect.js';
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

  it('should working with clicked buttons', () => {
    let tmpHandler = false;
    const editort = new Editor({});
    const button = editort.editorNode.querySelector('a');
    button.click();
    expect(button.click).to.be.ok();
  });

  it('should working with clicked buttons with handler', () => {
    let tmpHandler = false;
    const editort = new Editor({
      merge: true,
      buttons: [
        {
          command: 'test-command',
          icon: 'test',
          handler() {
            tmpHandler = true;
          }
        }
      ]
    });
    const buttons = editort.editorNode.querySelectorAll('a');
    const testButton = buttons[buttons.length - 1];
    testButton.click();
    expect(testButton.click).to.be.ok();
    expect(tmpHandler).to.be.equal(true);
  });
});
